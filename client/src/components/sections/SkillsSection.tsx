'use client';

import { motion } from 'framer-motion';
import { 
  Code2, 
  Server, 
  Sparkles, 
  Cloud,
  Database,
  Layout,
  Terminal,
  Cpu
} from 'lucide-react';

interface Skill {
  name: string;
  icon?: React.ReactNode;
}

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: string[];
}

const defaultCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: <Layout className="h-6 w-6" />,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    name: 'Backend',
    icon: <Server className="h-6 w-6" />,
    skills: ['Node.js', 'Express.js', 'Python', 'MongoDB', 'PostgreSQL'],
  },
  {
    name: 'AI Tools',
    icon: <Sparkles className="h-6 w-6" />,
    skills: ['GitHub Copilot', 'Claude', 'ChatGPT', 'Midjourney', 'Prompt Engineering'],
  },
  {
    name: 'DevOps',
    icon: <Cloud className="h-6 w-6" />,
    skills: ['Docker', 'AWS', 'Vercel', 'CI/CD', 'Git'],
  },
];

interface SkillsSectionProps {
  categories?: SkillCategory[];
}

export function SkillsSection({ categories = defaultCategories }: SkillsSectionProps) {
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
                  {category.icon}
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
