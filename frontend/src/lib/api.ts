import { BACKEND_API_URL } from "@/lib/env";
import type { ChatRequest, ChatResponse } from "@/lib/types";

export async function sendChatMessage(
  payload: ChatRequest
): Promise<ChatResponse> {
  const response = await fetch(`${BACKEND_API_URL}/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Backend error: ${response.status} ${errorText}`);
  }

  return response.json();
}