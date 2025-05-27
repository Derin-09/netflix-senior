// app/components/NavigationLoader.tsx
'use client'
import { Suspense, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingPage from './LoadingPage/LoadingPage';

function NavigationLoaderInner() {
  // 1. Tracks navigation state
  const [loading, setLoading] = useState(false);
  const pathname = usePathname(); // ← Dynamic value
  const searchParams = useSearchParams(); // ← Dynamic value

  // 2. Auto-triggers on route changes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]); // ← Effect dependencies

  return loading ? <LoadingPage/> : null;
}

// 3. Mandatory Suspense wrapper
export function NavigationLoader() {
  return (
    <Suspense fallback={null}>
      <NavigationLoaderInner />
    </Suspense>
  );
}