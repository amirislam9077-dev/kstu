import React, { forwardRef, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { product5Items } from './product5data';
import { useDiscountedPrice } from '../utils/discounts';

// Product grid in the Sana Safinaz style: four per row, a tall picture that
// switches to a second view on hover, then name, style code and price.

export function ProductCard({ product, basePath = '/product5' }) {
  const navigate = useNavigate();
  // '/sale' -> 'sale': the collection whose discount applies
  const price = useDiscountedPrice(basePath.replace(/^\//, ''), product.price);
  const hoverVideoRef = useRef(null);

  // A product with a hover clip plays it only while the pointer is on the card
  const playHoverVideo = () => {
    hoverVideoRef.current?.play().catch(() => {});
  };
  const stopHoverVideo = () => {
    const video = hoverVideoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const openProduct = () => {
    navigate(`${basePath}/${product.id}`);
  };

  return (
    <div
      className="shop-card"
      role="button"
      tabIndex={0}
      onClick={openProduct}
      onMouseEnter={product.hoverVideo ? playHoverVideo : undefined}
      onMouseLeave={product.hoverVideo ? stopHoverVideo : undefined}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openProduct();
        }
      }}
    >
      <div className="shop-card-media">
        {price.percent > 0 && <span className="sale-badge">-{price.percent}%</span>}
        <img src={product.image} alt={product.title} className="shop-card-image" loading="lazy" />
        {product.hoverVideo && (
          <video
            ref={hoverVideoRef}
            src={product.hoverVideo}
            className="shop-card-image shop-card-image--hover"
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}
        {!product.hoverVideo && product.hoverImage && (
          <img
            src={product.hoverImage}
            alt=""
            aria-hidden="true"
            className="shop-card-image shop-card-image--hover"
            loading="lazy"
          />
        )}
      </div>
      <h3 className="shop-card-title">{product.title}</h3>
      <p className="shop-card-code">{product.code || product.sku}</p>
      <p className="shop-card-price">
        {price.percent > 0 && <span className="price-old">{price.original}</span>}
        <span className={price.percent > 0 ? 'price-new' : undefined}>{price.final}</span>
      </p>
    </div>
  );
}

const Product5 = forwardRef((props, ref) => (
  <section id="unstitched" className="shop-grid-section" ref={ref}>
    <div className="shop-grid">
      {product5Items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
));

Product5.displayName = 'Product5';

export default Product5;
