import type { MetadataRoute } from "next";
import { DOC_PAGES } from "@/data/docs/docsData";

export default function sitemap(): MetadataRoute.Sitemap {
  const allowIndexing = process.env.ALLOW_INDEXING === "true";

  if (!allowIndexing) {
    return [];
  }

  const baseUrl = "https://nooes.ai";

  const staticRoutes = [
    "",
    "/features",
    "/pricing",
    "/about",
    "/contact",
    "/desktop",
    "/changelog",
    "/security",
    "/brand",
    "/enterprise",
    "/privacy",
    "/terms",
    "/docs",
  ];

  const docArticles = Object.keys(DOC_PAGES)
    .filter((slug) => slug !== "")
    .map((slug) => `/docs/${slug}`);

  const allRoutes = [...staticRoutes, ...docArticles];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/docs") ? 0.8 : 0.7,
  }));
}
