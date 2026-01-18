'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Github, Linkedin, Mail, Sparkles } from 'lucide-react';

const socialLinks = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:hello@example.com', icon: Mail, label: 'Email' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const clickCountRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleAIClick = () => {
    clickCountRef.current += 1;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // If clicked 3 times, navigate to admin login
    if (clickCountRef.current === 3) {
      clickCountRef.current = 0;
      router.push('/admin/login');
      return;
    }

    // Reset count after 1 second of no clicks
    timeoutRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1000);
  };

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and Copyright */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Portfolio
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* AI Badge */}
          <button
            onClick={handleAIClick}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100 hover:border-blue-200 transition-colors cursor-pointer"
            aria-label="Built with AI"
          >
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              Built with AI
            </span>
          </button>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                aria-label={link.label}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
