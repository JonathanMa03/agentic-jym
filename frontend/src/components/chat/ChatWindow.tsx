"use client";

import { useState } from "react";
import ChatInput from "@/components/chat/ChatInput";
import MessageBubble from "@/components/chat/MessageBubble";
import SourceList from "@/components/chat/SourceList";
import { sendChatMessage } from "@/lib/api";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend(message: string) {
    setError(null);
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "user", content: message }]);

    try {
      const response = await sendChatMessage({ message });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.answer },
      ]);
      setSources(response.sources);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";

      setError(message);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "There was an error contacting the backend.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h1 className="text-2xl font-semibold">Personal Knowledge OS</h1>
        <p className="mt-2 text-sm text-gray-600">
          Ask about Jonathan Ma&apos;s background, projects, research, and
          technical interests.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {messages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-sm text-gray-600">
            Try a prompt like:
            <div className="mt-3 flex flex-col gap-2">
              <span>• What projects has Jonathan worked on?</span>
              <span>• What are his research interests?</span>
              <span>• How does his background connect statistics and ML?</span>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageBubble
              key={`${message.role}-${index}`}
              role={message.role}
              content={message.content}
            />
          ))
        )}
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <SourceList sources={sources} />

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </div>
    </div>
  );
}