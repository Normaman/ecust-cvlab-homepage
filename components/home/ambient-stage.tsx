"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type AmbientStageProps = {
  children: ReactNode;
  className?: string;
};

const initialStyle = {
  "--ambient-parallax": "0px"
} as CSSProperties;

export function AmbientStage({ children, className }: AmbientStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId = 0;

    const updateParallax = () => {
      frameId = 0;

      const element = containerRef.current;
      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const offsetFromCenter = rect.top + rect.height / 2 - viewportHeight / 2;
      const normalizedOffset = Math.max(-1, Math.min(1, offsetFromCenter / viewportHeight));
      const parallaxOffset = normalizedOffset * -14;

      element.style.setProperty("--ambient-parallax", `${parallaxOffset.toFixed(2)}px`);
    };

    const requestUpdate = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div ref={containerRef} className={className} style={initialStyle}>
      {children}
    </div>
  );
}
