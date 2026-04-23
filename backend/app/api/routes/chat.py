from fastapi import APIRouter, HTTPException, Request
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.retrieval import retrieve
from app.services.prompting import build_prompt
from app.services.llm import generate_response
from app.services.rate_limit import is_rate_limited

router = APIRouter()


@router.post("/", response_model=ChatResponse)
async def chat(payload: ChatRequest, request: Request):
    client_ip = request.headers.get(
        "x-forwarded-for",
        request.client.host if request.client else "unknown"
    )
    client_ip = client_ip.split(",")[0].strip()

    limited, remaining = is_rate_limited(client_ip)
    if limited:
        raise HTTPException(
            status_code=429,
            detail="Rate limit reached. Please try again later."
        )

    try:
        retrieved_chunks = retrieve(payload.message)
        prompt = build_prompt(payload.message, retrieved_chunks)
        answer = generate_response(prompt)

        sources = list({
            c.get("title", "unknown")
            for c in retrieved_chunks
        })

        return ChatResponse(answer=answer, sources=sources)

    except Exception as e:
        print("CHAT ROUTE ERROR repr:", repr(e))
        print("CHAT ROUTE ERROR str:", str(e))
        print("CHAT ROUTE ERROR cause:", repr(getattr(e, "__cause__", None)))
        print("CHAT ROUTE ERROR context:", repr(getattr(e, "__context__", None)))
        raise HTTPException(status_code=500, detail=str(e))