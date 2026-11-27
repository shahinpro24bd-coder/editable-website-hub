import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type JSX, type MouseEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { applyContent, defaults, type SiteContent } from "@/lib/cms";
import type { AchievementItem, EyeService } from "@/lib/site";
import { EditContext } from "@/lib/editable";
import { SiteLayout } from "@/components/site/Layout";
import { HomePage } from "@/components/site/pages/HomePage";
import { AboutPage } from "@/components/site/pages/AboutPage";
import { ServicesPage } from "@/components/site/pages/ServicesPage";
import { VideosPage } from "@/components/site/pages/VideosPage";
import { PublicationsPage } from "@/components/site/pages/PublicationsPage";
import { ContactPage } from "@/components/site/pages/ContactPage";

const editorPages: Record<string, { name: string; path: string; render: () => JSX.Element }> = {
  home: { name: "Home", path: "/", render: () => <HomePage /> },
  about: { name: "About", path: "/about", render: () => <AboutPage /> },
  services: { name: "Services", path: "/services", render: () => <ServicesPage /> },
  videos: { name: "Videos", path: "/videos", render: () => <VideosPage /> },
  publications: { name: "Publications", path: "/publications", render: () => <PublicationsPage /> },
  contact: { name: "Contact", path: "/contact", render: () => <ContactPage /> },
};

