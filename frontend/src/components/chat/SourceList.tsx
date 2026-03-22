type SourceListProps = {
  sources: string[];
};

export default function SourceList({ sources }: SourceListProps) {
  if (!sources.length) return null;

  return (
    <section className="chat-panel">
      <h3 className="sources-title">Sources</h3>
      <ul className="sources-list">
        {sources.map((source) => (
          <li key={source}>{source}</li>
        ))}
      </ul>
    </section>
  );
}