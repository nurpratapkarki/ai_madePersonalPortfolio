'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, 
  Eye, 
  FolderOpen, 
  Star, 
  ArrowRight,
  TrendingUp,
  Plus,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';

interface StatsCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'up' | 'down';
}

const mockStats: StatsCard[] = [
  {
    title: 'Total Visitors',
    value: '1,234',
    icon: <Users className="h-6 w-6" />,
    change: '+12%',
    changeType: 'up',
  },
  {
    title: 'Page Views',
    value: '5,678',
    icon: <Eye className="h-6 w-6" />,
    change: '+8%',
    changeType: 'up',
  },
  {
    title: 'Projects',
    value: '12',
    icon: <FolderOpen className="h-6 w-6" />,
  },
  {
    title: 'Featured',
    value: '4',
    icon: <Star className="h-6 w-6" />,
  },
];

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/projects">
              <Button>
                <Plus className="h-5 w-5 mr-2" />
                New Project
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </div>
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
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    {stat.change && (
                      <span className={`text-sm font-medium flex items-center ${
                        stat.changeType === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {stat.change}
                      </span>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
                <Link
                  href="/admin/projects"
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                >
                  View all <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4">
                      <Skeleton className="h-12 w-12 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-500 text-center py-4">
                    Projects will appear here once created.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <Link href="/admin/projects" className="block">
                <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FolderOpen className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Manage Projects</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
              <Link href="/admin/content" className="block">
                <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Edit Content</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
              <Link href="/admin/analytics" className="block">
                <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">View Analytics</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
