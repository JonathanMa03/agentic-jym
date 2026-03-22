type MessageBubbleProps = {
    role: "user" | "assistant";
    content: string;
  };
  
  export default function MessageBubble({
    role,
    content,
  }: MessageBubbleProps) {
    const isUser = role === "user";
  
    return (
      <div
        className={`rounded-2xl p-4 ${
          isUser ? "bg-gray-100" : "bg-white border border-gray-200"
        }`}
      >
        <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">
          {isUser ? "You" : "Assistant"}
        </div>
        <p className="whitespace-pre-wrap text-sm leading-6">{content}</p>
      </div>
    );
  }