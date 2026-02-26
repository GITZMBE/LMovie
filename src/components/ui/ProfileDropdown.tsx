"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function ProfileDropdown() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") return null;

  const username =
    session?.user?.email?.split("@")[0] ?? "Account";

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-2
          px-3 py-2
          rounded-md
          text-white
          hover:bg-white/10
          transition-all duration-150
        "
      >
        <FaUserCircle className="text-xl" />
        <span className="hidden sm:block text-sm font-medium">
          {username}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 mt-3 w-48
            bg-zinc-900/95
            border border-white/10
            rounded-md
            shadow-xl
            overflow-hidden
            animate-fadeIn
          "
        >
          {session ? (
            <>
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-xs text-zinc-400">Signed in as</p>
                <p className="text-sm text-white truncate">
                  {session.user?.email}
                </p>
              </div>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="
                  w-full text-left px-4 py-3 text-sm text-zinc-400
                  hover:bg-white/10
                  transition
                "
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="
                w-full text-left px-4 py-3 text-sm
                hover:bg-white/10
                transition
              "
            >
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
};