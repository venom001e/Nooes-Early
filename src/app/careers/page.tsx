import type { Metadata } from 'next';
import { careersData } from '@/data/pages/careers';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: careersData.title,
  description: careersData.description,
};

export default function CareersPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: careersData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
