"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { RxCross2 } from "react-icons/rx";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export const CinematicModal = ({
  open,
  onClose,
  title,
  headerRight,
  children,
  className,
}: Props) => {
  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-999 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={twMerge(
          "relative z-10 w-[90vw] max-w-5xl rounded-2xl bg-[#0f1115] shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-200",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            {title && (
              <h2 className="text-lg font-semibold text-white">{title}</h2>
            )}
          </div>

          <div className="flex items-center gap-3">
            {headerRight}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition"
            >
              <RxCross2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default CinematicModal;