import type { Metadata } from 'next';
import { desktopData } from '@/data/pages/desktop';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: desktopData.title,
  description: desktopData.description,
};

export default function DesktopPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: desktopData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
