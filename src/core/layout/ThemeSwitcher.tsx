'use client';

import { useState, useRef, useEffect, useCallback, useId } from 'react';
import { VISUAL_SYSTEMS, DEFAULT_VISUAL_SYSTEM, STORAGE_KEY, PALETTES, PALETTE_STORAGE_KEY, DEFAULT_PALETTES } from '@/core/theme/tokens';
import type { VisualSystemId, PaletteId } from '@/core/theme/tokens';

// ── Utilities ─────────────────────────────────────────────────

function readStored(): VisualSystemId {
  if (typeof window === 'undefined') return DEFAULT_VISUAL_SYSTEM;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw && VISUAL_SYSTEMS.some((s) => s.id === raw)) return raw as VisualSystemId;
  } catch {}
  return DEFAULT_VISUAL_SYSTEM;
}

function applyAndStore(id: VisualSystemId) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-visual-system', id);
  }
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {}
}

function readStoredPalette(): PaletteId | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PALETTE_STORAGE_KEY);
    if (raw && PALETTES.some((p) => p.id === raw)) return raw as PaletteId;
  } catch {}
  return null;
}

function applyPalette(id: PaletteId, store = false) {
  document.documentElement.setAttribute('data-palette', id);
  if (store) {
    try { localStorage.setItem(PALETTE_STORAGE_KEY, id); } catch {}
  }
}

// ── Swatch dot ────────────────────────────────────────────────

const SWATCH_COLORS: Record<VisualSystemId, string> = {
  'violet-signal':   '#06d6f0',
  'raycast':         '#ff6363',
  'resend':          '#111111',
  'linear':          '#5e6ad2',
  'print':           '#c0392b',
  'premium':         '#d4af72',
  'swiss-modern':    '#e63946',
  'warm-minimal':    '#a89f91',
  'neo-brutalist':   '#0055ff',
  'atelier-haute':   '#c5a059',
  'mono-industrial': '#f59e0b',
  'cyber-minimal':   '#10b981',
};

function Swatch({ id }: { id: VisualSystemId }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: SWATCH_COLORS[id],
        flexShrink: 0,
        marginTop: 3,
      }}
    />
  );
}

// ── ThemeSwitcher ─────────────────────────────────────────────

/**
 * Self-contained ThemeSwitcher.
 * Reads and writes directly to localStorage / data-visual-system.
 * Works without a parent ThemeProvider.
 * Keyboard: ↑↓ to navigate, Enter/Space to select, Escape to close.
 */
