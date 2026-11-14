import type { Metadata } from 'next';
import { loveData } from '@/data/pages/love';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: loveData.title,
  description: loveData.description,
};

export default function LovePage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: loveData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
