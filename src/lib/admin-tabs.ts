// The admin panel's section list. Patients, care plans and surgical visits are
// deliberately absent: the doctor asked for appointment requests and content
// management only.
export type AdminTab =
  | "dashboard"
  | "appointments"
  | "doctor"
  | "services"
  | "publications"
  | "videos"
  | "gallery"
  | "achievements"
  | "account";

export type AdminTabDef = { key: AdminTab; label: string; icon: string };

export const adminTabs: AdminTabDef[] = [
  { key: "dashboard", label: "Dashboard", icon: "fa-th-large" },
  { key: "appointments", label: "Appointments", icon: "fa-inbox" },
  { key: "doctor", label: "Doctor & Clinic", icon: "fa-hospital" },
  { key: "services", label: "Services", icon: "fa-eye" },
  { key: "publications", label: "Publications", icon: "fa-book-medical" },
  { key: "videos", label: "Videos", icon: "fa-play-circle" },
  { key: "gallery", label: "Gallery & Reviews", icon: "fa-images" },
  { key: "achievements", label: "Achievements", icon: "fa-trophy" },
  { key: "account", label: "Account", icon: "fa-user-cog" },
];
