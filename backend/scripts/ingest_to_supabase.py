import os
from pathlib import Path
from app.db.supabase_client import supabase
from app.core.config import OPENAI_API_KEY
from openai import OpenAI

client = OpenAI(api_key=OPENAI_API_KEY)

DATA_DIR = Path("data/sample_docs")

def chunk_text(text, chunk_size=500):
    words = text.split()
    for i in range(0, len(words), chunk_size):
        yield " ".join(words[i:i+chunk_size])

def embed_text(text):
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

def ingest():
    for file in DATA_DIR.glob("*.txt"):
        title = file.stem

        # insert document
        doc = supabase.table("documents").insert({
            "title": title,
            "source_type": "text"
        }).execute()

        doc_id = doc.data[0]["id"]

        text = file.read_text()

        for i, chunk in enumerate(chunk_text(text)):
            embedding = embed_text(chunk)

            supabase.table("chunks").insert({
                "document_id": doc_id,
                "chunk_index": i,
                "chunk_text": chunk,
                "embedding": embedding
            }).execute()

        print(f"Ingested {title}")

if __name__ == "__main__":
    ingest()