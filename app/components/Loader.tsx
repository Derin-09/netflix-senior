// app/LoaderProvider.tsx
'use client'
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingPage from './LoadingPage/LoadingPage';

export function Loader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <>
      {loading && (
        <div >
          <LoadingPage/>
        </div>
      )}
      {children}
    </>
  );
}

export default Loader