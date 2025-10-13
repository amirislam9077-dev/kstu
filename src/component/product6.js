import React, { forwardRef } from 'react';

function ProductCard({ image, title, subtitle, details, logo, imageFit }) {
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
          <button className="action-btn" type="button">Add to Cart</button>
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

const Product6 = forwardRef((props, ref) => {
  const cards = [
    {
      image: 'https://www.deepakperwani.com/images/thumbs/0009486_drs1137.jpeg',
      title: 'Aurora',
      subtitle: 'Rs.110,000.',
      details: '',
      logo: '',
      imageFit: 'contain'
    },
    {
      image: 'https://www.deepakperwani.com/images/thumbs/0008385_drs1100.jpeg',
      title: 'Celestia',
      subtitle: 'Rs.86,500',
      details: '',
      logo: '',
      imageFit: 'contain'
    },
    {
      image: 'https://www.deepakperwani.com/images/thumbs/0008431_drs1112.jpeg',
      title: 'Lunara',
      subtitle: 'Rs.58,750',
      details: '',
      logo: '',
      imageFit: 'contain'
    }
  ];

  return (
    <section className="products" ref={ref}>
      <div className="products-grid">
        {cards.map((c) => (
          <ProductCard key={c.title} {...c} />
        ))}
      </div>
    </section>
  );
});

Product6.displayName = 'Product6';

export default Product6;


