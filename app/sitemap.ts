import type { MetadataRoute } from "next";
import { getPublishedProjects } from "../lib/projects";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/services", "/work", "/process", "/about", "/contact"];
  const base = routes.map((route, index) => ({ url: `https://alphanarrative.pro${route}`, changeFrequency: "monthly" as const, priority: index === 0 ? 1 : 0.8 }));
  const work = (await getPublishedProjects()).map(project => ({ url: `https://alphanarrative.pro/work/${project.slug}`, changeFrequency: "monthly" as const, priority: 0.7 }));
  return [...base, ...work];
}
