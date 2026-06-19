"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { NewsItem } from "@/lib/content";

type NewsCarouselProps = {
  items: NewsItem[];
};

export function NewsCarousel({ items }: NewsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const changeSlide = useCallback(
    (direction: 1 | -1) => {
      setIsVisible(false);
      window.setTimeout(() => {
        setActiveIndex((prev) => (prev + direction + items.length) % items.length);
        setIsVisible(true);
      }, 180);
    },
    [items.length]
  );

  useEffect(() => {
    if (items.length <= 1 || isHovered || isLightboxOpen) {
      return;
    }

    const timer = window.setInterval(() => {
      changeSlide(1);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [changeSlide, isHovered, isLightboxOpen, items.length]);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }

      if (event.key === "ArrowLeft") {
        changeSlide(-1);
      }

      if (event.key === "ArrowRight") {
        changeSlide(1);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [changeSlide, isLightboxOpen]);

  if (items.length === 0) {
    return null;
  }

  const activeItem = items[activeIndex];
  const activeKey = `${activeItem.date}-${activeItem.title}`;

  return (
    <section id="news" className="scroll-mt-36">
      <div className="wiki-card overflow-hidden rounded-2xl">
        <div className="border-b border-wikiBorder bg-wikiSoft px-5 py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-wikiBlue">Latest News</div>
              <h2 className="mt-1 text-lg font-bold text-wikiText">最新动态</h2>
            </div>
            <div className="text-xs font-medium text-slate-500">{activeIndex + 1} / {items.length}</div>
          </div>
        </div>

        <div className="p-5">
          <div
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative bg-slate-50 p-3">
              <button
                type="button"
                className="absolute left-6 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-2xl text-white transition hover:bg-black/65"
                onClick={() => changeSlide(-1)}
                aria-label="上一条动态"
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-6 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-2xl text-white transition hover:bg-black/65"
                onClick={() => changeSlide(1)}
                aria-label="下一条动态"
              >
                ›
              </button>
              <div
                key={activeKey}
                className={`transition-all duration-300 ease-out ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
                }`}
              >
                <button type="button" className="block w-full text-left" onClick={() => setIsLightboxOpen(true)} aria-label={`查看 ${activeItem.title} 大图`}>
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    width={activeItem.width}
                    height={activeItem.height}
                    className="h-auto w-full rounded-xl transition hover:brightness-[0.98]"
                    sizes="(max-width: 1024px) 100vw, 960px"
                  />
                </button>
              </div>
            </div>
            <div
              key={`${activeKey}-content`}
              className={`p-5 transition-all duration-300 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              <div className="mb-3 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">{activeItem.date}</div>
              <h3 className="text-xl font-bold leading-8 text-wikiText">{activeItem.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">{activeItem.description}</p>
            </div>
          </div>
        </div>
      </div>

      {isLightboxOpen ? (
        <div className="fixed inset-0 z-[70] bg-black/80 p-4 backdrop-blur-sm" onClick={() => setIsLightboxOpen(false)}>
          <div className="relative flex h-full w-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="absolute right-2 top-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-2xl text-white transition hover:bg-black/75 md:right-6 md:top-6"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="关闭大图"
            >
              ×
            </button>
            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  className="absolute left-2 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-2xl text-white transition hover:bg-black/75 md:left-6"
                  onClick={() => changeSlide(-1)}
                  aria-label="上一张动态图片"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-2xl text-white transition hover:bg-black/75 md:right-6"
                  onClick={() => changeSlide(1)}
                  aria-label="下一张动态图片"
                >
                  ›
                </button>
              </>
            ) : null}
            <div className="max-h-[88vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-black/20 p-3 shadow-2xl">
              <Image
                key={`${activeKey}-lightbox`}
                src={activeItem.image}
                alt={activeItem.title}
                width={activeItem.width}
                height={activeItem.height}
                className="mx-auto max-h-[78vh] h-auto w-auto max-w-full rounded-xl"
                sizes="100vw"
                priority
              />
              <div className="mt-3 rounded-xl bg-black/40 px-4 py-3 text-white">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">{activeItem.date}</div>
                <h3 className="mt-1 text-lg font-semibold leading-8">{activeItem.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/85">{activeItem.description}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
