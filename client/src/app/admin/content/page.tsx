'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

const sections = [
  { value: 'hero', label: 'Hero Section' },
  { value: 'about', label: 'About Page' },
  { value: 'skills', label: 'Skills' },
  { value: 'contact', label: 'Contact Info' },
];

export default function AdminContentPage() {
  const [selectedSection, setSelectedSection] = useState('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Demo content
  const [heroContent, setHeroContent] = useState({
    name: 'Alex Developer',
    tagline: 'AI-First Full-Stack Developer',
    bio: 'Building production-ready applications through innovative prompt engineering.',
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600">Edit your website content</p>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {sections.map((section) => (
            <button
              key={section.value}
              onClick={() => setSelectedSection(section.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedSection === section.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Content Form */}
        <motion.div
          key={selectedSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
        >
          {selectedSection === 'hero' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Hero Section Content</h2>
              
              <Input
                label="Name"
                value={heroContent.name}
                onChange={(e) => setHeroContent({ ...heroContent, name: e.target.value })}
                placeholder="Your name"
              />

              <Input
                label="Tagline"
                value={heroContent.tagline}
                onChange={(e) => setHeroContent({ ...heroContent, tagline: e.target.value })}
                placeholder="Your professional tagline"
              />

              <Textarea
                label="Bio"
                value={heroContent.bio}
                onChange={(e) => setHeroContent({ ...heroContent, bio: e.target.value })}
                placeholder="A brief introduction about yourself"
                rows={4}
              />
            </div>
          )}

          {selectedSection === 'about' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">About Page Content</h2>
              <p className="text-gray-500">About page content editing coming soon...</p>
            </div>
          )}

          {selectedSection === 'skills' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Skills Configuration</h2>
              <p className="text-gray-500">Skills management coming soon...</p>
            </div>
          )}

          {selectedSection === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
              <p className="text-gray-500">Contact info editing coming soon...</p>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
            {showSuccess && (
              <div className="flex items-center gap-2 text-green-600 mr-4">
                <Check className="h-5 w-5" />
                Saved successfully!
              </div>
            )}
            <Button onClick={handleSave} isLoading={isSaving}>
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
