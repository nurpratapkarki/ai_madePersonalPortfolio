'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Check, Plus, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import api from '@/lib/api';

const sections = [
  { value: 'hero', label: 'Hero Section' },
  { value: 'about', label: 'About Page' },
  { value: 'skills', label: 'Skills' },
  { value: 'contact', label: 'Contact Info' },
];

interface HeroContent {
  name: string;
  tagline: string;
  bio: string;
  ctaButtons?: Array<{ text: string; link: string }>;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface AboutContent {
  bio: string;
  photo?: string;
  timeline?: TimelineItem[];
  resumeUrl?: string;
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

interface SkillsContent {
  categories: SkillCategory[];
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface ContactContent {
  email: string;
  phone?: string;
  location?: string;
  socialLinks?: SocialLink[];
  formEnabled?: boolean;
}

export default function AdminContentPage() {
  const [selectedSection, setSelectedSection] = useState('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Content states
  const [heroContent, setHeroContent] = useState<HeroContent>({
    name: '',
    tagline: '',
    bio: '',
    ctaButtons: [],
  });

  const [aboutContent, setAboutContent] = useState<AboutContent>({
    bio: '',
    photo: '',
    timeline: [],
    resumeUrl: '',
  });

  const [skillsContent, setSkillsContent] = useState<SkillsContent>({
    categories: [],
  });

  const [contactContent, setContactContent] = useState<ContactContent>({
    email: '',
    phone: '',
    location: '',
    socialLinks: [],
    formEnabled: true,
  });

  // Fetch content on section change
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(`/content/${selectedSection}`);
        const data = response.data.data.content?.data;
        
        if (data) {
          switch (selectedSection) {
            case 'hero':
              setHeroContent(data as HeroContent);
              break;
            case 'about':
              setAboutContent(data as AboutContent);
              break;
            case 'skills':
              setSkillsContent(data as SkillsContent);
              break;
            case 'contact':
              setContactContent(data as ContactContent);
              break;
          }
        }
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load content');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [selectedSection]);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    
    try {
      let data;
      switch (selectedSection) {
        case 'hero':
          data = heroContent;
          break;
        case 'about':
          data = aboutContent;
          break;
        case 'skills':
          data = skillsContent;
          break;
        case 'contact':
          data = contactContent;
          break;
      }

      await api.post('/content', {
        section: selectedSection,
        data,
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving content:', err);
      setError('Failed to save content. Please check your authentication.');
    } finally {
      setIsSaving(false);
    }
  };

  // Timeline helpers
  const addTimelineItem = () => {
    setAboutContent({
      ...aboutContent,
      timeline: [...(aboutContent.timeline || []), { year: '', title: '', description: '' }],
    });
  };

  const removeTimelineItem = (index: number) => {
    setAboutContent({
      ...aboutContent,
      timeline: aboutContent.timeline?.filter((_, i) => i !== index) || [],
    });
  };

  const updateTimelineItem = (index: number, field: keyof TimelineItem, value: string) => {
    const newTimeline = [...(aboutContent.timeline || [])];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    setAboutContent({ ...aboutContent, timeline: newTimeline });
  };

  // Skills category helpers
  const addSkillCategory = () => {
    setSkillsContent({
      categories: [...skillsContent.categories, { name: '', icon: 'Code', skills: [] }],
    });
  };

  const removeSkillCategory = (index: number) => {
    setSkillsContent({
      categories: skillsContent.categories.filter((_, i) => i !== index),
    });
  };

  const updateSkillCategory = (index: number, field: keyof SkillCategory, value: string | string[]) => {
    const newCategories = [...skillsContent.categories];
    newCategories[index] = { ...newCategories[index], [field]: value };
    setSkillsContent({ categories: newCategories });
  };

  // Social link helpers
  const addSocialLink = () => {
    setContactContent({
      ...contactContent,
      socialLinks: [...(contactContent.socialLinks || []), { platform: '', url: '', icon: '' }],
    });
  };

  const removeSocialLink = (index: number) => {
    setContactContent({
      ...contactContent,
      socialLinks: contactContent.socialLinks?.filter((_, i) => i !== index) || [],
    });
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    const newLinks = [...(contactContent.socialLinks || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setContactContent({ ...contactContent, socialLinks: newLinks });
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

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        {/* Content Form */}
        <motion.div
          key={selectedSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
        >
          {isLoading ? (
            <div className="py-12 text-center text-gray-500">Loading content...</div>
          ) : (
            <>
              {/* Hero Section */}
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

              {/* About Section */}
              {selectedSection === 'about' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900">About Page Content</h2>
                  
                  <Textarea
                    label="Bio (Markdown supported)"
                    value={aboutContent.bio}
                    onChange={(e) => setAboutContent({ ...aboutContent, bio: e.target.value })}
                    placeholder="Your detailed bio with markdown formatting"
                    rows={8}
                  />

                  <Input
                    label="Resume URL"
                    value={aboutContent.resumeUrl || ''}
                    onChange={(e) => setAboutContent({ ...aboutContent, resumeUrl: e.target.value })}
                    placeholder="/resume.pdf or full URL"
                  />

                  {/* Timeline */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">Timeline</label>
                      <Button variant="outline" size="sm" onClick={addTimelineItem}>
                        <Plus className="h-4 w-4 mr-1" /> Add Item
                      </Button>
                    </div>
                    
                    {aboutContent.timeline?.map((item, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Item {index + 1}</span>
                          <button
                            onClick={() => removeTimelineItem(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            label="Year"
                            value={item.year}
                            onChange={(e) => updateTimelineItem(index, 'year', e.target.value)}
                            placeholder="2024"
                          />
                          <Input
                            label="Title"
                            value={item.title}
                            onChange={(e) => updateTimelineItem(index, 'title', e.target.value)}
                            placeholder="Position/Event"
                          />
                        </div>
                        <Textarea
                          label="Description"
                          value={item.description}
                          onChange={(e) => updateTimelineItem(index, 'description', e.target.value)}
                          placeholder="Description of this timeline item"
                          rows={2}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {selectedSection === 'skills' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900">Skills Configuration</h2>
                  
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={addSkillCategory}>
                      <Plus className="h-4 w-4 mr-1" /> Add Category
                    </Button>
                  </div>

                  {skillsContent.categories?.map((category, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Category {index + 1}</span>
                        <button
                          onClick={() => removeSkillCategory(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          label="Category Name"
                          value={category.name}
                          onChange={(e) => updateSkillCategory(index, 'name', e.target.value)}
                          placeholder="Frontend, Backend, etc."
                        />
                        <Input
                          label="Icon"
                          value={category.icon}
                          onChange={(e) => updateSkillCategory(index, 'icon', e.target.value)}
                          placeholder="Monitor, Server, etc."
                        />
                      </div>
                      <Textarea
                        label="Skills (comma-separated)"
                        value={category.skills?.join(', ') || ''}
                        onChange={(e) => updateSkillCategory(index, 'skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        placeholder="React, Next.js, TypeScript"
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Contact Section */}
              {selectedSection === 'contact' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
                  
                  <Input
                    label="Email"
                    type="email"
                    value={contactContent.email}
                    onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
                    placeholder="your@email.com"
                  />

                  <Input
                    label="Phone"
                    value={contactContent.phone || ''}
                    onChange={(e) => setContactContent({ ...contactContent, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />

                  <Input
                    label="Location"
                    value={contactContent.location || ''}
                    onChange={(e) => setContactContent({ ...contactContent, location: e.target.value })}
                    placeholder="San Francisco, CA"
                  />

                  {/* Social Links */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">Social Links</label>
                      <Button variant="outline" size="sm" onClick={addSocialLink}>
                        <Plus className="h-4 w-4 mr-1" /> Add Link
                      </Button>
                    </div>
                    
                    {contactContent.socialLinks?.map((link, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Link {index + 1}</span>
                          <button
                            onClick={() => removeSocialLink(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <Input
                            label="Platform"
                            value={link.platform}
                            onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                            placeholder="GitHub"
                          />
                          <Input
                            label="Icon"
                            value={link.icon}
                            onChange={(e) => updateSocialLink(index, 'icon', e.target.value)}
                            placeholder="Github"
                          />
                          <Input
                            label="URL"
                            value={link.url}
                            onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                            placeholder="https://github.com/..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="formEnabled"
                      checked={contactContent.formEnabled}
                      onChange={(e) => setContactContent({ ...contactContent, formEnabled: e.target.checked })}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <label htmlFor="formEnabled" className="text-sm text-gray-700">
                      Enable contact form
                    </label>
                  </div>
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
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
