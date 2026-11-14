import type { Metadata } from 'next';
import { signupData } from '@/data/pages/signup';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: signupData.title,
  description: signupData.description,
};

export default function SignupPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: signupData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
