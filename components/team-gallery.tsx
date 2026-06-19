"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/lib/content";

type TeamGalleryProps = {
  items: GalleryItem[];
};

type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

function getAspectRatio(layout: GalleryItem["layout"]) {
  if (layout === "portrait") {
    return 4 / 5;
  }

  if (layout === "square") {
    return 1;
  }

  return 16 / 10;
}

function getElementRect(element: HTMLElement | null): Rect | null {
  if (!element) {
    return null;
  }

  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height
  };
}

export function TeamGallery({ items }: TeamGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [originRect, setOriginRect] = useState<Rect | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [captionVisible, setCaptionVisible] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeTimerRef = useRef<number | null>(null);
  const captionTimerRef = useRef<number | null>(null);

  const activeItem = useMemo(() => {
    if (activeIndex === null) {
      return null;
    }

    return items[activeIndex] ?? null;
  }, [activeIndex, items]);

  const targetRect = useMemo(() => {
    if (!activeItem || viewport.width === 0 || viewport.height === 0) {
      return null;
    }

    const ratio =
      activeItem.width > 0 && activeItem.height > 0
        ? activeItem.width / activeItem.height
        : getAspectRatio(activeItem.layout);
    const maxWidth = Math.min(viewport.width * 0.92, 1080);
    const maxHeight = Math.min(viewport.height * 0.72, 760);

    let width = maxWidth;
    let height = width / ratio;

    if (height > maxHeight) {
      height = maxHeight;
      width = height * ratio;
    }

    return {
      width,
      height,
      top: (viewport.height - height) / 2,
      left: (viewport.width - width) / 2
    };
  }, [activeItem, viewport.height, viewport.width]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }

      if (captionTimerRef.current) {
        window.clearTimeout(captionTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const syncViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);

    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((prev) => {
        if (prev === null) {
          return 0;
        }

        return (prev + direction + items.length) % items.length;
      });
    },
    [items.length]
  );

  const handleOpen = (index: number) => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    if (captionTimerRef.current) {
      window.clearTimeout(captionTimerRef.current);
      captionTimerRef.current = null;
    }

    const rect = getElementRect(itemRefs.current[index]);
    setOriginRect(rect);
    setActiveIndex(index);
    setIsExpanded(false);
    setCaptionVisible(false);
  };

  const handleClose = useCallback(() => {
    if (activeIndex === null) {
      return;
    }

    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }

    if (captionTimerRef.current) {
      window.clearTimeout(captionTimerRef.current);
      captionTimerRef.current = null;
    }

    const latestRect = getElementRect(itemRefs.current[activeIndex]);
    if (latestRect) {
      setOriginRect(latestRect);
    }

    setIsExpanded(false);
    setCaptionVisible(false);

    closeTimerRef.current = window.setTimeout(() => {
      setActiveIndex(null);
      setOriginRect(null);
      closeTimerRef.current = null;
    }, 320);
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }

      if (event.key === "ArrowRight") {
        navigate(1);
      }

      if (event.key === "ArrowLeft") {
        navigate(-1);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, handleClose, navigate]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const currentRect = getElementRect(itemRefs.current[activeIndex]);
    if (currentRect && !isExpanded) {
      setOriginRect(currentRect);
    }

    const rafId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsExpanded(true);
      });
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [activeIndex, isExpanded]);

  useEffect(() => {
    if (captionTimerRef.current) {
      window.clearTimeout(captionTimerRef.current);
      captionTimerRef.current = null;
    }

    if (activeIndex === null || !isExpanded) {
      setCaptionVisible(false);
      return;
    }

    setCaptionVisible(false);
    captionTimerRef.current = window.setTimeout(() => {
      setCaptionVisible(true);
      captionTimerRef.current = null;
    }, 100);
  }, [activeIndex, isExpanded]);

  const frameStyle = activeItem && originRect && targetRect
    ? {
        top: isExpanded ? targetRect.top : originRect.top,
        left: isExpanded ? targetRect.left : originRect.left,
        width: isExpanded ? targetRect.width : originRect.width,
        height: isExpanded ? targetRect.height : originRect.height,
        borderRadius: isExpanded ? 24 : 16
      }
    : undefined;
  const lightboxIndex = activeIndex ?? 0;

  return (
    <>
      <div className="columns-1 gap-4 md:columns-2 xl:columns-3">
        {items.map((item, index) => (
          <button
            key={`${item.year}-${item.alt}`}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            type="button"
            className={`group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
              activeIndex === index ? "opacity-0" : "opacity-100"
            }`}
            onClick={() => handleOpen(index)}
          >
            <div className="relative w-full">
              <Image
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="h-auto w-full transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/75 group-hover:backdrop-blur-sm" />
              <div className="absolute inset-0 flex flex-col justify-between p-5 text-left text-white opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="text-3xl font-bold tracking-[0.12em] text-white/95">{item.year}</div>
                <p className="max-w-sm text-sm leading-7 text-white/90">{item.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeItem && originRect && targetRect ? (
        <div
          className={`fixed inset-0 z-[60] transition duration-300 ${isExpanded ? "bg-black/80 backdrop-blur-sm" : "bg-black/0"}`}
          onClick={handleClose}
        >
          <div className="absolute inset-0">
            <div
              className="gallery-lightbox-animator fixed overflow-hidden"
              style={frameStyle}
              onClick={(event) => event.stopPropagation()}
              onTouchStart={(event) => setTouchStartX(event.changedTouches[0]?.clientX ?? null)}
              onTouchEnd={(event) => {
                if (touchStartX === null) {
                  return;
                }

                const deltaX = event.changedTouches[0]?.clientX - touchStartX;

                if (deltaX > 40) {
                  navigate(-1);
                } else if (deltaX < -40) {
                  navigate(1);
                }

                setTouchStartX(null);
              }}
            >
              <div
                className={`absolute inset-0 transition-opacity duration-200 ${
                  isExpanded ? "opacity-0" : "opacity-100"
                }`}
              >
                <Image
                  src={activeItem.image}
                  alt={activeItem.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className="gallery-slider-track flex h-full"
                  style={{
                    width: `${items.length * 100}%`,
                    transform: `translateX(-${lightboxIndex * (100 / items.length)}%)`
                  }}
                >
                  {items.map((item) => (
                    <div
                      key={`${item.year}-${item.alt}-lightbox`}
                      className="relative h-full flex-shrink-0"
                      style={{ width: `${100 / items.length}%` }}
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        className="object-cover md:object-contain"
                        sizes="100vw"
                        priority
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`pointer-events-none absolute inset-x-0 bottom-6 mx-auto max-w-4xl px-4 transition duration-300 ${
                captionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="rounded-2xl bg-black/40 px-5 py-4 text-white">
                <div className="text-2xl font-bold tracking-[0.14em]">{activeItem.year}</div>
                <p className="mt-2 text-sm leading-7 text-white/90">{activeItem.description}</p>
              </div>
            </div>

            <button
              type="button"
              className={`absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-2xl text-white transition duration-300 hover:bg-black/75 ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
              onClick={(event) => {
                event.stopPropagation();
                handleClose();
              }}
              aria-label="关闭相册"
            >
              ×
            </button>
            <button
              type="button"
              className={`absolute left-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-2xl text-white transition duration-300 hover:bg-black/75 ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
              onClick={(event) => {
                event.stopPropagation();
                navigate(-1);
              }}
              aria-label="上一张"
            >
              ‹
            </button>
            <button
              type="button"
              className={`absolute right-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-2xl text-white transition duration-300 hover:bg-black/75 ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
              onClick={(event) => {
                event.stopPropagation();
                navigate(1);
              }}
              aria-label="下一张"
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
