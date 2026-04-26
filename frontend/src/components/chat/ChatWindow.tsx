"use client";

import { useEffect, useState } from "react";
import ChatInput from "@/components/chat/ChatInput";
import MessageBubble from "@/components/chat/MessageBubble";
import { sendChatMessage } from "@/lib/api";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const MAX_MESSAGES_PER_VISIT = 10;

const SAMPLE_QUESTIONS = [
  "What courses has Jonathan taken related to Bayesian statistics?",
  "What projects has Jonathan worked on?",
  "Summarize Jonathan's research interests.",
  "What games does Jonathan play?",
];

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messagesUsed, setMessagesUsed] = useState(0);

  useEffect(() => {
    const savedCount = sessionStorage.getItem("messagesUsed");
    if (savedCount) setMessagesUsed(Number(savedCount));
  }, []);

  function updateMessageCount(newCount: number) {
    setMessagesUsed(newCount);
    sessionStorage.setItem("messagesUsed", String(newCount));
  }

  function counterClass(remaining: number) {
    if (remaining >= 7) return "counter-badge counter-green";
    if (remaining >= 3) return "counter-badge counter-yellow";
    return "counter-badge counter-red";
  }

  async function typeAssistantResponse(answer: string) {
    setIsTyping(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    for (let i = 0; i <= answer.length; i++) {
      const partial = answer.slice(0, i);

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: partial,
        };
        return updated;
      });

      await new Promise((resolve) => setTimeout(resolve, 8));
    }

    setIsTyping(false);
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

      updateMessageCount(messagesUsed + 1);
      await typeAssistantResponse(response.answer);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
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
        <h1 className="hero-title">Chat with my AI Assistant!</h1>

        <p className="hero-text">
          Ask questions about my experience, research, academic background, and technical interests.
        </p>

        <p className="hero-text">
          Only 10 messages per site visit are allowed so my bill doesn&apos;t blow up.
        </p>

        <span className={counterClass(remaining)}>
          Messages remaining: {remaining}
        </span>
      </section>

      <section className="message-list">
        {messages.length === 0 ? (
          <div className="chat-empty">
            <p style={{ marginTop: 0 }}>Try asking:</p>

            <div className="prompt-list">
              {SAMPLE_QUESTIONS.map((q) => (
                <span key={q}>• {q}</span>
              ))}
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

        {isLoading && !isTyping && (
          <div className="message-bubble">
            <div className="message-role">Assistant</div>
            <div className="searching">Searching</div>
          </div>
        )}
      </section>

      {error && <div className="error-box">{error}</div>}

      <section className="chat-panel">
        <ChatInput onSend={handleSend} isLoading={isLoading || remaining <= 0} />
      </section>
    </div>
  );
}