'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface SlideItem {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
  tag?: string;
  link?: string;
}

interface CardSlideshowProps {
  slides: SlideItem[];
  aspectRatio?: string;
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export function CardSlideshow({
  slides,
  aspectRatio = 'aspect-[16/10]',
  autoPlay = false,
  interval = 5000,
  showDots = true,
  showArrows = true,
  className = '',
}: CardSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, nextSlide, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 40) nextSlide();
    if (diff < -40) prevSlide();
    setTouchStart(null);
  };

  if (!slides || slides.length === 0) return null;
  const current = slides[currentIndex];

  return (
    <div
      className={`relative w-full overflow-hidden bg-[var(--surface-muted)] border border-[var(--border-hairline)] select-none group ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`relative w-full ${aspectRatio}`}>
        <Image
          src={current.image}
          alt={current.title || 'Slideshow image'}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Minimalist Subdued Caption Bar */}
        {(current.title || current.tag) && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 flex flex-col justify-between p-4 sm:p-5 text-white">
            <div className="flex justify-between items-start">
              {current.tag && (
                <span className="bg-white text-[var(--ink-primary)] text-[10px] font-semibold uppercase px-2 py-0.5 tracking-wider">
                  {current.tag}
                </span>
              )}
              <span className="text-[10px] font-mono bg-black/60 px-2 py-0.5 text-white/80">
                {currentIndex + 1} / {slides.length}
              </span>
            </div>

            {current.title && (
              <div>
                {current.subtitle && (
                  <p className="text-[11px] text-white/80 font-normal mb-0.5">
                    {current.subtitle}
                  </p>
                )}
                <h4 style={{ fontFamily: "'Playfair Display', serif" }} className="text-base sm:text-lg font-bold leading-snug text-white">
                  {current.title}
                </h4>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            aria-label="Previous slide"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white text-[var(--ink-primary)] border border-[var(--border-hairline)] flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            aria-label="Next slide"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white text-[var(--ink-primary)] border border-[var(--border-hairline)] flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
          >
            <ChevronRight size={14} />
          </button>
        </>
      )}

      {/* Pagination Line / Dots */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
              aria-label={`Slide ${i + 1}`}
              className={`h-1 transition-all ${
                currentIndex === i ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
