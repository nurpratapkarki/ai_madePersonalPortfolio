/**
 * Demo/Fallback Data for when API is not available
 * 
 * This data is used when:
 * 1. Running frontend without backend
 * 2. API fails to respond
 * 3. Local development without database
 * 
 * Keep this in sync with server/src/scripts/seed.ts for consistency
 */

import type { Project, HeroContent, SkillCategory } from '@/types';

// Demo Projects - Comprehensive showcase
export const demoProjects: Project[] = [
  {
    _id: '1',
    title: 'AI-Powered Task Manager',
    slug: 'ai-task-manager',
    description: 'A smart task management app with AI-powered prioritization and scheduling features.',
    fullDescription: `# AI-Powered Task Manager

This project demonstrates the power of AI-assisted development in creating a sophisticated task management solution.

## Features

- **Smart Prioritization**: AI analyzes task descriptions and automatically suggests priority levels
- **Intelligent Scheduling**: Machine learning algorithms optimize your daily schedule
- **Natural Language Input**: Add tasks using natural language processing
- **Collaboration**: Real-time collaboration features for team productivity

## Technical Highlights

The application is built using modern web technologies and follows best practices for scalability and maintainability.`,
    technologies: ['Next.js', 'TypeScript', 'OpenAI', 'MongoDB', 'Tailwind CSS', 'Express.js'],
    category: 'ai-generated',
    images: { gallery: [] },
    featured: true,
    viewCount: 156,
    liveUrl: 'https://example.com/task-manager',
    githubUrl: 'https://github.com/example/ai-task-manager',
    aiPrompts: [
      'Create a Next.js task manager with AI prioritization using OpenAI API',
      'Implement natural language processing for task creation',
      'Add real-time collaboration features with WebSocket',
    ],
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString(),
  },
  {
    _id: '2',
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    description: 'Full-featured e-commerce solution with payment integration and inventory management.',
    fullDescription: `# E-Commerce Platform

A complete e-commerce solution built with modern technologies, featuring a seamless shopping experience.

## Features

- **Product Catalog**: Browse products with advanced filtering and search
- **Shopping Cart**: Persistent cart with real-time updates
- **Secure Payments**: Stripe integration for secure transactions
- **Order Management**: Complete order tracking and history
- **Admin Dashboard**: Comprehensive admin panel for inventory management`,
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
    category: 'hybrid',
    images: { gallery: [] },
    featured: true,
    viewCount: 234,
    liveUrl: 'https://example.com/ecommerce',
    githubUrl: 'https://github.com/example/ecommerce-platform',
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date('2024-02-15').toISOString(),
  },
  {
    _id: '3',
    title: 'Real-Time Analytics Dashboard',
    slug: 'analytics-dashboard',
    description: 'Interactive dashboard for monitoring business metrics with real-time data visualization.',
    fullDescription: `# Real-Time Analytics Dashboard

An interactive analytics dashboard that provides real-time insights into business metrics.

## Features

- **Live Data**: Real-time data streaming with WebSockets
- **Interactive Charts**: D3.js powered visualizations
- **Custom Widgets**: Drag-and-drop dashboard builder
- **Export Reports**: Generate PDF and Excel reports
- **Alert System**: Configurable alerts for metric thresholds`,
    technologies: ['Vue.js', 'D3.js', 'WebSocket', 'Python', 'ClickHouse', 'FastAPI'],
    category: 'manual',
    images: { gallery: [] },
    featured: true,
    viewCount: 189,
    githubUrl: 'https://github.com/example/analytics-dashboard',
    createdAt: new Date('2024-03-01').toISOString(),
    updatedAt: new Date('2024-03-05').toISOString(),
  },
  {
    _id: '4',
    title: 'Social Media Scheduler',
    slug: 'social-media-scheduler',
    description: 'Automated social media posting tool with analytics and multi-platform support.',
    fullDescription: `# Social Media Scheduler

An AI-powered social media management tool that helps automate and optimize your social presence.

## Features

- **Multi-Platform**: Support for Twitter, LinkedIn, Instagram, and Facebook
- **AI Content Suggestions**: Get AI-generated content ideas
- **Optimal Timing**: AI determines the best times to post
- **Analytics**: Comprehensive engagement analytics
- **Content Calendar**: Visual calendar for planning posts`,
    technologies: ['React', 'Express', 'MongoDB', 'Twitter API', 'Bull', 'Redis'],
    category: 'ai-generated',
    images: { gallery: [] },
    featured: false,
    viewCount: 98,
    liveUrl: 'https://example.com/scheduler',
    aiPrompts: [
      'Build a social media scheduler with multi-platform support',
      'Integrate AI for content optimization and scheduling',
    ],
    createdAt: new Date('2024-04-01').toISOString(),
    updatedAt: new Date('2024-04-05').toISOString(),
  },
  {
    _id: '5',
    title: 'AI Portfolio Website',
    slug: 'ai-portfolio-website',
    description: 'Modern portfolio website built with Next.js showcasing AI-driven development capabilities.',
    fullDescription: `# AI Portfolio Website

This very portfolio website you're viewing! Built entirely using AI-assisted development.

## Features

- **Dynamic Content**: CMS-powered content management
- **Analytics**: Built-in visitor analytics
- **Admin Panel**: Secret admin access for content management
- **Responsive Design**: Mobile-first approach`,
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Express.js', 'MongoDB'],
    category: 'ai-generated',
    images: { gallery: [] },
    featured: false,
    viewCount: 312,
    githubUrl: 'https://github.com/example/ai-portfolio',
    aiPrompts: [
      'Create a minimal professional portfolio with Next.js 14',
      'Build an Express backend with MongoDB for content management',
      'Implement secret admin access with key combination',
    ],
    createdAt: new Date('2024-05-01').toISOString(),
    updatedAt: new Date('2024-05-10').toISOString(),
  },
  {
    _id: '6',
    title: 'API Gateway Service',
    slug: 'api-gateway-service',
    description: 'High-performance API gateway with rate limiting, caching, and authentication.',
    fullDescription: `# API Gateway Service

A high-performance API gateway solution for microservices architecture.

## Features

- **Rate Limiting**: Configurable rate limiting per endpoint
- **Caching**: Redis-powered response caching
- **Authentication**: JWT and OAuth2 support
- **Load Balancing**: Built-in load balancing
- **Monitoring**: Prometheus metrics and Grafana dashboards`,
    technologies: ['Go', 'Redis', 'Docker', 'Kubernetes', 'Prometheus', 'gRPC'],
    category: 'manual',
    images: { gallery: [] },
    featured: false,
    viewCount: 145,
    githubUrl: 'https://github.com/example/api-gateway',
    createdAt: new Date('2024-06-01').toISOString(),
    updatedAt: new Date('2024-06-05').toISOString(),
  },
];

