import type { Metadata } from 'next';
import { launchData } from '@/data/pages/launch';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: launchData.title,
  description: launchData.description,
};

export default function LaunchPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: launchData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
