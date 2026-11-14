import type { Metadata } from 'next';
import { providerData } from '@/data/pages/provider';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: providerData.title,
  description: providerData.description,
};

export default function ProviderPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: providerData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
