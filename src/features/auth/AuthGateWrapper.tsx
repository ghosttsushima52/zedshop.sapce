'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { FuturisticTechGate } from './FuturisticTechGate';
import { usePathname, useRouter } from 'next/navigation';

export function AuthGateWrapper({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLegendClient } = useAuth();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isAuthenticated && isLegendClient) {
      if (pathname === '/' || pathname === '') {
        router.push('/sites/legendgame');
      }
    }
  }, [mounted, isAuthenticated, isLegendClient, pathname, router]);

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
