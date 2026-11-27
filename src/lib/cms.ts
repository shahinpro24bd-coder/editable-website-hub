import {
  doctor,
  services,
  publications,
  videos,
  gallery,
  testimonials,
  achievements,
  type AchievementItem,
  type DoctorInfo,
  type EyeService,
  type PublicationItem,
  type VideoItem,
  type GalleryItem,
  type TestimonialItem,
} from "@/lib/site";
import { setPageTexts } from "@/lib/editable";

export type SiteContent = {
  doctor?: Partial<DoctorInfo>;
  services?: EyeService[];
  publications?: PublicationItem[];
  videos?: VideoItem[];
  gallery?: GalleryItem[];
  testimonials?: TestimonialItem[];
  achievements?: AchievementItem[];
  texts?: Record<string, string>;
};

export const defaults = {
  doctor: { ...doctor },
  services: services.map((s) => ({ ...s })),
  publications: publications.map((p) => ({ ...p, topics: [...p.topics] })),
  videos: videos.map((v) => ({ ...v })),
  gallery: gallery.map((g) => ({ ...g })),
  testimonials: testimonials.map((t) => ({ ...t })),
  achievements: achievements.map((a) => ({ ...a })),
};

export function applyContent(c: SiteContent | null | undefined) {
  Object.assign(doctor, defaults.doctor, c?.doctor ?? {});

  if (Array.isArray(c?.services) && c.services.length > 0) {
    services.splice(0, services.length, ...c.services.map((s) => ({ ...s })));
  } else {
    services.splice(0, services.length, ...defaults.services.map((s) => ({ ...s })));
  }

  if (Array.isArray(c?.publications) && c.publications.length > 0) {
    publications.splice(
      0,
      publications.length,
      ...c.publications.map((p) => ({ ...p, topics: Array.isArray(p.topics) ? [...p.topics] : [] })),
    );
  } else {
    publications.splice(0, publications.length, ...defaults.publications.map((p) => ({ ...p, topics: [...p.topics] })));
  }

  if (Array.isArray(c?.videos) && c.videos.length > 0) {
    videos.splice(0, videos.length, ...c.videos.map((v) => ({ ...v })));
  } else {
    videos.splice(0, videos.length, ...defaults.videos.map((v) => ({ ...v })));
  }

  if (Array.isArray(c?.gallery) && c.gallery.length > 0) {
    gallery.splice(0, gallery.length, ...c.gallery.map((g) => ({ ...g })));
  } else {
    gallery.splice(0, gallery.length, ...defaults.gallery.map((g) => ({ ...g })));
  }

  if (Array.isArray(c?.testimonials) && c.testimonials.length > 0) {
    testimonials.splice(0, testimonials.length, ...c.testimonials.map((t) => ({ ...t })));
  } else {
    testimonials.splice(0, testimonials.length, ...defaults.testimonials.map((t) => ({ ...t })));
  }

  // An empty saved list is respected (admin removed every achievement); only a missing key falls back.
  if (Array.isArray(c?.achievements)) {
    achievements.splice(0, achievements.length, ...c.achievements.map((a) => ({ ...a })));
  } else {
    achievements.splice(0, achievements.length, ...defaults.achievements.map((a) => ({ ...a })));
  }

  setPageTexts((c?.texts ?? {}) as Record<string, string>);
}

export const ADMIN_EMAIL = "admin@drafzal-app.com";
export const usernameToEmail = (u: string) =>
  u.includes("@") ? u.trim().toLowerCase() : `${u.trim().toLowerCase()}@drafzal-app.com`;