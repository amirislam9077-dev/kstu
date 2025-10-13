import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const bannerTiles = [
  {
    title: 'Flat 50% Off',
    subtitle: 'Exclusive offer — don’t miss the deal, limited time only!',
    cta: 'Shop Dresses',
    href: '/sale',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/Screenshot2025-05-20at2.04.56PM.png?v=1747714024&width=480',
    imageFit: 'contain'
  },
  {
    title: 'Made for You',
    subtitle: 'Hurry! 50% Off Ends Soon',
    cta: 'Sales',
    href: '/sale',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/Screenshot2025-04-23at12.50.08PM_0895611f-6b5d-4b51-85b8-268093c9c6c5.png?v=1745377232&width=480',
    imageFit: 'contain'
  }
];

const Banner5 = () => {
  const navigate = useNavigate();

  const handleTileClick = (tile) => {
    if (tile.href && tile.href.startsWith('/')) {
      navigate(tile.href);
    } else if (tile.href) {
      window.location.hash = tile.href;
    }
  };

  return (
    <section className="banner5-section">
      <div className="banner5-contact">Contact Us</div>
      <div className="banner5-grid">
        {bannerTiles.map((tile) => (
          <div
            className="banner5-tile"
            key={tile.title}
            role="button"
            tabIndex={0}
            onClick={() => handleTileClick(tile)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleTileClick(tile);
              }
            }}
          >
            <img
              src={tile.image}
              alt={tile.title}
              className="banner5-image"
              style={{ objectFit: tile.imageFit || 'cover' }}
            />
            <div className="banner5-overlay">
              <h3 className="banner5-title">{tile.title}</h3>
              <p className="banner5-subtitle">{tile.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner5;
