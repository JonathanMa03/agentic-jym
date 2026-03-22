from openai import OpenAI
from app.core.config import OPENAI_API_KEY, OPENAI_MODEL

client = OpenAI(api_key=OPENAI_API_KEY)


def generate_response(prompt: str) -> str:
    response = client.responses.create(
        model=OPENAI_MODEL,
        input=prompt
    )
    return response.output_text