import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ image, title, subtitle, details, logo, imageFit, productId }) {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    navigate(`/formal/${productId}`);
  };

  return (
    <div className="product-card product-primary">
      <div className="product-media-wrapper">
        <img
          src={image}
          alt={title}
          className="product-image"
          style={{ objectFit: imageFit || 'cover' }}
        />
        <div className="product-actions">
          <button className="action-btn" type="button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className="product-body">
        <h3 className="product-title">{title}</h3>
        <p className="product-subtitle">{subtitle}</p>
        <p className="product-details">{details}</p>
        <div className="product-footer">
          {logo ? <img src={logo} alt="brand" className="product-brand" /> : <span />}
        </div>
      </div>
    </div>
  );
}

const Product = forwardRef((props, ref) => {
  const cards = [
    {
      image: 'https://www.destinychic.com.au/cdn/shop/files/DestinyChic_Formal_29_01_0302.jpg?v=1708439188&width=720',
      title: 'Radha',
      subtitle: 'Rs.95,000.00',
      details: '',
      logo: '',
      imageFit: 'contain',
      productId: 'radha'
    },
    {
      image: 'https://www.destinychic.com.au/cdn/shop/files/DestinyChic_Formal_29_01_0178.jpg?v=1708430720&width=720',
      title: 'Joona',
      subtitle: 'Rs.90,000.00',
      details: '',
      logo: '',
      imageFit: 'contain',
      productId: 'joona'
    },
    {
      image: 'https://www.destinychic.com.au/cdn/shop/files/Screenshot2025-05-20at2.04.56PM.png?v=1747714024&width=720',
      title: 'Adaye',
      subtitle: 'Rs.72,000',
      details: '',
      logo: '',
      imageFit: 'contain',
      productId: 'adaye'
    }
  ];

  return (
    <section className="products" ref={ref}>
      <h1 className="products-header">New Arrivals</h1>
      <div className="products-grid">
        {cards.map((c) => (
          <ProductCard key={c.title} {...c} />
        ))}
      </div>
    </section>
  );
});

Product.displayName = 'Product';

export default Product;


