-- =============================================================
-- Sukutera · Lake Kivu Plastic Tracking Platform
-- Supabase PostgreSQL Schema
-- Run this in the Supabase SQL Editor
-- =============================================================

-- ── Enable UUID generation ────────────────────────────────────
create extension if not exists "pgcrypto";

-- ── DISTRICTS ────────────────────────────────────────────────
create table if not exists districts (
  id            uuid primary key default gen_random_uuid(),
  name          text not null unique,
  shoreline_km  float not null default 0,
  target_kg     float not null default 0,
  created_at    timestamptz not null default now()
);

-- Seed district data
insert into districts (name, shoreline_km, target_kg) values
  ('Rubavu',  28.4, 500),
  ('Karongi', 42.1, 750),
  ('Rusizi',  35.7, 620)
on conflict (name) do nothing;

-- ── COLLECTORS ───────────────────────────────────────────────
create table if not exists collectors (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  phone         text,
  district      text references districts(name) on update cascade,
  total_kg      float not null default 0,
  total_points  int   not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists idx_collectors_district      on collectors(district);
create index if not exists idx_collectors_total_points  on collectors(total_points desc);

-- ── COLLECTIONS ──────────────────────────────────────────────
create table if not exists collections (
  id            uuid primary key default gen_random_uuid(),
  collector_id  uuid references collectors(id) on delete set null,
  latitude      float,
  longitude     float,
  weight_kg     float not null check (weight_kg > 0),
  plastic_type  text  not null check (plastic_type in ('PET', 'HDPE', 'Mixed', 'Other')),
  notes         text,
  photo_url     text,
  district      text references districts(name) on update cascade,
  created_at    timestamptz not null default now()
);

create index if not exists idx_collections_collector_id on collections(collector_id);
create index if not exists idx_collections_district     on collections(district);
create index if not exists idx_collections_created_at   on collections(created_at desc);
create index if not exists idx_collections_plastic_type on collections(plastic_type);

-- ── STORED PROCEDURE — increment collector stats ──────────────
-- Called after every new collection to atomically update totals
create or replace function increment_collector_stats(
  p_collector_id uuid,
  p_kg           float,
  p_pts          int
)
returns void
language plpgsql
security definer
as $$
begin
  update collectors
  set
    total_kg     = total_kg     + p_kg,
    total_points = total_points + p_pts
  where id = p_collector_id;
end;
$$;

-- ── ROW LEVEL SECURITY ───────────────────────────────────────
-- Enable RLS on all tables
alter table districts   enable row level security;
alter table collectors  enable row level security;
alter table collections enable row level security;

-- Public read access (anonymous users can view the map & leaderboard)
create policy "Public read districts"
  on districts for select using (true);

create policy "Public read collectors"
  on collectors for select using (true);

create policy "Public read collections"
  on collections for select using (true);

-- Authenticated write access (collectors log their own data)
create policy "Authenticated insert collections"
  on collections for insert
  with check (true);  -- relax: allow anon inserts for field use; tighten with auth later

create policy "Authenticated insert collectors"
  on collectors for insert
  with check (true);

-- ── REALTIME ─────────────────────────────────────────────────
-- Enable Realtime on collections and collectors so the map and
-- leaderboard update instantly when new data is logged
alter publication supabase_realtime add table collections;
alter publication supabase_realtime add table collectors;

-- ── SEED COLLECTORS ──────────────────────────────────────────
-- Uncomment to seed demo data
/*
insert into collectors (name, phone, district, total_kg, total_points) values
  ('Amina Uwimana',       '+250781234567', 'Rubavu',  48.3, 420),
  ('Jean-Paul Habimana',  '+250782345678', 'Rubavu',  31.2, 285),
  ('Chantal Mukamurera',  '+250783456789', 'Rubavu',  22.7, 198),
  ('Emmanuel Nkurunziza', '+250784567890', 'Karongi', 55.1, 487),
  ('Vestine Kayitesi',    '+250785678901', 'Karongi', 39.8, 351),
  ('Patrick Nzeyimana',   '+250786789012', 'Karongi', 28.4, 243),
  ('Marie-Claire Ingabire','+250787890123','Rusizi',  61.7, 534),
  ('Innocent Bizimana',   '+250788901234', 'Rusizi',  44.5, 388),
  ('Solange Mukamana',    '+250789012345', 'Rusizi',  37.1, 321);
*/
