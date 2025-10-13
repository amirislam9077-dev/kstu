import React, { useEffect, useMemo, useState } from 'react';
import '../App.css';

const slides = [
  {
    id: 'formal-sale',
    headline: 'Discover New Formal Arrivals',
    subheadline: 'Handcrafted silhouettes designed to shine at every celebration.',
    image: 'https://www.deepakperwani.com/images/thumbs/0010724_2.jpeg',
    imageFit: 'contain'
  },
  {
    id: 'bridal-elegance',
    headline: 'Bespoke Bridal Couture',
    subheadline: 'Curated gowns tailored to your story and every timeless moment.',
    image: 'https://www.deepakperwani.com/images/thumbs/0010526_4.jpeg',
    imageFit: 'contain'
  },
  {
    id: 'custom-designs',
    headline: 'Design Your Dream Dress',
    subheadline: 'Collaborate with our atelier to bring your signature vision to life.',
    image: 'https://www.deepakperwani.com/images/thumbs/0010724_2.jpeg',
    imageFit: 'contain'
  },
  {
    id: 'signature-couture',
    headline: 'Signature Couture Capsule',
    subheadline: 'A limited-edition showcase of hand-beaded artistry.',
    image: 'https://www.deepakperwani.com/images/thumbs/0011015_w.jpeg',
    imageFit: 'contain'
  }
];

const AUTOPLAY_INTERVAL = 6000;

const Slider = () => {
  const items = useMemo(() => slides, []);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    if (!items.length) {
      return;
    }
    const nextIndex = (index + items.length) % items.length;
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    if (items.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      goToSlide(activeIndex + 1);
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(timer);
  }, [activeIndex, items.length]);

  if (items.length === 0) {
    return null;
  }

  const activeSlide = items[activeIndex];

  return (
    <section className="slider-section" aria-label="Featured highlights">
      <div className="slider-frame">
        <img
          key={activeSlide.id}
          src={activeSlide.image}
          alt={activeSlide.headline}
          className="slider-image"
          style={{ objectFit: activeSlide.imageFit || 'cover' }}
        />
        <div className="slider-overlay">
          <div className="slider-controls">
            {items.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`slider-dot${index === activeIndex ? ' active' : ''}`}
                aria-label={`View slide ${index + 1}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="slider-nav slider-nav--prev"
          aria-label="Previous slide"
          onClick={() => goToSlide(activeIndex - 1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="slider-nav slider-nav--next"
          aria-label="Next slide"
          onClick={() => goToSlide(activeIndex + 1)}
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default Slider;
