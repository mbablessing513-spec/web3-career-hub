'use client';

import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // In a real app, check if user is admin
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}