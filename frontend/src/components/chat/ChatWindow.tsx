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
    <div className="chat-layout">
      <section className="chat-panel">
        <h1 className="hero-title" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Personal Knowledge OS
        </h1>
        <p className="hero-text">
          Ask about Jonathan Ma&apos;s background, projects, research, and
          technical interests.
        </p>
      </section>

      <section className="message-list">
        {messages.length === 0 ? (
          <div className="chat-empty">
            Try a prompt:
            <div className="prompt-list">
              <span>• What projects has Jonathan worked on?</span>
              <span>• What are his research interests?</span>
              <span>
                • How does his background connect statistics and machine learning?
              </span>
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
      </section>

      {error && <div className="error-box">{error}</div>}

      <SourceList sources={sources} />

      <section className="chat-panel">
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </section>
    </div>
  );
}