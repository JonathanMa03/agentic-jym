import json
from pathlib import Path
from typing import List, Dict

PROJECT_ROOT = Path(__file__).resolve().parents[3]
CACHE_PATH = PROJECT_ROOT / "data" / "processed" / "chunks.json"

CHUNK_STORE: List[Dict] = []


def initialize_chunks():
    global CHUNK_STORE

    if not CACHE_PATH.exists():
        raise FileNotFoundError(
            f"Chunk cache not found at {CACHE_PATH}. "
            "Run backend/scripts/ingest_docs.py first."
        )

    print(f"Loading chunk cache from {CACHE_PATH}...")

    with open(CACHE_PATH, "r", encoding="utf-8") as f:
        CHUNK_STORE = json.load(f)

    print(f"Loaded {len(CHUNK_STORE)} chunks")


def get_chunks() -> List[Dict]:
    return CHUNK_STORE