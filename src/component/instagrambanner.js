import React from 'react';
import { readyToWearItems } from './collectionsdata';
import '../App.css';

// Full-screen "Follow us on Instagram" section: shop pictures behind, the
// Instagram handle and a Follow button in front; opens the Instagram page.

export const INSTAGRAM_HANDLE = 'umaimaasimbykhurram';
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;

const PICTURES = readyToWearItems.slice(0, 4).map((item) => item.image);

const InstagramBanner = () => (
  <section className="insta-banner" aria-label="Instagram">
    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="insta-banner-link">
      <div className="insta-banner-grid" aria-hidden="true">
        {PICTURES.map((src) => (
          <img key={src} src={src} alt="" className="insta-banner-image" loading="lazy" />
        ))}
      </div>
      <div className="insta-banner-content">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
        <h2 className="insta-banner-title">Follow us on Instagram</h2>
        <p className="insta-banner-handle">@{INSTAGRAM_HANDLE}</p>
        <span className="insta-banner-btn">Follow</span>
      </div>
    </a>
  </section>
);

export default InstagramBanner;
