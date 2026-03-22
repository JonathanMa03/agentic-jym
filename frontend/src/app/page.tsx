import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8">
        <h1 className="text-3xl font-semibold">Agentic JYM</h1>
        <p className="mt-3 text-sm text-gray-600">
          A personal knowledge assistant for exploring Jonathan Ma&apos;s
          projects, research, and background.
        </p>
        <Link
          href="/ask"
          className="mt-6 inline-block rounded-xl border border-black px-4 py-2"
        >
          Open chat
        </Link>
      </div>
    </main>
  );
}