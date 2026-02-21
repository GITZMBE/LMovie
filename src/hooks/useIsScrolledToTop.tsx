"use client";

import { useEffect, useState } from "react";

export function useIsScrolledToTop(offset: number = 0): boolean {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsAtTop(scrollY <= offset);
    };

    // Run once on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);

  return isAtTop;
};

export default useIsScrolledToTop;