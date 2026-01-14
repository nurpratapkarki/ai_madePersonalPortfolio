'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type KeyCombo = {
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  key: string;
};

export function useAdminKeyCombo(
  combo: KeyCombo = { ctrlKey: true, shiftKey: true, key: 'a' }
) {
  const router = useRouter();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const isMatch =
        (combo.ctrlKey ? event.ctrlKey : true) &&
        (combo.shiftKey ? event.shiftKey : true) &&
        (combo.altKey ? event.altKey : true) &&
        event.key.toLowerCase() === combo.key.toLowerCase();

      if (isMatch) {
        event.preventDefault();
        router.push('/admin/login');
      }
    },
    [combo, router]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
