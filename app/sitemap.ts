import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/work", "/process", "/about", "/contact"];
  return routes.map((route, index) => ({
    url: `https://alphanarrative.pro${route}`,
    changeFrequency: "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
