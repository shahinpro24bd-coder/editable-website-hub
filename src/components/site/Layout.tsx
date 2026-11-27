import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { doctor, services } from "@/lib/site";
import { Img, T } from "@/lib/editable";

const navLinks = [
  { to: "/" as const, label: "Home" },
  { to: "/about" as const, label: "About" },
  { to: "/services" as const, label: "Services" },
  { to: "/videos" as const, label: "Videos" },
  { to: "/publications" as const, label: "Publications" },
  { to: "/contact" as const, label: "Contact" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 120);
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className={`container-fluid bg-light sticky-top p-0 ${scrolled ? "shadow-sm" : ""}`} style={{ top: 0 }}>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light p-0">
            <Link className="navbar-brand py-2 me-0" to="/">
              <Img
                k="site.logo"
                d="/site/images/vision-eye-logo.webp"
                alt={`${doctor.name} - ${doctor.shortTitle}`}
                style={{ height: 50, width: "auto", display: "block", objectFit: "contain" }}
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                {navLinks.map((item) => {
                  const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`nav-item nav-link ${active ? "active" : ""}`}
                    >
                      <T k={`nav.${item.to}`} d={item.label} line />
                    </Link>
                  );
                })}
              </div>
              <a className="appointment-call-btn" href={doctor.phoneHref}>
                <i className="fas fa-phone-alt" />
                <span><T k="nav.cta" d="Call for Appointment" line /></span>
              </a>
            </div>
          </nav>
        </div>
      </div>

      {children}

      <div className="vfooter">
        <div className="vfooter__top" />
        <div className="container">
          <div className="vfooter__grid">
            <div className="vfooter__brandcol">
              <Img
                k="site.logo"
                d="/site/images/vision-eye-logo.webp"
                alt={`${doctor.hospital} - ${doctor.name}`}
                className="vfooter__logo"
              />
              <div className="vfooter__name">{doctor.name}</div>
              <p className="vfooter__meta">
                {doctor.degrees}
                <br />
                <T k="foot.meta.1" d="Fellow — Retina & Vitreous (IEH)" line />
                <br />
                {doctor.shortTitle}
                <br />
                <T k="foot.meta.2" d="Associate Professor (Vitreo-Retina), Bangladesh Medical University (BMU)" line />
                <br />
                <T k="foot.meta.3" d="Consultant Ophthalmologist" line />, {doctor.hospital}, {doctor.address}
                <br />
                <T k="foot.meta.4" d="Joint Secretary General, Bangladesh Vitreo-Retina Society (BVRS)" line />
                <br />
                <strong>BMDC Reg: {doctor.bmdc}</strong>
              </p>
              <ul className="vfooter__contact">
                <li>
                  <i className="fas fa-map-marker-alt" />
                  <span>{doctor.hospital}, {doctor.address}</span>
                </li>
                <li>
                  <i className="fas fa-phone-alt" />
                  <a href={doctor.phoneHref}>{doctor.phone}</a> ·{" "}
                  <a href={doctor.assistantHref}>{doctor.assistantPhone}</a> &nbsp;|&nbsp;{" "}
                  <span>{doctor.callCenterHours}</span>
                </li>
                <li>
                  <i className="fas fa-envelope" />
                  <a href={`mailto:${doctor.email}`}>{doctor.email}</a>
                </li>
                <li>
                  <i className="fas fa-globe" />
                  <Link to="/">{doctor.website}</Link>
                </li>
              </ul>
              <div className="vfooter__socials">
                <a aria-label="Facebook" className="vfooter__soc" href={doctor.facebook} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f" />
                </a>
                <a aria-label="WhatsApp" className="vfooter__soc" href={doctor.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp" />
                </a>
                <a aria-label="YouTube" className="vfooter__soc" href={doctor.youtube} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube" />
                </a>
                <a aria-label="LinkedIn" className="vfooter__soc" href={doctor.linkedin} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in" />
                </a>
                <a aria-label="Email" className="vfooter__soc" href={`mailto:${doctor.email}`}>
                  <i className="fas fa-envelope" />
                </a>
              </div>
            </div>

            <div className="vfooter__cols">
              <div>
                <h5><T k="footer.svc.h" d="Eye Care Services" line /></h5>
                <ul className="vfooter__links">
                  {services.slice(0, 7).map((s) => (
                    <li key={s.slug}>
                      <Link to="/services">
                        <i className="fas fa-chevron-right" />
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5><T k="footer.links.h" d="Quick Links" line /></h5>
                <ul className="vfooter__links">
                  {navLinks.map((n) => (
                    <li key={n.to}>
                      <Link to={n.to}>
                        <i className="fas fa-chevron-right" />
                        <T k={`nav.${n.to}`} d={n.label} line />
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link to="/admin">
                      <i className="fas fa-lock" />
                      <T k="foot.adminPanel" d="Admin Panel" line />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="vfooter__sched">
                <h5><T k="footer.sched.h" d="Consultation Schedule" line /></h5>
                <p>
                  <strong>{doctor.hospital}</strong> — {doctor.address}
                </p>
                <p>{doctor.hoursSummary}</p>
                <p>{doctor.closedDay}</p>
                <a className="vfooter__cta" href={doctor.phoneHref}>
                  <i className="fas fa-phone-alt" />
                  <T k="footer.sched.cta" d="Call for Appointment" line />
                </a>
              </div>
            </div>
          </div>
          <div className="vfooter__bottom">
            <div>
              © <span>{doctor.name} — {doctor.shortTitle} | BMDC Reg: {doctor.bmdc}</span>, <T k="foot.rights" d="All Rights Reserved." line />
            </div>
            <div>
              <Link to="/admin" className="me-3"><T k="foot.admin" d="Admin" line /></Link>
              <span>{doctor.website}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Back to top"
        className={`btn btn-lg btn-primary btn-lg-square back-to-top ${showTop ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="bi bi-arrow-up" />
      </button>
    </>
  );
}