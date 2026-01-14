'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { ProjectCard } from '@/components/sections/ProjectsSection';
import { ProjectCardSkeleton } from '@/components/ui/Skeleton';
import type { Project } from '@/types';

// Demo projects - In production, these would come from the API
const demoProjects: Project[] = [
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
  {
    _id: '4',
    title: 'Social Media Scheduler',
    slug: 'social-scheduler',
    description: 'Automated social media posting tool with analytics and multi-platform support.',
    technologies: ['React', 'Express', 'MongoDB', 'Twitter API', 'Bull'],
    category: 'ai-generated',
    images: { gallery: [] },
    featured: false,
    viewCount: 98,
    liveUrl: 'https://example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '5',
    title: 'Portfolio Website',
    slug: 'portfolio-website',
    description: 'Modern portfolio website built with Next.js and showcasing AI-driven development.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    category: 'ai-generated',
    images: { gallery: [] },
    featured: false,
    viewCount: 312,
    githubUrl: 'https://github.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '6',
    title: 'API Gateway',
    slug: 'api-gateway',
    description: 'High-performance API gateway with rate limiting, caching, and authentication.',
    technologies: ['Go', 'Redis', 'Docker', 'Kubernetes'],
    category: 'manual',
    images: { gallery: [] },
    featured: false,
    viewCount: 145,
    githubUrl: 'https://github.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const categories = [
  { value: 'all', label: 'All' },
  { value: 'ai-generated', label: 'AI-Generated' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'manual', label: 'Manual' },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProjects(demoProjects);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === 'all' || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            All Projects
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore my complete portfolio of projects, from AI-generated applications to handcrafted solutions.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No projects found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
