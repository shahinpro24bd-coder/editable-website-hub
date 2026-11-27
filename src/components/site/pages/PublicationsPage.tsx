import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { doctor, publications, type PublicationItem } from "@/lib/site";
import { Img, T } from "@/lib/editable";

const TOPICS: [string, string][] = [
  ["all", "All"],
  ["retina", "Retina"],
  ["glaucoma", "Glaucoma"],
  ["covid", "COVID-19 & Eye"],
  ["refractive", "Refractive"],
  ["pediatric", "Paediatric"],
  ["surface", "Ocular Surface"],
  ["case", "Case Reports"],
];

const TOPIC_LABEL: Record<string, string> = Object.fromEntries(TOPICS);

function HighlightedAuthors({ text }: { text: string }) {
  const parts = text.split(/(Mahfuzullah MA)/g);
  return (
    <>
      {parts.map((part, idx) =>
        part === "Mahfuzullah MA" ? (
          <mark className="pub-me" key={idx}>{part}</mark>
        ) : (
          <span key={idx}>{part}</span>
        ),
      )}
    </>
  );
}

export function PublicationsPage() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const [firstOnly, setFirstOnly] = useState(false);

  const sorted = [...publications].sort((a, b) => b.year - a.year);

  const q = query.trim().toLowerCase();
  const filtered = sorted.filter((p) => {
    const okTopic = topic === "all" || p.topics.includes(topic);
    const okFirst = !firstOnly || p.firstAuthor;
    const hay = `${p.title} ${p.authors} ${p.journal} ${p.year} ${p.kind}`.toLowerCase();
    return okTopic && okFirst && (!q || hay.includes(q));
  });

  const map = new Map<number, { item: PublicationItem; num: number }[]>();
  const total = sorted.length;
  sorted.forEach((p, idx) => {
    if (!filtered.includes(p)) return;
    const list = map.get(p.year) ?? [];
    list.push({ item: p, num: total - idx });
    map.set(p.year, list);
  });
  const groupedByYear = Array.from(map.entries()).sort((a, b) => b[0] - a[0]);

  const firstAuthorCount = publications.filter((p) => p.firstAuthor).length;
  const journalCount = new Set(publications.map((p) => p.journal.trim().toLowerCase())).size;
  const minYear = publications.length ? Math.min(...publications.map((p) => p.year)) : 2015;
  const maxYear = publications.length ? Math.max(...publications.map((p) => p.year)) : 2026;

  return (
    <main className="pub" id="publications">
      <section className="pub-hero">
        <div className="pub-hero__rings" aria-hidden="true" />
        <div className="pub-hero__grid-bg" aria-hidden="true" />
        <div className="container pub-hero__inner">
          <div className="pub-hero__copy">
            <nav aria-label="breadcrumb" className="pub-crumbs">
              <Link to="/"><T k="crumb.home" d="Home" line /></Link>
              <i className="fas fa-chevron-right" />
              <span><T k="crumb.publications" d="Publications" line /></span>
            </nav>
            <span className="pub-eyebrow">
              <span className="pub-eyebrow__dot" />
              <T k="pub.hero.eyebrow" d="Research & Scholarship" line />
            </span>
            <h1 className="pub-hero__title">
              <T k="pub.hero.title" d="Research that helps us see further." />
            </h1>
            <p className="pub-hero__lead">
              <T
                k="pub.hero.lead"
                d={`Peer-reviewed papers, case reports and conference work by ${doctor.name} — Associate Professor (Vitreo-Retina), Bangladesh Medical University.`}
              />
            </p>
            <div className="pub-stats">
              <div className="pub-stat"><b>{publications.length}</b><span><T k="pub.stat.0" d="Publications" line /></span></div>
              <div className="pub-stat"><b>{firstAuthorCount}</b><span><T k="pub.stat.1" d="As first author" line /></span></div>
              <div className="pub-stat"><b>{journalCount}</b><span><T k="pub.stat.2" d="Journals" line /></span></div>
              <div className="pub-stat pub-stat--wide"><b>{minYear}–{String(maxYear).slice(-2)}</b><span><T k="pub.stat.3" d="Years of research" line /></span></div>
            </div>
            <a className="pub-btn pub-btn--primary" href="#library">
              Browse publications<i className="fas fa-arrow-down" />
            </a>
          </div>
          <div className="pub-hero__visual">
            <figure className="pub-portrait">
              <Img k="pub.hero.portrait" d="/site/images/doctor-main.webp" alt={doctor.name} width={900} height={900} />
            </figure>
            <div className="pub-float pub-float--a">
              <i className="fas fa-trophy" />
              <div><b><T k="pub.hon.0.t" d="Best Abstract Award" line /></b><span><T k="pub.hon.0.d" d="APVRS · Gold Coast 2026" line /></span></div>
            </div>
            <div className="pub-float pub-float--b">
              <i className="fas fa-medal" />
              <div><b><T k="pub.hon.1.t" d="M A Matin Gold Medal" line /></b><span><T k="pub.hon.1.d" d="Best research · OSB 2021" line /></span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="pub-honors container">
        <article className="pub-honor pub-honor--feature">
          <Img k="pub.honor.img" d="/site/images/achievements/apvrs2026-award-ceremony-sm.webp" alt="Dr. Afzal receiving the Best Abstract Award at APVRS 2026" loading="lazy" />
          <div className="pub-honor__body">
            <span className="pub-honor__year">2026</span>
            <h3><T k="pub.honor1.t" d="Best Abstract Award" line /></h3>
            <p><T k="pub.honor1.d" d="Asia Pacific Vitreo-Retina Society Congress, Gold Coast, Australia" /></p>
          </div>
        </article>
        <article className="pub-honor">
          <i className="fas fa-medal" />
          <span className="pub-honor__year">2021</span>
          <h3><T k="pub.honor2.t" d="M A Matin Gold Medal" line /></h3>
          <p><T k="pub.honor2.d" d="Best research work — Ophthalmological Society of Bangladesh Conference" /></p>
        </article>
        <article className="pub-honor">
          <i className="fas fa-award" />
          <span className="pub-honor__year">2017</span>
          <h3><T k="pub.honor3.t" d="Best Paper Award" line /></h3>
          <p><T k="pub.honor3.d" d="Ophthalmological Society of Bangladesh (OSB) Conference" /></p>
        </article>
      </section>

      <section className="pub-library container" id="library">
        <header className="pub-library__head">
          <div>
            <span className="pub-eyebrow pub-eyebrow--light"><span className="pub-eyebrow__dot" /><T k="pub.lib.eyebrow" d="Library" line /></span>
            <h2><T k="pub.lib.title" d="All publications" line /></h2>
          </div>
          <p><T k="pub.lib.sub" d="Dr. Afzal's name is highlighted in every author list. Filter by subject or search by title, journal or co-author." /></p>
        </header>

        <div className="pub-toolbar">
          <label className="pub-search">
            <i className="fas fa-search" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, journal, co-author…"
              aria-label="Search publications"
            />
          </label>
          <div className="pub-chips" role="group" aria-label="Filter by subject">
            {TOPICS.map(([k, label]) => (
              <button
                key={k}
                type="button"
                className={`pub-chip ${topic === k ? "is-active" : ""}`}
                aria-pressed={topic === k}
                onClick={() => setTopic(k)}
              >
                <T k={`pub.topic.${k}`} d={label} line />
              </button>
            ))}
          </div>
          <div className="pub-toolbar__end">
            <label className="pub-toggle">
              <input type="checkbox" checked={firstOnly} onChange={(e) => setFirstOnly(e.target.checked)} />
              <span className="pub-toggle__track"><span /></span>
              <T k="pub.firstOnly" d="First author only" line />
            </label>
            <span className="pub-count" aria-live="polite">{filtered.length} of {publications.length}</span>
          </div>
        </div>

        <div className="pub-timeline">
          {groupedByYear.map(([year, items]) => (
            <div className="pub-year" key={year}>
              <div className="pub-year__label">
                <span>{year}</span>
                <small><b className="pub-year__count">{items.length}</b> {items.length === 1 ? <T k="pub.paper" d="paper" line /> : <T k="pub.papers" d="papers" line />}</small>
              </div>
              <div className="pub-year__list">
                {items.map(({ item: p, num }) => (
                  <article className="pub-card is-in" key={p.id}>
                    <div className="pub-card__no">{String(num).padStart(2, "0")}</div>
                    <div className="pub-card__body">
                      <div className="pub-card__meta">
                        <span className="pub-kind">{p.kind}</span>
                        {p.topics.map((t) => (
                          <span key={t} className={`pub-tag pub-tag--${t}`}><T k={`pub.topic.${t}`} d={TOPIC_LABEL[t] ?? t} line /></span>
                        ))}
                        {p.firstAuthor && (
                          <span className="pub-first"><i className="fas fa-star" /><T k="pub.first" d="First author" line /></span>
                        )}
                      </div>
                      <h3 className="pub-card__title">{p.title}</h3>
                      <p className="pub-card__authors"><HighlightedAuthors text={p.authors} /></p>
                      <div className="pub-card__foot">
                        <span className="pub-journal">
                          <i className="fas fa-book-medical" />
                          <span><strong>{p.journal}</strong>{p.citation ? ` · ${p.citation}` : ""}</span>
                        </span>
                        {p.url ? (
                          <a className="pub-link" href={p.url} target="_blank" rel="noopener noreferrer">
                            <T k="pub.read" d="Read paper" line /><i className="fas fa-arrow-right" />
                          </a>
                        ) : (
                          <span className="pub-link pub-link--muted"><i className="fas fa-book-open" /><T k="pub.inprint" d="In print" line /></span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="pub-empty">
            <i className="fas fa-search" />
            <h3><T k="pub.empty.t" d="No publications match" line /></h3>
            <p><T k="pub.empty.d" d="Try another subject or clear your search." line /></p>
            <button
              type="button"
              className="pub-btn pub-btn--ghost"
              onClick={() => { setQuery(""); setTopic("all"); setFirstOnly(false); }}
            >
              <T k="pub.clear" d="Clear filters" line />
            </button>
          </div>
        )}
      </section>

      <section className="pub-cta container">
        <div className="pub-cta__card">
          <div>
            <h2><T k="pub.cta.title" d="Research collaboration or a patient referral?" /></h2>
            <p><T k="pub.cta.sub" d="Reach Dr. Afzal's team for academic work, second opinions or retina consultations." /></p>
          </div>
          <Link className="pub-btn pub-btn--primary" to="/contact" hash="appointment">
            Contact Dr. Afzal<i className="fas fa-arrow-right" />
          </Link>
        </div>
      </section>
    </main>
  );
}