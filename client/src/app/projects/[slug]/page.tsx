'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Sparkles, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { useProject } from '@/hooks/useData';
import type { Project } from '@/types';

// Fallback project data when API is not available
const fallbackProject: Project = {
  _id: '1',
  title: 'AI-Powered Task Manager',
  slug: 'ai-task-manager',
  description: 'A smart task management app with AI-powered prioritization and scheduling features.',
  fullDescription: `
# AI-Powered Task Manager

This project demonstrates the power of AI-assisted development in creating a sophisticated task management solution.

## Features

- **Smart Prioritization**: AI analyzes task descriptions and automatically suggests priority levels
- **Intelligent Scheduling**: Machine learning algorithms optimize your daily schedule
- **Natural Language Input**: Add tasks using natural language processing
- **Collaboration**: Real-time collaboration features for team productivity

## Technical Highlights

The application is built using modern web technologies and follows best practices for scalability and maintainability.

### Architecture

- Frontend built with Next.js 14 and TypeScript
- Backend API powered by Express.js
- MongoDB for flexible data storage
- OpenAI GPT-4 for intelligent features
- Real-time updates via WebSockets

### Performance Optimizations

- Server-side rendering for optimal performance
- Lazy loading of components
- Efficient caching strategies
- Image optimization with Next.js Image
  `,
  technologies: ['Next.js', 'TypeScript', 'OpenAI', 'MongoDB', 'Tailwind CSS', 'Express.js', 'WebSocket'],
  category: 'ai-generated',
  images: { gallery: [] },
  featured: true,
  viewCount: 156,
  liveUrl: 'https://example.com',
  githubUrl: 'https://github.com',
  aiPrompts: [
    'Create a Next.js task manager with AI prioritization using OpenAI API',
    'Implement natural language processing for task creation',
    'Add real-time collaboration features with WebSocket',
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // Fetch project from API
  const { project: apiProject, isLoading, error } = useProject(slug);
  
  // Use API data if available, otherwise fallback
  const project = apiProject || fallbackProject;

  if (isLoading) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-6 w-32 bg-gray-200 rounded" />
            <div className="h-12 w-3/4 bg-gray-200 rounded" />
            <div className="h-6 w-1/2 bg-gray-200 rounded" />
            <div className="flex gap-4">
              <div className="h-12 w-40 bg-gray-200 rounded-lg" />
              <div className="h-12 w-40 bg-gray-200 rounded-lg" />
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/projects"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Category Badge */}
          {project.category === 'ai-generated' && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-full mb-4">
              <Sparkles className="h-4 w-4" />
              AI Generated
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {project.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {project.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(project.createdAt)}
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {project.viewCount} views
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  View Live Demo
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  <Github className="h-5 w-5 mr-2" />
                  View Source Code
                </Button>
              </a>
            )}
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none mb-12"
        >
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Project</h2>
            <div className="whitespace-pre-wrap text-gray-600">
              {project.fullDescription || project.description}
            </div>
          </div>
        </motion.div>

        {/* AI Prompts (if AI-generated) */}
        {project.aiPrompts && project.aiPrompts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              AI Prompts Used
            </h2>
            <div className="space-y-3">
              {project.aiPrompts.map((prompt, index) => (
                <div
                  key={index}
                  className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-gray-700"
                >
                  <span className="font-mono text-sm">{prompt}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
