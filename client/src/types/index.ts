export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  technologies: string[];
  category: 'ai-generated' | 'manual' | 'hybrid';
  images: {
    thumbnail?: string;
    gallery: string[];
  };
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  aiPrompts?: string[];
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface Content {
  _id: string;
  section: 'hero' | 'about' | 'skills' | 'contact' | 'settings';
  data: Record<string, unknown>;
  updatedAt: string;
}

export interface HeroContent {
  name: string;
  tagline: string;
  bio: string;
  ctaButtons?: Array<{ text: string; link: string }>;
}

export interface AboutContent {
  bio: string;
  photo?: string;
  timeline?: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  skills?: string[];
}

export interface SkillsContent {
  categories: Array<{
    name: string;
    skills: string[];
  }>;
}

export interface SkillCategory {
  name: string;
  icon?: string;
  skills: string[];
}

export interface ContactContent {
  email: string;
  phone?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
}

export interface AnalyticsStats {
  overall: {
    totalVisitors: number;
    totalPageViews: number;
    uniquePages: number;
  };
  today: {
    totalVisitors: number;
    totalPageViews: number;
    uniquePages: number;
  };
  thisWeek: {
    totalVisitors: number;
    totalPageViews: number;
    uniquePages: number;
  };
  thisMonth: {
    totalVisitors: number;
    totalPageViews: number;
    uniquePages: number;
  };
}

export interface ApiResponse<T> {
  status: 'success' | 'fail' | 'error';
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
