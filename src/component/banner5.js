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
    title: 'Watch on TikTok',
    subtitle: 'See our suits in our videos',
    cta: 'TikTok',
    href: '/tiktok',
    tiktok: true,
    // Cover of a Khurram Studio TikTok video, kept in /public (TikTok's own links expire)
    image: '/images/tiktok-cover.jpg',
    imageFit: 'cover'
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
            <div className={`banner5-overlay${tile.tiktok ? ' banner5-overlay--tiktok' : ''}`}>
              {tile.tiktok && (
                <>
                  <span className="banner5-tiktok-logo" aria-hidden="true">
                    <svg viewBox="0 0 48 48" width="22" height="22" fill="currentColor">
                      <path d="M33.6 5h-6.9v26.4a5.9 5.9 0 1 1-4.2-5.7v-7a12.8 12.8 0 1 0 11.1 12.7V18.7a15.6 15.6 0 0 0 9.1 2.9v-6.9A9.2 9.2 0 0 1 33.6 5z" />
                    </svg>
                    TikTok
                  </span>
                  <span className="banner5-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </>
              )}
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
