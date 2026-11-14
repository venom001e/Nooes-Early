import type { Metadata } from 'next';
import { learnData } from '@/data/pages/learn';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: learnData.title,
  description: learnData.description,
};

export default function LearnPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: learnData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
