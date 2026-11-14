import type { Metadata } from 'next';
import { whyData } from '@/data/pages/why';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: whyData.title,
  description: whyData.description,
};

export default function WhyPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: whyData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
