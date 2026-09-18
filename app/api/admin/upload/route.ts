import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { isAdmin } from "../../../../lib/admin-auth";

export async function POST(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (process.env.VERCEL_ENV !== "production") return NextResponse.json({ error: "Uploads are available only on the production site." }, { status: 403 });
  if (new URL(request.url).origin !== request.headers.get("origin")) return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  const form = await request.formData();
  const file = form.get("image");
  if (!(file instanceof File) || file.size < 1 || file.size > 4_000_000) return NextResponse.json({ error: "Choose an image smaller than 4 MB." }, { status: 400 });
  const data = Buffer.from(await file.arrayBuffer());
  const png = data.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const jpeg = data.subarray(0, 3).equals(Buffer.from([255,216,255]));
  const webp = data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WEBP";
  const ext = png ? "png" : jpeg ? "jpg" : webp ? "webp" : null;
  if (!ext) return NextResponse.json({ error: "Only valid PNG, JPEG and WebP images are accepted." }, { status: 400 });
  const name = randomBytes(16).toString("hex") + "." + ext;
  const response = await fetch(`https://api.github.com/repos/Jmxxr/AlphaNarrative/contents/public/projects/${name}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${process.env.GITHUB_CONTENT_TOKEN}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Add case study image", content: data.toString("base64"), branch: "main" }),
    cache: "no-store"
  });
  if (!response.ok) return NextResponse.json({ error: "Could not upload image." }, { status: 502 });
  return NextResponse.json({ url: `https://alphanarrative.pro/projects/${name}` });
}
