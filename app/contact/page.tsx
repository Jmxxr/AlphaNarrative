import type { Metadata } from "next";
import { ProjectForm } from "../components/ProjectForm";

export const metadata: Metadata = { title: "Start a Project", description: "Tell Alpha Narrative what your business needs to do better." };
export default function ContactPage(){return <section className="section page-shell"><div className="contact-layout"><div><p className="section-index">CONTACT / 05</p><h1>Let&apos;s build the<br />next <span className="display-title"><em>advantage.</em></span></h1><p>Tell us what is slowing the business down, what you want to achieve and how work happens today. We will help identify the right product or system.</p><div className="contact-details"><a href="mailto:alphanarrativepro@gmail.com">alphanarrativepro@gmail.com</a><span>Port Harcourt, Nigeria · Available worldwide</span></div></div><ProjectForm /></div></section>}
