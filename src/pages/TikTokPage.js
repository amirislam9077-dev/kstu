import React from 'react';
import BackButton from '../component/backbutton';
import '../App.css';

// Khurram Studio's TikTok videos. Add a video by pasting its link (TikTok app:
// Share -> Copy link) into TIKTOK_VIDEOS. Short vm.tiktok.com links won't work;
// open them once in a browser and copy the long link that has /video/ in it.
export const TIKTOK_PROFILE = 'https://www.tiktok.com/@khurramstudio';

export const TIKTOK_VIDEOS = [
  // 'https://www.tiktok.com/@username/video/7312345678901234567',
];

const videoId = (url) => (String(url).match(/\/video\/(\d+)/) || [])[1];

const TikTokPage = () => {
  const ids = TIKTOK_VIDEOS.map(videoId).filter(Boolean);

  return (
    <section className="shop-grid-section collection-page tiktok-page">
      <BackButton />
      <h1 className="collection-page-title">TikTok Videos</h1>
      <p className="collection-page-count">
        Our suits in motion —{' '}
        <a href={TIKTOK_PROFILE} target="_blank" rel="noreferrer">
          follow us on TikTok
        </a>
      </p>

      {ids.length === 0 ? (
        <p className="tiktok-empty">Videos coming soon.</p>
      ) : (
        <div className="tiktok-grid">
          {ids.map((id) => (
            <div className="tiktok-card" key={id}>
              <iframe
                src={`https://www.tiktok.com/embed/v2/${id}`}
                title={`TikTok video ${id}`}
                loading="lazy"
                allow="encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TikTokPage;
