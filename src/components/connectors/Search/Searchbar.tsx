"use client";

import { useState, useEffect, Fragment } from "react";
import { FaSearch } from "react-icons/fa";
import SearchModal from "./SearchModal";
import { twJoin } from "tailwind-merge";

interface Props {
  className?: string;
}

export function Searchbar({ className }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleShortcut(e: KeyboardEvent) {
      if (e.ctrlKey && e.key.toLowerCase() === "g") {
        e.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <>
      <button
        onClick={(e: any) => {e.stopPropagation(); setOpen(true)}}
        className={twJoin("z-40 flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm transition backdrop-blur-md", className as string)}
      >
        <FaSearch className="opacity-70" />

        <span className="hidden sm:block opacity-80">
          Press
        </span>

        <kbd className="px-2 py-0.5 text-xs rounded bg-white/20">
          Ctrl+G
        </kbd>

        <span className="hidden md:block opacity-80">
          to quickly search movies/tv
        </span>
      </button>

      {open && <SearchModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default Searchbar;