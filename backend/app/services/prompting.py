from typing import List, Dict


def build_prompt(query: str, retrieved_chunks: List[Dict]) -> str:
    context = "\n\n".join([c["chunk_text"] for c in retrieved_chunks])

    prompt = f"""
You are an assistant answering questions about Jonathan Ma.

Use ONLY the information provided below.

Context:
{context}

Question:
{query}

Answer clearly and concisely. If the answer is not in the context, say you don't know.
"""
    return prompt