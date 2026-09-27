'use client';

import { useState, useEffect, useMemo } from 'react';
import heroShowcaseConfig from '@/data/heroShowcase.config';

export default function HeroShowcase() {
  const {
    enabled = true,
    mode = 'mixed',
    interval = 4000,
    fadeDuration = 800,
    items: customItems = [],
    images = [],
    texts = [],
  } = heroShowcaseConfig;

  // Resolve the active slides based on mode ('mixed' | 'images' | 'text')
  const activeItems = useMemo(() => {
    if (mode === 'images') {
      if (Array.isArray(images) && images.length > 0) {
        return images.map((item, i) => ({ ...item, type: 'image', id: item.id || `img-${i}` }));
      }
      return customItems.filter((item) => item.type === 'image');
    }

    if (mode === 'text') {
      if (Array.isArray(texts) && texts.length > 0) {
        return texts.map((item, i) => ({ ...item, type: 'text', id: item.id || `txt-${i}` }));
      }
      return customItems.filter((item) => item.type === 'text');
    }

    // Default 'mixed' mode: interchangeable sequence (Image -> Text -> Image...)
    if (Array.isArray(customItems) && customItems.length > 0) {
      return customItems;
    }

    // Fallback: automatically interleave images and texts
    const mixed = [];
    const maxLen = Math.max(images.length, texts.length);
    for (let i = 0; i < maxLen; i++) {
      if (images[i]) mixed.push({ ...images[i], type: 'image', id: images[i].id || `img-${i}` });
      if (texts[i]) mixed.push({ ...texts[i], type: 'text', id: texts[i].id || `txt-${i}` });
    }
    return mixed;
  }, [mode, customItems, images, texts]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Keep activeIndex within bounds if list length changes
  useEffect(() => {
    if (activeIndex >= activeItems.length && activeItems.length > 0) {
      setActiveIndex(0);
    }
  }, [activeItems.length, activeIndex]);

  // Smooth loop interval
  useEffect(() => {
    if (!enabled || activeItems.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activeItems.length);
    }, interval);

    return () => clearInterval(timer);
  }, [enabled, activeItems.length, interval, isPaused]);

  // If feature is turned off or no items to show, render nothing
  if (!enabled || activeItems.length === 0) {
    return null;
  }

  return (
    <div
      className={`hero-showcase-container mode-${mode}`}
      style={{ '--fade-duration': `${fadeDuration}ms` }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Banner Showcase"
    >
      <div className="hero-showcase-slides">
        {activeItems.map((item, idx) => {
          const isActive = idx === activeIndex;
          const isImage = item.type === 'image';

          return (
            <div
              key={item.id || idx}
              className={`hero-showcase-slide slide-type-${item.type} ${isActive ? 'active' : ''}`}
              aria-hidden={!isActive}
            >
              {isImage ? (
                /* Pure PNG Image Cutout - Covers full height of banner, zero box */
                <div className="hero-showcase-img-wrap">
                  <img
                    src={item.src}
                    alt={item.alt || 'Bhojpuri Sur Showcase'}
                    className="hero-showcase-img"
                    loading="eager"
                  />
                </div>
              ) : (
                /* Pure Floating Text - zero box, zero cards */
                <div className="hero-showcase-text-wrap">
                  {item.badge && (
                    <div className="hero-showcase-badge">
                      <span>{item.badge}</span>
                    </div>
                  )}
                  <h3 className="hero-showcase-heading">{item.title}</h3>
                  {item.subtitle && (
                    <p className="hero-showcase-desc">{item.subtitle}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
