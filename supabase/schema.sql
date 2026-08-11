-- Banco sugerido para a fase de persistência real.
-- Execute no SQL Editor do Supabase quando for conectar o CRM ao banco.

create extension if not exists pgcrypto;

create table if not exists clinics (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  clinic_id uuid references clinics(id) on delete cascade,
  name text,
  role text not null default 'agent',
  created_at timestamptz not null default now()
);

create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references clinics(id) on delete cascade,
  name text,
  phone text not null,
  email text,
  source text,
  interest text,
  stage text not null default 'Novo lead',
  assigned_to uuid references profiles(id),
  automation_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(clinic_id, phone)
);

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references clinics(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  status text not null default 'open',
  last_message_at timestamptz default now(),
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references clinics(id) on delete cascade,
  conversation_id uuid not null references conversations(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  direction text not null check (direction in ('in','out')),
  type text not null default 'text',
  content text,
  whatsapp_message_id text,
  sent_by text default 'automation',
  status text default 'sent',
  created_at timestamptz not null default now()
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references clinics(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  professional_name text,
  procedure_name text,
  starts_at timestamptz not null,
  status text not null default 'scheduled',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists patient_notes (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references clinics(id) on delete cascade,
  patient_id uuid not null references patients(id) on delete cascade,
  author_id uuid references profiles(id),
  content text not null,
  created_at timestamptz not null default now()
);

alter table clinics enable row level security;
alter table profiles enable row level security;
alter table patients enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table appointments enable row level security;
alter table patient_notes enable row level security;

-- Política base: usuário autenticado acessa somente a própria clínica.
create policy "profiles_same_user" on profiles for select using (id = auth.uid());
create policy "patients_same_clinic" on patients for all using (clinic_id = (select clinic_id from profiles where id = auth.uid())) with check (clinic_id = (select clinic_id from profiles where id = auth.uid()));
create policy "conversations_same_clinic" on conversations for all using (clinic_id = (select clinic_id from profiles where id = auth.uid())) with check (clinic_id = (select clinic_id from profiles where id = auth.uid()));
create policy "messages_same_clinic" on messages for all using (clinic_id = (select clinic_id from profiles where id = auth.uid())) with check (clinic_id = (select clinic_id from profiles where id = auth.uid()));
create policy "appointments_same_clinic" on appointments for all using (clinic_id = (select clinic_id from profiles where id = auth.uid())) with check (clinic_id = (select clinic_id from profiles where id = auth.uid()));
create policy "notes_same_clinic" on patient_notes for all using (clinic_id = (select clinic_id from profiles where id = auth.uid())) with check (clinic_id = (select clinic_id from profiles where id = auth.uid()));
