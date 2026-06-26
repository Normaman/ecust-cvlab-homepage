"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { NewsItem } from "@/lib/content";

type NewsCarouselProps = {
  items: NewsItem[];
};

export function NewsCarousel({ items }: NewsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidePhase, setSlidePhase] = useState<"idle" | "exit" | "enter">("idle");
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const transitionTimerRef = useRef<number | null>(null);
  const enterTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }

      if (enterTimerRef.current) {
        window.clearTimeout(enterTimerRef.current);
      }
    };
  }, []);

  const changeSlide = useCallback(
    (direction: 1 | -1) => {
      if (items.length <= 1 || slidePhase !== "idle") {
        return;
      }

      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }

      if (enterTimerRef.current) {
        window.clearTimeout(enterTimerRef.current);
      }

      setSlideDirection(direction);
      setSlidePhase("exit");

      transitionTimerRef.current = window.setTimeout(() => {
        setActiveIndex((prev) => (prev + direction + items.length) % items.length);
        setSlidePhase("enter");

        enterTimerRef.current = window.setTimeout(() => {
          setSlidePhase("idle");
          enterTimerRef.current = null;
        }, 34);

        transitionTimerRef.current = null;
      }, 220);
    },
    [items.length, slidePhase]
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
  const progressWidth = `${((activeIndex + 1) / items.length) * 100}%`;
  const imageTransitionClass =
    slidePhase === "exit"
      ? slideDirection === 1
        ? "-translate-x-8 opacity-0 scale-[0.985]"
        : "translate-x-8 opacity-0 scale-[0.985]"
      : slidePhase === "enter"
        ? slideDirection === 1
          ? "translate-x-8 opacity-0 scale-[1.015]"
          : "-translate-x-8 opacity-0 scale-[1.015]"
        : "translate-x-0 opacity-100 scale-100";
  const contentTransitionClass =
    slidePhase === "exit"
      ? slideDirection === 1
        ? "-translate-x-5 translate-y-2 opacity-0"
        : "translate-x-5 translate-y-2 opacity-0"
      : slidePhase === "enter"
        ? slideDirection === 1
          ? "translate-x-5 translate-y-3 opacity-0"
          : "-translate-x-5 translate-y-3 opacity-0"
        : "translate-x-0 translate-y-0 opacity-100";

  return (
    <section id="news" className="scroll-mt-36 w-full pt-2 pb-12 sm:pt-4 lg:pt-6">
  {/* 1. 标题区重构：极简排版 + 优雅的页码指示器 */}
  <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 px-2 sm:px-4">
    
    {/* 左侧：主次翻转，大标题镇场，降字重，柔和色彩 */}
    <div className="space-y-2">
      <h2 className="text-4xl font-semibold tracking-tight text-slate-800 sm:text-3xl">
        最新动态
      </h2>
      <p className="text-[13px] font-medium tracking-[0.25em] text-slate-400 uppercase pl-1">
        Latest News
      </p>
    </div>

    {/* 右侧：将零散的页码升级为苹果风“小药丸”标签 */}
    <div className="inline-flex items-center rounded-full bg-white/75 px-4 py-1.5 text-sm font-medium text-slate-500 ring-1 ring-inset ring-slate-900/5 backdrop-blur-md transition-all">
      <span className="font-semibold text-slate-800 mr-1.5">
        {activeIndex + 1}
      </span> 
      <span className="text-slate-300 mx-1">/</span> 
      <span className="ml-1.5">
        {items.length}
      </span>
    </div>

  </div>

  {/* 2. 核心卡片：Apple Bento 风格的超大圆角与弥散阴影 */}
  <div
    className="apple-panel group relative overflow-hidden rounded-[2.75rem] bg-white/82 p-4 shadow-[0_10px_34px_rgba(15,23,42,0.045)] ring-1 ring-slate-900/5 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_24px_56px_rgba(15,23,42,0.08)]"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {/* 图片展示区：内嵌超大圆角，配合毛玻璃操作按钮 */}
    <div className="relative overflow-hidden rounded-[2.1rem] bg-slate-50">
      
      {/* 苹果风悬浮按钮：平时隐藏，鼠标移入卡片时渐显，采用毛玻璃材质 */}
      <button
        type="button"
        className="apple-floating-control absolute left-6 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-slate-800 opacity-0 group-hover:opacity-100"
        onClick={() => changeSlide(-1)}
        aria-label="上一条动态"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      
      <button
        type="button"
        className="apple-floating-control absolute right-6 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-slate-800 opacity-0 group-hover:opacity-100"
        onClick={() => changeSlide(1)}
        aria-label="下一条动态"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* 图片过渡动效 */}
      <div
        key={activeKey}
        className={`apple-media transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${imageTransitionClass}`}
      >
        <button 
          type="button" 
          className="block w-full text-left" 
          onClick={() => setIsLightboxOpen(true)} 
          aria-label={`查看 ${activeItem.title} 大图`}
        >
          <Image
            src={activeItem.image}
            alt={activeItem.title}
            width={activeItem.width}
            height={activeItem.height}
            className="h-auto w-full rounded-none transition-transform duration-1000"
            sizes="(max-width: 1024px) 100vw, 960px"
          />
        </button>
      </div>
    </div>

    {/* 3. 文本内容区：拉开呼吸感，优化字体层级 */}
    <div
      key={`${activeKey}-content`}
      className={`px-6 py-8 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-10 ${contentTransitionClass}`}
    >
      <div className="apple-progress-track mb-6 h-[3px] rounded-full">
        <div className="apple-progress-bar" style={{ "--progress-width": progressWidth } as CSSProperties} />
      </div>

      {/* 苹果风极简标签 (替代原本的深色 Amber 色块) */}
      <div className="mb-4 inline-flex items-center rounded-full bg-slate-100/85 px-3 py-1 text-[13px] font-semibold tracking-wide text-slate-600 ring-1 ring-inset ring-slate-200/60 backdrop-blur-md">
        {activeItem.date}
      </div>
      
      {/* 紧凑的新闻标题 */}
      <h3 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
        {activeItem.title}
      </h3>
      
      {/* 宽松的新闻摘要 */}
      <p className="mt-4 text-[18px] leading-relaxed text-slate-500 max-w-3xl">
        {activeItem.description}
      </p>
    </div>
  </div>

      {isMounted && isLightboxOpen
        ? createPortal(
            <div className="fixed inset-0 z-[70] bg-black/80 p-4 backdrop-blur-md" onClick={() => setIsLightboxOpen(false)}>
              <div className="relative flex h-full w-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
                <button
                  type="button"
                  className="apple-floating-control absolute right-2 top-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-2xl text-white md:right-6 md:top-6"
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="关闭大图"
                >
                  ×
                </button>
                {items.length > 1 ? (
                  <>
                    <button
                      type="button"
                      className="apple-floating-control absolute left-2 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-2xl text-white md:left-6"
                      onClick={() => changeSlide(-1)}
                      aria-label="上一张动态图片"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="apple-floating-control absolute right-2 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-2xl text-white md:right-6"
                      onClick={() => changeSlide(1)}
                      aria-label="下一张动态图片"
                    >
                      ›
                    </button>
                  </>
                ) : null}
                <div className="max-h-[88vh] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-black/15 p-3 shadow-2xl">
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
                  <div className="apple-overlay-card mt-3 rounded-[1.5rem] px-5 py-4 text-white">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">{activeItem.date}</div>
                    <h3 className="mt-1 text-lg font-semibold leading-8">{activeItem.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/85">{activeItem.description}</p>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </section>
  );
}
