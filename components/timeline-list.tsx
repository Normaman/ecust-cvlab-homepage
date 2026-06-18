"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { TimelineItem } from "@/lib/content";

type TimelineListProps = {
  items: TimelineItem[];
};

export function TimelineList({ items }: TimelineListProps) {
  const refs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    refs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative mx-auto max-w-6xl">
      <div className="timeline-line" />
      {items.map((item, index) => {
        const sideClass = index % 2 === 0 ? "left md:ml-0 md:pr-10" : "right md:ml-auto md:pl-10";

        return (
          <article
            key={`${item.year}-${item.title}`}
            ref={(element) => {
              refs.current[index] = element;
            }}
            className={`timeline-item mb-10 ml-10 md:w-1/2 ${sideClass}`}
          >
            <div className="wiki-card overflow-hidden rounded-2xl">
              <div className="relative h-56 w-full">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  priority={index === 0}
                  className="rounded-b-none object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-wikiBlue">{item.year}</div>
                <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                <p className="leading-7 text-slate-700">{item.description}</p>
                <p className="mt-3 text-sm text-slate-500">{item.caption}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