// Demo Hero Content
export const demoHeroContent: HeroContent = {
  name: 'Alex Developer',
  tagline: 'AI-First Full-Stack Developer',
  bio: 'Building production-ready applications through innovative prompt engineering and cutting-edge web technologies. Passionate about creating elegant solutions that make a difference.',
  ctaButtons: [
    { text: 'View Projects', link: '/projects' },
    { text: 'Contact Me', link: '/contact' },
  ],
};

// Demo Skills Content
export const demoSkillsCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: 'Monitor',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vue.js'],
  },
  {
    name: 'Backend',
    icon: 'Server',
    skills: ['Node.js', 'Express', 'Python', 'Go', 'PostgreSQL', 'MongoDB'],
  },
  {
    name: 'AI Tools',
    icon: 'Sparkles',
    skills: ['GitHub Copilot', 'Claude', 'ChatGPT', 'OpenAI API', 'LangChain', 'Cursor'],
  },
  {
    name: 'DevOps',
    icon: 'Cloud',
    skills: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Terraform', 'Vercel'],
  },
];

// Demo About Content
export const demoAboutContent = {
  bio: `I am a full-stack developer with a passion for AI-driven development. With years of experience in building scalable web applications, I now focus on leveraging AI tools to accelerate development without compromising quality.

My approach combines traditional software engineering best practices with modern AI assistance to deliver high-quality, maintainable code faster than ever before.

## Why AI-First Development?

AI-first development isn't about replacing developers—it's about augmenting our capabilities. By effectively prompting AI assistants, we can:

- **Accelerate Development**: Reduce time spent on boilerplate code
- **Improve Quality**: Get instant code reviews and suggestions
- **Learn Faster**: Explore new technologies with AI guidance
- **Focus on Architecture**: Spend more time on design decisions`,
  photo: '',
  resumeUrl: '/resume.pdf',
  timeline: [
    { 
      year: '2024', 
      title: 'AI-First Development Pioneer', 
      description: 'Leading the adoption of AI-assisted development methodologies' 
    },
    { 
      year: '2022', 
      title: 'Senior Full-Stack Developer', 
      description: 'Led development teams at a major tech company' 
    },
    { 
      year: '2020', 
      title: 'Full Stack Developer', 
      description: 'Built enterprise applications with modern JavaScript stacks' 
    },
    { 
      year: '2018', 
      title: 'Started Professional Journey', 
      description: 'Began the journey into professional software development' 
    },
  ],
};

// Helper to get featured projects
export const getFeaturedDemoProjects = (): Project[] => {
  return demoProjects.filter(p => p.featured);
};

// Helper to get project by slug
export const getDemoProjectBySlug = (slug: string): Project | undefined => {
  return demoProjects.find(p => p.slug === slug);
};
