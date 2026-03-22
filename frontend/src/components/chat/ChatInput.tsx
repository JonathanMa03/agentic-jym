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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about Jonathan's projects, research, or background..."
        rows={4}
        className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-black"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="rounded-xl border border-black px-4 py-2 disabled:opacity-50"
      >
        {isLoading ? "Thinking..." : "Send"}
      </button>
    </form>
  );
}