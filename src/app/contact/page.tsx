import type { Metadata } from 'next';
import { contactData } from '@/data/pages/contact';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: contactData.title,
  description: contactData.description,
};

export default function ContactPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: contactData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
