import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const bannerTiles = [
  {
    badge: 'Sale',
    title: 'Flat 50% Off',
    subtitle: 'Exclusive offer — don’t miss the deal, limited time only!',
    cta: 'Shop Dresses',
    href: '/sale',
    image:
      'https://www.deepakperwani.com/images/thumbs/0010672_dove.jpeg'
  },
  {
    title: 'Made for You',
    subtitle: 'Hurry! 50% Off Ends Soon',
    cta: 'Sales',
    href: '/sale',
    image:
      'https://www.deepakperwani.com/images/thumbs/0012600_drs1135.jpeg'
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
      <div className="banner5-grid">
        {bannerTiles.map((tile) => (
          <div
            className="banner5-tile"
            key={tile.title}
            style={{ '--bg-image': `url(${tile.image})` }}
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
              style={{ objectFit: tile.imageFit || 'contain' }}
            />
            <div className="banner5-overlay">
              {tile.badge && <span className="banner5-sale">{tile.badge}</span>}
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
