import Link from "next/link";
import { getPublishedProjects } from "../lib/projects";
const services = [
  ["01", "Business software", "Thoughtful tools for the work behind your business: operations, inventory, customers and connected workflows."],
  ["02", "Web development & hosting", "Clear, fast websites and online stores built to earn trust and help people take the next step."],
  ["03", "Mobile app development", "Useful mobile experiences designed around the people who will use them every day."]
];
export default async function Home() {
  const featured = (await getPublishedProjects()).filter((project) => project.featured).slice(0, 3);
  return <div className="site-canvas">
    <section className="film-hero" aria-labelledby="hero-title">
      <div className="studio-hero-art">
        <video className="studio-hero-video" autoPlay muted loop playsInline preload="metadata" poster="/media/alpha-narrative-future.jpg" aria-label="An original colourful technology animation ending with the Alpha Narrative logo">
          <source src="/media/alpha-narrative-future.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="film-hero-content page-shell">
        <div><p className="eyebrow">Independent technology studio · Port Harcourt, Nigeria</p><h1 id="hero-title">Ideas made <em>real.</em></h1></div>
        <div className="film-hero-intro"><p>We create software, websites and mobile experiences that help businesses move forward.</p><div className="cta-row"><Link className="btn-primary" href="/contact">Start a project <span>↗</span></Link><Link className="quiet-link" href="/work">See our work ↗</Link></div></div>
      </div>
      <div className="film-hero-services page-shell"><span>Business software</span><span>Web & hosting</span><span>Mobile apps</span></div>
    </section>
    <section className="intro-section page-shell">
      <p className="eyebrow">What we believe</p>
      <h2>Good technology should feel simple to the people who use it—and make a real difference to the business behind it.</h2>
      <p>We bring strategy, design and engineering together, from a first website to the systems that help a growing company operate.</p>
    </section>
    <section className="portfolio-section page-shell">
      <div className="section-heading"><div><p className="eyebrow">Selected work</p><h2>See what we build.</h2></div><Link className="quiet-link" href="/work">All projects ↗</Link></div>
      {featured.map((project, index) => <Link key={project.slug} className={index === 0 ? "portfolio-card main-card" : "portfolio-card"} href={`/work/${project.slug}`}>
        <div className="portfolio-copy"><span className="eyebrow">{project.category} / {project.status}</span><h3>{project.title}</h3><p>{project.summary}</p><span className="case-link">Explore the case study ↗</span></div>
        <div className={`portfolio-art project-${project.slug}`}>{project.image ? <img src={project.image} alt="" /> : <div className="art-wordmark">{project.title}<small>{project.category}</small></div>}</div>
      </Link>)}
    </section>
    <section className="services-section page-shell">
      <div className="section-heading"><div><p className="eyebrow">What we do</p><h2>Built around your goals.</h2></div><p>We help you find the right shape for the problem, then build it with care.</p></div>
      <div className="service-grid">{services.map(([number, title, description]) => <Link href="/services" className="service-tile" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p><b>Explore service ↗</b></Link>)}</div>
    </section>
    <section className="approach-section page-shell"><p className="eyebrow">Our approach</p><h2>Understand the work. Design the experience. Build the right system.</h2><Link className="quiet-link" href="/process">How we work ↗</Link></section>
    <section className="new-final-cta page-shell"><p className="eyebrow">Have something in mind?</p><h2>Let’s make it useful.</h2><p>Tell us what you’re building or what your business needs to do better.</p><Link className="btn-primary" href="/contact">Start a conversation ↗</Link></section>
  </div>;
}
