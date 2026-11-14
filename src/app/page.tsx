import type { Metadata } from 'next';
import { homeData } from '@/data/pages/home';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';
import FeatureShowcasePortal from '@/components/sites/nooes/FeatureShowcasePortal';
import HalftoneFooterPortal from '@/components/sites/nooes/HalftoneFooterPortal';

export const metadata: Metadata = {
  title: homeData.title,
  description: homeData.description,
};

export default function HomePage() {
  return (
    <>
      <div
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: homeData.html }}
      />
      {/* Portals into place-holders in homeData.html */}
      <FeatureShowcasePortal />
      <HalftoneFooterPortal />
      <SiteInteractions />
    </>
  );
}
