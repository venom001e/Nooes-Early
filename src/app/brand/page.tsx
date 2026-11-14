import type { Metadata } from 'next';
import { brandData } from '@/data/pages/brand';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: brandData.title,
  description: brandData.description,
};

export default function BrandPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: brandData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
