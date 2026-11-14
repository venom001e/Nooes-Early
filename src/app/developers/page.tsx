import type { Metadata } from 'next';
import { developersData } from '@/data/pages/developers';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: developersData.title,
  description: developersData.description,
};

export default function DevelopersPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: developersData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
