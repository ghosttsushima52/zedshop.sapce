'use client';

/**
 * ThemeInit — inject BEFORE any React hydration.
 *
 * Usage: import this in your layout's <head> or <body> immediately.
 * Because layout.tsx is owned by the Integration Agent, this component
 * is provided here so it can simply be dropped in when layout.tsx is updated.
 *
 * The inline script reads localStorage and sets data-visual-system on <html>
 * synchronously, preventing any flash of the default theme.
 *
 * When layout.tsx cannot be modified, the ThemeSwitcher handles sync
 * via useEffect on mount — there may be a brief flash on first load
 * for non-default themes, but subsequent loads will be flash-free because
 * the attribute is written before paint by this script once integrated.
 */

import { STORAGE_KEY, VISUAL_SYSTEMS, DEFAULT_VISUAL_SYSTEM, PALETTE_STORAGE_KEY, PALETTES, DEFAULT_PALETTES } from './tokens';

const ids = VISUAL_SYSTEMS.map((v) => v.id);
const script = `(function(){try{var s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});var v=${JSON.stringify(ids)};s=s&&v.indexOf(s)!==-1?s:${JSON.stringify(DEFAULT_VISUAL_SYSTEM)};document.documentElement.setAttribute('data-visual-system',s);var p=localStorage.getItem(${JSON.stringify(PALETTE_STORAGE_KEY)});var colors=${JSON.stringify(PALETTES.map((item) => item.id))};p=p&&colors.indexOf(p)!==-1?p:${JSON.stringify(DEFAULT_PALETTES)}[s];document.documentElement.setAttribute('data-palette',p);}catch(e){}})();`;

export function ThemeInit() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
