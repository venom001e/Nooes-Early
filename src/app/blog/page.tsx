import type { Metadata } from 'next';
import { blogData } from '@/data/pages/blog';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: blogData.title,
  description: blogData.description,
};

export default function BlogPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: blogData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
