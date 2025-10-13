import React from 'react';
import '../App.css';

const bridalLooks = [
  {
    title: 'Evangeline',
    description: 'Handcrafted lace bodice with sheer sleeves and cascading tulle skirt.',
    image:
      'https://images.pexels.com/photos/3617553/pexels-photo-3617553.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    title: 'Melody',
    description: 'Modern satin column gown featuring pearl button back detailing.',
    image:
      'https://images.pexels.com/photos/949225/pexels-photo-949225.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    title: 'Odessa',
    description: 'Romantic off-the-shoulder silhouette with delicate floral appliqué.',
    image:
      'https://images.pexels.com/photos/3014858/pexels-photo-3014858.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    title: 'Celestine',
    description: 'Illusion neckline and organza layers for a floating bridal moment.',
    image:
      'https://images.pexels.com/photos/949224/pexels-photo-949224.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    title: 'Aurielle',
    description: 'Sequined corset with structured overskirt designed for dramatic aisles.',
    image:
      'https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?auto=compress&cs=tinysrgb&w=900'
  }
];

const Bridal = () => {
  return (
    <section id="bridal" className="products">
      <h1 className="products-header">Bridal Collection</h1>
      <div className="products-grid">
        {bridalLooks.map((look) => (
          <div className="product-card" key={look.title}>
            <div className="product-media-wrapper">
              <img
                src={look.image}
                alt={look.title}
                className="product-image"
                style={{ objectFit: 'contain' }}
              />
              <div className="product-actions">
                <button className="action-btn" type="button">
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
