import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Import models
import { User } from '../models/User';
import { Project } from '../models/Project';
import { Content } from '../models/Content';

// Demo Projects Data - Comprehensive showcase projects
const demoProjects = [
  {
    title: 'AI-Powered Task Manager',
    description: 'A smart task management app with AI-powered prioritization and scheduling features.',
    fullDescription: `# AI-Powered Task Manager

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
- Real-time updates via WebSockets`,
    technologies: ['Next.js', 'TypeScript', 'OpenAI', 'MongoDB', 'Tailwind CSS', 'Express.js'],
    category: 'ai-generated',
    images: { gallery: [] },
    featured: true,
    liveUrl: 'https://example.com/task-manager',
    githubUrl: 'https://github.com/example/ai-task-manager',
    aiPrompts: [
      'Create a Next.js task manager with AI prioritization using OpenAI API',
      'Implement natural language processing for task creation',
      'Add real-time collaboration features with WebSocket',
    ],
    viewCount: 156,
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-featured e-commerce solution with payment integration and inventory management.',
    fullDescription: `# E-Commerce Platform

A complete e-commerce solution built with modern technologies, featuring a seamless shopping experience.

## Features

- **Product Catalog**: Browse products with advanced filtering and search
- **Shopping Cart**: Persistent cart with real-time updates
- **Secure Payments**: Stripe integration for secure transactions
- **Order Management**: Complete order tracking and history
- **Admin Dashboard**: Comprehensive admin panel for inventory management

## Technical Stack

Built with scalability in mind, using microservices architecture.`,
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
    category: 'hybrid',
    images: { gallery: [] },
    featured: true,
    liveUrl: 'https://example.com/ecommerce',
    githubUrl: 'https://github.com/example/ecommerce-platform',
    viewCount: 234,
  },
  {
    title: 'Real-Time Analytics Dashboard',
    description: 'Interactive dashboard for monitoring business metrics with real-time data visualization.',
    fullDescription: `# Real-Time Analytics Dashboard

An interactive analytics dashboard that provides real-time insights into business metrics.

## Features

- **Live Data**: Real-time data streaming with WebSockets
- **Interactive Charts**: D3.js powered visualizations
- **Custom Widgets**: Drag-and-drop dashboard builder
- **Export Reports**: Generate PDF and Excel reports
- **Alert System**: Configurable alerts for metric thresholds

## Performance

Optimized for handling millions of data points with sub-second query times.`,
    technologies: ['Vue.js', 'D3.js', 'WebSocket', 'Python', 'ClickHouse', 'FastAPI'],
    category: 'manual',
    images: { gallery: [] },
    featured: true,
    githubUrl: 'https://github.com/example/analytics-dashboard',
    viewCount: 189,
  },
  {
    title: 'Social Media Scheduler',
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
    liveUrl: 'https://example.com/scheduler',
    aiPrompts: [
      'Build a social media scheduler with multi-platform support',
      'Integrate AI for content optimization and scheduling',
    ],
    viewCount: 98,
  },
  {
    title: 'AI Portfolio Website',
    description: 'Modern portfolio website built with Next.js showcasing AI-driven development capabilities.',
    fullDescription: `# AI Portfolio Website

This very portfolio website you're viewing! Built entirely using AI-assisted development.

## Features

- **Dynamic Content**: CMS-powered content management
- **Analytics**: Built-in visitor analytics
- **Admin Panel**: Secret admin access for content management
- **Responsive Design**: Mobile-first approach

## Tech Stack

Built with Next.js 14, TypeScript, and Tailwind CSS.`,
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Express.js', 'MongoDB'],
    category: 'ai-generated',
    images: { gallery: [] },
    featured: false,
    githubUrl: 'https://github.com/example/ai-portfolio',
    aiPrompts: [
      'Create a minimal professional portfolio with Next.js 14',
      'Build an Express backend with MongoDB for content management',
      'Implement secret admin access with key combination',
    ],
    viewCount: 312,
  },
  {
    title: 'API Gateway Service',
    description: 'High-performance API gateway with rate limiting, caching, and authentication.',
    fullDescription: `# API Gateway Service

A high-performance API gateway solution for microservices architecture.

## Features

- **Rate Limiting**: Configurable rate limiting per endpoint
- **Caching**: Redis-powered response caching
- **Authentication**: JWT and OAuth2 support
- **Load Balancing**: Built-in load balancing
- **Monitoring**: Prometheus metrics and Grafana dashboards

## Performance

Handles 100k+ requests per second with sub-millisecond latency.`,
    technologies: ['Go', 'Redis', 'Docker', 'Kubernetes', 'Prometheus', 'gRPC'],
    category: 'manual',
    images: { gallery: [] },
    featured: false,
    githubUrl: 'https://github.com/example/api-gateway',
    viewCount: 145,
  },
];

