import seed from "../content/projects.json";

export type Project = {
  slug: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  challenge: string;
  solution: string;
  journey: string[];
  outcome: string;
  image: string;
  gallery: string[];
  videoUrl: string;
  liveUrl: string;
  featured: boolean;
  published: boolean;
};

const repository = "Jmxxr/AlphaNarrative";
const path = "content/projects.json";

export async function getProjects(): Promise<Project[]> {
  if (!process.env.GITHUB_CONTENT_TOKEN) return seed as Project[];
  try {
    const response = await fetch(`https://api.github.com/repos/${repository}/contents/${path}?ref=main`, {
      headers: { Authorization: `Bearer ${process.env.GITHUB_CONTENT_TOKEN}`, Accept: "application/vnd.github.raw+json", "X-GitHub-Api-Version": "2022-11-28" },
      cache: "no-store"
    });
    if (!response.ok) throw new Error("Project data unavailable");
    const projects = await response.json();
    if (!Array.isArray(projects)) throw new Error("Invalid project data");
    return projects as Project[];
  } catch {
    return seed as Project[];
  }
}

export async function getPublishedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((project) => project.published);
}

export function validateProjects(input: unknown): input is Project[] {
  if (!Array.isArray(input) || input.length > 100) return false;
  const slugs = new Set<string>();
  const safeUrl = (value: unknown) => typeof value === "string" && (value === "" || (value.length < 500 && /^https:\/\//.test(value)));
  for (const p of input) {
    if (!p || typeof p !== "object") return false;
    const item = p as Record<string, unknown>;
    if (typeof item.slug !== "string" || !/^[a-z0-9-]{2,60}$/.test(item.slug) || slugs.has(item.slug)) return false;
    slugs.add(item.slug);
    if (!["title","category","status","summary","challenge","solution","outcome"].every((key) => typeof item[key] === "string" && (item[key] as string).length <= 3000)) return false;
    if (!["image","videoUrl","liveUrl"].every((key) => safeUrl(item[key]))) return false;
    if (!Array.isArray(item.gallery) || item.gallery.length > 12 || !item.gallery.every(safeUrl)) return false;
    if (!Array.isArray(item.journey) || item.journey.length > 12 || !item.journey.every((step: unknown) => typeof step === "string" && step.length <= 500)) return false;
    if (typeof item.featured !== "boolean" || typeof item.published !== "boolean") return false;
  }
  return true;
}
