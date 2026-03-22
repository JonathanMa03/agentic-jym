from typing import List, Dict
from app.services.ingestion import build_chunks


def simple_score(query: str, text: str) -> int:
    query_words = query.lower().split()
    text_lower = text.lower()

    score = 0
    for word in query_words:
        if word in text_lower:
            score += 1

    # manual boost
    if "project" in query.lower() and "project" in text_lower:
        score += 3

    return score


def retrieve(query: str, top_k: int = 3) -> List[Dict]:
    chunks = build_chunks()

    scored = []
    for chunk in chunks:
        score = simple_score(query, chunk["text"])
        if score > 0:
            scored.append((score, chunk))

    scored.sort(key=lambda x: x[0], reverse=True)

    return [chunk for _, chunk in scored[:top_k]]