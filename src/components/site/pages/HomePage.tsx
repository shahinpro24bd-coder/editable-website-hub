import { Link } from "@tanstack/react-router";
import { credentialsHome, doctor, homeVideoIds, testimonials, videos } from "@/lib/site";
import { Img, T } from "@/lib/editable";
import {
  AchievementsSection,
  PhotoGallery,
  PremiumCta,
  ServicesGrid,
  YouTubeLite,
} from "@/components/site/SharedSections";

const marqueeItems = [
  "Vitreo-Retina Surgery",
  "Phaco Cataract Surgery",
  "Diabetic Retinopathy",
  "Retinal Detachment",
  "Macular Disease",
  "Glaucoma Management",
  "Comprehensive Eye Checkup",
];

export function HomePage() {
  const homeVids = homeVideoIds
    .map((id) => videos.find((v) => v.ytId === id))
    .filter((v): v is NonNullable<typeof v> => !!v);
  const extraVids = videos.filter((v) => !homeVids.some((h) => h.id === v.id));
  const displayVids = [...homeVids, ...extraVids].slice(0, 4);
  const loopReviews = [...testimonials, ...testimonials];

  return (
    <>
      {/* Hero */}
      <section className="nhero">
        <div className="container">
          <div className="nhero__inner">
            <div className="nhero__copy">
              <div className="nhero__eyebrow">
                <span className="nhero__dot" />
                <T k="home.hero.eyebrow" d={`${doctor.hospital}, ${doctor.address}`} line />
              </div>
              <h1>
                <span className="nhero__thin">
                  <T k="home.hero.thin" d="Vitreo-Retina & Phaco Surgery" line />
                </span>
                Dr. <span className="nhero__grad"><T k="home.hero.name" d={doctor.name.replace(/^Dr\.\s*/i, "")} line /></span>
              </h1>
              <div className="nhero__ack">
                <div className="nhero__rule" />
                <span className="nhero__gold">
                  <i className="fas fa-medal" />
                  <T k="home.hero.badge" d="Gold Medalist" line />
                </span>
              </div>
              <p className="nhero__lead">
                <T
                  k="home.hero.lead"
                  d="MBBS, MCPS, FCPS (Ophthalmology) — Fellow in Retina & Vitreous (IEH), Fellowship in Vitreo-Retina (Bangladesh & India). Associate Professor (Vitreo-Retina), Department of Ophthalmology, Bangladesh Medical University (BMU) & Consultant Ophthalmologist, Vision Eye Hospital, 299, Green Road, Dhaka. Joint Secretary General, Bangladesh Vitreo-Retina Society (BVRS). Cataract, Retina & Laser surgery."
                />
              </p>
              <div className="nhero__cta">
                <a className="nhero__btn nhero__btn--primary" href={doctor.phoneHref}>
                  Call: {doctor.phone} <i className="fas fa-arrow-right" />
                </a>
                <a className="nhero__btn nhero__btn--ghost" href={doctor.assistantHref}>
                  <i className="fas fa-user-md" /> Dr Assistant: {doctor.assistantPhone}
                </a>
              </div>
              <div className="nhero__facts">
                <div className="nhero__fact">
                  <i className="fas fa-id-badge" />
                  <div>
                    <strong><T k="home.hero.bmdc" d="BMDC Reg" line /></strong>
                    <small>{doctor.bmdc}</small>
                  </div>
                </div>
                <div className="nhero__fact">
                  <i className="fas fa-clock" />
                  <div>
                    <strong><T k="home.hero.fact2.t" d="Sat – Thu Chamber" line /></strong>
                    <small><T k="home.hero.fact2.s" d="Evening chamber · Friday Closed" line /></small>
                  </div>
                </div>
                <div className="nhero__fact">
                  <i className="fas fa-mobile-alt" />
                  <div>
                    <strong>{doctor.phone}</strong>
                    <small><T k="home.hero.callc" d="Call Centre" line /></small>
                  </div>
                </div>
              </div>
            </div>

            <div className="nhero__visual">
              <div className="nhero__stack">
                <div className="nhero__ring nhero__ring--a" />
                <div className="nhero__ring nhero__ring--b" />
                <div className="nhero__frame">
                  <Img
                    k="home.hero.portrait"
                    d="/site/images/doctor-main.webp"
                    alt={`${doctor.name} - ${doctor.shortTitle}`}
                  />
                </div>
                <div className="nhero__chip nhero__chip--1">
                  <i className="fas fa-user-md" />
                  <div>
                    <T k="home.chip1.t" d="MBBS, MCPS, FCPS" line />
                    <small><T k="home.chip1.s" d="Associate Professor (Vitreo-Retina), BMU" line /></small>
                  </div>
                </div>
                <div className="nhero__chip nhero__chip--2">
                  <i className="fas fa-eye" />
                  <div>
                    <T k="home.chip2.t" d="Cataract · Retina · Laser" line />
                    <small><T k="home.chip2.s" d="ROP screening & vitreo-retina surgery" line /></small>
                  </div>
                </div>
                <div className="nhero__chip nhero__chip--3">
                  <i className="fas fa-map-marker-alt" />
                  <div>
                    {doctor.address}
                    <small>{doctor.hospital}</small>
                  </div>
                </div>
              </div>
              <div className="nhero__train">
                <div className="nhero__train__head">
                  <i className="fas fa-graduation-cap" /> <T k="home.train.head" d="Advanced Training" line />
                </div>
                <ul className="nhero__train__list">
                  <li className="nhero__train__row">
                    <span><T k="home.train.0.t" d="Vitreo Retina Surgery" line /></span>
                    <em><T k="home.train.0.p" d="Gold Coast, Australia" line /></em>
                  </li>
                  <li className="nhero__train__row">
                    <span><T k="home.train.1.t" d="Phaco Surgery" line /></span>
                    <em><T k="home.train.1.p" d="India" line /></em>
                  </li>
                  <li className="nhero__train__row">
                    <span><T k="home.train.2.t" d="Vitreo Retina Surgery" line /></span>
                    <em><T k="home.train.2.p" d="India" line /></em>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="nhero__marquee">
            <div className="nhero__track">
              {[...marqueeItems, ...marqueeItems].map((m, i) => (
                <span key={`${m}-${i}`}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Book Appointment & Chamber Map */}
      <div className="container-fluid py-5" style={{ background: "#f8f7f3" }}>
        <div className="container">
          <div className="text-center mb-5">
            <span
              className="d-inline-block px-4 py-2 mb-3 rounded-pill"
              style={{ background: "rgba(4,99,250,0.12)", color: "var(--bs-primary)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase" }}
            >
              <i className="fas fa-calendar-check me-2" />
              <T k="home.appt.badge" d="Book Appointment" line />
            </span>
            <h2 className="fw-bold mb-2" style={{ fontSize: "2rem" }}>
              <T k="home.appt.title" d={`Reach ${doctor.name} — ${doctor.shortTitle}`} />
            </h2>
            <p className="text-muted mx-auto" style={{ maxWidth: 520, fontSize: "0.95rem" }}>
              <T
                k="home.appt.sub"
                d={`Appointment at ${doctor.hospital}, ${doctor.address} — retina, vitreous and phaco cataract surgery.`}
              />
            </p>
          </div>
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-5">
              {[
                { href: doctor.phoneHref, border: "var(--bs-primary)", bg: "linear-gradient(135deg,var(--bs-primary),#0463FA)", icon: "fas fa-list-ol", label: "Appointment Hotline", value: doctor.phone, tint: "rgba(4,99,250,0.1)", color: "var(--bs-primary)" },
                { href: doctor.assistantHref, border: "#0d9488", bg: "linear-gradient(135deg,#0f766e,#14b8a6)", icon: "fas fa-mobile-alt", label: "Dr Assistant", value: doctor.assistantPhone, tint: "rgba(13,148,136,0.1)", color: "#0d9488" },
                { href: `mailto:${doctor.email}`, border: "#EA4335", bg: "linear-gradient(135deg,#EA4335,#FBBC04)", icon: "fas fa-envelope", label: "Email Us", value: doctor.email, tint: "rgba(234,67,53,0.1)", color: "#EA4335" },
                { href: doctor.facebook, border: "#1877F2", bg: "linear-gradient(135deg,#1877F2,#42B2F5)", icon: "fab fa-facebook-f", label: "Follow on Facebook", value: doctor.name, tint: "rgba(24,119,242,0.1)", color: "#1877F2", ext: true },
                { href: doctor.youtube, border: "#FF0000", bg: "linear-gradient(135deg,#c4302b,#ff4b3e)", icon: "fab fa-youtube", label: "Watch on YouTube", value: doctor.youtubeLabel, tint: "rgba(255,0,0,0.09)", color: "#c4302b", ext: true },
                { href: doctor.linkedin, border: "#0A66C2", bg: "linear-gradient(135deg,#0a66c2,#3f9ae0)", icon: "fab fa-linkedin-in", label: "Connect on LinkedIn", value: doctor.name, tint: "rgba(10,102,194,0.1)", color: "#0a66c2", ext: true },
                { href: doctor.whatsappHref, border: "#25D366", bg: "linear-gradient(135deg,#128C7E,#25D366)", icon: "fab fa-whatsapp", label: "WhatsApp", value: doctor.whatsapp, tint: "rgba(37,211,102,0.12)", color: "#128C7E", ext: true },
              ].map((row) => (
                <a
                  key={row.label}
                  className="appt-row d-flex align-items-center gap-3 p-3 mb-3 rounded-3 text-decoration-none"
                  href={row.href}
                  target={row.ext ? "_blank" : undefined}
                  rel={row.ext ? "noopener noreferrer" : undefined}
                  style={{ background: "#fff", borderLeft: `5px solid ${row.border}`, boxShadow: "0 3px 18px rgba(0,0,0,0.06)" }}
                >
                  <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ width: 54, height: 54, background: row.bg }}>
                    <i className={`${row.icon} text-white`} style={{ fontSize: "1.25rem" }} />
                  </div>
                  <div className="flex-grow-1 min-w-0">
                    <div style={{ fontSize: "0.7rem", letterSpacing: "1.2px", textTransform: "uppercase", color: "#999", fontWeight: 700 }}>{row.label}</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#222", wordBreak: "break-word" }}>{row.value}</div>
                  </div>
                  <span className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0" style={{ width: 30, height: 30, background: row.tint }}>
                    <i className="fas fa-chevron-right" style={{ fontSize: "0.7rem", color: row.color }} />
                  </span>
                </a>
              ))}

              <div className="rounded-3 overflow-hidden" style={{ background: "linear-gradient(135deg,#071b45 0%,#0463FA 55%,#0463FA 100%)", boxShadow: "0 10px 35px rgba(4,99,250,0.28)" }}>
                <div className="p-4">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0" style={{ width: 36, height: 36, background: "rgba(255,255,255,0.15)" }}>
                      <i className="fas fa-hospital-alt text-white" style={{ fontSize: "0.9rem" }} />
                    </div>
                    <span className="text-white fw-bold"><T k="home.ch.info" d="Chamber Info" line /></span>
                  </div>
                  <div className="d-flex align-items-start gap-2 mb-3">
                    <i className="fas fa-map-marker-alt mt-1 flex-shrink-0 text-white" />
                    <div>
                      <p className="mb-0 fw-semibold text-white" style={{ fontSize: "0.9rem" }}>{doctor.hospital}</p>
                      <p className="mb-0" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.82rem" }}>{doctor.address}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-2 mb-3">
                    <i className="fas fa-clock mt-1 flex-shrink-0 text-white" />
                    <div>
                      <p className="mb-0 fw-semibold text-white" style={{ fontSize: "0.9rem" }}><T k="home.ch.hours" d="Chamber Hours" line /></p>
                      <p className="mb-0" style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.82rem" }}>
                        {doctor.hoursSummary}<br />
                        <strong style={{ color: "#ff8585" }}>{doctor.closedDay}</strong><br />
                        Call | <strong className="text-white">{doctor.phone} · {doctor.assistantPhone}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <a className="btn btn-sm fw-bold px-3 py-2" href={doctor.phoneHref} style={{ background: "rgba(255,255,255,0.16)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)" }}>
                      <i className="fas fa-phone-alt me-2" />Call Now
                    </a>
                    <Link className="btn btn-sm btn-light fw-bold px-3 py-2 text-primary" to="/contact" hash="appointment">
                      <i className="fas fa-calendar me-2" />Book Online
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="rounded-3 overflow-hidden h-100" style={{ minHeight: 530, boxShadow: "0 12px 45px rgba(0,0,0,0.1)", border: "3px solid rgba(4,99,250,0.2)" }}>
                <iframe
                  allowFullScreen
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={doctor.mapEmbedUrl}
                  style={{ border: 0, minHeight: 530, display: "block" }}
                  title={`${doctor.name} - ${doctor.hospital}`}
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About + Schedule */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <span className="d-inline-block px-4 py-2 mb-3 rounded-pill section-badge">
                <i className="fas fa-user-md me-2" />
                <T k="home.about.badge" d={`About ${doctor.name}`} line />
              </span>
              <h1 className="mb-4"><T k="home.about.title" d={doctor.shortTitle} /></h1>
              <p className="mb-4">
                <T
                  k="home.about.p1"
                  d="Dr. Mohammad Afzal Mahfuzullah — MBBS, MCPS, FCPS (Ophthalmology), Fellow — Vitreo-Retina — is currently working as Associate Professor (Vitreo-Retina), Department of Ophthalmology, Bangladesh Medical University (BMU) and Consultant Ophthalmologist at Vision Eye Hospital, Green Road, Dhaka. He currently holds the post of Joint Secretary General, Bangladesh Vitreo-Retina Society (BVRS). His working fields of interest are Cataract, Retina & Laser surgery."
                />
              </p>
              <p className="mb-4">
                <T
                  k="home.about.p2"
                  d="He won the Best Abstract Award at the Asia Pacific Vitreo-Retina Conference, Gold Coast, Australia (27 August 2026), the prestigious M A Matin Gold Medal (2021) for best research work and the Best Paper Award (2017) at the Ophthalmological Society of Bangladesh (OSB) Conference. He has several presentations at national and international conferences (Bangladesh, USA, Spain & Australia). BMDC Reg: A-48558."
                />
              </p>
              <div className="schedule-card">
                <h3><i className="far fa-clock" /><T k="home.consult.h" d="Consultation Hours" line /></h3>
                <div className="schedule-item friday"><i className="fas fa-calendar-alt" /><span>{doctor.scheduleRow1}</span></div>
                <div className="schedule-item weekday"><i className="fas fa-calendar-alt" /><span>{doctor.scheduleRow2}</span></div>
                <div className="schedule-item weekday"><i className="fas fa-calendar-alt" /><span>{doctor.scheduleRow3}</span></div>
                <div className="schedule-item closed"><i className="fas fa-times-circle" /><span>{doctor.closedDay}</span></div>
                <div className="schedule-item closed"><i className="fas fa-phone-alt" /><span>Call: {doctor.phone} · {doctor.assistantPhone}</span></div>
                <div className="schedule-item location"><i className="fas fa-map-marker-alt" /><span>{doctor.hospital}, {doctor.address}</span></div>
              </div>
            </div>
            <div className="col-lg-6">
              <Img
                k="home.about.photo"
                d="/site/images/doctor-clinic.webp"
                alt={`${doctor.name} - ${doctor.shortTitle}`}
                className="img-fluid mb-3 rounded"
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
              <div className="d-flex align-items-center bg-white rounded mb-3" style={{ border: "1px solid #eef0f3", boxShadow: "0 8px 24px rgba(4,99,250, 0.05)", padding: 10 }}>
                <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 80, height: 80, background: "#f8f9fa", border: "1px solid #eef0f3", borderRadius: 12, marginRight: 15 }}>
                  <i className="fa fa-phone fa-2x" style={{ color: "#0463FA" }} />
                </div>
                <div className="px-3">
                  <h3 className="phone-number">{doctor.phone}</h3>
                  <span style={{ color: "#666", fontSize: "0.95rem", fontWeight: 500 }}>
                    {doctor.callCenterHours} · Dr Assistant {doctor.assistantPhone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ServicesGrid />
      <PhotoGallery mode="home" />

      {/* Featured Videos */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="d-inline-block px-4 py-2 mb-3 rounded-pill section-badge">
              <i className="fas fa-play-circle me-2" />
              <T k="home.videos.badge" d="Videos" line />
            </span>
            <h1 className="mb-3"><T k="home.videos.title" d="Some Important Videos Are Provided Below." /></h1>
          </div>
          <div className="ytgrid">
            {displayVids.map((v) => (
              <div className="ytcard" key={v.id}>
                <YouTubeLite ytId={v.ytId} thumb={v.thumb} title={v.title} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <AchievementsSection />

      {/* Credentials */}
      <div className="container-fluid py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="d-inline-block px-4 py-2 mb-3 rounded-pill section-badge">
              <i className="fas fa-award me-2" />
              <T k="home.cred.badge" d="Credentials" line />
            </span>
            <h1 className="mb-3"><T k="home.cred.title" d="Medical Qualifications & Professional Credentials" /></h1>
          </div>
          <div className="row g-4 justify-content-lg-center">
            {credentialsHome.map((c, idx) => (
              <div className="col-md-6 col-lg-4" key={c.title}>
                <div className="qual-card">
                  <div className="qual-icon"><i className={`fas ${c.icon}`} /></div>
                  <div>
                    <h6><T k={`home.cred.${idx}.t`} d={c.title} line /></h6>
                    <p><T k={`home.cred.${idx}.d`} d={c.desc} /></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="text-center pt-5">
        <span className="d-inline-block px-4 py-2 mb-3 rounded-pill section-badge">
          <i className="fas fa-comments me-2" />
          <T k="home.rev.badge" d="Patient Testimonials" line />
        </span>
        <h1 className="mb-5"><T k="home.rev.title" d="What Our Patients Say" /></h1>
      </div>
      <div className="revi3">
        <div className="revi4">
          <div className="revi5 revi5-track">
            {loopReviews.map((rev, i) => (
              <div className="revi6" key={`${rev.id}-${i}`}>
                <div className="revi8" />
                <div className="revi7">“</div>
                <div className="revi9">
                  <div className="revi10" />
                  <div className="revi11">
                    <img alt={rev.name} src={rev.image} />
                  </div>
                </div>
                <div className="revi12">★★★★★</div>
                <p className="revi13">&ldquo;{rev.quote}&rdquo;</p>
                <div className="revi14" />
                <div className="revi15">{rev.name}</div>
                <div className="revi16">{rev.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PremiumCta />
    </>
  );
}