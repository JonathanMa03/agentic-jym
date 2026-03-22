"use client";

import { useState } from "react";

type ChatInputProps = {
  onSend: (message: string) => Promise<void>;
  isLoading: boolean;
};

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = message.trim();
    if (!trimmed || isLoading) return;

    await onSend(trimmed);
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="chat-form">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about Jonathan's projects, research, or background..."
        className="chat-textarea"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading} className="chat-submit">
        {isLoading ? "Unavailable / Thinking..." : "Send"}
      </button>
    </form>
  );
}