import type { Metadata } from "next";
import { AdminEditor } from "./AdminEditor";
export const metadata: Metadata = { title: "Case studies", robots: { index: false, follow: false } };
export default function AdminPage() { return <AdminEditor />; }
