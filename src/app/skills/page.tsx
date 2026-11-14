import type { Metadata } from 'next';
import { skillsData } from '@/data/pages/skills';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: skillsData.title,
  description: skillsData.description,
};

export default function SkillsPage() {
  return (
    <>
      <div 
        className="w-full min-h-screen bg-background text-foreground"
        dangerouslySetInnerHTML={{ __html: skillsData.html }} 
      />
      <SiteInteractions />
    </>
  );
}
