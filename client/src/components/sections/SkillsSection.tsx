'use client';

import { motion } from 'framer-motion';
import { 
  Server, 
  Sparkles, 
  Cloud,
  Layout,
  Code,
  Database,
  Smartphone,
  Globe,
  Cpu,
  Terminal,
  LucideIcon,
} from 'lucide-react';
import type { SkillCategory } from '@/types';

// Icon mapping for dynamic icons from CMS
const iconMap: Record<string, LucideIcon> = {
  Monitor: Layout,
  Layout: Layout,
  Server: Server,
  Sparkles: Sparkles,
  Cloud: Cloud,
  Code: Code,
  Database: Database,
  Smartphone: Smartphone,
  Globe: Globe,
  Cpu: Cpu,
  Terminal: Terminal,
};

interface SkillsSectionProps {
  categories?: SkillCategory[];
}

export function SkillsSection({ categories = [] }: SkillsSectionProps) {
  // Get the icon component from the icon name
  const getIcon = (iconName?: string) => {
    if (!iconName) return <Code className="h-6 w-6" />;
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="h-6 w-6" /> : <Code className="h-6 w-6" />;
  };

  if (categories.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  {getIcon(category.icon)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
