"use client";

import {
  useState,
  useEffect,
  useRef,
  ReactNode,
  cloneElement,
  isValidElement,
} from "react";

type Props = {
  children: ReactNode; // trigger element
  preview: ReactNode;  // floating content
  delay?: number;      // hover delay (default 1000ms)
};

export function HoverPreview({
  children,
  preview,
  delay = 1000,
}: Props) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isTriggerHovered, setIsTriggerHovered] = useState(false);
  const [isPreviewHovered, setIsPreviewHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  // Handle delayed hover
  useEffect(() => {
    if (isTriggerHovered) {
      timeoutRef.current = setTimeout(() => {
        setVisible(true);
      }, delay);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (!isPreviewHovered) {
        setVisible(false);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isTriggerHovered, isPreviewHovered, delay]);

  // Update rect position when trigger is hovered
  useEffect(() => {
    if (visible && triggerRef.current) {
      setRect(triggerRef.current.getBoundingClientRect());
    }
  }, [visible]);

  return (
    <>
      {/* Trigger */}
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsTriggerHovered(true)}
        onMouseLeave={() => setIsTriggerHovered(false)}
        className={`relative transition-transform duration-300 ${
          visible ? "scale-105 z-40" : ""
        }`}
      >
        {children}
      </div>

      {/* Floating Preview */}
      {visible && rect && (
        <div
          className="fixed z-50 transition-all duration-300 -translate-y-1/2"
          style={{
            top: window.innerHeight / 2,
            left: rect.left,
          }}
          onMouseEnter={() => setIsPreviewHovered(true)}
          onMouseLeave={() => {
            setIsPreviewHovered(false);
            setVisible(false);
          }}
        >
          <div className="animate-in fade-in zoom-in-95 duration-200">
            {preview}
          </div>
        </div>
      )}
    </>
  );
}