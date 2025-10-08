-- Ensure pgcrypto extension exists
create extension if not exists pgcrypto;

-- Create or update profiles table
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text unique not null,
  username text,
  first_name text,
  last_name text,
  email text unique,
  bio text,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Add policies if not exists
do $$ 
begin
  if not exists (
    select 1 from pg_policies 
    where schemaname = 'public' and tablename = 'profiles' 
      and policyname = 'Enable read access for all'
  ) then
    create policy "Enable read access for all" 
      on public.profiles 
      for select using (true);
  end if;

  if not exists (
    select 1 from pg_policies 
    where schemaname = 'public' and tablename = 'profiles' 
      and policyname = 'Enable insert access for all'
  ) then
    create policy "Enable insert access for all" 
      on public.profiles 
      for insert with check (true);
  end if;

  if not exists (
    select 1 from pg_policies 
    where schemaname = 'public' and tablename = 'profiles' 
      and policyname = 'Enable update access for all'
  ) then
    create policy "Enable update access for all" 
      on public.profiles 
      for update using (true);
  end if;
end $$;
