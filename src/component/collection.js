import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

// "Shop By Collection": text on the left, a wide picture slider on the right
// that moves on its own; the lines under the text show the current picture.

const slides = [
  {
    id: 'stitched',
    image: 'https://www.mariab.pk/cdn/shop/files/STITCHED_SHOP_BY_occassion.jpg?v=1788507466&width=1600',
    alt: 'Stitched collection',
    path: '/new-arrival'
  },
  {
    id: 'luxury-formals',
    image: 'https://www.mariab.pk/cdn/shop/files/SF_SHOP_BY_occassion.jpg?v=1788507476&width=1600',
    alt: 'Luxury formals collection',
    path: '/new-arrival'
  },
  {
    id: 'luxury-pret',
    image: 'https://www.mariab.pk/cdn/shop/files/DW_SHOP_BY_occassion.jpg?v=1788507476&width=1600',
    alt: 'Luxury pret collection',
    path: '/new-arrival'
  },
  {
    id: 'mastani',
    image:
      'https://www.mariab.pk/cdn/shop/files/Project_mastani_Shop_by_Occassion_Slider_banner_960X660_e8f40750-e6c2-4651-a721-91993161ad2e.jpg?v=1781088232&width=1600',
    alt: 'Festive collection',
    path: '/new-arrival'
  }
];

const AUTOPLAY_INTERVAL = 3000;

const ShopByCollection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, AUTOPLAY_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  const activeSlide = slides[activeIndex];

  return (
    <section className="collection-section" aria-label="Shop by collection">
      <div className="collection-content">
        <div className="collection-text">
          <Link to="/new-arrival" className="collection-tagline">New Arrivals'26</Link>
          <h2 className="collection-title">
            <Link to="/new-arrival" className="collection-title-link">Shop By Collection</Link>
          </h2>
          <p className="collection-description">
            Explore the newest summer arrivals — fresh prints, breezy fabrics, and styles made for the season.
          </p>
          <Link to={activeSlide.path} className="collection-btn">
            Shop The Look
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M15.832 9.99931H4.16537" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.6654 14.166L15.832 9.99933" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.6654 5.83264L15.832 9.99931" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <div className="collection-lines">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`collection-line${index === activeIndex ? ' active' : ''}`}
              aria-label={`Show picture ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="collection-slider">
        <div className="collection-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {slides.map((slide) => (
            <Link key={slide.id} to={slide.path} className="collection-slide">
              <img src={slide.image} alt={slide.alt} className="collection-image" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCollection;
