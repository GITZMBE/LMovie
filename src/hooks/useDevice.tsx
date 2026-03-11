import { useState, useEffect } from "react";

export const useDevice = () => {
  const getIsMobile = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 640;
  };

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile };
};

export default useDevice;