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
    <section id="custom" className="formal-section">
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

        <div className="formal-gallery">
          {customLooks.map((item) => (
            <div className="formal-card" key={item.id}>
              <button
                type="button"
                className="formal-media"
                onClick={() => handleViewProduct(item)}
                aria-label={`View ${item.title}`}
              >
                <img src={item.image} alt={item.title} className="formal-image" />
                <div className="formal-card-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </button>
              <div className="formal-card-footer">
                <span className="formal-price">{item.price}</span>
                <button
                  className="formal-cart-btn"
                  type="button"
                  onClick={() => handleViewProduct(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Custom;
