export function ProjectVisual({ kind }: { kind: "aether" | "jmxr" | "osmosis" | "paytrack" | "businessos" }) {
  if (kind === "aether") return <div className="visual visual-aether"><span>AETHER®</span><div className="device store"><small>PUBLIC STORE</small><h4>Technology that<br />moves with you.</h4><i>SHOP NOW ↗</i></div><div className="device dash"><small>OPERATIONS / LIVE</small><strong>₦3.7M</strong><p>REVENUE THIS MONTH</p><div className="bars"><i /><i /><i /><i /><i /></div></div><b>PUBLIC + PRIVATE</b></div>;
  if (kind === "jmxr") return <div className="visual visual-jmxr"><span>JMXR</span><p>LIMITLESS<br />BY DESIGN.</p><i>THE NEW STANDARD</i></div>;
  if (kind === "osmosis") return <div className="visual visual-osmosis"><div className="o-ring">O</div><span>BUSINESS · COMMERCE · TRUST</span><p>One space to build<br />what comes next.</p></div>;
  if (kind === "paytrack") return <div className="visual visual-paytrack"><span>PAYTRACK</span><div><strong>24</strong><small>ROOMS SETTLED</small></div><p>Clear contributions.<br />Zero confusion.</p></div>;
  return <div className="visual visual-business"><span>ALPHA / BUSINESS OS</span><div className="system-disc"><i>SALES</i><i>DATA</i><b>GROWTH</b><i>TEAM</i><i>AI</i></div></div>;
}
