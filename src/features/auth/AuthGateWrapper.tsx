'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { FuturisticTechGate } from './FuturisticTechGate';

export function AuthGateWrapper({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Before client hydration or if not authenticated:
  // Render ONLY the single page Futuristic Tech Gate!
  if (!mounted || !isAuthenticated) {
    return (
      <>
        <FuturisticTechGate />
        {/* Hidden off-screen in SSR so Next.js static page analyzer still registers sub-routes */}
        <div style={{ display: 'none' }} aria-hidden="true">
          {children}
        </div>
      </>
    );
  }

  // Once authenticated, render children directly with no obstruction!
  return <>{children}</>;
}
