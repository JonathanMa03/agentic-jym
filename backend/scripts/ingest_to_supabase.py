from pathlib import Path
from typing import Iterator

from openai import OpenAI

from app.core.config import OPENAI_API_KEY
from app.db.supabase_client import supabase

client = OpenAI(api_key=OPENAI_API_KEY)

DATA_DIR = Path("data/source_docs")
CHUNK_SIZE = 400
CHUNK_OVERLAP = 75


def chunk_text(text: str) -> list[str]:
    sections = [s.strip() for s in text.split("---") if s.strip()]
    chunks = []

    for section in sections:
        words = section.split()

        if len(words) <= CHUNK_SIZE:
            chunks.append(section)
        else:
            start = 0
            while start < len(words):
                end = start + CHUNK_SIZE
                chunks.append(" ".join(words[start:end]))

                if end >= len(words):
                    break

                start += CHUNK_SIZE - CHUNK_OVERLAP

    return chunks


def embed_text(text: str) -> list[float]:
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding


def parse_source_doc(text: str, fallback_title: str) -> tuple[str, str, str]:
    lines = text.splitlines()

    title = fallback_title
    source_type = "general"

    content_lines = []

    for line in lines:
        if line.startswith("Title:"):
            title = line.replace("Title:", "", 1).strip()
        elif line.startswith("Source Type:"):
            source_type = line.replace("Source Type:", "", 1).strip()
        else:
            content_lines.append(line)

    content = "\n".join(content_lines).strip()
    return title, source_type, content


def upsert_document(title: str, source_type: str) -> str:
    existing = (
        supabase.table("documents")
        .select("id")
        .eq("title", title)
        .execute()
    )

    if existing.data:
        document_id = existing.data[0]["id"]

        supabase.table("chunks").delete().eq("document_id", document_id).execute()
        supabase.table("documents").update({"source_type": source_type}).eq("id", document_id).execute()

        return document_id

    inserted = (
        supabase.table("documents")
        .insert({
            "title": title,
            "source_type": source_type,
        })
        .execute()
    )

    return inserted.data[0]["id"]


def ingest() -> None:
    for file in DATA_DIR.glob("*.txt"):
        raw_text = file.read_text(encoding="utf-8")
        fallback_title = file.stem

        title, source_type, content = parse_source_doc(raw_text, fallback_title)
        document_id = upsert_document(title, source_type)

        chunks = list(chunk_text(content))

        for i, chunk in enumerate(chunks):
            embedding = embed_text(chunk)

            supabase.table("chunks").insert({
                "document_id": document_id,
                "chunk_index": i,
                "chunk_text": chunk,
                "embedding": embedding,
            }).execute()

        print(f"Ingested {title} ({len(chunks)} chunks)")


if __name__ == "__main__":
    ingest()