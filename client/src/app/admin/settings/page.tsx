'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Key, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your admin settings</p>
        </div>

        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Mail className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
          </div>

          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              defaultValue="admin@example.com"
              placeholder="admin@example.com"
            />
            <Input
              label="Username"
              defaultValue="admin"
              placeholder="Your username"
            />
          </div>
        </motion.div>

        {/* Change Password */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
          </div>

          <div className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
            />
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
            />
          </div>
        </motion.div>

        {/* Admin Key Combo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Key className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Admin Access Method</h2>
          </div>

          <p className="text-gray-600 mb-4">
            Current method to access admin panel:
          </p>
          <div className="flex items-center gap-2 mb-4 px-4 py-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700">
              Click <span className="font-semibold">Built with AI</span> in the footer <span className="font-semibold">3 times</span>
            </span>
          </div>
          <p className="text-sm text-gray-500">
            This hidden access method can be used on any page to reach the admin login.
          </p>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} isLoading={isSaving}>
            <Save className="h-5 w-5 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
