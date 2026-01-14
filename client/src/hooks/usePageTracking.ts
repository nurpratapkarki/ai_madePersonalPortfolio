'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import api from '@/lib/api';

export function usePageTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isTracking = useRef(false);

  const trackPageView = useCallback(async (page: string) => {
    if (isTracking.current) return;
    isTracking.current = true;

    try {
      // Get or create session ID
      let sessionId = sessionStorage.getItem('analyticsSessionId');
      if (!sessionId) {
        sessionId = uuidv4();
        sessionStorage.setItem('analyticsSessionId', sessionId);
      }

      await api.post('/analytics/track', {
        sessionId,
        page,
        referrer: document.referrer || '',
      });
    } catch {
      // Silent fail for analytics
    } finally {
      isTracking.current = false;
    }
  }, []);

  useEffect(() => {
    const page = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`;
    trackPageView(page);
  }, [pathname, searchParams, trackPageView]);
}
