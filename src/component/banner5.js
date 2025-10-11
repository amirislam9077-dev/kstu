import React from 'react';
import '../App.css';

const bannerTiles = [
  {
    title: 'Formal & Prom',
    subtitle: 'For all your special occasions',
    cta: 'Shop Dresses',
    href: '#shop-formal',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/Screenshot2025-05-20at2.04.56PM.png?v=1747714024&width=480'
  },
  {
    title: 'Made for You',
    subtitle: 'Want something custom made?',
    cta: 'Learn More',
    href: '#custom-made',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/Screenshot2025-04-23at12.50.08PM_0895611f-6b5d-4b51-85b8-268093c9c6c5.png?v=1745377232&width=480'
  }
];

const Banner5 = () => {
  return (
    <section className="banner5-section">
      <div className="banner5-contact">Contact Us</div>
      <div className="banner5-grid">
        {bannerTiles.map((tile) => (
          <div className="banner5-tile" key={tile.title}>
            <img src={tile.image} alt={tile.title} className="banner5-image" />
            <div className="banner5-overlay">
              <h3 className="banner5-title">{tile.title}</h3>
              <p className="banner5-subtitle">{tile.subtitle}</p>
              <a href={tile.href} className="banner5-cta">{tile.cta}</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner5;
