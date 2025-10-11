import React, { useState, useEffect } from 'react';

// Import multiple images for the carousel
import heroMedia1 from '../picture/fornt.jpg';
import heroMedia4 from '../picture/hero2.jpg';
import heroMedia5 from '../picture/hero3.jpg';
import heroMedia6 from '../picture/hero4.jpg';
import heroMedia7 from '../picture/hero5.jpg';
// Add more image imports as needed

function Hero() {
  // Array of images for the carousel
  const slides = [
    {
      image: heroMedia1,
      alt: 'AJ Real Estate Hero'
    },
    {
      image: heroMedia4,
      alt: 'Luxury Real Estate'
    },
    {
      image: heroMedia5,
      alt: 'Property Investment'
    },
    {
      image: heroMedia6,
      alt: 'Commercial Properties'
    },
    {
      image: heroMedia7,
      alt: 'Residential Developments'
    }
    // Add more slides here as needed
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  // Next slide function
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Previous slide function
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-domain">AJ REAL ESTATE</div>
          <h1 className="hero-title">33 Years of Trust, Experience & Excellence</h1>
          <p className="hero-copy">
            AJ Real Estate is a trusted name in Karachi's real estate industry. Over the past 33 years, we have not only partnered with the city's leading developers but have also successfully executed digital marketing and advertising campaigns for numerous landmark projects. Our expertise and modern market strategies have consistently delivered maximum investor engagement and successful project launches.
          </p>
          <p className="hero-copy">
            Our mission goes beyond property transactions — we aim to turn your dreams into reality. Whether you are looking for residential plots, commercial spaces, or long-term investments, AJ Real Estate provides expert guidance, transparent dealings, and the best options aligned with modern market trends.
          </p>
          <div className="hero-features">
            <h3 className="features-title">Why Choose Us?</h3>
            <ul className="features-list">
              <li>✓ 33 years of proven experience and trust</li>
              <li>✓ Strong partnerships with top Karachi developers</li>
              <li>✓ Successfully managed digital campaigns and advertising for multiple major projects</li>
              <li>✓ Secure and innovative investment opportunities</li>
              <li>✓ Professional and transparent services</li>
            </ul>
          </div>
          <p className="hero-tagline">
            <strong>AJ Real Estate – Your Trusted Partner in Karachi Real Estate and Smart Investments</strong>
          </p>
        </div>
        <div className="hero-right">
          <div className="hero-carousel">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].alt}
              className="hero-media"
            />

            {/* Navigation arrows */}
            <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Slide indicators */}
            <div className="carousel-indicators">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;


