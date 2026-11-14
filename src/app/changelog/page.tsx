import type { Metadata } from 'next';
import { changelogData } from '@/data/pages/changelog';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: changelogData.title,
  description: changelogData.description,
};

export default function ChangelogPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: changelogData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
