import { useState, useEffect } from "react";

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
  });

  useEffect(function () {
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenSize((prev) => {
        const isMobile = width < 768;
        const isTablet = width >= 768 && width < 1024;
        const isDesktop = width >= 1024;

        if (
          prev.width === width &&
          prev.height === height &&
          prev.isMobile === isMobile &&
          prev.isTablet === isTablet &&
          prev.isDesktop === isDesktop
        )
          return prev;

        return { width, height, isMobile, isTablet, isDesktop };
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}
