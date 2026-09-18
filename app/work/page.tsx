import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedProjects } from "../../lib/projects";
export const metadata: Metadata = { title: "Work", description: "Explore the websites, applications and business systems built by Alpha Narrative." };
export default async function WorkPage() {
  const projects = await getPublishedProjects();
  return <div className="site-canvas"><section className="interior-hero page-shell"><p className="eyebrow">Our work</p><h1>Products made to <em>be used.</em></h1><p>Explore the thinking, experience and working systems behind selected projects. Every project has its own story.</p></section>
    <section className="portfolio-section page-shell">{projects.map((project, index) => <Link className={index === 0 ? "portfolio-card main-card" : "portfolio-card"} key={project.slug} href={`/work/${project.slug}`}><div className="portfolio-copy"><span className="eyebrow">{project.category} / {project.status}</span><h2>{project.title}</h2><p>{project.summary}</p><span className="case-link">Explore project ↗</span></div><div className={`portfolio-art project-${project.slug}`}>{project.image ? <img src={project.image} alt="" /> : <div className="art-wordmark">{project.title}<small>{project.category}</small></div>}</div></Link>)}</section>
    <section className="new-final-cta page-shell"><p className="eyebrow">Your idea could be next</p><h2>What should we build together?</h2><Link className="btn-primary" href="/contact">Start a project ↗</Link></section></div>;
}
