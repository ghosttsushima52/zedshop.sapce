'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { VisualSystemId } from './tokens';
import { DEFAULT_VISUAL_SYSTEM, STORAGE_KEY, VISUAL_SYSTEMS } from './tokens';

interface ThemeContextValue {
  system: VisualSystemId;
  setSystem: (id: VisualSystemId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  system: DEFAULT_VISUAL_SYSTEM,
  setSystem: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function readStored(): VisualSystemId | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw && VISUAL_SYSTEMS.some((s) => s.id === raw)) {
      return raw as VisualSystemId;
    }
  } catch {}
  return null;
}

function applySystem(id: VisualSystemId) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-visual-system', id);
  }
}

interface ThemeProviderProps {
  children: React.ReactNode;
  initialSystem?: VisualSystemId;
}

export function ThemeProvider({ children, initialSystem }: ThemeProviderProps) {
  const [system, setSystemState] = useState<VisualSystemId>(
    initialSystem ?? DEFAULT_VISUAL_SYSTEM
  );

  useEffect(() => {
    const stored = readStored();
    if (stored && stored !== system) {
      setSystemState(stored);
      applySystem(stored);
    } else {
      applySystem(system);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setSystem = useCallback((id: VisualSystemId) => {
    setSystemState(id);
    applySystem(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {}
  }, []);

  return (
    <ThemeContext.Provider value={{ system, setSystem }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Inline script that runs before React hydration to prevent flash.
 * Must be placed in <head> or at the top of <body>.
 */
export function ThemeScript() {
  const script = `(function(){try{var s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});var valid=${JSON.stringify(VISUAL_SYSTEMS.map((v) => v.id))};if(s&&valid.indexOf(s)!==-1){document.documentElement.setAttribute('data-visual-system',s);}else{document.documentElement.setAttribute('data-visual-system',${JSON.stringify(DEFAULT_VISUAL_SYSTEM)});}}catch(e){}})();`;
  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}

/**
 * Standalone provider that does NOT require a parent ThemeProvider.
 * Use this to wrap a subtree (e.g. a page or layout section) when the
 * root layout.tsx cannot be modified.
 *
 * It reads from / writes to the same localStorage key and applies
 * data-visual-system to <html> directly, so it works across the whole page.
 */
export function StandaloneThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
