from openai import OpenAI
from app.core.config import OPENAI_API_KEY, OPENAI_MODEL


client = OpenAI(api_key=OPENAI_API_KEY)


def generate_response(user_message: str) -> str:
    response = client.responses.create(
        model=OPENAI_MODEL,
        input=[
            {
                "role": "system",
                "content": (
                    "You are a helpful assistant for Jonathan Ma's Personal Knowledge OS. "
                    "For now, answer clearly and briefly. "
                    "Later you will answer using retrieved source material."
                ),
            },
            {
                "role": "user",
                "content": user_message,
            },
        ],
    )
    return response.output_text