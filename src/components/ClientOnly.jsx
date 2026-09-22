'use client';

import { useState, useEffect } from 'react';

/**
 * ClientOnly wrapper component.
 * Renders its children ONLY after client-side hydration completes.
 * This completely isolates interactive form elements, buttons, and selects
 * from third-party browser extensions (like McAfee WebAdvisor, Dashlane, 1Password)
 * that inject attributes like `fdprocessedid` into the DOM before hydration.
 */
export default function ClientOnly({ children, fallback = null }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return fallback;
  }

  return <>{children}</>;
}
