import type { Metadata } from 'next';
import { ideData } from '@/data/pages/ide';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: ideData.title,
  description: ideData.description,
};

export default function IdePage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: ideData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
