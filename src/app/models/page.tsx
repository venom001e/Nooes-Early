import type { Metadata } from 'next';
import { modelsData } from '@/data/pages/models';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: modelsData.title,
  description: modelsData.description,
};

export default function ModelsPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: modelsData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
