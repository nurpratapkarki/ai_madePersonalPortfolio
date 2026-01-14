'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="relative rounded-xl border border-gray-200 overflow-hidden bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-lg">
          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-gray-100">
            {project.images.thumbnail ? (
              <Image
                src={project.images.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                <span className="text-4xl font-bold text-gray-300">
                  {project.title[0]}
                </span>
              </div>
            )}
            
            {/* AI Badge */}
            {project.category === 'ai-generated' && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full">
                <Sparkles className="h-3 w-3" />
                AI Generated
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2.5 py-1 text-xs font-medium text-gray-500">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </button>
              )}
              {project.githubUrl && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                >
                  <Github className="h-4 w-4" />
                  Code
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface ProjectsSectionProps {
  projects?: Project[];
  title?: string;
  showViewAll?: boolean;
}

export function ProjectsSection({ 
  projects = [], 
  title = 'Featured Projects',
  showViewAll = true 
}: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore my latest projects built with cutting-edge technologies and AI-assisted development.
          </p>
        </motion.div>

        {projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
              ))}
            </div>

            {showViewAll && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <Link
                  href="/projects"
                  className={cn(
                    'inline-flex items-center gap-2 text-blue-600 font-medium',
                    'hover:text-blue-700 transition-colors'
                  )}
                >
                  View All Projects
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects to display yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
