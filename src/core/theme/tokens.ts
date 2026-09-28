/**
 * Visual system token definitions.
 * Each entry describes the structural + aesthetic character of one design system.
 * Actual CSS variables are applied via ThemeProvider through data-visual-system on <html>.
 */

export type VisualSystemId =
  | 'violet-signal'
  | 'raycast'
  | 'resend'
  | 'linear'
  | 'print'
  | 'premium';

export interface VisualSystemMeta {
  id: VisualSystemId;
  /** Turkish display label */
  label: string;
  /** One-line Turkish description */
  description: string;
}

export const VISUAL_SYSTEMS: VisualSystemMeta[] = [
  {
    id: 'violet-signal',
    label: 'Hermes Agent',
    description: 'Kozmik karanlık, elektrik sinyal, editoryal ızgara',
  },
  {
    id: 'raycast',
    label: 'Raycast',
    description: 'Komut paleti hassasiyeti, kompakt yoğunluk, cam parlaklığı',
  },
  {
    id: 'resend',
    label: 'Resend',
    description: 'Siyah/beyaz teknik editoryal, ince çizgiler, bolca beyaz alan',
  },
  {
    id: 'linear',
    label: 'Linear',
    description: 'Sessiz ürün zarafeti, titiz aralık, hafif derinlik',
  },
  {
    id: 'print',
    label: 'Print',
    description: 'Sıcak modernist kırmızı/mürekkep, asimetrik editoryal düzen',
  },
  {
    id: 'premium',
    label: 'Premium',
    description: 'Galeri kalitesi, yüksek kontrast, serif/sans çifti, rafine hareket',
  },
];

export const DEFAULT_VISUAL_SYSTEM: VisualSystemId = 'violet-signal';
export const STORAGE_KEY = 'avenox-visual-system';

export type PaletteId = 'midnight' | 'graphite' | 'forest' | 'paper' | 'porcelain' | 'daylight';

export const PALETTES: Array<{ id: PaletteId; label: string; tone: 'dark' | 'light'; swatch: string }> = [
  { id: 'midnight', label: 'Gece', tone: 'dark', swatch: '#111827' },
  { id: 'graphite', label: 'Grafit', tone: 'dark', swatch: '#27272a' },
  { id: 'forest', label: 'Orman', tone: 'dark', swatch: '#17382f' },
  { id: 'paper', label: 'Kağıt', tone: 'light', swatch: '#f7f5f0' },
  { id: 'porcelain', label: 'Porselen', tone: 'light', swatch: '#edf3f2' },
  { id: 'daylight', label: 'Gün Işığı', tone: 'light', swatch: '#ffffff' },
];

export const DEFAULT_PALETTES: Record<VisualSystemId, PaletteId> = {
  'violet-signal': 'midnight',
  raycast: 'graphite',
  resend: 'daylight',
  linear: 'porcelain',
  print: 'paper',
  premium: 'midnight',
};

export const PALETTE_STORAGE_KEY = 'avenox-palette';