export function ThemeSwitcher() {
  const [system, setSystem] = useState<VisualSystemId>(DEFAULT_VISUAL_SYSTEM);
  const [palette, setPalette] = useState<PaletteId>(DEFAULT_PALETTES[DEFAULT_VISUAL_SYSTEM]);
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const menuId = useId();
  const paletteMenuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const paletteTriggerRef = useRef<HTMLButtonElement>(null);
  const paletteMenuRef = useRef<HTMLUListElement>(null);

  // Sync with localStorage on mount (client only)
  useEffect(() => {
    const stored = readStored();
    setSystem(stored);
    document.documentElement.setAttribute('data-visual-system', stored);
    const selectedPalette = readStoredPalette() ?? DEFAULT_PALETTES[stored];
    setPalette(selectedPalette);
    applyPalette(selectedPalette);
  }, []);

  const handleSelect = useCallback((id: VisualSystemId) => {
    setSystem(id);
    applyAndStore(id);
    if (!readStoredPalette()) {
      setPalette(DEFAULT_PALETTES[id]);
      applyPalette(DEFAULT_PALETTES[id]);
    }
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const handlePaletteSelect = useCallback((id: PaletteId) => {
    setPalette(id);
    applyPalette(id, true);
    setPaletteOpen(false);
    paletteTriggerRef.current?.focus();
  }, []);

  // Keyboard & outside-click handling
  useEffect(() => {
    if (!open && !paletteOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        setPaletteOpen(false);
        (paletteOpen ? paletteTriggerRef : triggerRef).current?.focus();
        return;
      }
      if (e.key === 'Tab') {
        setOpen(false);
        setPaletteOpen(false);
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const items = (paletteOpen ? paletteMenuRef : menuRef).current?.querySelectorAll<HTMLElement>('[role="option"]');
        if (!items) return;
        const focused = document.activeElement;
        const idx = Array.from(items).indexOf(focused as HTMLElement);
        const next = e.key === 'ArrowDown'
          ? (idx < items.length - 1 ? idx + 1 : 0)
          : (idx > 0 ? idx - 1 : items.length - 1);
        items[next]?.focus();
      }
      if (e.key === 'Home') {
        e.preventDefault();
        (paletteOpen ? paletteMenuRef : menuRef).current?.querySelector<HTMLElement>('[role="option"]')?.focus();
      }
      if (e.key === 'End') {
        e.preventDefault();
        const items = (paletteOpen ? paletteMenuRef : menuRef).current?.querySelectorAll<HTMLElement>('[role="option"]');
        items?.[items.length - 1]?.focus();
      }
    }
    function onPointer(e: PointerEvent) {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node) &&
        !paletteMenuRef.current?.contains(e.target as Node) &&
        !paletteTriggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
        setPaletteOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open, paletteOpen]);

  // Move focus to selected item when menu opens
  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      const selected = menuRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
      const first = menuRef.current?.querySelector<HTMLElement>('[role="option"]');
      (selected ?? first)?.focus();
    });
  }, [open]);

  useEffect(() => {
    if (!paletteOpen) return;
    requestAnimationFrame(() => paletteMenuRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.focus());
  }, [paletteOpen]);

  const current = VISUAL_SYSTEMS.find((s) => s.id === system)!;

  return (
    <div className="theme-switcher">
      <button
        ref={triggerRef}
        className="theme-switcher__trigger"
        type="button"
        onClick={() => { setPaletteOpen(false); setOpen((o) => !o); }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Görsel sistem: ${current.label}. Değiştirmek için tıklayın.`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="theme-switcher__trigger-icon" aria-hidden="true">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
        <Swatch id={system} />
        <span className="theme-switcher__trigger-label">{current.label}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{
            opacity: 0.6,
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform var(--dur-fast) var(--ease-out)',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul
          ref={menuRef}
          id={menuId}
          className="theme-switcher__menu"
          role="listbox"
          aria-label="Görsel sistem seç"
          aria-activedescendant={`ts-item-${system}`}
        >
          {VISUAL_SYSTEMS.map((s) => {
            const isSelected = s.id === system;
            return (
              <li key={s.id} role="presentation">
                <button
                  id={`ts-item-${s.id}`}
                  className="theme-switcher__item"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(s.id)}
                  tabIndex={0}
                  type="button"
                >
                  <Swatch id={s.id} />
                  <span className="theme-switcher__item-text">
                    <span className="theme-switcher__item-label">{s.label}</span>
                    <span className="theme-switcher__item-desc">{s.description}</span>
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="theme-switcher__item-check"
                    aria-hidden="true"
                    style={{ opacity: isSelected ? 1 : 0 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <div className="theme-switcher__palette">
        <button
          ref={paletteTriggerRef}
          className="theme-switcher__trigger theme-switcher__palette-trigger"
          type="button"
          onClick={() => { setOpen(false); setPaletteOpen((o) => !o); }}
          aria-haspopup="listbox"
          aria-expanded={paletteOpen}
          aria-controls={paletteMenuId}
          aria-label={`Renk seçimi: ${PALETTES.find((p) => p.id === palette)?.label}. Değiştirmek için tıklayın.`}
        >
          {PALETTES.find((p) => p.id === palette)?.tone === 'dark' ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
          <span className="theme-switcher__color-dot" style={{ background: PALETTES.find((p) => p.id === palette)?.swatch }} aria-hidden="true" />
          <span className="theme-switcher__trigger-label">{PALETTES.find((p) => p.id === palette)?.label}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {paletteOpen && (
          <ul ref={paletteMenuRef} id={paletteMenuId} className="theme-switcher__menu theme-switcher__palette-menu" role="listbox" aria-label="Renk seç">
            {PALETTES.map((p) => (
              <li key={p.id} role="presentation">
                <button className="theme-switcher__item theme-switcher__palette-item" role="option" aria-selected={palette === p.id} onClick={() => handlePaletteSelect(p.id)} tabIndex={0} type="button">
                  <span className="theme-switcher__color-dot" style={{ background: p.swatch }} aria-hidden="true" />
                  <span className="theme-switcher__item-text"><span className="theme-switcher__item-label">{p.label}</span><span className="theme-switcher__item-desc">{p.tone === 'dark' ? 'Koyu' : 'Açık'}</span></span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="theme-switcher__item-check"
                    aria-hidden="true"
                    style={{ opacity: palette === p.id ? 1 : 0 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
