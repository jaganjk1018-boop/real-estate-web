'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Reset scroll position instantly on route transition before animation runs
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div key={pathname} className="animate-page-fade-in flex-1 flex flex-col w-full">
      {children}
    </div>
  );
}
