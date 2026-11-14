import type { Metadata } from "next";
import { DOC_PAGES } from "@/data/docs/docsData";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Introduction — Nooes Documentation",
  description: DOC_PAGES[""].summary,
};

export default function DocsIntroPage() {
  const page = DOC_PAGES[""];

  return (
    <DocsLayout activePage={page}>
      <DocsContent page={page} />
    </DocsLayout>
  );
}

