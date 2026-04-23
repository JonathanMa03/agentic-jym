create table documents (
  id uuid primary key default gen_random_uuid(),
  title text,
  source_type text,
  created_at timestamp default now()
);

create table chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references documents(id) on delete cascade,
  chunk_index int,
  chunk_text text,
  embedding vector(1536),
  created_at timestamp default now()
);