import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = { title: "Services", description: "Software development, AI automation and connected business systems designed around measurable business outcomes." };
const offers = [
  ["01", "Software development", "Digital products that are useful from day one and ready for what comes next.", ["Conversion-focused websites", "Web applications and SaaS", "Customer and staff portals", "APIs and integrations", "Progressive web applications"]],
  ["02", "AI & automation", "Intelligence applied to real work—not added simply because it is fashionable.", ["AI assistants and agents", "Workflow automation", "Customer support automation", "Document and data processing", "Automated reports and alerts"]],
  ["03", "Business systems", "A dependable operational layer connecting the data and workflows that run the company.", ["CRM and sales systems", "Inventory and purchasing", "Business intelligence", "Team and commission management", "Payments and finance workflows"]],
  ["04", "Product & experience", "Clear product thinking and interfaces that make complex technology feel natural.", ["Product strategy", "UX and interface design", "Interactive prototypes", "Design systems", "Usability improvement"]],
];
export default function ServicesPage(){return <><section className="inner-hero page-shell"><p className="section-index">SERVICES / 01</p><h1>Technology built around <span className="display-title"><em>the outcome.</em></span></h1><p>We define the problem, design the right experience and engineer the system required to move the business forward.</p></section><section className="content-light section page-shell"><div className="number-list">{offers.map(([n,t,c,items])=><Reveal key={n as string}><article className="number-card"><small>{n as string}</small><h2>{t as string}</h2><p>{c as string}</p><ul>{(items as string[]).map(item=><li key={item}>{item}</li>)}</ul></article></Reveal>)}</div><div className="page-cta"><h2>Need more than one service? That is usually where the best systems begin.</h2><Link className="button button-dark" href="/contact">Discuss your project <span>↗</span></Link></div></section></>}
