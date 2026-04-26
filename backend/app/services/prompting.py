from typing import List, Dict


def build_prompt(query: str, retrieved_chunks: List[Dict]) -> str:
    context_blocks = []

    for i, chunk in enumerate(retrieved_chunks, start=1):
        title = chunk.get("title", "Unknown Source")
        source_type = chunk.get("source_type", "unknown")
        text = chunk.get("chunk_text", "")

        context_blocks.append(
            f"[Source {i}: {title} | Type: {source_type}]\n{text}"
        )

    context = "\n\n---\n\n".join(context_blocks)

    prompt = f"""
You are an assistant answering questions about Jonathan Ma.

Use only the provided context. Do not invent facts.

Important behavior:
- If the user asks to "list all" items, extract every relevant item explicitly present in the provided context.
- If the user asks about courses, prioritize course names from Coursework.
- If the user asks about Bayesian methods, include courses that explicitly involve Bayesian methods, including Bayesian Statistics and Nonparametric Bayesian Statistics. Also include related probabilistic courses if the context supports them.
- If the user asks about projects, list project names and brief descriptions from Projects.
- If the user asks about experience, list roles, organizations, and concise responsibilities.
- If multiple relevant items appear across different chunks, combine them into one coherent answer.
- If the retrieved context only partially answers the question, say what is supported and mention that the context may be incomplete.
- If the answer is not supported by the context, say you do not know based on the available context.

Context:
{context}

Question:
{query}

Answer:
"""
    return prompt