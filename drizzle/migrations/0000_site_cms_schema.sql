create type public.app_role as enum ('admin');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;
create policy "own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create table public.site_content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
grant select on public.site_content to anon;
grant select, insert, update, delete on public.site_content to authenticated;
grant all on public.site_content to service_role;
alter table public.site_content enable row level security;
create policy "public read" on public.site_content for select to anon, authenticated using (true);
create policy "admin insert" on public.site_content for insert to authenticated with check (public.has_role(auth.uid(),'admin'));
create policy "admin update" on public.site_content for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin delete" on public.site_content for delete to authenticated using (public.has_role(auth.uid(),'admin'));

create table public.appointment_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null, phone text not null, email text, age text,
  service text not null, details text not null,
  preferred_date text, visit_type text, follow_up_date text, notes text,
  status text not null default 'new'
);
grant insert on public.appointment_requests to anon;
grant select, insert, update, delete on public.appointment_requests to authenticated;
grant all on public.appointment_requests to service_role;
alter table public.appointment_requests enable row level security;
create policy "anyone can request" on public.appointment_requests for insert to anon, authenticated with check (status = 'new');
create policy "admin read" on public.appointment_requests for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin update" on public.appointment_requests for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin delete" on public.appointment_requests for delete to authenticated using (public.has_role(auth.uid(),'admin'));

create policy "admin upload site images" on storage.objects for insert to authenticated with check (bucket_id='site-images' and public.has_role(auth.uid(),'admin'));
create policy "admin update site images" on storage.objects for update to authenticated using (bucket_id='site-images' and public.has_role(auth.uid(),'admin'));
create policy "admin delete site images" on storage.objects for delete to authenticated using (bucket_id='site-images' and public.has_role(auth.uid(),'admin'));