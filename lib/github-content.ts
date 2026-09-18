const endpoint = "https://api.github.com/repos/Jmxxr/AlphaNarrative/contents/";

export async function writeContent(path: string, content: string, message: string) {
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_CONTENT_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json"
  };
  const url = endpoint + path;
  const existing = await fetch(url + "?ref=main", { headers, cache: "no-store" });
  if (!existing.ok && existing.status !== 404) throw new Error("Could not read the current version.");
  const sha = existing.ok ? (await existing.json()).sha as string : undefined;
  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify({ message, content: Buffer.from(content, "utf8").toString("base64"), branch: "main", ...(sha ? { sha } : {}) }),
    cache: "no-store"
  });
  if (!response.ok) throw new Error(response.status === 409 ? "Someone changed this content. Reload and try again." : "Could not save to GitHub.");
}
