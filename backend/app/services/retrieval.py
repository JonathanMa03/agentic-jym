from typing import List, Dict

from app.db.supabase_client import supabase
from app.services.embeddings import get_embedding


def retrieve(query: str, top_k: int = 12) -> List[Dict]:
    query_embedding = get_embedding(query)

    response = supabase.rpc(
        "match_chunks",
        {
            "query_embedding": query_embedding,
            "match_count": top_k,
        },
    ).execute()

    return response.data