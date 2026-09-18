"use client";
import { useEffect, useState } from "react";
import type { Project } from "../../lib/projects";

const empty: Project = { slug: "", title: "", category: "", status: "", summary: "", challenge: "", solution: "", journey: [], outcome: "", image: "", gallery: [], videoUrl: "", liveUrl: "", featured: false, published: false };
const fields: {key: keyof Project; label: string; multiline?: boolean}[] = [
  {key:"title",label:"Project name"}, {key:"slug",label:"Page address (letters, numbers and dashes)"}, {key:"category",label:"Category"}, {key:"status",label:"Current status"},
  {key:"summary",label:"One-sentence introduction",multiline:true}, {key:"challenge",label:"The challenge",multiline:true}, {key:"solution",label:"What we built",multiline:true},
  {key:"journey",label:"Visitor journey (one step per line)",multiline:true}, {key:"outcome",label:"Outcome and current stage",multiline:true},
  {key:"image",label:"Cover image URL"}, {key:"gallery",label:"Gallery image URLs (one per line)",multiline:true}, {key:"videoUrl",label:"Video embed URL"}, {key:"liveUrl",label:"Live product URL"}
];
export function AdminEditor() {
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  async function load() {
    const session = await fetch("/api/admin/session", { cache: "no-store" });
    if (!session.ok) { setProjects(null); setExpiresAt(null); return; }
    const response = await fetch("/api/admin/projects", { cache: "no-store" });
    if (response.ok) { setProjects(await response.json()); setExpiresAt((await session.json()).expiresAt); }
    else { setProjects(null); setExpiresAt(null); }
  }
  useEffect(() => { void load(); }, []);
  useEffect(() => {
    if (!expiresAt) return;
    const endSession = () => { setProjects(null); setExpiresAt(null); setMessage("Your admin session ended. Sign in again to continue."); };
    const timer = window.setTimeout(endSession, Math.max(0, expiresAt - Date.now()));
    const checkOnReturn = () => { if (Date.now() >= expiresAt) endSession(); };
    window.addEventListener("focus", checkOnReturn);
    return () => { window.clearTimeout(timer); window.removeEventListener("focus", checkOnReturn); };
  }, [expiresAt]);
  async function login(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const response = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    setBusy(false); setPassword("");
    if (response.ok) await load(); else setMessage((await response.json()).error || "Could not sign in.");
  }
  function change(key: keyof Project, value: string | boolean) {
    setProjects(current => current?.map((project, index) => index === selected ? { ...project, [key]: key === "journey" || key === "gallery" ? (value as string).split("\n").map(s => s.trim()).filter(Boolean) : value } : project) || null);
  }
  async function upload(file: File, gallery = false) {
    setBusy(true); setMessage("Uploading image…");
    const form = new FormData(); form.append("image", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await response.json(); setBusy(false);
    if (!response.ok) { setMessage(data.error); return; }
    if (gallery) setProjects(current => current?.map((project, index) => index === selected ? { ...project, gallery: [...project.gallery, data.url] } : project) || null);
    else change("image", data.url);
    setMessage("Image uploaded. Save the case studies to publish it.");
  }
  async function save() {
    if (!projects) return;
    setBusy(true); setMessage("Saving…");
    const response = await fetch("/api/admin/projects", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(projects) });
    setBusy(false);
    if (response.status === 401) { setProjects(null); setExpiresAt(null); setMessage("Your session ended. Sign in again to save."); return; }
    setMessage(response.ok ? "Saved. Your host may take a moment to publish the update." : (await response.json()).error || "Could not save.");
  }
  if (!projects) return <main className="admin-screen"><div className="admin-box"><p className="eyebrow">Alpha Narrative / Studio</p><h1>Case study editor</h1><p>Sign in to add or update work.</p><form onSubmit={login}><label>Admin password<input type="password" value={password} onChange={event => setPassword(event.target.value)} required autoComplete="current-password" /></label><button className="btn-primary" disabled={busy}>Sign in ↗</button></form><p role="status">{message}</p></div></main>;
  const current = projects[selected];
  return <main className="admin-screen"><div className="admin-dashboard"><div className="admin-head"><div><p className="eyebrow">Alpha Narrative / Studio</p><h1>Case studies</h1><p className="admin-session-note">Sessions end after 15 minutes. Sign out when finished.</p></div><div><button className="quiet-link" onClick={() => { setProjects([...projects, {...empty}]); setSelected(projects.length); }}>+ New project</button><button className="quiet-link" onClick={async () => { await fetch("/api/admin/session", { method: "DELETE", headers: { "Content-Type": "application/json" } }); setProjects(null); setExpiresAt(null); }}>Sign out</button></div></div>
    <div className="admin-layout"><aside className="admin-list">{projects.map((item, index) => <button key={index} className={index === selected ? "chosen" : ""} onClick={() => setSelected(index)}>{item.title || "Untitled project"}<small>{item.published ? "Published" : "Draft"}</small></button>)}</aside>
    {current && <section className="admin-fields"><div className="admin-controls"><label><input type="checkbox" checked={current.published} onChange={event => change("published", event.target.checked)} /> Published</label><label><input type="checkbox" checked={current.featured} onChange={event => change("featured", event.target.checked)} /> Feature on homepage</label></div>
      {fields.map(field => <label key={field.key}>{field.label}{field.multiline ? <textarea rows={field.key === "journey" ? 5 : 3} value={Array.isArray(current[field.key]) ? (current[field.key] as string[]).join("\n") : String(current[field.key])} onChange={event => change(field.key, event.target.value)} /> : <input value={String(current[field.key])} onChange={event => change(field.key, event.target.value)} />}</label>)}
      <div className="admin-image-section"><h2>Saved images</h2><p>The cover appears on the homepage and Work page. Uploaded files remain in the site; the image URL above connects them to this case study.</p><div className="admin-image-grid"><div><strong>Cover image</strong>{current.image ? <img src={current.image} alt={`${current.title} cover image`} /> : <p>No cover image selected.</p>}</div><div><strong>Gallery images ({current.gallery.length})</strong>{current.gallery.length ? <div className="admin-gallery">{current.gallery.map((url, index) => <img key={`${url}-${index}`} src={url} alt={`${current.title} gallery image ${index + 1}`} />)}</div> : <p>No gallery images selected.</p>}</div></div></div>
      <div className="admin-controls"><label>Upload cover image <input type="file" accept="image/png,image/jpeg,image/webp" onChange={event => { const file = event.target.files?.[0]; if (file) void upload(file); }} /></label><label>Add gallery image <input type="file" accept="image/png,image/jpeg,image/webp" onChange={event => { const file = event.target.files?.[0]; if (file) void upload(file, true); }} /></label></div>
      <div className="admin-actions"><button className="btn-primary" disabled={busy} onClick={save}>Save all changes ↗</button><button className="quiet-link" onClick={() => { if (confirm("Remove this case study? Save to apply the change.")) { setProjects(projects.filter((_, index) => index !== selected)); setSelected(0); } }}>Remove project</button></div><p role="status">{message}</p>
    </section>}</div></div></main>;
}
