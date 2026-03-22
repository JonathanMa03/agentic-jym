type SourceListProps = {
    sources: string[];
  };
  
  export default function SourceList({ sources }: SourceListProps) {
    if (!sources.length) return null;
  
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <div className="mb-2 text-sm font-medium">Sources</div>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          {sources.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ul>
      </div>
    );
  }