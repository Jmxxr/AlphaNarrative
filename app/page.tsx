import Link from "next/link";
import { Reveal } from "./components/Reveal";
import { ProjectVisual } from "./components/ProjectVisual";

const services = [
  ["01", "Digital products", "Websites, platforms and applications built around a measurable business outcome."],
  ["02", "AI & automation", "Practical agents and workflows that remove repetitive work and accelerate decisions."],
  ["03", "Business systems", "Connected tools for sales, customers, inventory, finance and operations."],
];

export default function Home() {
  return <>
    <section className="hero page-shell">
      <div className="hero-orbit" aria-hidden="true"><span /><i>AN</i></div>
      <div className="hero-copy">
        <p className="kicker"><span>Independent technology agency</span><span>Port Harcourt · Worldwide</span></p>
        <h1>We engineer<br /><em>the advantage.</em></h1>
        <div className="hero-bottom"><p>Alpha Narrative turns ambitious ideas and inefficient operations into digital products, intelligent automation and systems built for growth.</p><div className="button-row"><Link className="button button-light" href="/contact">Start a project <span>↗</span></Link><Link className="text-link" href="/work">See selected work <span>↓</span></Link></div></div>
      </div>
      <div className="scroll-cue"><span>Scroll to explore</span><i /></div>
    </section>
    <section className="marquee" aria-label="Alpha Narrative capabilities"><div>SOFTWARE <i>✳</i> AI & AUTOMATION <i>✳</i> BUSINESS SYSTEMS <i>✳</i> PRODUCT STRATEGY <i>✳</i> SOFTWARE <i>✳</i> AI & AUTOMATION <i>✳</i></div></section>
    <section className="statement section page-shell">
      <Reveal><p className="section-index">01 / WHY WE EXIST</p></Reveal>
      <Reveal><h2>Most businesses do not need more tools. They need <em>one clear system</em> that makes the entire operation better.</h2></Reveal>
      <div className="statement-foot"><Reveal><p>We work where brand, product and operations meet—so the customer experience looks exceptional and the machinery behind it performs just as well.</p></Reveal><Reveal><Link className="circle-link" href="/about" aria-label="About Alpha Narrative">ABOUT<br />US <span>↗</span></Link></Reveal></div>
    </section>
    <section className="capabilities section page-shell">
      <div className="section-title"><Reveal><p className="section-index">02 / CAPABILITIES</p><h2>Built for what<br />comes next.</h2></Reveal><Reveal><p>From the first customer touchpoint to the decisions happening behind the scenes.</p></Reveal></div>
      <div className="service-rows">{services.map(([number, title, copy]) => <Reveal key={number}><Link href="/services" className="service-row"><span>{number}</span><h3>{title}</h3><p>{copy}</p><b>↗</b></Link></Reveal>)}</div>
    </section>
    <section className="featured-work section page-shell">
      <div className="section-title light-title"><Reveal><p className="section-index">03 / SELECTED WORK</p><h2>Ideas made<br /><em>tangible.</em></h2></Reveal><Reveal><Link className="text-link" href="/work">View all work <span>↗</span></Link></Reveal></div>
      <Reveal><Link href="/work#aether" className="feature-project"><ProjectVisual kind="aether" /><div className="project-meta"><span>01</span><div><p>Connected commerce system</p><h3>AETHER</h3></div><b>VIEW CASE ↗</b></div></Link></Reveal>
      <div className="project-pair"><Reveal><Link href="/work#jmxr" className="mini-project"><ProjectVisual kind="jmxr" /><div><p>Luxury commerce experience</p><h3>JMXR</h3><span>Explore ↗</span></div></Link></Reveal><Reveal delay><Link href="/work#osmosis" className="mini-project"><ProjectVisual kind="osmosis" /><div><p>SME growth infrastructure</p><h3>OSMOSIS</h3><span>Explore ↗</span></div></Link></Reveal></div>
    </section>
    <section className="method section page-shell"><Reveal><p className="section-index">04 / THE DIFFERENCE</p></Reveal><div className="method-grid"><Reveal><h2>We do not start<br />with code.</h2></Reveal><Reveal><div><p>We begin with the business: the friction, the customer, the opportunity and the result worth creating.</p><ol><li><span>01</span>Understand the operation</li><li><span>02</span>Design the advantage</li><li><span>03</span>Build the system</li><li><span>04</span>Measure and evolve</li></ol><Link className="button button-dark" href="/process">Our process <span>↗</span></Link></div></Reveal></div></section>
    <section className="final-cta page-shell"><Reveal><p>YOUR NEXT SYSTEM STARTS WITH A CONVERSATION.</p><h2>What should your<br />business do <em>better?</em></h2><Link className="button button-light" href="/contact">Tell us about it <span>↗</span></Link></Reveal></section>
  </>;
}
