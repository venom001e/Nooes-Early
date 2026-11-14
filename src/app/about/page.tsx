import type { Metadata } from 'next';
import { aboutData } from '@/data/pages/about';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: aboutData.title,
  description: aboutData.description,
};

export default function AboutPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: aboutData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
