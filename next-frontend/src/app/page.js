'use client';

import { useEffect, useState } from 'react';
import Carousel from '../app/components/Carousel.jsx';

export default function Home() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSlides() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/sliders');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setSlides(json.items || []);
      } catch (err) {
        console.error('Failed to load slides:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadSlides();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 30 }}>
        Simple Image Carousel
      </h1>

      {loading && <p style={{ textAlign: 'center' }}>Loading slides...</p>}
      {error && (
        <p style={{ textAlign: 'center', color: 'red' }}>
          Error: {error}
        </p>
      )}
      {!loading && !error && (
        <Carousel items={slides} autoPlayMs={3500} />
      )}
    </main>
  );
}