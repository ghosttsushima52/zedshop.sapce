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
  | 'premium'
  | 'swiss-modern'
  | 'warm-minimal'
  | 'neo-brutalist'
  | 'atelier-haute'
  | 'mono-industrial'
  | 'cyber-minimal';

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
    label: 'Print Modernist',
    description: 'Sıcak modernist kırmızı/mürekkep, asimetrik editoryal düzen',
  },
  {
    id: 'premium',
    label: 'Premium Galeri',
    description: 'Galeri kalitesi, yüksek kontrast, serif/sans çifti, rafine hareket',
  },
  {
    id: 'swiss-modern',
    label: 'İsviçre Modernizmi',
    description: 'Uluslararası tipografik stil, katı 12-kolon ızgara, vermilyon vurgu',
  },
  {
    id: 'warm-minimal',
    label: 'Warm Minimalist',
    description: 'Japandi & Kinfolk, seramik & kireçtaşı dokuları, dingin nefes alan alanlar',
  },
  {
    id: 'neo-brutalist',
    label: 'Mimari Brutalizm',
    description: 'Ham strüktür, 2px tel çerçeve, teknik damgalar, sıfır yapay süsleme',
  },
  {
    id: 'atelier-haute',
    label: 'Haute Atölye',
    description: 'Parisian lüks editoryal, derin kadife, şampanya altın kılcal hatlar',
  },
  {
    id: 'mono-industrial',
    label: 'Mono Endüstriyel',
    description: 'Laboratuvar telemetrisi, saf monospace, koordinat ızgarası, kehribar LED',
  },
  {
    id: 'cyber-minimal',
    label: 'Cyber Minimal',
    description: 'Zifiri OLED siyahı, monolitik bloklar, zümrüt telemetri göstergesi',
  },
];

export const DEFAULT_VISUAL_SYSTEM: VisualSystemId = 'violet-signal';
export const STORAGE_KEY = 'avenox-visual-system';

export type PaletteId =
  | 'midnight'
  | 'graphite'
  | 'forest'
  | 'paper'
  | 'porcelain'
  | 'daylight'
  | 'obsidian'
  | 'sandstone'
  | 'nordic-ice'
  | 'terracotta'
  | 'sage'
  | 'indigo-ink';

export const PALETTES: Array<{ id: PaletteId; label: string; tone: 'dark' | 'light'; swatch: string }> = [
  { id: 'midnight', label: 'Gece', tone: 'dark', swatch: '#111827' },
  { id: 'graphite', label: 'Grafit', tone: 'dark', swatch: '#27272a' },
  { id: 'forest', label: 'Orman', tone: 'dark', swatch: '#17382f' },
  { id: 'paper', label: 'Kağıt', tone: 'light', swatch: '#f7f5f0' },
  { id: 'porcelain', label: 'Porselen', tone: 'light', swatch: '#edf3f2' },
  { id: 'daylight', label: 'Gün Işığı', tone: 'light', swatch: '#ffffff' },
  { id: 'obsidian', label: 'Obsidiyen', tone: 'dark', swatch: '#0b0c10' },
  { id: 'sandstone', label: 'Traverten & Kireçtaşı', tone: 'light', swatch: '#eae5dc' },
  { id: 'nordic-ice', label: 'Kuzey Buzulu', tone: 'light', swatch: '#e2e8f0' },
  { id: 'terracotta', label: 'Terracotta', tone: 'light', swatch: '#f5ebe0' },
  { id: 'sage', label: 'Adaçayı Botanik', tone: 'light', swatch: '#e8ede6' },
  { id: 'indigo-ink', label: 'Mürekkep İndigo', tone: 'dark', swatch: '#0f172a' },
];

export const DEFAULT_PALETTES: Record<VisualSystemId, PaletteId> = {
  'violet-signal': 'midnight',
  raycast: 'graphite',
  resend: 'daylight',
  linear: 'porcelain',
  print: 'paper',
  premium: 'midnight',
  'swiss-modern': 'daylight',
  'warm-minimal': 'sandstone',
  'neo-brutalist': 'paper',
  'atelier-haute': 'obsidian',
  'mono-industrial': 'graphite',
  'cyber-minimal': 'obsidian',
};

export const PALETTE_STORAGE_KEY = 'avenox-palette';
