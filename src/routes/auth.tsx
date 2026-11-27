import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ensureAdminAccount } from "@/lib/cms.functions";
import { usernameToEmail } from "@/lib/cms";

export const Route = createFileRoute("/auth")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) throw redirect({ to: "/admin" });
  },
  head: () => ({
    meta: [
      { title: "Admin Sign In | Dr. Md. Afzal Mahfuzullah" },
      { name: "description", content: "Sign in to manage Dr. Md. Afzal Mahfuzullah's website and clinic admin panel." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Sign In | Dr. Afzal" },
      { property: "og:description", content: "Dr. Afzal website admin panel sign in." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      if (username.trim().toLowerCase() === "admin") {
        await ensureAdminAccount();
      }
      const { error } = await supabase.auth.signInWithPassword({
        email: usernameToEmail(username),
        password,
      });
      if (error) throw error;
      nav({ to: "/admin", replace: true });
    } catch {
      setErr("Wrong username or password.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="adm-shell d-flex align-items-center justify-content-center bg-light" style={{ minHeight: "100vh", padding: 16 }}>
      <form
        onSubmit={submit}
        className="bg-white shadow p-5"
        style={{ width: "100%", maxWidth: 420, borderTop: "4px solid var(--bs-primary, #0463FA)" }}
      >
        <h1 className="display-6 mb-1">Dr. Afzal Admin</h1>
        <p className="text-muted mb-4">Sign in to edit your website and manage clinic records.</p>
        <label className="form-label">Username</label>
        <input
          className="form-control mb-3"
          style={{ height: 50 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
        <label className="form-label">Password</label>
        <div className="input-group mb-3">
          <input
            type={showPw ? "text" : "password"}
            className="form-control"
            style={{ height: 50 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            <i className={`fa ${showPw ? "fa-eye-slash" : "fa-eye"}`} />
          </button>
        </div>
        {err && <p className="text-danger">{err}</p>}
        <button className="btn btn-primary w-100 py-3" disabled={busy}>
          {busy ? "Signing in…" : "Sign In"}
        </button>
        <a href="/" className="d-block text-center mt-3">← Back to website</a>
      </form>
    </div>
  );
}