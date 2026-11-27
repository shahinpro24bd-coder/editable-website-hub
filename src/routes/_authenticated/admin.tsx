import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { applyContent, defaults, type SiteContent } from "@/lib/cms";
import type { AchievementItem, DoctorInfo, EyeService, GalleryItem, PublicationItem, TestimonialItem, VideoItem } from "@/lib/site";
import type { Tables } from "@/integrations/supabase/types";
import { AchievementsManager, GalleryTestimonialsManager, PublicationsManager, VideosManager } from "@/components/admin/ContentManagers";
import { adminTabs, type AdminTab } from "@/lib/admin-tabs";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel | Dr. Md. Afzal Mahfuzullah" },
      { name: "description", content: "Manage Dr. Md. Afzal Mahfuzullah's website content, appointments and clinic records." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Panel | Dr. Afzal" },
      { property: "og:description", content: "Dr. Afzal website admin panel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

type Tab = AdminTab;

const sitePages = [
  { key: "home", name: "Home", path: "/", icon: "fa-home", desc: "Hero, chamber map, about, services, gallery, videos, credentials" },
  { key: "about", name: "About", path: "/about", icon: "fa-user-md", desc: "Doctor biography, photo gallery, achievements & qualifications" },
  { key: "services", name: "Services", path: "/services", icon: "fa-eye", desc: "All eye care treatments, descriptions & photos" },
  { key: "videos", name: "Videos", path: "/videos", icon: "fa-play-circle", desc: "TV appearances & YouTube video library" },
  { key: "publications", name: "Publications", path: "/publications", icon: "fa-book-medical", desc: "Research papers, honors & scholarly profile" },
  { key: "contact", name: "Contact", path: "/contact", icon: "fa-envelope", desc: "Chamber details, contact cards & appointment tips" },
];

const doctorFields: { key: keyof DoctorInfo; label: string }[] = [
  { key: "name", label: "Doctor Full Name" },
  { key: "shortTitle", label: "Specialty Title" },
  { key: "degrees", label: "Degrees" },
  { key: "bmdc", label: "BMDC Registration No." },
  { key: "hospital", label: "Hospital / Chamber Name" },
  { key: "address", label: "Chamber Address" },
  { key: "phone", label: "Appointment Hotline (shown)" },
  { key: "phoneHref", label: "Hotline Link (tel:+880...)" },
  { key: "assistantPhone", label: "Dr Assistant Phone (shown)" },
  { key: "assistantHref", label: "Assistant Link (tel:+880...)" },
  { key: "whatsapp", label: "WhatsApp (shown)" },
  { key: "whatsappHref", label: "WhatsApp Link (https://wa.me/...)" },
  { key: "email", label: "Email" },
  { key: "website", label: "Website Domain" },
  { key: "facebook", label: "Facebook URL" },
  { key: "youtube", label: "YouTube URL" },
  { key: "linkedin", label: "LinkedIn URL" },
  { key: "callCenterHours", label: "Call Centre Hours" },
  { key: "hoursSummary", label: "Chamber Hours Summary" },
  { key: "scheduleRow1", label: "Schedule Row 1 (Sat–Sun)" },
  { key: "scheduleRow2", label: "Schedule Row 2 (Mon–Tue)" },
  { key: "scheduleRow3", label: "Schedule Row 3 (Wed–Thu)" },
  { key: "closedDay", label: "Closed Day Note" },
  { key: "mapEmbedUrl", label: "Google Maps Embed URL" },
];

function AdminPage() {
  const nav = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [docInfo, setDocInfo] = useState<DoctorInfo>({ ...defaults.doctor });
  const [svcs, setSvcs] = useState<EyeService[]>(defaults.services.map((s) => ({ ...s })));
  const [pubs, setPubs] = useState<PublicationItem[]>(defaults.publications.map((p) => ({ ...p, topics: [...p.topics] })));
  const [vids, setVids] = useState<VideoItem[]>(defaults.videos.map((v) => ({ ...v })));
  const [gal, setGal] = useState<GalleryItem[]>(defaults.gallery.map((g) => ({ ...g })));
  const [revs, setRevs] = useState<TestimonialItem[]>(defaults.testimonials.map((t) => ({ ...t })));
  const [achs, setAchs] = useState<AchievementItem[]>(defaults.achievements.map((a) => ({ ...a })));
  const [appointments, setAppointments] = useState<Tables<"appointment_requests">[]>([]);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const loadedRef = useRef<SiteContent>({});

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) { setIsAdmin(false); return; }
      const { data: ok } = await supabase.rpc("has_role", { _user_id: u.user.id, _role: "admin" });
      setIsAdmin(!!ok);
      if (!ok) return;
      const { data } = await supabase.from("site_content").select("key, value");
      const loaded: Record<string, unknown> = {};
      for (const r of data ?? []) {
        loaded[r.key] = r.value;
        if (r.key === "doctor") setDocInfo({ ...defaults.doctor, ...(r.value as Partial<DoctorInfo>) });
        if (r.key === "services" && Array.isArray(r.value) && r.value.length) setSvcs(r.value as EyeService[]);
        if (r.key === "publications" && Array.isArray(r.value) && r.value.length) setPubs(r.value as PublicationItem[]);
        if (r.key === "videos" && Array.isArray(r.value) && r.value.length) setVids(r.value as VideoItem[]);
        if (r.key === "gallery" && Array.isArray(r.value) && r.value.length) setGal(r.value as GalleryItem[]);
        if (r.key === "testimonials" && Array.isArray(r.value) && r.value.length) setRevs(r.value as TestimonialItem[]);
        if (r.key === "achievements" && Array.isArray(r.value)) setAchs(r.value as AchievementItem[]);
      }
      loadedRef.current = loaded as SiteContent;
      applyContent(loaded);
      const q = await supabase.from("appointment_requests").select("*").order("created_at", { ascending: false });
      setAppointments(q.data ?? []);
    })();
  }, []);

  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => {
      if (dirty) { e.preventDefault(); e.returnValue = ""; }
    };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const touch = () => setDirty(true);

  const save = async () => {
    setSaving(true);
    const now = new Date().toISOString();
    const { error } = await supabase.from("site_content").upsert([
      { key: "doctor", value: docInfo, updated_at: now },
      { key: "services", value: svcs, updated_at: now },
      { key: "publications", value: pubs, updated_at: now },
      { key: "videos", value: vids, updated_at: now },
      { key: "gallery", value: gal, updated_at: now },
      { key: "testimonials", value: revs, updated_at: now },
      { key: "achievements", value: achs, updated_at: now },
    ] as never);
    setSaving(false);
    if (error) {
      toast.error("Could not save: " + error.message);
      return;
    }
    const nextContent: SiteContent = {
      ...loadedRef.current,
      doctor: docInfo,
      services: svcs,
      publications: pubs,
      videos: vids,
      gallery: gal,
      testimonials: revs,
      achievements: achs,
    };
    loadedRef.current = nextContent;
    applyContent(nextContent);
    setDirty(false);
    toast.success("Saved! Changes are live on the website.");
    router.invalidate();
  };

  const uploadFile = async (file: File, prefix: string): Promise<string | null> => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (JPG, PNG, WebP, or GIF).");
      return null;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be smaller than 10 MB.");
      return null;
    }
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const safe = prefix.replace(/[^\w-]/g, "-");
    const name = `${safe}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("site-images")
      .upload(name, file, { contentType: file.type, cacheControl: "31536000" });
    if (error) {
      toast.error("Upload failed: " + error.message);
      return null;
    }
    touch();
    toast.success("Image uploaded — click Save changes to publish.");
    return `/api/public/img/${name}`;
  };

  const signOut = async () => {
    if (dirty && !confirm("You have unsaved changes. Sign out anyway?")) return;
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    nav({ to: "/auth", replace: true });
  };

  const updateAppointment = async (id: string, patch: { notes?: string; follow_up_date?: string | null }) => {
    const { error } = await supabase.from("appointment_requests").update(patch).eq("id", id);
    if (error) { toast.error(error.message); return; }
    setAppointments((list) => list.map((x) => (x.id === id ? { ...x, ...patch } : x)));
    toast.success("Updated");
  };

  const setAppointmentStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("appointment_requests").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    setAppointments((list) => list.map((x) => (x.id === id ? { ...x, status } : x)));
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm("Delete this appointment request?")) return;
    const { error } = await supabase.from("appointment_requests").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    setAppointments((list) => list.filter((x) => x.id !== id));
  };

  if (isAdmin === null) return <div className="p-5 text-center">Loading…</div>;
  if (!isAdmin) {
    return (
      <div className="p-5 text-center">
        <h3>No admin access</h3>
        <button className="btn btn-primary mt-3" onClick={signOut}>Sign out</button>
      </div>
    );
  }

  const newCount = appointments.filter((q) => q.status === "new").length;
  const tabs = adminTabs.map((t) =>
    t.key === "appointments" ? { ...t, label: `Appointments${newCount ? ` (${newCount})` : ""}` } : t,
  );

  return (
    <div className="adm-shell bg-light" style={{ minHeight: "100vh" }}>
      <header className="bg-dark text-white sticky-top" style={{ zIndex: 50 }}>
        <div className="container d-flex flex-wrap align-items-center gap-3 py-3">
          <h4 className="text-white m-0 me-auto">
            Dr. Afzal <span className="text-primary">Admin</span>
          </h4>
          <a href="/" target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm">
            <i className="fa fa-external-link-alt me-1" />View site
          </a>
          <button className="btn btn-primary btn-sm px-3" onClick={save} disabled={saving || !dirty}>
            {saving ? "Saving…" : dirty ? "Save changes •" : "Saved"}
          </button>
          <button className="btn btn-outline-light btn-sm" onClick={signOut}>Sign out</button>
        </div>
      </header>

      <div className="container py-4">
        <div className="d-flex flex-wrap gap-2 mb-4">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`btn ${tab === t.key ? "btn-primary" : "btn-light border"}`}
              onClick={() => setTab(t.key)}
            >
              <i className={`fa ${t.icon} me-2`} />{t.label}
            </button>
          ))}
        </div>

        {tab === "dashboard" && (
          <Dashboard
            appointments={appointments}
            newCount={newCount}
            servicesCount={svcs.length}
            pubCount={pubs.length}
            go={setTab}
          />
        )}

        {tab === "account" && <Account />}

        {tab === "doctor" && (
          <div className="bg-white p-4 shadow-sm">
            <h4 className="mb-4">Doctor &amp; Chamber Information (shown across the website)</h4>
            <div className="row g-3">
              {doctorFields.map((f) => (
                <div className="col-md-6" key={f.key}>
                  <label className="form-label">{f.label}</label>
                  <input
                    className="form-control"
                    value={docInfo[f.key]}
                    onChange={(e) => {
                      setDocInfo({ ...docInfo, [f.key]: e.target.value });
                      touch();
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "services" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="m-0">Eye Care Services ({svcs.length})</h4>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setSvcs([
                    ...svcs,
                    {
                      slug: `service-${Date.now()}`,
                      title: "New Eye Care Service",
                      summary: "Describe this treatment or examination.",
                      cta: "Book Consultation",
                      image: "/site/images/services/eye-checkup.webp",
                      cardClass: "serrr11",
                      imgWrapClass: "serrr12",
                    },
                  ]);
                  touch();
                }}
              >
                <i className="fa fa-plus me-1" />Add service
              </button>
            </div>
            {svcs.map((s, i) => (
              <div className="bg-white p-4 shadow-sm mb-4" key={s.slug}>
                <div className="row g-4">
                  <div className="col-md-3">
                    <img src={s.image} alt={s.title} className="w-100 mb-2 rounded" style={{ aspectRatio: "4/3", objectFit: "cover" }} />
                    <label className="btn btn-outline-primary btn-sm w-100 mb-2">
                      <i className="fa fa-upload me-1" />Change image
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          e.target.value = "";
                          if (!f) return;
                          const url = await uploadFile(f, `service-${s.slug}`);
                          if (url) setSvcs((prev) => prev.map((x, j) => (j === i ? { ...x, image: url } : x)));
                        }}
                      />
                    </label>
                    <button
                      className="btn btn-outline-danger btn-sm w-100"
                      onClick={() => {
                        if (!confirm("Delete this service?")) return;
                        setSvcs((prev) => prev.filter((_, j) => j !== i));
                        touch();
                      }}
                    >
                      <i className="fa fa-trash me-1" />Delete
                    </button>
                  </div>
                  <div className="col-md-9">
                    <label className="form-label">Title</label>
                    <input
                      className="form-control mb-3"
                      value={s.title}
                      onChange={(e) => {
                        setSvcs(svcs.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)));
                        touch();
                      }}
                    />
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control mb-3"
                      rows={3}
                      value={s.summary}
                      onChange={(e) => {
                        setSvcs(svcs.map((x, j) => (j === i ? { ...x, summary: e.target.value } : x)));
                        touch();
                      }}
                    />
                    <label className="form-label">Button text</label>
                    <input
                      className="form-control"
                      value={s.cta}
                      onChange={(e) => {
                        setSvcs(svcs.map((x, j) => (j === i ? { ...x, cta: e.target.value } : x)));
                        touch();
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "publications" && (
          <PublicationsManager items={pubs} onChange={(next) => { setPubs(next); touch(); }} />
        )}

        {tab === "videos" && (
          <VideosManager items={vids} onChange={(next) => { setVids(next); touch(); }} onUpload={uploadFile} />
        )}

        {tab === "gallery" && (
          <GalleryTestimonialsManager
            galleryItems={gal}
            testimonialItems={revs}
            onGalleryChange={(next) => { setGal(next); touch(); }}
            onTestimonialsChange={(next) => { setRevs(next); touch(); }}
            onUpload={uploadFile}
          />
        )}

        {tab === "achievements" && (
          <AchievementsManager items={achs} onChange={(next) => { setAchs(next); touch(); }} onUpload={uploadFile} />
        )}

        {tab === "appointments" && (
          <div className="bg-white p-4 shadow-sm">
            <h4 className="mb-3">Appointment Requests ({appointments.length})</h4>
            {appointments.length === 0 && <p className="text-muted m-0">No appointment requests yet.</p>}
            {appointments.map((q) => (
              <div
                key={q.id}
                className="border p-3 mb-3"
                style={{ borderLeft: q.status === "new" ? "4px solid var(--bs-primary, #0463FA)" : undefined }}
              >
                <div className="d-flex flex-wrap justify-content-between gap-2">
                  <h5 className="m-0">
                    {q.name}
                    {q.age ? ` · Age ${q.age}` : ""}
                  </h5>
                  <small className="text-muted">{new Date(q.created_at).toLocaleString()}</small>
                </div>
                <p className="mb-1 mt-2">
                  <strong>{q.service}</strong>
                  {q.visit_type ? ` · ${q.visit_type}` : ""}
                  {q.preferred_date ? ` · Preferred: ${q.preferred_date}` : ""}
                </p>
                <p className="mb-2">
                  <a href={`tel:${q.phone}`}>{q.phone}</a>
                  {q.email ? (
                    <> · <a href={`mailto:${q.email}`}>{q.email}</a></>
                  ) : null}
                </p>
                <p className="mb-3" style={{ whiteSpace: "pre-wrap" }}>{q.details}</p>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  <textarea
                    className="form-control form-control-sm"
                    rows={1}
                    style={{ flex: "1 1 260px" }}
                    placeholder="Internal clinical / assistant notes…"
                    defaultValue={q.notes ?? ""}
                    onBlur={(e) => e.target.value !== (q.notes ?? "") && updateAppointment(q.id, { notes: e.target.value })}
                  />
                  <label className="small d-flex align-items-center gap-1">
                    Follow-up
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      defaultValue={q.follow_up_date ?? ""}
                      onChange={(e) => updateAppointment(q.id, { follow_up_date: e.target.value || null })}
                    />
                  </label>
                  {q.follow_up_date && q.status !== "completed" && q.follow_up_date <= new Date().toISOString().slice(0, 10) && (
                    <span className="badge bg-danger align-self-center">Follow-up due</span>
                  )}
                </div>
                <div className="d-flex flex-wrap gap-2">
                  <select
                    className="form-select form-select-sm"
                    style={{ width: 160 }}
                    value={q.status}
                    onChange={(e) => setAppointmentStatus(q.id, e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="rescheduled">Rescheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => deleteAppointment(q.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Dashboard({
  appointments,
  newCount,
  servicesCount,
  pubCount,
  go,
}: {
  appointments: Tables<"appointment_requests">[];
  newCount: number;
  servicesCount: number;
  pubCount: number;
  go: (t: Tab) => void;
}) {
  const week = appointments.filter((q) => Date.now() - new Date(q.created_at).getTime() < 7 * 864e5).length;
  return (
    <>
      <div className="row g-3 mb-4">
        {[
          [newCount, "New appointment requests", "appointments"],
          [week, "Requests this week", "appointments"],
          [servicesCount, "Eye care services", "services"],
          [pubCount, "Research publications", "publications"],
        ].map(([n, label, t]) => (
          <div className="col-6 col-lg-3" key={label as string}>
            <button className="adm-stat w-100 text-start border-0" onClick={() => go(t as Tab)}>
              <strong>{n}</strong>
              <span>{label}</span>
            </button>
          </div>
        ))}
      </div>

      <h4 className="mb-1">Which page do you want to edit?</h4>
      <p className="text-muted mb-3">Open a page to change its texts and photos directly on the page.</p>
      <div className="row g-3 mb-5">
        {sitePages.map((p) => (
          <div className="col-sm-6 col-lg-4" key={p.key}>
            <Link
              to="/admin/pages/$page"
              params={{ page: p.key }}
              className="adm-page is-ready text-reset text-decoration-none"
            >
              <span className="adm-page-icon"><i className={`fa ${p.icon}`} /></span>
              <h5 className="m-0">{p.name}</h5>
              <small className="text-muted">{p.desc}</small>
              <span className="text-primary mt-auto fw-bold">
                <i className="fa fa-pen me-1" />Edit page
              </span>
            </Link>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="bg-white p-4 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="m-0">Latest appointment requests</h5>
              <button className="btn btn-link btn-sm" onClick={() => go("appointments")}>See all</button>
            </div>
            {appointments.length === 0 && <p className="text-muted m-0">No appointment requests yet.</p>}
            {appointments.slice(0, 5).map((q) => (
              <div key={q.id} className="d-flex justify-content-between border-bottom py-2 gap-2">
                <span><strong>{q.name}</strong> · {q.service}</span>
                <span className="text-nowrap">
                  {q.status === "new" && <span className="badge bg-primary me-2">New</span>}
                  <small className="text-muted">{new Date(q.created_at).toLocaleDateString()}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="bg-white p-4 shadow-sm h-100">
            <h5 className="mb-3">Quick actions</h5>
            <div className="d-grid gap-2">
              <Link to="/admin/pages/$page" params={{ page: "home" }} className="btn btn-primary">
                <i className="fa fa-pen me-2" />Edit home page
              </Link>
              <button className="btn btn-light border" onClick={() => go("doctor")}>
                <i className="fa fa-phone me-2" />Update doctor &amp; chamber info
              </button>
              <button className="btn btn-light border" onClick={() => go("services")}>
                <i className="fa fa-eye me-2" />Manage services
              </button>
              <button className="btn btn-light border" onClick={() => go("publications")}>
                <i className="fa fa-book-medical me-2" />Manage publications
              </button>
              <button className="btn btn-light border" onClick={() => go("account")}>
                <i className="fa fa-key me-2" />Change password
              </button>
              <a href="/" target="_blank" rel="noreferrer" className="btn btn-light border">
                <i className="fa fa-external-link-alt me-2" />Open website
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Account() {
  const [cur, setCur] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (pw.length < 6) { toast.error("New password must be at least 6 characters."); return; }
    if (pw !== pw2) { toast.error("Passwords do not match."); return; }
    setBusy(true);
    const { data: u } = await supabase.auth.getUser();
    const check = await supabase.auth.signInWithPassword({ email: u.user!.email!, password: cur });
    if (check.error) { setBusy(false); toast.error("Current password is wrong."); return; }
    const { error } = await supabase.auth.updateUser({ password: pw, current_password: cur } as never);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    setCur("");
    setPw("");
    setPw2("");
    toast.success("Password changed.");
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 shadow-sm" style={{ maxWidth: 480 }}>
      <h4 className="mb-4">Change admin password</h4>
      <label className="form-label">Current password</label>
      <input type="password" className="form-control mb-3" value={cur} onChange={(e) => setCur(e.target.value)} required autoComplete="current-password" />
      <label className="form-label">New password</label>
      <input type="password" className="form-control mb-3" value={pw} onChange={(e) => setPw(e.target.value)} required autoComplete="new-password" />
      <label className="form-label">Repeat new password</label>
      <input type="password" className="form-control mb-4" value={pw2} onChange={(e) => setPw2(e.target.value)} required autoComplete="new-password" />
      <button className="btn btn-primary px-4" disabled={busy}>
        {busy ? "Saving…" : "Change password"}
      </button>
    </form>
  );
}