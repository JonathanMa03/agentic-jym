type MessageBubbleProps = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  return (
    <div className="message-bubble">
      <div className="message-role">
        {role === "user" ? "You" : "Assistant"}
      </div>

      <div className={role === "assistant" ? "assistant-message" : "user-message"}>
        {content}
      </div>
    </div>
  );
}