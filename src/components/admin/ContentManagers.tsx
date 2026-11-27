import { useState } from "react";
import type { AchievementItem, GalleryItem, PublicationItem, TestimonialItem, VideoItem } from "@/lib/site";

const TOPIC_OPTIONS = ["retina", "glaucoma", "covid", "refractive", "pediatric", "surface", "case"];
const CHANNEL_LABELS: Record<VideoItem["channel"], string> = {
  dbc: "DBC NEWS",
  ntv: "NTV",
  rtv: "Rtv",
  boishakhi: "Boishakhi TV",
  nexus: "Nexus TV",
  own: "Own channel",
};

function extractYtId(raw: string): string {
  const s = raw.trim();
  const m = s.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1]! : s;
}

export function PublicationsManager({
  items,
  onChange,
}: {
  items: PublicationItem[];
  onChange: (next: PublicationItem[]) => void;
}) {
  const [q, setQ] = useState("");
  const add = () => {
    const item: PublicationItem = {
      id: `pub-${Date.now()}`,
      year: new Date().getFullYear(),
      kind: "Original article",
      topics: ["retina"],
      firstAuthor: true,
      title: "New Research Publication Title",
      authors: "Mahfuzullah MA",
      journal: "Journal Name",
      citation: `${new Date().getFullYear()} · Vol. 1`,
      url: "",
    };
    onChange([item, ...items]);
  };
  const patch = (id: string, p: Partial<PublicationItem>) =>
    onChange(items.map((x) => (x.id === id ? { ...x, ...p } : x)));
  const remove = (id: string) => {
    if (confirm("Delete this publication?")) onChange(items.filter((x) => x.id !== id));
  };
  const shown = items.filter((p) => !q || `${p.title} ${p.authors} ${p.journal} ${p.year}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="bg-white p-4 shadow-sm">
      <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
        <h4 className="m-0 me-auto">Publications <small className="text-muted">({items.length})</small></h4>
        <input className="form-control form-control-sm" style={{ width: 220 }} placeholder="Filter publications…" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="btn btn-primary btn-sm" onClick={add}><i className="fa fa-plus me-1" />Add publication</button>
      </div>
      {shown.map((p) => (
        <div key={p.id} className="border p-3 mb-3 rounded">
          <div className="row g-2">
            <div className="col-md-8">
              <label className="form-label small mb-1">Paper Title</label>
              <input className="form-control form-control-sm" value={p.title} onChange={(e) => patch(p.id, { title: e.target.value })} />
            </div>
            <div className="col-md-2">
              <label className="form-label small mb-1">Year</label>
              <input type="number" className="form-control form-control-sm" value={p.year} onChange={(e) => patch(p.id, { year: Number(e.target.value) || 2026 })} />
            </div>
            <div className="col-md-2">
              <label className="form-label small mb-1">Type</label>
              <input className="form-control form-control-sm" value={p.kind} onChange={(e) => patch(p.id, { kind: e.target.value })} />
            </div>
            <div className="col-md-6">
              <label className="form-label small mb-1">Authors (include &quot;Mahfuzullah MA&quot; to highlight)</label>
              <input className="form-control form-control-sm" value={p.authors} onChange={(e) => patch(p.id, { authors: e.target.value })} />
            </div>
            <div className="col-md-6">
              <label className="form-label small mb-1">Journal</label>
              <input className="form-control form-control-sm" value={p.journal} onChange={(e) => patch(p.id, { journal: e.target.value })} />
            </div>
            <div className="col-md-5">
              <label className="form-label small mb-1">Citation (Vol. / Pages)</label>
              <input className="form-control form-control-sm" value={p.citation} onChange={(e) => patch(p.id, { citation: e.target.value })} />
            </div>
            <div className="col-md-5">
              <label className="form-label small mb-1">Paper URL / DOI (blank = In print)</label>
              <input className="form-control form-control-sm" value={p.url} onChange={(e) => patch(p.id, { url: e.target.value })} placeholder="https://doi.org/..." />
            </div>
            <div className="col-md-2 d-flex align-items-end justify-content-end">
              <button className="btn btn-sm btn-outline-danger" onClick={() => remove(p.id)}>
                <i className="fa fa-trash me-1" />Delete
              </button>
            </div>
            <div className="col-12 d-flex flex-wrap align-items-center gap-3 pt-1">
              <label className="form-check-label small fw-bold">
                <input type="checkbox" className="form-check-input me-1" checked={p.firstAuthor} onChange={(e) => patch(p.id, { firstAuthor: e.target.checked })} />
                First author
              </label>
              <div className="d-flex flex-wrap gap-2">
                {TOPIC_OPTIONS.map((t) => {
                  const active = p.topics.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      className={`btn btn-sm py-0 px-2 ${active ? "btn-primary" : "btn-outline-secondary"}`}
                      onClick={() =>
                        patch(p.id, {
                          topics: active ? p.topics.filter((x) => x !== t) : [...p.topics, t],
                        })
                      }
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function VideosManager({
  items,
  onChange,
  onUpload,
}: {
  items: VideoItem[];
  onChange: (next: VideoItem[]) => void;
  onUpload: (file: File, prefix: string) => Promise<string | null>;
}) {
  const add = () => {
    const item: VideoItem = {
      id: `vid-${Date.now()}`,
      ytId: "hDtoChwmqLM",
      title: "New Video Title",
      channel: "own",
      channelLabel: "Own channel",
      topic: "Retina & Diabetes",
      show: "Dr. Afzal's channel",
      date: "2026",
      duration: "10:00",
      thumb: "/site/images/video1-thumbnail-960.webp",
    };
    onChange([item, ...items]);
  };
  const patch = (id: string, p: Partial<VideoItem>) =>
    onChange(items.map((x) => (x.id === id ? { ...x, ...p } : x)));
  const setFeatured = (id: string) =>
    onChange(items.map((x) => ({ ...x, featured: x.id === id })));
  const remove = (id: string) => {
    if (confirm("Delete this video?")) onChange(items.filter((x) => x.id !== id));
  };

  return (
    <div className="bg-white p-4 shadow-sm">
      <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
        <h4 className="m-0 me-auto">TV &amp; YouTube Videos <small className="text-muted">({items.length})</small></h4>
        <button className="btn btn-primary btn-sm" onClick={add}><i className="fa fa-plus me-1" />Add video</button>
      </div>
      {items.map((v) => (
        <div key={v.id} className="border p-3 mb-3 rounded">
          <div className="row g-3">
            <div className="col-md-3">
              <img src={v.thumb} alt={v.title} className="w-100 rounded mb-2" style={{ aspectRatio: "16/9", objectFit: "cover" }} />
              <label className="btn btn-outline-primary btn-sm w-100">
                <i className="fa fa-upload me-1" />Upload thumbnail
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    e.target.value = "";
                    if (!f) return;
                    const url = await onUpload(f, `video-${v.id}`);
                    if (url) patch(v.id, { thumb: url });
                  }}
                />
              </label>
            </div>
            <div className="col-md-9">
              <div className="row g-2">
                <div className="col-md-8">
                  <label className="form-label small mb-1">Video Title</label>
                  <input className="form-control form-control-sm" value={v.title} onChange={(e) => patch(v.id, { title: e.target.value })} />
                </div>
                <div className="col-md-4">
                  <label className="form-label small mb-1">YouTube ID or Link</label>
                  <input className="form-control form-control-sm" value={v.ytId} onChange={(e) => patch(v.id, { ytId: extractYtId(e.target.value) })} />
                </div>
                <div className="col-md-3">
                  <label className="form-label small mb-1">Channel</label>
                  <select
                    className="form-select form-select-sm"
                    value={v.channel}
                    onChange={(e) => {
                      const ch = e.target.value as VideoItem["channel"];
                      patch(v.id, { channel: ch, channelLabel: CHANNEL_LABELS[ch] });
                    }}
                  >
                    {(Object.keys(CHANNEL_LABELS) as VideoItem["channel"][]).map((k) => (
                      <option key={k} value={k}>{CHANNEL_LABELS[k]}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label small mb-1">Topic</label>
                  <input className="form-control form-control-sm" value={v.topic} onChange={(e) => patch(v.id, { topic: e.target.value })} />
                </div>
                <div className="col-md-3">
                  <label className="form-label small mb-1">Show Name</label>
                  <input className="form-control form-control-sm" value={v.show} onChange={(e) => patch(v.id, { show: e.target.value })} />
                </div>
                <div className="col-md-3">
                  <label className="form-label small mb-1">Date / Duration</label>
                  <div className="d-flex gap-1">
                    <input className="form-control form-control-sm" value={v.date} onChange={(e) => patch(v.id, { date: e.target.value })} placeholder="Jun 2026" />
                    <input className="form-control form-control-sm" value={v.duration} onChange={(e) => patch(v.id, { duration: e.target.value })} placeholder="15:00" />
                  </div>
                </div>
                <div className="col-12 d-flex gap-2 justify-content-between pt-2">
                  <button type="button" className={`btn btn-sm ${v.featured ? "btn-success" : "btn-outline-secondary"}`} onClick={() => setFeatured(v.id)}>
                    <i className="fa fa-star me-1" />{v.featured ? "Featured on Videos Page" : "Set as Featured"}
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => remove(v.id)}>
                    <i className="fa fa-trash me-1" />Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function GalleryTestimonialsManager({
  galleryItems,
  testimonialItems,
  onGalleryChange,
  onTestimonialsChange,
  onUpload,
}: {
  galleryItems: GalleryItem[];
  testimonialItems: TestimonialItem[];
  onGalleryChange: (next: GalleryItem[]) => void;
  onTestimonialsChange: (next: TestimonialItem[]) => void;
  onUpload: (file: File, prefix: string) => Promise<string | null>;
}) {
  const addPhoto = async (file: File) => {
    const url = await onUpload(file, "gallery");
    if (!url) return;
    onGalleryChange([
      { id: `gal-${Date.now()}`, category: "conference", title: "New Gallery Photo", place: "Dhaka, Bangladesh", image: url, thumb: url, showOnHome: true },
      ...galleryItems,
    ]);
  };
  const patchGal = (id: string, p: Partial<GalleryItem>) =>
    onGalleryChange(galleryItems.map((x) => (x.id === id ? { ...x, ...p } : x)));
  const delGal = (id: string) => {
    if (confirm("Delete this photo?")) onGalleryChange(galleryItems.filter((x) => x.id !== id));
  };

  const addReview = () =>
    onTestimonialsChange([
      ...testimonialItems,
      { id: `rev-${Date.now()}`, name: "Patient Name", role: "EYE CARE PATIENT", quote: "Write patient feedback here…", image: "/site/images/photo-1566492031773-4f4e44671857.webp" },
    ]);
  const patchRev = (id: string, p: Partial<TestimonialItem>) =>
    onTestimonialsChange(testimonialItems.map((x) => (x.id === id ? { ...x, ...p } : x)));
  const delRev = (id: string) => {
    if (confirm("Delete this testimonial?")) onTestimonialsChange(testimonialItems.filter((x) => x.id !== id));
  };

  return (
    <div className="d-flex flex-column gap-4">
      <div className="bg-white p-4 shadow-sm">
        <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
          <h4 className="m-0 me-auto">Patient Testimonials <small className="text-muted">({testimonialItems.length})</small></h4>
          <button className="btn btn-primary btn-sm" onClick={addReview}><i className="fa fa-plus me-1" />Add testimonial</button>
        </div>
        {testimonialItems.map((r) => (
          <div key={r.id} className="border p-3 mb-3 rounded">
            <div className="row g-3 align-items-center">
              <div className="col-md-2 text-center">
                <img src={r.image} alt={r.name} className="rounded-circle mb-2" style={{ width: 72, height: 72, objectFit: "cover" }} />
                <label className="btn btn-outline-primary btn-sm d-block">
                  Photo
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      e.target.value = "";
                      if (!f) return;
                      const url = await onUpload(f, `review-${r.id}`);
                      if (url) patchRev(r.id, { image: url });
                    }}
                  />
                </label>
              </div>
              <div className="col-md-10">
                <div className="row g-2">
                  <div className="col-md-5">
                    <input className="form-control form-control-sm" value={r.name} onChange={(e) => patchRev(r.id, { name: e.target.value })} placeholder="Patient name" />
                  </div>
                  <div className="col-md-5">
                    <input className="form-control form-control-sm" value={r.role} onChange={(e) => patchRev(r.id, { role: e.target.value })} placeholder="Treatment / role" />
                  </div>
                  <div className="col-md-2 text-end">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => delRev(r.id)}><i className="fa fa-trash" /></button>
                  </div>
                  <div className="col-12">
                    <textarea className="form-control form-control-sm" rows={2} value={r.quote} onChange={(e) => patchRev(r.id, { quote: e.target.value })} placeholder="Patient quote" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 shadow-sm">
        <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
          <h4 className="m-0 me-auto">Photo Gallery <small className="text-muted">({galleryItems.length})</small></h4>
          <label className="btn btn-primary btn-sm m-0">
            <i className="fa fa-upload me-1" />Upload new photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (f) addPhoto(f);
              }}
            />
          </label>
        </div>
        <div className="row g-3">
          {galleryItems.map((g) => (
            <div className="col-md-6 col-lg-4" key={g.id}>
              <div className="border rounded p-2 h-100 d-flex flex-column gap-2">
                <img src={g.thumb || g.image} alt={g.title} className="w-100 rounded" style={{ aspectRatio: "16/10", objectFit: "cover" }} />
                <input className="form-control form-control-sm" value={g.title} onChange={(e) => patchGal(g.id, { title: e.target.value })} placeholder="Caption" />
                <input className="form-control form-control-sm" value={g.place} onChange={(e) => patchGal(g.id, { place: e.target.value })} placeholder="Place / event" />
                <div className="d-flex gap-2 align-items-center">
                  <select className="form-select form-select-sm" value={g.category} onChange={(e) => patchGal(g.id, { category: e.target.value as GalleryItem["category"] })}>
                    <option value="conference">Conferences</option>
                    <option value="training">Surgical Training</option>
                    <option value="portrait">Portraits</option>
                    <option value="travel">Travel</option>
                  </select>
                  <label className="small text-nowrap">
                    <input type="checkbox" className="form-check-input me-1" checked={g.showOnHome} onChange={(e) => patchGal(g.id, { showOnHome: e.target.checked })} />
                    Home
                  </label>
                  <button className="btn btn-sm btn-outline-danger ms-auto" onClick={() => delGal(g.id)} aria-label="Delete photo"><i className="fa fa-trash" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const ACH_ICONS = ["fa-trophy", "fa-award", "fa-medal", "fa-microscope", "fa-graduation-cap", "fa-certificate", "fa-star", "fa-globe-asia"];

export function AchievementsManager({
  items,
  onChange,
  onUpload,
}: {
  items: AchievementItem[];
  onChange: (next: AchievementItem[]) => void;
  onUpload: (file: File, prefix: string) => Promise<string | null>;
}) {
  const add = () =>
    onChange([
      ...items,
      {
        id: `ach-${Date.now()}`,
        tag: `${String(items.length + 1).padStart(2, "0")} · Award`,
        icon: "fa-trophy",
        title: "New Achievement",
        meta: "Event · Place",
        desc: "Describe this achievement.",
        quote: "",
        footIcon: "fa-map-marker-alt",
        footText: "Dhaka, Bangladesh",
        link: "",
        img: "/site/images/achievements/apvrs2026-presenting-sm.webp",
        fullImg: "/site/images/achievements/apvrs2026-presenting.webp",
      },
    ]);
  const patch = (id: string, p: Partial<AchievementItem>) => onChange(items.map((x) => (x.id === id ? { ...x, ...p } : x)));
  const remove = (id: string) => {
    if (confirm("Remove this achievement from the website?")) onChange(items.filter((x) => x.id !== id));
  };
  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j]!, next[i]!];
    onChange(next);
  };
  const field = (a: AchievementItem, k: keyof AchievementItem, label: string, cls = "col-md-6", area = false) => (
    <div className={cls}>
      <label className="form-label small mb-1">{label}</label>
      {area ? (
        <textarea className="form-control form-control-sm" rows={2} value={a[k]} onChange={(e) => patch(a.id, { [k]: e.target.value })} />
      ) : (
        <input className="form-control form-control-sm" value={a[k]} onChange={(e) => patch(a.id, { [k]: e.target.value })} />
      )}
    </div>
  );

  return (
    <div className="bg-white p-4 shadow-sm">
      <div className="d-flex flex-wrap gap-2 align-items-center mb-1">
        <h4 className="m-0 me-auto">Recent Achievements <small className="text-muted">({items.length})</small></h4>
        <button className="btn btn-primary btn-sm" onClick={add}><i className="fa fa-plus me-1" />Add achievement</button>
      </div>
      <p className="text-muted small mb-3">Shown on the Home and About pages. The section heading can be changed from the page editor.</p>
      {items.length === 0 && <p className="text-muted">No achievements — the cards area will be empty until you add one.</p>}
      {items.map((a, i) => (
        <div key={a.id} className="border p-3 mb-3 rounded">
          <div className="row g-3">
            <div className="col-md-3">
              <img src={a.img} alt={a.title} className="w-100 rounded mb-2" style={{ aspectRatio: "4/3", objectFit: "cover" }} />
              <label className="btn btn-outline-primary btn-sm w-100 mb-2">
                <i className="fa fa-upload me-1" />Change photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    e.target.value = "";
                    if (!f) return;
                    const url = await onUpload(f, `achievement-${a.id}`);
                    if (url) patch(a.id, { img: url, fullImg: url });
                  }}
                />
              </label>
              <div className="d-flex gap-1">
                <button className="btn btn-sm btn-light border flex-fill" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up"><i className="fa fa-arrow-up" /></button>
                <button className="btn btn-sm btn-light border flex-fill" disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label="Move down"><i className="fa fa-arrow-down" /></button>
                <button className="btn btn-sm btn-outline-danger flex-fill" onClick={() => remove(a.id)}><i className="fa fa-trash me-1" />Remove</button>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row g-2">
                {field(a, "title", "Title", "col-md-8")}
                {field(a, "tag", "Photo label (e.g. 01 · Award)", "col-md-4")}
                {field(a, "meta", "Event / subtitle")}
                <div className="col-md-6">
                  <label className="form-label small mb-1">Icon</label>
                  <select className="form-select form-select-sm" value={a.icon} onChange={(e) => patch(a.id, { icon: e.target.value })}>
                    {ACH_ICONS.map((ic) => <option key={ic} value={ic}>{ic.replace("fa-", "")}</option>)}
                  </select>
                </div>
                {field(a, "desc", "Description", "col-12", true)}
                {field(a, "quote", "Quote (optional)", "col-12", true)}
                {field(a, "footText", "Place / date")}
                {field(a, "link", "Post link (optional, https://...)")}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
