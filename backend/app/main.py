from fastapi import FastAPI
from app.api.routes.health import router as health_router
from app.api.routes.chat import router as chat_router
from app.services.ingestion import initialize_chunks

app = FastAPI(title="Personal Knowledge OS API")


@app.on_event("startup")
async def startup_event():
    initialize_chunks()


app.include_router(health_router, prefix="/health", tags=["health"])
app.include_router(chat_router, prefix="/chat", tags=["chat"])