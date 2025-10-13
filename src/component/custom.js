import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

export const customLooks = [
  {
    id: 'bespoke-bridal',
    title: 'Bespoke Bridal Couture',
    description:
      'Design a one-of-a-kind bridal ensemble tailored to your story, silhouette, and wedding aesthetic.',
    image:
      'https://images.pexels.com/photos/2567376/pexels-photo-2567376.jpeg?auto=compress&cs=tinysrgb&w=900',
    price: 'Consultation from $200',
    availability: 'Custom made-to-measure',
    sku: 'CUSTOM-BRIDE-001',
    sizes: ['Custom'],
    details: {
      Process: 'Initial consultation → muslin fitting → couture construction',
      Timeline: '6-8 weeks depending on embellishment',
      Fabrics: 'French lace, Italian silk organza, hand beadwork',
      Includes: 'Sketches, fabric sourcing, final fitting'
    }
  },
  {
    id: 'signature-groomswear',
    title: 'Signature Groomswear',
    description:
      'Handcrafted sherwanis, tuxedos, and fusion wear with bespoke embroidery and tailored construction.',
    image:
      'https://images.pexels.com/photos/2746773/pexels-photo-2746773.jpeg?auto=compress&cs=tinysrgb&w=900',
    price: 'Consultation from $180',
    availability: 'Custom tailored service',
    sku: 'CUSTOM-GROOM-101',
    sizes: ['Custom'],
    details: {
      Process: 'Style briefing → measurement session → personalised fittings',
      Timeline: '4-6 weeks',
      Fabrics: 'Velvet, brocade, superfine wool blends',
      Includes: 'Coordinated accessories and finishing'
    }
  },
  {
    id: 'evening-couture',
    title: 'Evening & Red Carpet Couture',
    description:
      'Statement gowns and suits for galas and award nights, with personalised draping and embellishment.',
    image:
      'https://images.pexels.com/photos/4496275/pexels-photo-4496275.jpeg?auto=compress&cs=tinysrgb&w=900',
    price: 'Consultation from $220',
    availability: 'Custom couture service',
    sku: 'CUSTOM-EVENING-210',
    sizes: ['Custom'],
    details: {
      Process: 'Concept storyboard → toile fitting → couture finishing',
      Timeline: '5-7 weeks',
      Fabrics: 'Silk satin, sequins, feather detailing',
      Includes: 'Accessory styling and press ready delivery'
    }
  }
];

const Custom = () => {
  const navigate = useNavigate();

  const handleViewProduct = (look) => {
    navigate(`/custom/${look.id}`);
  };

  return (
    <section id="custom" className="products">
      <div className="formal-wrapper">
        <div className="formal-text">
          <p className="formal-eyebrow">Custom Atelier</p>
          <h2 className="formal-heading">Tailored For Your Signature Moments</h2>
          <p className="formal-description">
            Our couture house specialises in crafting bespoke garments that capture your personal signature. From the
            first consultation to final fitting, every detail is curated in-house by our master artisans.
          </p>
          <button type="button" className="formal-primary-btn">
            Book a Consultation
          </button>
        </div>

        <div className="products-grid">
          {customLooks.map((item) => (
            <div className="product-card" key={item.id}>
              <div className="product-media-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="product-image"
                  style={{ objectFit: 'contain' }}
                />
                <div className="product-actions">
                  <button
                    className="action-btn"
                    type="button"
                    onClick={() => handleViewProduct(item)}
                  >
                    View Details
                  </button>
                </div>
              </div>
              <div className="product-body">
                <h3 className="product-title">{item.title}</h3>
                <p className="product-subtitle">{item.price}</p>
                <p className="product-details">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Custom;
