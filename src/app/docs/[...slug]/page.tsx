import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DOC_PAGES } from "@/data/docs/docsData";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocsContent } from "@/components/docs/DocsContent";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const keys = Object.keys(DOC_PAGES).filter((key) => key !== "");
  return keys.map((key) => ({
    slug: key.split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const pathKey = resolvedParams.slug.join("/");
  const page = DOC_PAGES[pathKey];

  if (!page) {
    return {
      title: "Page Not Found | Nooes Docs",
    };
  }

  const isComingSoon = page.summary.toLowerCase().includes("coming soon") || page.content.toLowerCase().includes("coming soon");

  return {
    title: `${page.title} | Nooes Docs`,
    description: isComingSoon ? "Coming soon." : page.summary,
  };
}

export default async function DocSubPage({ params }: PageProps) {
  const resolvedParams = await params;
  const pathKey = resolvedParams.slug.join("/");
  const page = DOC_PAGES[pathKey];

  if (!page) {
    notFound();
  }

  return (
    <DocsLayout activePage={page}>
      <DocsContent page={page} />
    </DocsLayout>
  );
}

