import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const allowIndexing = process.env.ALLOW_INDEXING === "true";

  if (allowIndexing) {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: "https://nooes.ai/sitemap.xml",
    };
  }

  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
