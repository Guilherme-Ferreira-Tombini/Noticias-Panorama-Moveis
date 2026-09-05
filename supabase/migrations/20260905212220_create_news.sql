create table public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  authors text not null,
  image text,
  description text not null,
  date timestamptz not null default now()
);

alter table public.news enable row level security;