'use client';

import { useEffect, useState } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { useProjects, useContent } from '@/hooks/useData';
import type { Project, HeroContent, SkillsContent } from '@/types';

// Fallback data for when API is not available
const fallbackProjects: Project[] = [
  {
    _id: '1',
    title: 'AI-Powered Task Manager',
    slug: 'ai-task-manager',
    description: 'A smart task management app with AI-powered prioritization and scheduling features.',
    technologies: ['Next.js', 'TypeScript', 'OpenAI', 'MongoDB', 'Tailwind CSS'],
    category: 'ai-generated',
    images: { gallery: [] },
    featured: true,
    viewCount: 156,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    description: 'Full-featured e-commerce solution with payment integration and inventory management.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
    category: 'hybrid',
    images: { gallery: [] },
    featured: true,
    viewCount: 234,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '3',
    title: 'Real-Time Analytics Dashboard',
    slug: 'analytics-dashboard',
    description: 'Interactive dashboard for monitoring business metrics with real-time data visualization.',
    technologies: ['Vue.js', 'D3.js', 'WebSocket', 'Python', 'ClickHouse'],
    category: 'manual',
    images: { gallery: [] },
    featured: true,
    viewCount: 189,
    githubUrl: 'https://github.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const fallbackHeroContent: HeroContent = {
  name: 'Alex Developer',
  tagline: 'AI-First Full-Stack Developer',
  bio: 'Building production-ready applications through innovative prompt engineering and cutting-edge web technologies. Passionate about creating elegant solutions that make a difference.',
};

export default function Home() {
  // Fetch featured projects from API
  const { projects: apiProjects, isLoading: projectsLoading, error: projectsError } = useProjects({ 
    featured: true, 
    limit: 6 
  });
  
  // Fetch hero content from API
  const { content: heroContent, isLoading: heroLoading } = useContent<HeroContent>('hero');

  // Use API data if available, otherwise fallback to static data
  const projects = apiProjects.length > 0 ? apiProjects : fallbackProjects;
  const hero = heroContent || fallbackHeroContent;

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
      <SkillsSection />
      <ContactSection />
    </>
  );
}
