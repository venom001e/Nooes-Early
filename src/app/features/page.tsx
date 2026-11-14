import type { Metadata } from 'next';
import { featuresData } from '@/data/pages/features';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: featuresData.title,
  description: featuresData.description,
};

export default function FeaturesPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: featuresData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
