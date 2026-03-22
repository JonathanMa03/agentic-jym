type MessageBubbleProps = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({
  role,
  content,
}: MessageBubbleProps) {
  return (
    <div className={`message-bubble ${role}`}>
      <div className="message-role">{role === "user" ? "You" : "Assistant"}</div>
      <p className="message-content">{content}</p>
    </div>
  );
}