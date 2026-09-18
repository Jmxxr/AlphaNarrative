import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "alpha_admin";
const lifetime = 60 * 15;

function secret() {
  return process.env.ADMIN_SESSION_SECRET;
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length >= 16 && secret() && secret()!.length >= 32 && process.env.GITHUB_CONTENT_TOKEN);
}

export function passwordMatches(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || password.length > 1024) return false;
  const left = createHmac("sha256", "alpha-password").update(password).digest();
  const right = createHmac("sha256", "alpha-password").update(expected).digest();
  return timingSafeEqual(left, right);
}

function sign(value: string) {
  return createHmac("sha256", secret()!).update(value).digest("hex");
}

export function createSession() {
  const expires = Math.floor(Date.now() / 1000) + lifetime;
  const payload = String(expires);
  return `${payload}.${sign(payload)}`;
}

export async function adminSessionExpiry(): Promise<number | null> {
  if (!adminConfigured()) return null;
  const value = (await cookies()).get(cookieName)?.value;
  if (!value) return null;
  const [expiry, signature] = value.split(".");
  if (!/^\d{10}$/.test(expiry) || !/^[a-f0-9]{64}$/.test(signature)) return null;
  if (Number(expiry) <= Math.floor(Date.now() / 1000)) return null;
  // Reject older eight-hour cookies when the new shorter policy is deployed.
  if (Number(expiry) > Math.floor(Date.now() / 1000) + lifetime) return null;
  return timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(sign(expiry), "hex")) ? Number(expiry) * 1000 : null;
}

export async function isAdmin() {
  return (await adminSessionExpiry()) !== null;
}

export const adminCookie = {
  name: cookieName,
  options: { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" as const, path: "/" }
};
