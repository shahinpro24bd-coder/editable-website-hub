import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { achievements, doctor, gallery, services, type GalleryItem } from "@/lib/site";
import { Img, T, useEditable } from "@/lib/editable";

const GAL_CATS: Record<GalleryItem["category"], string> = {
  conference: "Conferences",
  training: "Surgical Training",
  portrait: "Portraits",
  travel: "Travel",
};
const pad2 = (n: number) => (n < 10 ? `0${n}` : String(n));

export function PhotoGallery({ mode }: { mode: "home" | "full" }) {
  const source = mode === "home" ? gallery.filter((g) => g.showOnHome) : gallery;
  const [cat, setCat] = useState<"all" | GalleryItem["category"]>("all");
  const list = cat === "all" ? source : source.filter((it) => it.category === cat);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  const safeIdx = list.length ? index % list.length : 0;
  const current = list[safeIdx];

  useEffect(() => {
    setIndex(0);
  }, [cat]);

  useEffect(() => {
    if (paused || hovered || list.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % list.length), 5600);
    return () => clearInterval(id);
  }, [paused, hovered, list.length]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
      else if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + list.length) % list.length);
      else if (e.key === "ArrowRight") setIndex((i) => (i + 1) % list.length);
    };
    document.documentElement.classList.add("pgal-lock");
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("pgal-lock");
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded, list.length]);

  const go = (n: number) => {
    if (!list.length) return;
    setIndex((n + list.length) % list.length);
  };

  if (!current) return null;

  return (
    <section className={`pgal ${paused || hovered ? "is-paused" : ""} ${expanded ? "is-expanded" : ""}`} id="gallery" aria-labelledby="pgal-title">
      <div className="pgal__wrap">
        <div className="pgal__head">
          <div>
            <span className="pgal__kicker">
              <i className="fas fa-images" />
              <T k={mode === "home" ? "home.gallery.kicker" : "about.gallery.kicker"} d={mode === "home" ? "Photo Gallery" : "Gallery"} line />
            </span>
            <h2 className="pgal__title" id="pgal-title">
              {mode === "home" ? (
                <T k="home.gallery.title" d="Moments from the podium, the lab & beyond" />
              ) : (
                <T k="about.gallery.title" d="A closer look at Dr. Afzal's journey" />
              )}
            </h2>
            <p className="pgal__lead">
              <T
                k={mode === "home" ? "home.gallery.lead" : "about.gallery.lead"}
                d={
                  mode === "home"
                    ? "Conferences, hands-on surgical training and travels of Dr. Md. Afzal Mahfuzullah — swipe, use the arrows or tap a photo to view it full screen."
                    : "From the BVRS and APVRS 2026 podiums to advanced vitreo-retina training and days abroad. Pick a collection, swipe through, or tap a photo for full screen."
                }
              />
            </p>
          </div>
          <div className="pgal__meta">
            <div className="pgal__stat">
              <b>{gallery.length}</b>
              <span><T k="gal.stat.photos" d="Photos" line /></span>
            </div>
            <div className="pgal__sep" />
            {mode === "home" ? (
              <Link className="pgal__more" to="/about" hash="gallery">
                Full gallery <i className="fas fa-arrow-right" />
              </Link>
            ) : (
              <div className="pgal__stat">
                <b>04</b>
                <span><T k="gal.stat.coll" d="Collections" line /></span>
              </div>
            )}
          </div>
        </div>

        {mode === "full" && (
          <div className="pgal__filters" role="tablist" aria-label="Filter photos">
            <button type="button" role="tab" className={`pgal__chip ${cat === "all" ? "is-active" : ""}`} aria-selected={cat === "all"} onClick={() => setCat("all")}>
              All <span>{source.length}</span>
            </button>
            {(Object.keys(GAL_CATS) as GalleryItem["category"][]).map((k) => (
              <button key={k} type="button" role="tab" className={`pgal__chip ${cat === k ? "is-active" : ""}`} aria-selected={cat === k} onClick={() => setCat(k)}>
                <i className={`pgal__dot pgal--${k}`} />
                {GAL_CATS[k]} <span>{source.filter((it) => it.category === k).length}</span>
              </button>
            ))}
          </div>
        )}

        <div className="pgal__viewer" role="region" aria-roledescription="carousel" aria-label="Photo slideshow">
          <div
            className="pgal__stage"
            tabIndex={0}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="pgal__slides">
              <figure className="pgal__slide is-active is-loaded" key={current.id}>
                <div className="pgal__backdrop" style={{ backgroundImage: `url(${current.thumb || current.image})` }} />
                <div className="pgal__frame" onClick={() => !expanded && setExpanded(true)}>
                  <img src={current.image} alt={`${current.title} — ${current.place}`} decoding="async" />
                </div>
              </figure>
            </div>
            <div className="pgal__shade" aria-hidden="true" />
            <div className="pgal__bar" aria-hidden="true"><i key={`${current.id}-${safeIdx}`} /></div>
            <div className="pgal__tools">
              <button type="button" className="pgal__tool pgal__play" aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused((p) => !p)}>
                <i className={`fas ${paused ? "fa-play" : "fa-pause"}`} />
              </button>
              <button type="button" className="pgal__tool pgal__full" aria-label={expanded ? "Exit full screen" : "View full screen"} onClick={() => setExpanded((e) => !e)}>
                <i className={`fas ${expanded ? "fa-compress" : "fa-expand"}`} />
              </button>
            </div>
            <button type="button" className="pgal__nav pgal__nav--prev" aria-label="Previous photo" onClick={() => go(safeIdx - 1)}>
              <i className="fas fa-arrow-left" />
            </button>
            <button type="button" className="pgal__nav pgal__nav--next" aria-label="Next photo" onClick={() => go(safeIdx + 1)}>
              <i className="fas fa-arrow-right" />
            </button>
            <div className="pgal__caption is-in" aria-live="polite">
              <span className="pgal__tag">
                <i className={`pgal__dot pgal--${current.category}`} />
                {GAL_CATS[current.category]}
              </span>
              <h3>{current.title}</h3>
              <p><i className="fas fa-map-marker-alt" />{current.place}</p>
            </div>
            <div className="pgal__count" aria-hidden="true">
              <b>{pad2(safeIdx + 1)}</b>
              <span>/ {pad2(list.length)}</span>
            </div>
          </div>
          <div className="pgal__strip" ref={stripRef}>
            <div className="pgal__thumbs" role="tablist" aria-label="Choose photo">
              {list.map((it, i) => (
                <button
                  key={it.id}
                  type="button"
                  role="tab"
                  className={`pgal__thumb ${i === safeIdx ? "is-active" : ""}`}
                  aria-selected={i === safeIdx}
                  aria-label={`Show photo ${i + 1}: ${it.title}`}
                  onClick={() => go(i)}
                >
                  <img alt="" loading="lazy" decoding="async" src={it.thumb || it.image} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function YouTubeLite({
  ytId,
  thumb,
  title,
  duration,
  className = "ytframe ytlite",
}: {
  ytId: string;
  thumb: string;
  title: string;
  duration?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const { edit } = useEditable();

  if (playing && !edit) {
    return (
      <div className={className}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: 0 }}
        />
      </div>
    );
  }

  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
      aria-label={`Play video: ${title}`}
      onClick={() => !edit && setPlaying(true)}
      onKeyDown={(e) => {
        if (!edit && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setPlaying(true);
        }
      }}
    >
      <img src={thumb} alt={title} loading="lazy" decoding="async" width={960} height={540} />
      <span aria-hidden="true" className="ytplay" />
      {duration ? <span className="vm-dur">{duration}</span> : null}
    </div>
  );
}

export function ServicesGrid() {
  const { edit } = useEditable();
  return (
    <div className="container-fluid py-5 bg-light svc-showcase">
      <span aria-hidden="true" className="svc-iris svc-iris--left" />
      <span aria-hidden="true" className="svc-iris svc-iris--right" />
      <span aria-hidden="true" className="svc-dots" />
      <div className="container position-relative">
        <div className="text-center mb-4 svc-head">
          <span className="d-inline-block px-4 py-2 mb-3 rounded-pill section-badge">
            <i className="fas fa-stethoscope me-2" />
            <T k="services.badge" d="Our Services" line />
          </span>
          <h1 className="mb-3">
            <T k="services.heading" d="Comprehensive Eye Care Treatment" />
          </h1>
          <p className="svc-sub">
            <T
              k="services.sub"
              d="From routine eye checkups to advanced retina and cataract surgery — specialist care for every stage of your vision."
            />
          </p>
          <div aria-hidden="true" className="svc-divider"><span /><i className="fas fa-eye" /><span /></div>
        </div>
        <div className="row g-4">
          <div className="serrr15">
            {services.map((s, idx) => (
              <div className={s.cardClass || "serrr11"} key={s.slug}>
                <div className={s.imgWrapClass || "serrr12"}>
                  <Img k={`services.${idx}.image`} d={s.image} alt={s.title} loading="eager" />
                </div>
                <h3><T k={`services.${idx}.title`} d={s.title} line /></h3>
                <p className="svc-desc"><T k={`services.${idx}.summary`} d={s.summary} /></p>
                <Link className="serrr13" to="/contact" hash="appointment" onClick={(e) => edit && e.preventDefault()}>
                  <span><T k={`services.${idx}.cta`} d={s.cta} line /></span>
                  <i aria-hidden="true" className="fas fa-arrow-right svc-arrow" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AchievementsSection() {
  const { edit, get } = useEditable();
  const [lbIdx, setLbIdx] = useState<number | null>(null);

  useEffect(() => {
    if (lbIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLbIdx(null);
      else if (e.key === "ArrowLeft") setLbIdx((i) => ((i ?? 0) + achievements.length - 1) % achievements.length);
      else if (e.key === "ArrowRight") setLbIdx((i) => ((i ?? 0) + 1) % achievements.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lbIdx]);

  return (
    <section className="ach2" id="recent-achievement">
      <div className="container">
        <div className="ach2__head">
          <div>
            <span className="ach2__eyebrow"><T k="ach.eyebrow" d="Recent Achievements · 2026" line /></span>
            <h2 className="ach2__title"><T k="ach.title" d="Honoured on the Asia-Pacific stage" /></h2>
          </div>
          <p className="ach2__lead">
            <T
              k="ach.lead"
              d="Two milestones from the APVRS 2026 Congress in Gold Coast, Australia — bringing world-class retina care back to patients in Dhaka."
            />
          </p>
        </div>
        <div className="ach2__grid">
          {achievements.length === 0 && edit && <p className="text-muted">No achievements yet — add one from the admin panel.</p>}
          {achievements.map((a, idx) => (
            <article className="ach2__card" key={a.id}>
              <a
                className="ach2__photo"
                href={a.fullImg}
                onClick={(e) => {
                  e.preventDefault();
                  if (!edit) setLbIdx(idx);
                }}
              >
                <Img k={`achievements.${idx}.img`} d={a.img} alt={a.title} loading="eager" />
                <span className="ach2__tag"><T k={`achievements.${idx}.tag`} d={a.tag} line /></span>
              </a>
              <div className="ach2__content">
                <div className="ach2__icon"><i className={`fas ${a.icon}`} /></div>
                <h3><T k={`achievements.${idx}.title`} d={a.title} /></h3>
                <p className="ach2__meta"><T k={`achievements.${idx}.meta`} d={a.meta} line /></p>
                <p><T k={`achievements.${idx}.desc`} d={a.desc} /></p>
                {(a.quote || edit) && <blockquote><T k={`achievements.${idx}.quote`} d={a.quote} /></blockquote>}
                <div className="ach2__foot">
                  <span><i className={`fas ${a.footIcon}`} /> <T k={`achievements.${idx}.footText`} d={a.footText} line /></span>
                  {a.link && (
                    <a href={a.link} rel="noopener noreferrer" target="_blank">
                      View post <i className="fas fa-arrow-right" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {lbIdx !== null && achievements[lbIdx] && (
        <div
          aria-hidden="false"
          aria-label="Photo viewer"
          className="achv-lb is-open"
          role="dialog"
          onClick={(e) => e.target === e.currentTarget && setLbIdx(null)}
        >
          <button aria-label="Close" className="achv-lb__close" type="button" onClick={() => setLbIdx(null)}>
            <i className="fas fa-times" />
          </button>
          <button aria-label="Previous photo" className="achv-lb__nav achv-lb__nav--prev" type="button" onClick={() => setLbIdx((lbIdx + achievements.length - 1) % achievements.length)}>
            <i className="fas fa-chevron-left" />
          </button>
          <figure className="achv-lb__fig">
            <img
              src={achievements[lbIdx]!.fullImg || achievements[lbIdx]!.img}
              alt={achievements[lbIdx]!.title}
            />
            <figcaption>{achievements[lbIdx]!.title}</figcaption>
          </figure>
          <button aria-label="Next photo" className="achv-lb__nav achv-lb__nav--next" type="button" onClick={() => setLbIdx((lbIdx + 1) % achievements.length)}>
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      )}
    </section>
  );
}

export function PremiumCta() {
  return (
    <div className="premium-cta-section container-fluid py-5">
      <div className="cta-bg-blur-1" />
      <div className="cta-bg-blur-2" />
      <div className="container">
        <div className="premium-cta-card">
          <h2><T k="cta.title" d="Take the First Step Toward Better Vision" /></h2>
          <p className="description">
            <T
              k="cta.desc"
              d={`Book your consultation with ${doctor.name} and receive expert eye care tailored to your needs.`}
            />
          </p>
          <div className="cta-btn-group">
            <a className="btn-cta-call" href={doctor.phoneHref}>
              <i className="fas fa-phone-alt me-2" />
              <T k="cta.btn" d="Call for Appointment" line />
            </a>
          </div>
          <div className="cta-trust-grid">
            <div className="cta-trust-badge"><i className="fas fa-check-circle" /><span><T k="cta.t1" d="Fellow — Retina & Vitreous (IEH)" line /></span></div>
            <div className="cta-trust-badge"><i className="fas fa-check-circle" /><span><T k="cta.t2" d="Fellowship in Vitreo-Retina (Bangladesh & India)" line /></span></div>
            <div className="cta-trust-badge"><i className="fas fa-check-circle" /><span><T k="cta.t3" d="Associate Professor, Bangladesh Medical University (BMU)" line /></span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppointmentForm() {
  const { edit } = useEditable();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [service, setService] = useState(services[0]?.title ?? "Cataract Surgery");
  const [visitType, setVisitType] = useState("New Patient");
  const [preferredDate, setPreferredDate] = useState("");
  const [details, setDetails] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (edit) return;
    if (!name.trim() || !phone.trim() || !details.trim()) {
      toast.error("Please fill in your name, phone number, and symptoms/message.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 6) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("appointment_requests").insert({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || null,
      age: age.trim() || null,
      service,
      visit_type: visitType,
      preferred_date: preferredDate || null,
      details: details.trim(),
    });
    setBusy(false);
    if (error) {
      toast.error("Could not submit request: " + error.message);
      return;
    }
    setSent(true);
    setName("");
    setPhone("");
    setEmail("");
    setAge("");
    setPreferredDate("");
    setDetails("");
    toast.success("Appointment request submitted! Our assistant will call you shortly.");
  };

  return (
    <div className="appo4" style={{ border: "2px dashed var(--bs-primary)" }}>
      <div className="appo5">
        <h2><i className="fas fa-calendar-check me-2" /><T k="contact.form.title" d="Request an Appointment" line /></h2>
        <p><T k="contact.form.sub" d={`Submit your details online or call ${doctor.phone} directly`} line /></p>
      </div>
      <div className="appo6">
        {sent ? (
          <div className="text-center py-4">
            <i className="fas fa-check-circle text-success mb-3" style={{ fontSize: "3rem" }} />
            <h4 className="mb-2"><T k="appt.done.title" d="Request Received" line /></h4>
            <p className="text-muted mb-4">
              Thank you! Your appointment request has been sent to {doctor.name}&apos;s team. For urgent eye emergencies, please call <a href={doctor.phoneHref}>{doctor.phone}</a>.
            </p>
            <button type="button" className="btn btn-primary" onClick={() => setSent(false)}>
              Book Another Appointment
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-bold"><T k="appt.f.0" d="Patient Name *" line /></label>
                <input className="form-control" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold"><T k="appt.f.1" d="Phone Number *" line /></label>
                <input className="form-control" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01XXXXXXXXX" />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold"><T k="appt.f.2" d="Email (optional)" line /></label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold"><T k="appt.f.3" d="Patient Age" line /></label>
                <input className="form-control" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 52 years" />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold"><T k="appt.f.4" d="Eye Care Service" line /></label>
                <select className="form-select" value={service} onChange={(e) => setService(e.target.value)}>
                  {services.map((s) => (
                    <option key={s.slug} value={s.title}>{s.title}</option>
                  ))}
                  <option value="Other / General Consultation">Other / General Consultation</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold"><T k="appt.f.5" d="Visit Type" line /></label>
                <select className="form-select" value={visitType} onChange={(e) => setVisitType(e.target.value)}>
                  <option value="New Patient">New Patient</option>
                  <option value="Follow-up Visit">Follow-up Visit</option>
                  <option value="Surgery Consultation">Surgery Consultation</option>
                  <option value="Second Opinion">Second Opinion</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold"><T k="appt.f.6" d="Preferred Date (Sat–Thu)" line /></label>
                <input type="date" className="form-control" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold"><T k="appt.f.7" d="Eye Symptoms / Message *" line /></label>
                <textarea className="form-control" rows={3} required value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Briefly describe your eye concern or previous report details…" />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary w-100 py-3 fw-bold" disabled={busy}>
                  <i className="fas fa-paper-plane me-2" />
                  {busy ? "Submitting…" : "Submit Appointment Request"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}