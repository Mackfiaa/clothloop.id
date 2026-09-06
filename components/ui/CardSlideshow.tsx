'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface SlideItem {
  id: string;
  image: string;
  tag: string;
  title: string;
  subtitle: string;
}

interface CardSlideshowProps {
  slides: SlideItem[];
  autoPlay?: boolean;
  interval?: number;
  aspectRatio?: string;
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 320, damping: 32 },
      opacity: { duration: 0.35 },
      scale: { duration: 0.35 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
    transition: {
      x: { type: 'spring' as const, stiffness: 320, damping: 32 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  }),
};

export function CardSlideshow({
  slides,
  autoPlay = true,
  interval = 5000,
  aspectRatio = 'aspect-[16/10]',
}: CardSlideshowProps) {
  const [[current, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage(([prev]) => {
      const nextIndex = (prev + newDirection + slides.length) % slides.length;
      return [nextIndex, newDirection];
    });
  };

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const timer = setInterval(() => {
      paginate(1);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  if (slides.length === 0) return null;
  const slide = slides[current];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border-2 border-emerald-600/30 bg-stone-900 shadow-2xl group">
      
      {/* Aspect Ratio Box with Animated Presence */}
      <div className={`relative w-full ${aspectRatio} overflow-hidden`}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={slide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Rich Emerald & Dark Vignette Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/40 via-transparent to-transparent pointer-events-none" />
            
            {/* Content Text Overlay */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 text-white flex flex-col gap-2 z-10"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 px-3 py-1 rounded-full shadow-md font-mono">
                  {slide.tag}
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white leading-tight drop-shadow-sm tracking-tight">
                {slide.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/90 line-clamp-2 font-normal leading-relaxed">
                {slide.subtitle}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next Controls with Tactile Physics */}
      {slides.length > 1 && (
        <div className="absolute top-1/2 -translate-y-1/2 inset-x-2.5 flex justify-between z-20 pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous Slide"
            className="pointer-events-auto w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-900 flex items-center justify-center shadow-md backdrop-blur-xs cursor-pointer border border-white/40"
          >
            <ChevronLeft size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next Slide"
            className="pointer-events-auto w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-900 flex items-center justify-center shadow-md backdrop-blur-xs cursor-pointer border border-white/40"
          >
            <ChevronRight size={16} />
          </motion.button>
        </div>
      )}

      {/* Animated Indicators */}
      {slides.length > 1 && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setPage([idx, idx > current ? 1 : -1])}
              className="cursor-pointer p-0.5 border-none bg-transparent"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <motion.div
                animate={{
                  width: idx === current ? 16 : 5,
                  backgroundColor: idx === current ? '#10b981' : 'rgba(255,255,255,0.4)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="h-1.5 rounded-full"
              />
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
