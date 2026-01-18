'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { useProjects, useContent } from '@/hooks/useData';
import { getFeaturedDemoProjects, demoHeroContent, demoSkillsCategories } from '@/lib/demoData';
import type { HeroContent, SkillsContent } from '@/types';

export default function Home() {
  // Fetch featured projects from API
  const { projects: apiProjects, isLoading: projectsLoading } = useProjects({ 
    featured: true, 
    limit: 6 
  });
  
  // Fetch hero content from API
  const { content: heroContent } = useContent<HeroContent>('hero');
  
  // Fetch skills content from API
  const { content: skillsContent } = useContent<SkillsContent>('skills');

  // Use API data if available, otherwise fallback to demo data
  const projects = apiProjects.length > 0 ? apiProjects : getFeaturedDemoProjects();
  const hero = heroContent || demoHeroContent;
  const skills = skillsContent?.categories || demoSkillsCategories;

  return (
    <>
      <HeroSection 
        name={hero.name}
        tagline={hero.tagline}
        bio={hero.bio}
      />
      <ProjectsSection 
        projects={projects} 
        isLoading={projectsLoading}
      />
      <SkillsSection categories={skills} />
      <ContactSection />
    </>
  );
}
