'use client';

import { ContactSection } from '@/components/sections/ContactSection';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Github, Linkedin, Twitter, LucideIcon } from 'lucide-react';
import { useContent } from '@/hooks/useData';

interface ContactContent {
  email: string;
  phone?: string;
  location?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  formEnabled?: boolean;
}

// Icon mapping for social platforms
const iconMap: Record<string, LucideIcon> = {
  Github: Github,
  GitHub: Github,
  Linkedin: Linkedin,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Mail: Mail,
};

export default function ContactPage() {
  const { content: contactContent, isLoading } = useContent<ContactContent>('contact');

  // Default values
  const email = contactContent?.email || 'hello@example.com';
  const location = contactContent?.location || 'San Francisco, CA';
  const socialLinks = contactContent?.socialLinks || [];

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: location,
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Within 24 hours',
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Let&apos;s Connect
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you. Reach out and let&apos;s create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-2" />
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-32" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-900 font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="mt-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Follow Me
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((link) => {
                    const IconComponent = iconMap[link.icon] || Github;
                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 hover:text-gray-900 transition-colors"
                        aria-label={link.platform}
                      >
                        <IconComponent className="h-6 w-6" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <ContactSection />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
