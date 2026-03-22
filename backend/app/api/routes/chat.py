from fastapi import APIRouter, HTTPException
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.retrieval import retrieve
from app.services.prompting import build_prompt
from app.services.llm import generate_response

router = APIRouter()


@router.post("/", response_model=ChatResponse)
async def chat(payload: ChatRequest):
    try:
        retrieved_chunks = retrieve(payload.message)
        prompt = build_prompt(payload.message, retrieved_chunks)
        answer = generate_response(prompt)

        sources = [c["doc_id"] for c in retrieved_chunks]

        return ChatResponse(answer=answer, sources=sources)

    except Exception as e:
        print(f"CHAT ROUTE ERROR: {repr(e)}")
        raise HTTPException(status_code=500, detail=str(e))