import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedProjects } from "../../../lib/projects";

type PageProps = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getPublishedProjects()).find((item) => item.slug === slug);
  return project ? { title: project.title, description: project.summary } : { title: "Project" };
}
export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = (await getPublishedProjects()).find((item) => item.slug === slug);
  if (!project) notFound();
  return <div className="site-canvas">
    <section className="interior-hero case-hero page-shell"><Link href="/work" className="quiet-link">← All work</Link><p className="eyebrow">{project.category} / {project.status}</p><h1>{project.title}</h1><p>{project.summary}</p><div className="cta-row">{project.liveUrl && <a className="btn-primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Explore the live product ↗</a>}<a className="quiet-link" href="#journey">Follow the experience ↓</a></div></section>
    <div className={`case-cover project-${project.slug}`}>{project.image ? <img src={project.image} alt={project.title + " project preview"} /> : <div className="art-wordmark">{project.title}<small>{project.category}</small></div>}</div>
    <section className="case-context page-shell"><div><p className="eyebrow">The challenge</p><h2>What needed to change.</h2><p>{project.challenge}</p></div><div><p className="eyebrow">The solution</p><h2>What we built.</h2><p>{project.solution}</p></div></section>
    {project.videoUrl && <section className="case-video page-shell"><div className="section-heading"><div><p className="eyebrow">See it in action</p><h2>Meet the product.</h2></div><p>A closer look at the experience and the system behind it.</p></div><div className="video-frame"><iframe src={project.videoUrl} title={project.title + " product walkthrough"} loading="lazy" allow="fullscreen; autoplay" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div></section>}
    <section className="case-journey page-shell" id="journey"><p className="eyebrow">The user journey</p><h2>From first visit to a useful outcome.</h2><div className="journey-list">{project.journey.map((step, index) => <div className="journey-step" key={index}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></div>)}</div></section>
    {project.gallery.length > 0 && <section className="case-gallery page-shell"><p className="eyebrow">Product views</p>{project.gallery.map((image, index) => <img key={image} src={image} alt={`${project.title} product view ${index + 1}`} loading="lazy" />)}</section>}
    <section className="case-outcome page-shell"><p className="eyebrow">Where it stands</p><h2>{project.outcome}</h2>{project.liveUrl && <a className="quiet-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Explore the live product ↗</a>}</section>
    <section className="new-final-cta page-shell"><p className="eyebrow">Have a similar challenge?</p><h2>Let’s talk about yours.</h2><Link href="/contact" className="btn-primary">Start a conversation ↗</Link></section>
  </div>;
}
