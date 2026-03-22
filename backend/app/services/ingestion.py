import os
from typing import List, Dict
from app.services.chunking import chunk_text

DATA_PATH = os.path.join(os.getcwd(), "../data/sample_docs")


def load_documents() -> List[Dict]:
    documents = []

    for filename in os.listdir(DATA_PATH):
        if filename.endswith(".txt"):
            filepath = os.path.join(DATA_PATH, filename)

            with open(filepath, "r", encoding="utf-8") as f:
                text = f.read()

            documents.append({
                "id": filename,
                "text": text
            })

    return documents


def build_chunks():
    docs = load_documents()
    all_chunks = []

    for doc in docs:
        chunks = chunk_text(doc["text"])

        for i, chunk in enumerate(chunks):
            all_chunks.append({
                "doc_id": doc["id"],
                "chunk_id": f"{doc['id']}_{i}",
                "text": chunk
            })

    return all_chunks