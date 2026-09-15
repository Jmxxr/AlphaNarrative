"use client";

import { useState } from "react";

export function ProjectForm(){
  const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
  async function submit(event:React.FormEvent<HTMLFormElement>){event.preventDefault();setStatus("sending");const form=event.currentTarget;const data=Object.fromEntries(new FormData(form));try{const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});if(!response.ok)throw new Error();form.reset();setStatus("sent")}catch{setStatus("error")}}
  return <form className="project-form" onSubmit={submit}>
    <label>Your name<input name="name" required placeholder="Full name" /></label>
    <label>Work email<input name="email" type="email" required placeholder="you@company.com" /></label>
    <label>Company<input name="company" required placeholder="Business or organisation" /></label>
    <label>What do you need?<select name="service" required defaultValue=""><option value="" disabled>Select an engagement</option><option>Website or digital product</option><option>AI and automation</option><option>Private business system</option><option>Complete Business OS</option><option>Not sure yet</option></select></label>
    <label>What needs to change?<textarea name="message" required placeholder="Tell us about the business, the problem and the result you want…" /></label>
    <button className="button button-light" disabled={status==="sending"}>{status==="sending"?"Sending…":"Submit project brief"}<span>↗</span></button>
    <p className={`form-status ${status==="sent"?"success":status==="error"?"error":""}`} role="status">{status==="sent"?"Your brief has been sent. We will be in touch soon.":status==="error"?"We could not send that. Email us directly instead.":""}</p>
  </form>
}
