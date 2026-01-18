'use client';

import { motion } from 'framer-motion';
import { Download, Sparkles, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { useContent } from '@/hooks/useData';
import { demoAboutContent, demoSkillsCategories } from '@/lib/demoData';
import type { SkillsContent } from '@/types';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface AboutContent {
  bio: string;
  photo?: string;
  timeline?: TimelineItem[];
  resumeUrl?: string;
}

export default function AboutPage() {
  const { content: aboutContent, isLoading } = useContent<AboutContent>('about');
  const { content: skillsContent } = useContent<SkillsContent>('skills');

  // Use API data or fallback to demo
  const about = aboutContent || demoAboutContent;
  const skills = skillsContent?.categories || demoSkillsCategories;
  const timeline = about.timeline || demoAboutContent.timeline;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                About Me
              </h1>
              {isLoading ? (
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                </div>
              ) : (
                <>
                  <div className="prose prose-lg text-gray-600 mb-8">
                    {about.bio.split('\n\n').slice(0, 2).map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {about.resumeUrl && (
                      <a href={about.resumeUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="lg">
                          <Download className="h-5 w-5 mr-2" />
                          Download Resume
                        </Button>
                      </a>
                    )}
                  </div>
                </>
              )}
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              {about.photo ? (
                <img 
                  src={about.photo} 
                  alt="Profile" 
                  className="aspect-square rounded-2xl object-cover"
                />
              ) : (
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-8xl font-bold text-gray-300">AD</div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI-First Development Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100 mb-6">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">AI-First Development</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why AI-Assisted Development?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Embracing AI tools doesn&apos;t replace good engineering—it amplifies it. Here&apos;s how I leverage AI to deliver better results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Faster Development',
                description: 'AI-assisted coding reduces development time by automating repetitive tasks and generating boilerplate code.',
              },
              {
                title: 'Higher Quality',
                description: 'AI helps catch bugs early, suggests best practices, and ensures consistent code style across projects.',
              },
              {
                title: 'Innovation Focus',
                description: 'By handling routine tasks, AI frees up mental bandwidth to focus on creative problem-solving and architecture.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      {timeline && timeline.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Experience & Education
              </h2>
              <p className="text-lg text-gray-600">
                My journey in software development
              </p>
            </motion.div>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 border-l-2 border-blue-200"
                >
                  <div className="absolute left-0 top-0 w-4 h-4 -ml-2 rounded-full bg-blue-600" />
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4" />
                      {item.year}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      <SkillsSection categories={skills} />
    </div>
  );
}
