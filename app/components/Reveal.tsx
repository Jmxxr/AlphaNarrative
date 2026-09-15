"use client";

import { useEffect, useRef } from "react";

export function Reveal({ children, delay = false }: { children: React.ReactNode; delay?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.dataset.visible = "true"; observer.disconnect(); }
    }, { threshold: 0.14 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal${delay ? " reveal-delay" : ""}`}>{children}</div>;
}
