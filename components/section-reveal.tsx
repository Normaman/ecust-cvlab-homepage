"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type SectionRevealProps = {
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
  variant?: "default" | "text" | "media" | "cards";
  delay?: number;
  distance?: number;
  blur?: number;
  scale?: number;
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function SectionReveal({
  as,
  id,
  className,
  children,
  variant = "default",
  delay = 0,
  distance = 28,
  blur = 14,
  scale = 0.985
}: SectionRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);
  const Component = as ?? "section";

  useEffect(() => {
    const element = rootRef.current;
    if (!element) {
      return;
    }

    const staggerGroups = Array.from(element.querySelectorAll<HTMLElement>(".reveal-stagger"));
    staggerGroups.forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        (child as HTMLElement).style.setProperty("--stagger-index", `${index}`);
      });
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <Component
      id={id}
      ref={rootRef}
      data-visible={isVisible ? "true" : "false"}
      className={joinClassNames("reveal-section", `reveal-variant-${variant}`, className)}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-distance": `${distance}px`,
          "--reveal-blur": `${blur}px`,
          "--reveal-scale": `${scale}`
        } as CSSProperties
      }
    >
      {children}
    </Component>
  );
}
