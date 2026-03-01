"use client";

import { useEffect, useState } from "react";

export default function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (!query) return;

    async function fetchResults() {
      const res = await fetch(`/api/search?query=${query}`);
      const data = await res.json();
      setResults(data);
    }

    fetchResults();
  }, [query]);

  if (!results.length) {
    return <p className="text-zinc-400">No results found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {results.map((video) => (
        <div key={video.id} className="text-white">
          {video.title}
        </div>
      ))}
    </div>
  );
};