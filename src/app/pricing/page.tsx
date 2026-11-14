import type { Metadata } from 'next';
import { pricingData } from '@/data/pages/pricing';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: pricingData.title,
  description: pricingData.description,
};

export default function PricingPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: pricingData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
