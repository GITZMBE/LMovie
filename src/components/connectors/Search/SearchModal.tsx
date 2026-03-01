"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

interface Props { 
  onClose: () => void;
}

export function SearchModal({ onClose }: Props) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?query=${encodeURIComponent(query)}`);
    onClose();
  }

  useEffect(() => {
    function esc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <div
      className="
        fixed top-0 left-0 right-0 bottom-0 inset-0 z-50
        flex items-start justify-center
        bg-black/60
        backdrop-blur-sm backdrop-brightness-50
        pt-32
      "
      onClick={onClose}
    >
      <form
        onSubmit={handleSearch}
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-xl
          flex items-center gap-3
          px-5 py-4
          rounded-xl
          bg-zinc-900
          border border-white/10
          shadow-xl
        "
      >
        <FaSearch className="text-zinc-400" />

        <input
          autoFocus
          placeholder="Search movies or TV shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full
            bg-transparent
            outline-none
            text-white
            placeholder:text-zinc-500
          "
        />
      </form>
    </div>
  );
};

export default SearchModal;