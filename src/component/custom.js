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
      'https://www.mariab.pk/cdn/shop/files/D-3AFront_A_65634206-5ed2-47c4-9dd8-282d3c25d0dc_2400x2400.jpg?v=1764229531',
    price: 'Consultation from Rs.56,000',
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
      'https://www.mariab.pk/cdn/shop/files/D-3BFront_A_edbd24ae-423e-4356-9961-0408be793d55_2400x2400.jpg?v=1764229610',
    price: 'Consultation from Rs.50,000',
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
      'https://www.mariab.pk/cdn/shop/files/D-4AFront_A_31183646-4136-4238-87b5-363c35906dca_2400x2400.jpg?v=1764229711',
    price: 'Consultation from Rs.62,000',
    availability: 'Custom couture service',
    sku: 'CUSTOM-EVENING-210',
    sizes: ['Custom'],
    details: {
      Process: 'Concept storyboard → toile fitting → couture finishing',
      Timeline: '5-7 weeks',
      Fabrics: 'Silk satin, sequins, feather detailing',
      Includes: 'Accessory styling and press ready delivery'
    }
  },
  {
    id: 'luxury-formal',
    title: 'Luxury Formal Collection',
    description:
      'Premium formal wear with exquisite embroidery and sophisticated styling for special occasions.',
    image:
      'https://www.mariab.pk/cdn/shop/files/D-6AFront_A_a25adf97-936f-4f8f-aedb-f525c64ad38f_2400x2400.jpg?v=1764229976',
    price: 'Consultation from Rs.67,000',
    availability: 'Custom couture service',
    sku: 'CUSTOM-LUXURY-310',
    sizes: ['Custom'],
    details: {
      Process: 'Design consultation → fabric selection → custom tailoring',
      Timeline: '5-8 weeks',
      Fabrics: 'Premium silk, intricate embroidery, luxury finishes',
      Includes: 'Multiple fittings and styling consultation'
    }
  },
  {
    id: 'elegant-occasion',
    title: 'Elegant Occasion Wear',
    description:
      'Timeless elegance with bespoke tailoring for weddings, engagements, and formal celebrations.',
    image:
      'https://www.mariab.pk/cdn/shop/files/D-4BFront_A_4d4aa10d-85e2-4592-949e-7154f12794c9_2400x2400.jpg?v=1764229778',
    price: 'Consultation from Rs.59,000',
    availability: 'Custom made-to-order',
    sku: 'CUSTOM-ELEGANT-410',
    sizes: ['Custom'],
    details: {
      Process: 'Personal consultation → design refinement → precision tailoring',
      Timeline: '4-7 weeks',
      Fabrics: 'Fine silk, embellished details, premium craftsmanship',
      Includes: 'Design sketches and personalized fitting sessions'
    }
  },
  {
    id: 'premium-collection',
    title: 'Premium Couture Collection',
    description:
      'Exclusive designer pieces with meticulous handwork and couture-level finishing for discerning clients.',
    image:
      'https://www.mariab.pk/cdn/shop/files/D-8AFront_A_0e3f0f08-f934-47db-bc56-c0840328b66e_2400x2400.jpg?v=1764230270',
    price: 'Consultation from Rs.73,000',
    availability: 'Custom couture service',
    sku: 'CUSTOM-PREMIUM-510',
    sizes: ['Custom'],
    details: {
      Process: 'Elite consultation → bespoke design → artisan construction',
      Timeline: '6-9 weeks',
      Fabrics: 'Exclusive fabrics, hand embroidery, premium embellishments',
      Includes: 'Priority service and complete styling package'
    }
  }
];

const Custom = () => {
  const navigate = useNavigate();

  const handleViewProduct = (productId) => {
    navigate(`/custom/${productId}`);
  };

  return (
    <section id="custom" className="products">
      <h1 className="products-header">Custom Collection</h1>
      <div className="products-grid">
        {customLooks.map((item) => (
          <div className="product-card" key={item.id}>
            <div
              className="product-media-wrapper"
              onClick={() => handleViewProduct(item.id)}
              style={{ cursor: 'pointer' }}
            >
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewProduct(item.id);
                  }}
                >
                  Add to Cart
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
    </section>
  );
};

export default Custom;
