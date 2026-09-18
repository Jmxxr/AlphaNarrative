import { NextResponse } from "next/server";
import { adminConfigured, adminCookie, createSession, passwordMatches } from "../../../../lib/admin-auth";

export async function POST(request: Request) {
  if (!adminConfigured()) return NextResponse.json({ error: "Admin setup is incomplete." }, { status: 503 });
  if (new URL(request.url).origin !== request.headers.get("origin")) return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  if (typeof body.password !== "string" || !passwordMatches(body.password)) return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookie.name, createSession(), adminCookie.options);
  return response;
}

export async function DELETE(request: Request) {
  if (new URL(request.url).origin !== request.headers.get("origin")) return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(adminCookie.name);
  return response;
}
