from pathlib import Path
from typing import List, Dict
from app.services.chunking import chunk_text
from app.services.embeddings import get_embedding

PROJECT_ROOT = Path(__file__).resolve().parents[3]
DATA_PATH = PROJECT_ROOT / "data" / "sample_docs"

# GLOBAL CACHE
CHUNK_STORE: List[Dict] = []


def load_documents() -> List[Dict]:
    documents = []

    for filepath in DATA_PATH.glob("*.txt"):
        text = filepath.read_text(encoding="utf-8")

        documents.append({
            "id": filepath.name,
            "text": text
        })

    return documents


def initialize_chunks():
    global CHUNK_STORE

    print("🔄 Building chunk store...")

    docs = load_documents()
    all_chunks = []

    for doc in docs:
        chunks = chunk_text(doc["text"])

        for i, chunk in enumerate(chunks):
            embedding = get_embedding(chunk)

            all_chunks.append({
                "doc_id": doc["id"],
                "chunk_id": f"{doc['id']}_{i}",
                "text": chunk,
                "embedding": embedding
            })

    CHUNK_STORE = all_chunks

    print(f"Loaded {len(CHUNK_STORE)} chunks")


def get_chunks():
    return CHUNK_STORE