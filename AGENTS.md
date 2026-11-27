<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->
## Project Architecture
- **Dynamic CMS & Visual Editor**: All editable site content (`doctor`, `services`, `publications`, `videos`, `gallery`, `testimonials`, `texts`) lives in `public.site_content`, loaded in `src/routes/__root.tsx` via `getSiteContent`, and merged in place through `applyContent()` (`src/lib/cms.ts`) so both public routes and the inline visual editor (`/admin/pages/$page`) share one source of truth.
- **Admin Access Control**: Admin privileges live exclusively in `public.user_roles` checked server-side and in RLS via `public.has_role(auth.uid(), 'admin')`; `/admin` routes sit behind `src/routes/_authenticated/route.tsx`.
- **Private Media Uploads**: Admin image uploads go to the private `site-images` bucket and are served publicly at `/api/public/img/$` via `supabaseAdmin`.
- **Practice Management Records**: Website appointment requests (`appointment_requests`) are stored in a Lovable Cloud table with public insert and admin-only management. The admin panel exposes appointment requests and website content only — no patient directory, care plans, surgical-visit records, invoicing, fees, or financial reporting. Legacy clinic-record tables stay in the database but are not reachable from the UI.
- **Achievements list**: Recent Achievements cards live in `site_content.achievements` (managed in the admin Achievements tab; inline-edited via `achievements.<idx>.<field>` keys in the page editor). A saved empty list means "show none", unlike other lists which fall back to defaults when empty.
