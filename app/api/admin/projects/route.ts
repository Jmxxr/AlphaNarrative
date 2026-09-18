import { NextResponse } from "next/server";
import { isAdmin } from "../../../../lib/admin-auth";
import { getProjects, validateProjects } from "../../../../lib/projects";
import { writeContent } from "../../../../lib/github-content";

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getProjects(), { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (new URL(request.url).origin !== request.headers.get("origin")) return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  const raw = await request.text();
  if (raw.length > 250_000) return NextResponse.json({ error: "Too much content." }, { status: 413 });
  let projects: unknown;
  try { projects = JSON.parse(raw); } catch { return NextResponse.json({ error: "Invalid project data." }, { status: 400 }); }
  if (!validateProjects(projects)) return NextResponse.json({ error: "Check the case study fields and URLs." }, { status: 400 });
  try {
    await writeContent("content/projects.json", JSON.stringify(projects, null, 2) + "\n", "Update Alpha Narrative case studies");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Save failed." }, { status: 502 });
  }
}
