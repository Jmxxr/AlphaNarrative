"use client";
import { useState } from "react";
export function ProjectForm() {
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending"); const form = event.currentTarget;
    try { const response = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(Object.fromEntries(new FormData(form))) }); if(!response.ok) throw new Error(); form.reset(); setStatus("sent"); }
    catch { setStatus("error"); }
  }
  return <form className="new-form" onSubmit={submit}><label>Your name<input name="name" required maxLength={100} placeholder="Full name" /></label><label>Email address<input name="email" type="email" required maxLength={160} placeholder="you@company.com" /></label><label>Business name<input name="company" required maxLength={140} placeholder="Your business or organisation" /></label><label>What can we help with?<select name="service" required defaultValue=""><option value="" disabled>Select a service</option><option>Business software</option><option>Business or corporate website</option><option>Agency website</option><option>E-commerce website</option><option>Portfolio website</option><option>Landing page</option><option>Website redesign</option><option>Performance optimization</option><option>Hosting and ongoing care</option><option>Mobile app</option><option>Something else</option></select></label><label>Tell us about your project<textarea name="message" required maxLength={4000} rows={5} placeholder="What are you trying to make easier or better?" /></label><button className="btn-primary" disabled={status==="sending"}>{status==="sending"?"Sending…":"Send project brief ↗"}</button><p role="status">{status==="sent"?"Thanks. Your message has been sent.":status==="error"?"We could not send your brief. Please use WhatsApp or email instead.":""}</p></form>;
}
