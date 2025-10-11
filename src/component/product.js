import React, { forwardRef } from 'react';

function ProductCard({ image, title, subtitle, details, logo }) {
  return (
    <div className="product-card">
      <div className="product-media-wrapper">
        <img src={image} alt={title} className="product-image" />
        <div className="product-actions">
          <button className="action-btn">Email</button>
          <button className="action-btn">WhatsApp</button>
          <button className="action-btn">More details</button>
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
      title: 'AA Waterfront',
      subtitle: 'Starting from 4.5 Crores – 12 Crores',
      details: '1, 2, 3 & 4 Bedroom Apartments & Penthouses',
      logo: ''
    },
    {
      image: 'https://www.destinychic.com.au/cdn/shop/files/DestinyChic_Formal_29_01_0178.jpg?v=1708430720&width=720',
      title: 'Emaar Park Edge',
      subtitle: 'Starting from 5.3 Crores – 25 Crores',
      details: '1, 2, 3 & 4 Bedrooms Apartment, & Penthouses',
      logo: ''
    },
    {
      image: 'https://www.destinychic.com.au/cdn/shop/files/Screenshot2025-05-20at2.04.56PM.png?v=1747714024&width=720',
      title: 'Emaar Panorama',
      subtitle: 'Starting from 6.1 Crores – 26 Crores',
      details: '1, 2, 3 & 4 Bedrooms Apartment, & Penthouses',
      logo: ''
    }
  ];

  return (
    <section className="products" ref={ref}>
      <h1 className="products-header">Off Plan Projects</h1>
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