export const Route = createFileRoute("/_authenticated/admin_/pages/$page")({
  head: () => ({
    meta: [
      { title: "Edit Page | Dr. Afzal Admin" },
      { name: "description", content: "Edit the texts and images of Dr. Afzal's website page directly." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Edit Page | Dr. Afzal Admin" },
      { property: "og:description", content: "Dr. Afzal visual page editor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VisualPageEditor,
});

const svcRe = /^services\.(\d+)\.(title|summary|cta|image)$/;
const achRe = /^achievements\.(\d+)\.(tag|title|meta|desc|quote|footText|img)$/;
type AchField = "tag" | "title" | "meta" | "desc" | "quote" | "footText" | "img";

function VisualPageEditor() {
  const { page } = Route.useParams();
  const def = editorPages[page];
  const router = useRouter();
  const [ready, setReady] = useState<"loading" | "ok" | "denied">("loading");
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [svcs, setSvcs] = useState<EyeService[]>(defaults.services.map((s) => ({ ...s })));
  const [achs, setAchs] = useState<AchievementItem[]>(defaults.achievements.map((a) => ({ ...a })));
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const pickKey = useRef<string>("");
  const loadedRef = useRef<SiteContent>({});

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) { setReady("denied"); return; }
      const { data: ok } = await supabase.rpc("has_role", { _user_id: u.user.id, _role: "admin" });
      if (!ok) { setReady("denied"); return; }
      const { data } = await supabase.from("site_content").select("key, value");
      const loaded: Record<string, unknown> = {};
      for (const r of data ?? []) {
        loaded[r.key] = r.value;
        if (r.key === "texts" && r.value && typeof r.value === "object") {
          setTexts(r.value as Record<string, string>);
        }
        if (r.key === "services" && Array.isArray(r.value) && r.value.length) {
          setSvcs(r.value as EyeService[]);
        }
        if (r.key === "achievements" && Array.isArray(r.value)) {
          setAchs(r.value as AchievementItem[]);
        }
      }
      loadedRef.current = loaded as SiteContent;
      applyContent(loaded);
      setReady("ok");
    })();
  }, []);

  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => {
      if (dirty) { e.preventDefault(); e.returnValue = ""; }
    };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const ctx = useMemo(
    () => ({
      edit: true,
      get: (k: string, d: string) => {
        const m = k.match(svcRe);
        if (m) {
          const idx = Number(m[1]);
          const field = m[2] as "title" | "summary" | "cta" | "image";
          return svcs[idx]?.[field] ?? d;
        }
        const a = k.match(achRe);
        if (a) return achs[Number(a[1])]?.[a[2] as AchField] ?? d;
        return texts[k] ?? d;
      },
      set: (k: string, v: string) => {
        setDirty(true);
        const m = k.match(svcRe);
        if (m) {
          const idx = Number(m[1]);
          const field = m[2] as "title" | "summary" | "cta" | "image";
          setSvcs((prev) => prev.map((x, j) => (j === idx ? { ...x, [field]: v } : x)));
          return;
        }
        const a = k.match(achRe);
        if (a) {
          const idx = Number(a[1]);
          const field = a[2] as AchField;
          // A replaced photo is used for both the card and the full-size viewer.
          setAchs((prev) => prev.map((x, j) => (j === idx ? { ...x, [field]: v, ...(field === "img" ? { fullImg: v } : {}) } : x)));
          return;
        }
        setTexts((t) => ({ ...t, [k]: v }));
      },
      pick: (k: string) => {
        pickKey.current = k;
        fileRef.current?.click();
      },
    }),
    [texts, svcs, achs],
  );

  const onFile = async (file: File) => {
    const k = pickKey.current;
    if (!k) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (JPG, PNG, WebP, or GIF).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be smaller than 10 MB.");
      return;
    }
    setUploading(true);
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const name = `${k.replace(/[^\w-]/g, "-")}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("site-images")
      .upload(name, file, { contentType: file.type, cacheControl: "31536000" });
    setUploading(false);
    if (error) {
      toast.error("Upload failed: " + error.message);
      return;
    }
    ctx.set(k, `/api/public/img/${name}`);
    toast.success("Image changed — click Save changes to publish.");
  };

  const save = async () => {
    setSaving(true);
    const now = new Date().toISOString();
    const clean = Object.fromEntries(Object.entries(texts).filter(([, v]) => v.trim() !== ""));
    const { error } = await supabase.from("site_content").upsert([
      { key: "texts", value: clean, updated_at: now },
      { key: "services", value: svcs, updated_at: now },
      { key: "achievements", value: achs, updated_at: now },
    ] as never);
    setSaving(false);
    if (error) {
      toast.error("Could not save: " + error.message);
      return;
    }
    const nextContent: SiteContent = { ...loadedRef.current, texts: clean, services: svcs, achievements: achs };
    loadedRef.current = nextContent;
    applyContent(nextContent);
    setDirty(false);
    toast.success(`Saved! The ${def?.name ?? ""} page is updated.`);
    router.invalidate();
  };

  const reset = () => {
    if (!confirm("Discard all unsaved changes?")) return;
    window.location.reload();
  };

  const blockLinks = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) e.preventDefault();
  };

  if (ready === "loading") return <div className="p-5 text-center">Loading editor…</div>;
  if (!def) {
    return (
      <div className="p-5 text-center">
        <h3>Page not found</h3>
        <Link to="/admin" className="btn btn-primary mt-3">Back</Link>
      </div>
    );
  }
  if (ready === "denied") {
    return (
      <div className="p-5 text-center">
        <h3>No admin access</h3>
        <Link to="/admin" className="btn btn-primary mt-3">Back</Link>
      </div>
    );
  }

  return (
    <>
      <div className="cms-toolbar">
        <Link to="/admin" className="btn btn-outline-light btn-sm">
          <i className="fa fa-arrow-left me-1" />Dashboard
        </Link>
        <div className="cms-toolbar-title">
          <span>Editing: <strong>{def.name}</strong></span>
          <small className="d-none d-md-inline">Click any text to type · click any photo to replace it</small>
        </div>
        {uploading && <span className="cms-toolbar-note">Uploading…</span>}
        <a href={def.path} target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm">View live</a>
        <button className="btn btn-outline-light btn-sm" onClick={reset} disabled={!dirty}>Discard</button>
        <button className="btn btn-primary btn-sm px-4" onClick={save} disabled={saving || !dirty}>
          {saving ? "Saving…" : dirty ? "Save changes •" : "Saved"}
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (f) onFile(f);
        }}
      />
      <div className="cms-editing" onClickCapture={blockLinks}>
        <EditContext.Provider value={ctx}>
          <SiteLayout>{def.render()}</SiteLayout>
        </EditContext.Provider>
      </div>
    </>
  );
}