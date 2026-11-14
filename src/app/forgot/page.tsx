import type { Metadata } from 'next';
import { forgotData } from '@/data/pages/forgot';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: forgotData.title,
  description: forgotData.description,
};

export default function ForgotPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: forgotData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
