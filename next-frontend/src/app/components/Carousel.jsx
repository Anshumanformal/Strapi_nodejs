'use client';

import { useEffect, useRef, useState } from 'react';

export default function Carousel({ items = [], autoPlayMs = 3000 }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const containerRef = useRef();

  // Filter out inactive slides
  const visibleItems = items.filter((it) => it.isActive !== false);

  // Setup and cleanup auto-play
  useEffect(() => {
    startAuto();
    return stopAuto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, visibleItems.length]);

  function startAuto() {
    stopAuto();
    if (!autoPlayMs || visibleItems.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % visibleItems.length);
    }, autoPlayMs);
  }

  function stopAuto() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  // Handle touch swipe for mobile
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let startX = 0;

    function onTouchStart(e) {
      stopAuto();
      startX = e.touches[0].clientX;
    }

    function onTouchEnd(e) {
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;

      // Swipe threshold: 40px
      if (Math.abs(diff) > 40) {
        if (diff < 0) next(); // Swipe left → next slide
        else prev(); // Swipe right → previous slide
      }
      startAuto();
    }

    el.addEventListener('touchstart', onTouchStart);
    el.addEventListener('touchend', onTouchEnd);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleItems.length]);

  function prev() {
    setIndex((i) => (i - 1 + visibleItems.length) % visibleItems.length);
  }

  function next() {
    setIndex((i) => (i + 1) % visibleItems.length);
  }

  if (visibleItems.length === 0) return null;

  const active = visibleItems[index];

  return (
    <div
      ref={containerRef}
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 10,
        maxWidth: 900,
        margin: '0 auto',
        backgroundColor: '#f0f0f0'
      }}
      aria-roledescription="carousel"
    >
      {/* Slide content with link */}
      <a
        href={active.redirectUrl || '#'}
        target={active.redirectUrl ? '_blank' : '_self'}
        rel="noreferrer"
        style={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit'
        }}
      >
        <img
          src={active.image}
          alt={active.title || 'slide'}
          style={{
            width: '100%',
            display: 'block',
            height: 300,
            objectFit: 'cover'
          }}
        />

        {/* Title overlay */}
        {active.title && (
          <div
            style={{
              position: 'absolute',
              left: 12,
              bottom: 12,
              background: 'rgba(0, 0, 0, 0.45)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: 6,
              maxWidth: '70%',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            {active.title}
          </div>
        )}
      </a>

      {/* Previous button */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        style={{
          position: 'absolute',
          left: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.35)',
          border: 'none',
          color: 'white',
          padding: '8px 10px',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: '24px',
          lineHeight: 1,
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => (e.target.style.background = 'rgba(0, 0, 0, 0.6)')}
        onMouseLeave={(e) => (e.target.style.background = 'rgba(0, 0, 0, 0.35)')}
      >
        ‹
      </button>

      {/* Next button */}
      <button
        onClick={next}
        aria-label="Next slide"
        style={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.35)',
          border: 'none',
          color: 'white',
          padding: '8px 10px',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: '24px',
          lineHeight: 1,
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => (e.target.style.background = 'rgba(0, 0, 0, 0.6)')}
        onMouseLeave={(e) => (e.target.style.background = 'rgba(0, 0, 0, 0.35)')}
      >
        ›
      </button>

      {/* Dot indicators */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: 8,
          display: 'flex',
          gap: 6,
          zIndex: 10
        }}
      >
        {visibleItems.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              border: 'none',
              background: i === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
          />
        ))}
      </div>
    </div>
  );
}