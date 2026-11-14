import type { Metadata } from 'next';
import { modsData } from '@/data/pages/mods';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: modsData.title,
  description: modsData.description,
};

export default function ModsPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: modsData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
