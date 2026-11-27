import { Link } from "@tanstack/react-router";
import { credentialsAbout, doctor, quickProfile } from "@/lib/site";
import { Img, T } from "@/lib/editable";
import { AchievementsSection, PhotoGallery } from "@/components/site/SharedSections";

const expertisePills = [
  "MBBS",
  "MCPS",
  "FCPS (Ophthalmology)",
  "Fellow — Vitreo-Retina",
  "Fellow — Retina & Vitreous (IEH)",
  "Vitreo-Retina Surgery",
  "Phaco Cataract Surgery",
  "Diabetic Retinopathy",
  "ROP Screening",
  "Retinal Laser",
  "Intravitreal Injection",
  "Retinal Detachment & Macular Disease",
];

export function AboutPage() {
  return (
    <>
      <div className="container-fluid page-header page-header--about py-5 mb-5">
        <div className="container text-center py-5">
          <h1 className="display-1"><T k="about.header.title" d={`About ${doctor.name}`} line /></h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><Link className="text-primary" to="/"><T k="crumb.home" d="Home" line /></Link></li>
              <li aria-current="page" className="breadcrumb-item active"><T k="crumb.about" d="About" line /></li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="about-img-container">
                <Img
                  k="about.photo"
                  d="/site/images/doctor-clinic.webp"
                  alt={`${doctor.name} - ${doctor.shortTitle}`}
                  className="about-section-img"
                />
              </div>
              <div className="d-flex align-items-center bg-white rounded mb-3" style={{ border: "1px solid #eef0f3", boxShadow: "0 8px 24px rgba(4,99,250, 0.05)", padding: 10 }}>
                <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 80, height: 80, background: "#f8f9fa", border: "1px solid #eef0f3", borderRadius: 12, marginRight: 15 }}>
                  <i className="fa fa-phone fa-2x" style={{ color: "#0463FA" }} />
                </div>
                <div className="px-3">
                  <h3 className="phone-number">{doctor.phone}</h3>
                  <span style={{ color: "#666", fontSize: "0.95rem", fontWeight: 500 }}>
                    <T k="about.call" d="Call for appointment · Dr Assistant" line /> {doctor.assistantPhone}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <span className="d-inline-block px-4 py-2 mb-3 rounded-pill section-badge">
                <i className="fas fa-user-md me-2" /><T k="about.badge" d="About Us" line />
              </span>
              <h1 className="mb-4"><T k="about.name" d={doctor.name} line /></h1>
              <p className="text-primary fw-bold mb-3">
                {doctor.shortTitle} | {doctor.degrees} | BMDC Reg: {doctor.bmdc}
              </p>
              <span className="badge rounded-pill text-dark px-3 py-2 mb-3" style={{ background: "rgba(4,99,250,0.15)", border: "1.5px solid var(--bs-primary)", fontSize: "0.85rem" }}>
                <i className="fas fa-eye me-1" style={{ color: "var(--bs-primary)" }} /> Comprehensive Eye Care
              </span>
              <p className="mb-4">
                <T
                  k="about.p1"
                  d="Dr. Mohammad Afzal Mahfuzullah, MBBS, MCPS, FCPS (Ophthalmology), Fellow — Vitreo-Retina, is currently working as Associate Professor (Vitreo-Retina), Department of Ophthalmology, Bangladesh Medical University (BMU) and Consultant Ophthalmologist at Vision Eye Hospital, Green Road, Dhaka, Bangladesh. He currently holds the post of Joint Secretary General, Bangladesh Vitreo-Retina Society (BVRS). His working fields of interest are Cataract, Retina & Laser surgery in ophthalmology."
                />
              </p>
              <p className="mb-4">
                <T
                  k="about.p2"
                  d="Dr. Afzal won the Best Abstract Award at the Asia Pacific Vitreo-Retina Conference held in Gold Coast, Australia on 27 August 2026. He won the prestigious M A Matin Gold Medal in 2021 for the best research work at the Ophthalmological Society of Bangladesh (OSB) Conference, and the Best Paper Award at the OSB Conference 2017. He has several presentations to his credit at national and international conferences (Bangladesh, USA, Spain & Australia)."
                />
              </p>
              <p className="mb-4">
                <T
                  k="about.p3"
                  d="He is also a Fellow in Retina and Vitreous (IEH), completed a long-term Fellowship in Vitreo-Retina (Bangladesh & India), advanced training in vitreoretinal surgery at Susrut Eye Hospital, India, and Advanced Vitreo Retinal Microsurgical Training in Gold Coast, Australia."
                />
              </p>
              <p className="mb-4">
                <T
                  k="about.p4"
                  d="Dr. Afzal is a life member of the Ophthalmological Society of Bangladesh (OSB), Bangladesh Vitreo-Retina Society (BVRS), Bangladesh Uvea Society, Bangladesh Society of Cataract and Refractive Surgeons (BSCRS), Bangladesh Society of Low Vision (BSL), Bangladesh Medical Association (BMA), Old Laboratorian Association (OLSA) and Bangladesh Academy of Ophthalmology (BAO), and a member of the European Vitreo-Retina Society (EVRS)."
                />
              </p>
              <div className="mb-4">
                <h5 className="mb-3"><T k="about.qe.h" d="Qualifications & Expertise" line /></h5>
                {expertisePills.map((p) => (
                  <div className="credential-pill" key={p}><i className="fas fa-check-circle" /> {p}</div>
                ))}
              </div>
              <Link
                className="appointment-call-btn d-inline-flex align-items-center justify-content-center"
                to="/contact"
                hash="appointment"
                style={{ textDecoration: "none", borderRadius: 50, fontSize: "1.1rem", padding: "15px 35px" }}
              >
                Book Appointment <i className="fas fa-arrow-right ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <PhotoGallery mode="full" />
      <AchievementsSection />

      {/* Quick Profile */}
      <div className="container-fluid py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="d-inline-block px-4 py-2 mb-3 rounded-pill section-badge">
              <i className="fas fa-id-card me-2" /><T k="about.quick.badge" d="At a Glance" line />
            </span>
            <h1 className="mb-3"><T k="about.quick.title" d="Doctor's Quick Profile" /></h1>
          </div>
          <div className="row g-4">
            {quickProfile.map((q, idx) => (
              <div className="col-md-6 col-lg-3" key={q.title}>
                <div className="info-card-dotted">
                  <div className="icon-box"><i className={`fas ${q.icon}`} /></div>
                  <h5><T k={`about.quick.${idx}.t`} d={q.title} line /></h5>
                  <p><T k={`about.quick.${idx}.d`} d={q.desc} /></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Qualifications & Certifications */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="d-inline-block px-4 py-2 mb-3 rounded-pill section-badge">
              <i className="fas fa-award me-2" /><T k="about.cert.badge" d="Credentials" line />
            </span>
            <h1 className="mb-3"><T k="about.cert.title" d="Medical Qualifications & Certifications" /></h1>
          </div>
          <div className="row g-4">
            {credentialsAbout.map((c, idx) => (
              <div className="col-md-6 col-lg-4" key={c.title}>
                <div className="qual-card">
                  <div className="qual-icon"><i className={`fas ${c.icon}`} /></div>
                  <div>
                    <h6><T k={`about.cert.${idx}.t`} d={c.title} line /></h6>
                    <p><T k={`about.cert.${idx}.d`} d={c.desc} /></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}