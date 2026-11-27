drop policy "public read" on public.site_content;
create policy "public read website sections" on public.site_content for select to anon, authenticated
  using (key in ('doctor','services','publications','videos','gallery','testimonials','achievements','texts'));
create policy "admin read all" on public.site_content for select to authenticated
  using (public.has_role(auth.uid(),'admin'));