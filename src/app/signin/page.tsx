import type { Metadata } from 'next';
import { signinData } from '@/data/pages/signin';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: signinData.title,
  description: signinData.description,
};

export default function SigninPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: signinData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
