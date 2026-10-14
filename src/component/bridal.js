import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const bridalLooks = [
  {
    id: 'evangeline',
    title: 'Evangeline',
    description: 'Handcrafted lace bodice with sheer sleeves and cascading tulle skirt.',
    image:
      'https://www.mariab.pk/cdn/shop/files/D-9AFront_A_71a7de19-867b-4b0b-ad62-9cd5297154a9_2400x2400.jpg?v=1764230410'
  },
  {
    id: 'melody',
    title: 'Melody',
    description: 'Minimalist satin column gown with pearl button back detailing.',
    image:
      'https://www.mariab.pk/cdn/shop/files/D-8BFront_A_1aa4233c-0883-4837-ac68-05ae5fe34bf2_2400x2400.jpg?v=1764230355',
    price: 'Rs.35,000'
  },
  {
    id: 'odessa',
    title: 'Odessa',
    description: 'Romantic off-the-shoulder silhouette with delicate floral appliqué.',
    image:
      'https://www.mariab.pk/cdn/shop/files/D-9BFront_A_d96ff5a0-50ef-48ac-9db2-1efd905b1e1d_2400x2400.jpg?v=1764230477'
  },
  {
    id: 'celestine',
    title: 'Celestine',
    description: 'Illusion neckline and organza layers for a floating bridal moment.',
    image:
      'https://www.mariab.pk/cdn/shop/files/D-10AFront_A_92b97791-08cf-49a9-8802-88adced7acac_2400x2400.jpg?v=1764230585'
  },
  {
    id: 'aurielle',
    title: 'Aurielle',
    description: 'Sequined corset with structured overskirt designed for dramatic aisles.',
    image:
      'https://www.mariab.pk/cdn/shop/files/D-10BFront_A_40a42f00-92ba-4df6-bb5f-a09180685421_2400x2400.jpg?v=1764230651'
  },
  {
    id: 'seraphina',
    title: 'Seraphina',
    description: 'Elegant bridal gown with intricate embellishments and timeless silhouette.',
    image:
      'https://www.mariab.pk/cdn/shop/files/D-4Front_A_000e1a04-8902-4660-8063-48d468ed0579_2400x2400.jpg?v=1762857821'
  }
];

const Bridal = () => {
  const navigate = useNavigate();

  const handleViewProduct = (productId) => {
    navigate(`/bridal/${productId}`);
  };

  return (
    <section id="bridal" className="products">
      <h1 className="products-header">Bridal Collection</h1>
      <div className="products-grid">
        {bridalLooks.map((look) => (
          <div className="product-card" key={look.id}>
            <div
              className="product-media-wrapper"
              onClick={() => handleViewProduct(look.id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={look.image}
                alt={look.title}
                className="product-image"
                style={{ objectFit: 'contain' }}
              />
              <div className="product-actions">
                <button
                  className="action-btn"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewProduct(look.id);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
            <div className="product-body">
              <h3 className="product-title">{look.title}</h3>
              <p className="product-details">{look.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Bridal;
