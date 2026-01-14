'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import type { Project, Content, HeroContent, SkillsContent } from '@/types';

// Projects hooks
export function useProjects(options?: {
  featured?: boolean;
  category?: string;
  limit?: number;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        if (options?.featured) params.append('featured', 'true');
        if (options?.category) params.append('category', options.category);
        if (options?.limit) params.append('limit', options.limit.toString());
        
        const response = await api.get(`/projects?${params.toString()}`);
        setProjects(response.data.data.projects);
        setError(null);
      } catch (err) {
        setError('Failed to fetch projects');
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [options?.featured, options?.category, options?.limit]);

  return { projects, isLoading, error };
}

export function useProject(slug: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/projects/${slug}`);
        setProject(response.data.data.project);
        setError(null);
        
        // Increment view count
        await api.post(`/projects/${response.data.data.project._id}/view`);
      } catch (err) {
        setError('Failed to fetch project');
        console.error('Error fetching project:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  return { project, isLoading, error };
}

// Content hooks
export function useContent<T = Record<string, unknown>>(section: string) {
  const [content, setContent] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/content/${section}`);
        setContent(response.data.data.content?.data as T || null);
        setError(null);
      } catch (err) {
        setError('Failed to fetch content');
        console.error('Error fetching content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [section]);

  return { content, isLoading, error };
}

// All projects with filtering
export function useAllProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  const fetchProjects = useCallback(async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sort?: string;
  }) => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.category && params.category !== 'all') queryParams.append('category', params.category);
      if (params?.search) queryParams.append('search', params.search);
      if (params?.sort) queryParams.append('sort', params.sort);

      const response = await api.get(`/projects?${queryParams.toString()}`);
      setProjects(response.data.data.projects);
      setPagination(response.data.data.pagination);
      setError(null);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, isLoading, error, pagination, refetch: fetchProjects };
}
