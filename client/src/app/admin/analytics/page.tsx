'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, TrendingUp, Globe } from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';

interface StatCard {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
}

const mockStats: StatCard[] = [
  { title: 'Total Visitors', value: '1,234', icon: <Users className="h-6 w-6" />, change: '+12% from last month' },
  { title: 'Page Views', value: '5,678', icon: <Eye className="h-6 w-6" />, change: '+8% from last month' },
  { title: 'Avg. Session', value: '3:24', icon: <TrendingUp className="h-6 w-6" />, change: '+5% from last month' },
  { title: 'Countries', value: '24', icon: <Globe className="h-6 w-6" />, change: '+3 new this month' },
];

interface PopularPage {
  path: string;
  views: number;
}

const mockPopularPages: PopularPage[] = [
  { path: '/', views: 1234 },
  { path: '/projects', views: 567 },
  { path: '/about', views: 345 },
  { path: '/contact', views: 234 },
  { path: '/projects/ai-task-manager', views: 189 },
];

export default function AdminAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Monitor your website performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
            >
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
              ) : (
                <>
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg w-fit mb-4">
                    {stat.icon}
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Popular Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Popular Pages</h2>
            </div>
            <div className="p-6">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {mockPopularPages.map((page, index) => (
                    <div key={page.path} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-400 w-6">{index + 1}</span>
                        <span className="text-gray-900 font-mono text-sm">{page.path}</span>
                      </div>
                      <span className="text-gray-600 font-medium">{page.views.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Visitor Trend Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Visitor Trend</h2>
            </div>
            <div className="p-6 h-64 flex items-center justify-center">
              <p className="text-gray-500">Chart visualization coming soon...</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
