drop function if exists match_chunks(vector, integer);

create or replace function match_chunks (
  query_embedding vector(1536),
  match_count int default 5
)
returns table (
  id uuid,
  document_id uuid,
  title text,
  chunk_text text,
  similarity float
)
language sql
as $$
  select
    c.id,
    c.document_id,
    d.title,
    c.chunk_text,
    1 - (c.embedding <=> query_embedding) as similarity
  from chunks c
  join documents d on c.document_id = d.id
  order by c.embedding <=> query_embedding
  limit match_count;
$$;