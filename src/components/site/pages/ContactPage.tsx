import { Link } from "@tanstack/react-router";
import { doctor } from "@/lib/site";
import { T } from "@/lib/editable";
import { AppointmentForm, PremiumCta } from "@/components/site/SharedSections";

const tips = [
  { icon: "fa-clock", title: "Take Appointment on Time", text: "Choosing an appointment early in the week helps you get faster service. Weekends and afternoons are usually busier." },
  { icon: "fa-file-medical", title: "Bring Necessary Documents", text: "Bring your previous medical reports, test results, and medication list. This helps the doctor understand your condition better." },
  { icon: "fa-question-circle", title: "Prepare Your Questions", text: "Write down questions about your eye problems before the appointment so you don't forget to ask anything important." },
  { icon: "fa-user-clock", title: "Arrive on Time", text: "Arrive 10-15 minutes before your scheduled time to complete formalities and prepare for consultation." },
];

export function ContactPage() {
  return (
    <>
      <div className="container-fluid page-header page-header--contact py-5 mb-2">
        <div className="container text-center py-5">
          <h1 className="display-1"><T k="contact.header.title" d="Contact" line /></h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><Link className="text-primary" to="/">Home</Link></li>
              <li aria-current="page" className="breadcrumb-item active">Contact</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-5">
        <div className="text-center mb-5">
          <span className="d-inline-block px-4 py-2 mb-3 rounded-pill section-badge">
            <i className="fas fa-address-card me-2" /><T k="contact.badge" d="Contact & Appointment" line />
          </span>
          <h1 className="mb-3"><T k="contact.title" d={`All Ways to Reach ${doctor.name}`} /></h1>
        </div>
        <div className="infobox-grid">
          <a className="infobox" href={doctor.phoneHref}>
            <span className="infobox__ico"><i className="fas fa-mobile-alt" /></span>
            <strong><T k="contact.lbl.0" d="Phone" line /></strong>
            <span>{doctor.phone}</span>
          </a>
          <a className="infobox" href={doctor.assistantHref}>
            <span className="infobox__ico"><i className="fas fa-headset" /></span>
            <strong><T k="contact.lbl.1" d="Dr Assistant" line /></strong>
            <span>{doctor.assistantPhone} · {doctor.callCenterHours}</span>
          </a>
          <a className="infobox" href={doctor.whatsappHref} rel="noopener noreferrer" target="_blank">
            <span className="infobox__ico infobox__ico--wa"><i className="fab fa-whatsapp" /></span>
            <strong><T k="contact.lbl.2" d="WhatsApp" line /></strong>
            <span>{doctor.whatsapp}</span>
          </a>
          <a className="infobox" href={`mailto:${doctor.email}`}>
            <span className="infobox__ico"><i className="fas fa-envelope" /></span>
            <strong><T k="contact.lbl.3" d="Email" line /></strong>
            <span>{doctor.email}</span>
          </a>
          <a className="infobox" href={doctor.facebook} rel="noopener noreferrer" target="_blank">
            <span className="infobox__ico infobox__ico--fb"><i className="fab fa-facebook-f" /></span>
            <strong><T k="contact.lbl.4" d="Facebook" line /></strong>
            <span>{doctor.facebookLabel}</span>
          </a>
          <a className="infobox" href={doctor.youtube} rel="noopener noreferrer" target="_blank">
            <span className="infobox__ico infobox__ico--yt"><i className="fab fa-youtube" /></span>
            <strong><T k="contact.lbl.5" d="YouTube" line /></strong>
            <span>{doctor.youtubeLabel}</span>
          </a>
          <a className="infobox" href={doctor.linkedin} rel="noopener noreferrer" target="_blank">
            <span className="infobox__ico infobox__ico--li"><i className="fab fa-linkedin-in" /></span>
            <strong><T k="contact.lbl.6" d="LinkedIn" line /></strong>
            <span>{doctor.name}</span>
          </a>
          <div className="infobox">
            <span className="infobox__ico"><i className="fas fa-user-md" /></span>
            <strong><T k="contact.lbl.7" d="Specialties" line /></strong>
            <span><T k="contact.specialties" d="Cataract · Vitreo-Retina · ROP Screening · Laser" line /></span>
          </div>
          <div className="infobox">
            <span className="infobox__ico"><i className="fas fa-university" /></span>
            <strong><T k="contact.lbl.8" d="Current Position" line /></strong>
            <span><T k="contact.position" d="Associate Professor (Vitreo-Retina), BMU" line /></span>
          </div>
          <div className="infobox">
            <span className="infobox__ico"><i className="fas fa-hospital" /></span>
            <strong>{doctor.hospital}</strong>
            <span>{doctor.address}</span>
          </div>
          <div className="infobox">
            <span className="infobox__ico"><i className="fas fa-clock" /></span>
            <strong><T k="contact.lbl.9" d="Appointment Hours" line /></strong>
            <span>{doctor.hoursSummary}<br />{doctor.closedDay}</span>
          </div>
          <div className="infobox">
            <span className="infobox__ico"><i className="fas fa-id-badge" /></span>
            <strong><T k="contact.lbl.10" d="BMDC Reg" line /></strong>
            <span>{doctor.bmdc}</span>
          </div>
        </div>
      </div>

      <div className="container py-5" id="appointment">
        <div className="appo1">
          <div className="appo2">
            <div className="appo3">
              <AppointmentForm />
            </div>
            <div className="appo9">
              <div className="appo10" style={{ borderLeftColor: "#083d8c" }}>
                <h3><i className="fas fa-phone-alt" /> Call Direct: {doctor.phone}</h3>
                <p>
                  Call <strong>{doctor.phone}</strong> or Dr Assistant <strong>{doctor.assistantPhone}</strong> to confirm your chamber serial at{" "}
                  <strong>{doctor.hospital}</strong>, {doctor.address}.
                </p>
                <a className="btn btn-primary btn-sm mt-2" href={doctor.phoneHref}>
                  <i className="fas fa-phone-alt me-1" /> Call Now
                </a>
              </div>
              {tips.map((t, idx) => (
                <div className="appo10" key={t.title}>
                  <h3><i className={`fas ${t.icon}`} /> <T k={`contact.tip.${idx}.t`} d={t.title} line /></h3>
                  <p><T k={`contact.tip.${idx}.d`} d={t.text} /></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PremiumCta />
    </>
  );
}