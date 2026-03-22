"use client";

import { useEffect, useState } from "react";
import ChatInput from "@/components/chat/ChatInput";
import MessageBubble from "@/components/chat/MessageBubble";
import SourceList from "@/components/chat/SourceList";
import { sendChatMessage } from "@/lib/api";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const MAX_MESSAGES_PER_VISIT = 10;

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messagesUsed, setMessagesUsed] = useState(0);

  useEffect(() => {
    const savedCount = sessionStorage.getItem("messagesUsed");
    if (savedCount) {
      setMessagesUsed(Number(savedCount));
    }
  }, []);

  function updateMessageCount(newCount: number) {
    setMessagesUsed(newCount);
    sessionStorage.setItem("messagesUsed", String(newCount));
  }

  async function handleSend(message: string) {
    if (messagesUsed >= MAX_MESSAGES_PER_VISIT) {
      setError("You have reached the 10-message limit for this site visit.");
      return;
    }

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

      updateMessageCount(messagesUsed + 1);
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

  const remaining = MAX_MESSAGES_PER_VISIT - messagesUsed;

  return (
    <div className="chat-layout">
      <section className="chat-panel">
        <h1 className="hero-title" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Chat with my AI Assistant!
        </h1>

        <p className="hero-text">
          Ask questions about my experience, research, academic background, and
          technical interests.
        </p>

        <p
          className="hero-text"
          style={{ fontSize: "1rem", opacity: 0.85, marginTop: "1rem" }}
        >
          Only {MAX_MESSAGES_PER_VISIT} messages per site visit are allowed so my bill
          doesn&apos;t blow up.
        </p>

        <p
          className="hero-text"
          style={{ fontSize: "1rem", fontWeight: 700, marginTop: "0.5rem" }}
        >
          Messages remaining this visit: {remaining}
        </p>
      </section>

      <section className="message-list">
        {messages.length === 0 ? (
          <div className="chat-empty">
            <p style={{ marginTop: 0 }}>You can ask questions such as:</p>
            <div className="prompt-list">
              <span>• What are Jonathan&apos;s research interests?</span>
              <span>• What projects has Jonathan worked on?</span>
              <span>• How does his background connect statistics and machine learning?</span>
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
        <ChatInput
          onSend={handleSend}
          isLoading={isLoading || remaining <= 0}
        />
      </section>
    </div>
  );
}