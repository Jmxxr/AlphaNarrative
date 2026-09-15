import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://alphanarrative.pro",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
