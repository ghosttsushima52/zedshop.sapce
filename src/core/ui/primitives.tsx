import type { ReactNode } from 'react';

interface SectionHeadingProps {
  /** Eyebrow label (small uppercase), optional */
  eyebrow?: string;
  /** Main title */
  title: string;
  /** Optional body text below title */
  body?: string;
  /** Alignment: start | center */
  align?: 'start' | 'center';
  /** Custom class */
  className?: string;
  /** HTML heading level, defaults to h2 */
  level?: 2 | 3 | 4;
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'start',
  className = '',
  level = 2,
}: SectionHeadingProps) {
  const Tag = `h${level}` as 'h2' | 'h3' | 'h4';
  return (
    <div
      className={`section-heading ${className}`}
      style={{ textAlign: align }}
    >
      {eyebrow && (
        <span className="section-heading__eyebrow">{eyebrow}</span>
      )}
      <Tag className="section-heading__title">{title}</Tag>
      {body && <p className="section-heading__body">{body}</p>}
    </div>
  );
}

// ── MediaFrame ────────────────────────────────────────────────

type AspectRatio = '16-9' | '4-3' | '1-1' | '3-2' | '3-4';

interface MediaFrameProps {
  src?: string;
  alt?: string;
  aspect?: AspectRatio;
  /** Fallback background color or gradient when no src */
  placeholder?: string;
  className?: string;
  children?: ReactNode;
}

export function MediaFrame({
  src,
  alt = '',
  aspect = '16-9',
  placeholder = 'var(--c-bg-subtle)',
  className = '',
  children,
}: MediaFrameProps) {
  return (
    <div
      className={`media-frame media-frame--aspect-${aspect} ${className}`}
      style={{ background: src ? undefined : placeholder }}
    >
      {src && <img src={src} alt={alt} loading="lazy" decoding="async" />}
      {!src && children}
    </div>
  );
}

// ── FilterBar ────────────────────────────────────────────────

interface FilterChip {
  id: string;
  label: string;
}

interface FilterBarProps {
  label?: string;
  chips: FilterChip[];
  active: string;
  onChange: (id: string) => void;
}

export function FilterBar({ label, chips, active, onChange }: FilterBarProps) {
  return (
    <div className="filter-bar" role="group" aria-label={label ?? 'Filtrele'}>
      {label && <span className="filter-bar__label">{label}</span>}
      {chips.map((chip) => (
        <button
          key={chip.id}
          className={`filter-chip${chip.id === active ? ' filter-chip--active' : ''}`}
          aria-pressed={chip.id === active}
          onClick={() => onChange(chip.id)}
          type="button"
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}

// ── ItemGrid ─────────────────────────────────────────────────

interface ItemGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
  style?: React.CSSProperties;
}

export function ItemGrid({ children, columns = 3, className = '', style }: ItemGridProps) {
  return (
    <div className={`item-grid item-grid--${columns} ${className}`} style={style}>
      {children}
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────

interface CardProps {
  title: string;
  meta?: string;
  description?: string;
  price?: string;
  image?: string;
  imageAlt?: string;
  imageAspect?: AspectRatio;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

export function Card({
  title,
  meta,
  description,
  price,
  image,
  imageAlt,
  imageAspect = '16-9',
  href,
  className = '',
  style,
  children,
}: CardProps) {
  const Wrapper = href ? 'a' : 'div';
  return (
    <Wrapper
      className={`card ${className}`}
      href={href}
      style={{ display: 'block', textDecoration: 'none', color: 'inherit', ...style }}
    >
      {image && (
        <MediaFrame src={image} alt={imageAlt ?? title} aspect={imageAspect} />
      )}
      <div className="card__body">
        {meta && <div className="card__meta">{meta}</div>}
        <div className="card__title">{title}</div>
        {description && <div className="card__description">{description}</div>}
        {price && <div className="card__price">{price}</div>}
        {children}
      </div>
    </Wrapper>
  );
}

// ── StatStrip ────────────────────────────────────────────────

interface Stat {
  value: string;
  label: string;
}

interface StatStripProps {
  stats: Stat[];
}

export function StatStrip({ stats }: StatStripProps) {
  return (
    <dl className="stat-strip">
      {stats.map((s) => (
        <div key={s.label} className="stat-strip__item">
          <dt className="stat-strip__label">{s.label}</dt>
          <dd className="stat-strip__value">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

// ── DetailPanel ──────────────────────────────────────────────

interface MetaItem {
  key: string;
  value: string;
}

interface DetailPanelProps {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  imageAspect?: AspectRatio;
  meta?: MetaItem[];
  /** Call-to-action slot */
  cta?: ReactNode;
  children?: ReactNode;
}

export function DetailPanel({
  title,
  description,
  image,
  imageAlt,
  imageAspect = '4-3',
  meta = [],
  cta,
  children,
}: DetailPanelProps) {
  return (
    <div className="detail-panel">
      {image && (
        <div className="detail-panel__image">
          <MediaFrame src={image} alt={imageAlt ?? title} aspect={imageAspect} />
        </div>
      )}
      <div className="detail-panel__content">
        <h1 className="detail-panel__title">{title}</h1>
        {description && (
          <p className="detail-panel__description">{description}</p>
        )}
        {meta.length > 0 && (
          <ul className="detail-panel__meta-list">
            {meta.map((m) => (
              <li key={m.key} className="detail-panel__meta-item">
                <span className="detail-panel__meta-key">{m.key}</span>
                <span className="detail-panel__meta-val">{m.value}</span>
              </li>
            ))}
          </ul>
        )}
        {cta && <div style={{ marginBlockStart: 'var(--sp-4)' }}>{cta}</div>}
        {children}
      </div>
    </div>
  );
}

// ── Button ───────────────────────────────────────────────────

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | string;
  /** If set, renders as <a> */
  href?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const cls = `btn btn--${variant} btn--${size} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls} style={{ display: 'inline-flex', ...rest.style }}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
