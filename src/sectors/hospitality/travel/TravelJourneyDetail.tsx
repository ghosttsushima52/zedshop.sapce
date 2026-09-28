import Link from 'next/link';
import { ArrowLeft, CalendarDays, Clock3, MapPin, Mountain, Users } from 'lucide-react';
import { SiteShell } from '../../../core/layout/SiteShell';
import { EXPEDITION_JOURNEYS } from '../../../content/travel';

export function TravelJourneyDetail({ slug }: { slug: string }) {
  const journey = EXPEDITION_JOURNEYS.find((entry) => entry.slug === slug);

  if (!journey) {
    return (
      <SiteShell brand="Pusula Keşif">
        <section className="hospitality-page-shell">
          <h1>Rota bulunamadı</h1>
          <Link href="/sites/travel/rotalar/"><ArrowLeft size={16} /> Rotalara dön</Link>
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell brand="Pusula Keşif" tagline="Küçük grup, derin saha bilgisi">
      <article className="hospitality-page-shell">
        <Link className="hospitality-back-link" href="/sites/travel/rotalar/"><ArrowLeft size={16} /> Tüm rotalar</Link>
        <div className="hospitality-detail-hero">
          <img src={journey.imageUrl} alt={journey.alt} />
          <div>
            <p className="hospitality-kicker">{journey.region} · {journey.country}</p>
            <h1>{journey.title}</h1>
            <p>{journey.subtitle}</p>
            <dl className="hospitality-fact-grid">
              <div><dt><Clock3 size={15} /> Süre</dt><dd>{journey.duration.text}</dd></div>
              <div><dt><Users size={15} /> Grup</dt><dd>{journey.groupSize.text}</dd></div>
              <div><dt><Mountain size={15} /> Seviye</dt><dd>{journey.difficulty}</dd></div>
              <div><dt><CalendarDays size={15} /> Dönem</dt><dd>{journey.bestSeasons.join(', ')}</dd></div>
            </dl>
          </div>
        </div>
        <div className="hospitality-detail-columns">
          <section>
            <h2>Rota notu</h2>
            <p>{journey.overview}</p>
            <h2>Gün gün saha akışı</h2>
            <ol className="hospitality-itinerary">
              {journey.itinerarySummary.map((day) => (
                <li key={`${day.day}-${day.title}`}><span>{day.day}</span><div><h3>{day.title}</h3><p>{day.description}</p></div></li>
              ))}
            </ol>
          </section>
          <aside className="hospitality-booking-panel">
            <MapPin size={20} aria-hidden="true" />
            <strong>{journey.displayPrice}</strong>
            <p>Kişi başı başlangıç bedeli. Uçuşlar ve kişisel ekipman hariçtir.</p>
            <h3>Dahil olanlar</h3>
            <ul>{journey.included.map((item) => <li key={item}>{item}</li>)}</ul>
            <Link className="btn btn--primary" href="/sites/travel/hazirlik/">Hazırlık rehberini aç</Link>
          </aside>
        </div>
      </article>
    </SiteShell>
  );
}
