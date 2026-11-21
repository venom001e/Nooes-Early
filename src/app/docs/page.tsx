import type { Metadata } from "next";
import { DOC_PAGES } from "@/data/docs/docsData";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocsContent } from "@/components/docs/DocsContent";

export const metadata: Metadata = {
  title: "Docs | Nooes",
  description: "Nooes is an AI coding IDE with an agent that plans, edits and tests your code. Nooes is a desktop application.",
};

export default function DocsIntroPage() {
  const page = DOC_PAGES[""];

  return (
    <DocsLayout activePage={page}>
      <DocsContent page={page} />
    </DocsLayout>
  );
}

