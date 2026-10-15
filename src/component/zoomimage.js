import React, { useRef, useState } from 'react';
import '../App.css';

// Product picture that zooms in place: hover (or tap on a phone) and the picture
// grows inside its own frame, following the cursor. Like large fashion stores.

const ZOOM = 2.4;

const ZoomImage = ({ src, alt }) => {
  const frameRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');

  const follow = (clientX, clientY) => {
    const frame = frameRef.current;
    if (!frame) {
      return;
    }
    const { left, top, width, height } = frame.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    const y = Math.min(100, Math.max(0, ((clientY - top) / height) * 100));
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div
      ref={frameRef}
      className={`formal-pro-main-image zoom-frame${zoomed ? ' is-zoomed' : ''}`}
      onMouseEnter={(event) => {
        follow(event.clientX, event.clientY);
        setZoomed(true);
      }}
      onMouseMove={(event) => follow(event.clientX, event.clientY)}
      onMouseLeave={() => setZoomed(false)}
      // Phones have no hover: a tap zooms in at that spot, another tap zooms out
      onTouchStart={(event) => {
        const touch = event.touches[0];
        follow(touch.clientX, touch.clientY);
      }}
      onClick={(event) => {
        if (event.nativeEvent.pointerType === 'touch') {
          setZoomed((value) => !value);
        }
      }}
      onTouchMove={(event) => {
        if (zoomed) {
          const touch = event.touches[0];
          follow(touch.clientX, touch.clientY);
        }
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{ transformOrigin: origin, transform: zoomed ? `scale(${ZOOM})` : 'scale(1)' }}
      />
      {!zoomed && (
        <span className="zoom-hint">
          <span className="zoom-hint-hover">Hover to zoom</span>
          <span className="zoom-hint-touch">Tap to zoom</span>
        </span>
      )}
    </div>
  );
};

export default ZoomImage;
