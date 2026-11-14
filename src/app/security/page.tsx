import type { Metadata } from 'next';
import { securityData } from '@/data/pages/security';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: securityData.title,
  description: securityData.description,
};

export default function SecurityPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: securityData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
