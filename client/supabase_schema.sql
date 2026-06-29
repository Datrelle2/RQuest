-- Run this in your Supabase SQL editor to set up the database
-- Execute each block separately if you encounter issues

-- ── 1. Profiles table ──────────────────────────────────────────────────────
create table public.profiles (
  id              uuid references auth.users on delete cascade primary key,
  name            text,
  email           text,
  total_xp        integer default 0,
  completed_count integer default 0,
  streak          integer default 0,
  longest_streak  integer default 0,
  categories      text[] default '{}',
  difficulty      text default 'Mixed',
  frequency       text default 'Daily',
  created_at      timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ── 2. Auto-create profile on sign up ──────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', new.email),
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── 3. Challenges table ────────────────────────────────────────────────────
create table public.challenges (
  id           uuid default gen_random_uuid() primary key,
  user_id      uuid references public.profiles on delete cascade not null,
  title        text not null,
  description  text,
  category     text,
  difficulty   text,
  xp           integer default 100,
  time         integer default 30,
  date         date,
  type         text default 'generated',
  completed    boolean default false,
  completed_at timestamptz,
  saved        boolean default false,
  created_at   timestamptz default now()
);

alter table public.challenges enable row level security;

create policy "Users can manage own challenges"
  on public.challenges
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
