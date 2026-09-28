import { CalendarDays, Compass } from 'lucide-react';
import { SiteShell } from '../../../core/layout/SiteShell';
import { SEASONAL_PROGRAMMING } from '../../../content/travel';

export function TravelSeasons() {
  return (
    <SiteShell brand="Pusula Keşif" tagline="Mevsimlere göre tasarlanmış küçük grup seferleri">
      <section className="hospitality-page-shell">
        <header className="hospitality-page-header">
          <span className="section-heading__eyebrow">Sefer takvimi</span>
          <h1>Coğrafyanın açıldığı doğru an</h1>
          <p>Rotaları takvime değil; geçitlerin, göçlerin ve iklim pencerelerinin ritmine göre planlıyoruz.</p>
        </header>
        <div className="hospitality-card-grid">
          {SEASONAL_PROGRAMMING.map((window) => (
            <article className="hospitality-info-card" key={window.season}>
              <CalendarDays aria-hidden="true" size={20} />
              <p className="hospitality-kicker">{window.months}</p>
              <h2>{window.season}</h2>
              <p>{window.focus}</p>
              <p className="hospitality-muted">{window.climateContext}</p>
              <ul>
                {window.featuredJourneys.map((journey) => <li key={journey}><Compass size={14} aria-hidden="true" /> {journey}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

