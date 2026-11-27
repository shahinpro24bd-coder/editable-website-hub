import { createServerFn } from "@tanstack/react-start";
import { ADMIN_EMAIL, type SiteContent } from "@/lib/cms";

export const getSiteContent = createServerFn({ method: "GET" }).handler(async (): Promise<SiteContent> => {
  try {
    const { publicDbClient } = await import("@/lib/public-db.server");
    const sb = publicDbClient();
    if (!sb) return {};
    const { data } = await sb.from("site_content").select("key, value");
    const out: Record<string, unknown> = {};
    for (const r of data ?? []) out[r.key] = r.value;
    return out as SiteContent;
  } catch {
    return {};
  }
});

const INITIAL_ADMIN_PASSWORD = "AfzalAdmin#2026!";

// Creates the default admin account once, only while no admin exists yet.
export const ensureAdminAccount = createServerFn({ method: "POST" }).handler(async () => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) > 0) return { created: false };

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: INITIAL_ADMIN_PASSWORD,
      email_confirm: true,
    });
    let userId = data.user?.id;
    if (error || !userId) {
      const list = await supabaseAdmin.auth.admin.listUsers();
      userId = list.data.users.find((u) => u.email === ADMIN_EMAIL)?.id;
    }
    if (!userId) return { created: false };
    await supabaseAdmin.from("user_roles").insert({ user_id: userId, role: "admin" });
    return { created: true };
  } catch {
    return { created: false };
  }
});