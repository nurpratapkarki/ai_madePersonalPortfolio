export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export const PROJECT_CATEGORIES = {
  AI_GENERATED: 'ai-generated',
  MANUAL: 'manual',
  HYBRID: 'hybrid',
} as const;

export const CONTENT_SECTIONS = {
  HERO: 'hero',
  ABOUT: 'about',
  SKILLS: 'skills',
  CONTACT: 'contact',
  SETTINGS: 'settings',
} as const;

export const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100,
  LOGIN_MAX_REQUESTS: 5,
} as const;

export const JWT_CONFIG = {
  ACCESS_TOKEN_EXPIRY: '15m',
  REFRESH_TOKEN_EXPIRY: '7d',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
export type ProjectCategory = typeof PROJECT_CATEGORIES[keyof typeof PROJECT_CATEGORIES];
export type ContentSection = typeof CONTENT_SECTIONS[keyof typeof CONTENT_SECTIONS];
