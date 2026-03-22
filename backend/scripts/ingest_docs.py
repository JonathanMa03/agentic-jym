import json
from pathlib import Path

from app.services.chunking import chunk_text
from app.services.embeddings import get_embedding

PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = PROJECT_ROOT / "data" / "sample_docs"
OUTPUT_PATH = PROJECT_ROOT / "data" / "processed" / "chunks.json"


def load_documents():
    documents = []

    for filepath in DATA_PATH.glob("*.txt"):
        text = filepath.read_text(encoding="utf-8")
        documents.append({
            "id": filepath.name,
            "text": text
        })

    return documents


def build_chunks():
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

    return all_chunks


def main():
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    print("Building chunk cache...")
    chunks = build_chunks()

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(chunks, f)

    print(f"Saved {len(chunks)} chunks to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()