// Demo Content Data - Matches the CMS structure from Prompts_and_planning.md
const demoContent = [
  {
    section: 'hero',
    data: {
      name: 'Alex Developer',
      tagline: 'AI-First Full-Stack Developer',
      bio: 'Building production-ready applications through innovative prompt engineering and cutting-edge web technologies. Passionate about creating elegant solutions that make a difference.',
      ctaButtons: [
        { text: 'View Projects', link: '/projects' },
        { text: 'Contact Me', link: '/contact' },
      ],
    },
  },
  {
    section: 'about',
    data: {
      bio: `I am a full-stack developer with a passion for AI-driven development. With years of experience in building scalable web applications, I now focus on leveraging AI tools to accelerate development without compromising quality.

My approach combines traditional software engineering best practices with modern AI assistance to deliver high-quality, maintainable code faster than ever before.

## Why AI-First Development?

AI-first development isn't about replacing developers—it's about augmenting our capabilities. By effectively prompting AI assistants, we can:

- **Accelerate Development**: Reduce time spent on boilerplate code
- **Improve Quality**: Get instant code reviews and suggestions
- **Learn Faster**: Explore new technologies with AI guidance
- **Focus on Architecture**: Spend more time on design decisions`,
      photo: '',
      timeline: [
        { 
          year: '2024', 
          title: 'AI-First Development Pioneer', 
          description: 'Leading the adoption of AI-assisted development methodologies, building production applications with 100% AI-generated code' 
        },
        { 
          year: '2022', 
          title: 'Senior Full-Stack Developer', 
          description: 'Led development teams at a major tech company, architecting scalable solutions for millions of users' 
        },
        { 
          year: '2020', 
          title: 'Full Stack Developer', 
          description: 'Built enterprise applications with modern JavaScript stacks, focusing on React and Node.js' 
        },
        { 
          year: '2018', 
          title: 'Started Professional Journey', 
          description: 'Began the journey into professional software development, learning fundamentals and best practices' 
        },
      ],
      resumeUrl: '/resume.pdf',
    },
  },
  {
    section: 'skills',
    data: {
      categories: [
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
      ],
    },
  },
  {
    section: 'contact',
    data: {
      email: 'alex@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      socialLinks: [
        { platform: 'GitHub', url: 'https://github.com/alexdev', icon: 'Github' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/alexdev', icon: 'Linkedin' },
        { platform: 'Twitter', url: 'https://twitter.com/alexdev', icon: 'Twitter' },
      ],
      formEnabled: true,
    },
  },
  {
    section: 'settings',
    data: {
      siteName: 'Alex Developer Portfolio',
      siteDescription: 'AI-First Full-Stack Developer Portfolio',
      adminKeyCombo: 'ctrl+shift+a',
      googleAnalyticsId: '',
      contactEmail: 'alex@example.com',
      socialLinks: {
        github: 'https://github.com/alexdev',
        linkedin: 'https://linkedin.com/in/alexdev',
        twitter: 'https://twitter.com/alexdev',
      },
    },
  },
];

// Default admin credentials
const defaultAdmin = {
  username: 'admin',
  email: 'admin@portfolio.local',
  password: 'Admin123!', // Change this in production!
  role: 'admin',
};

async function connectDatabase(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
  
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB:', mongoUri);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

async function seedDatabase(): Promise<void> {
  try {
    console.log('\n🌱 Starting database seed...\n');
    
    await connectDatabase();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Project.deleteMany({});
    await Content.deleteMany({});
    console.log('   ✓ Cleared projects and content\n');

    // Seed projects
    console.log('📦 Seeding projects...');
    for (const projectData of demoProjects) {
      const project = new Project(projectData);
      await project.save();
      console.log(`   ✓ Created: ${project.title} (${project.slug})`);
    }
    console.log(`   Total: ${demoProjects.length} projects\n`);

    // Seed content
    console.log('📝 Seeding content...');
    for (const contentData of demoContent) {
      await Content.findOneAndUpdate(
        { section: contentData.section },
        contentData,
        { upsert: true, new: true }
      );
      console.log(`   ✓ Created section: ${contentData.section}`);
    }
    console.log(`   Total: ${demoContent.length} content sections\n`);

    // Create admin user if not exists
    console.log('👤 Checking admin user...');
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(defaultAdmin.password, 10);
      const admin = new User({
        ...defaultAdmin,
        password: hashedPassword,
      });
      await admin.save();
      console.log('   ✓ Created admin user');
      console.log(`   📧 Email: ${defaultAdmin.email}`);
      console.log(`   🔑 Password: ${defaultAdmin.password}`);
      console.log('   ⚠️  IMPORTANT: Change password in production!\n');
    } else {
      console.log('   ✓ Admin user already exists\n');
    }

    console.log('═══════════════════════════════════════════');
    console.log('🎉 Database seeded successfully!');
    console.log('═══════════════════════════════════════════\n');
    console.log('Summary:');
    console.log(`  • Projects: ${demoProjects.length}`);
    console.log(`  • Content sections: ${demoContent.length}`);
    console.log(`  • Admin user: ${defaultAdmin.email}\n`);
    console.log('You can now:');
    console.log('  1. Start the backend: cd server && npm run dev');
    console.log('  2. Start the frontend: cd client && npm run dev');
    console.log('  3. Access admin: Press Ctrl+Shift+A on the site\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed
seedDatabase();
