import { readFileSync } from "node:fs";
import { join } from "node:path";
import Script from "next/script";

const content = readFileSync(join(process.cwd(), "app", "site-content.html"), "utf8");

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <Script src="/site.js" strategy="afterInteractive" />
    </>
  );
}
