import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const sharedGalleryImages = [
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80'
];

export const formalLooks = [
  {
    id: 'seralyn',
    title: 'Seralyn',
    description: 'Pre-order. Metallic champagne couture gown with hand embroidery and sculpted bodice.',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/Screenshot2025-05-20at11.07.37AM.png?v=1747703685&width=480',
    gallery: [
      'https://www.destinychic.com.au/cdn/shop/files/Screenshot2025-05-20at11.07.37AM.png?v=1747703685&width=900',
      ...sharedGalleryImages
    ],
    price: '$1,890',
    availability: 'In stock',
    sku: 'FORMAL-SERALYN',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'A tonal interplay of champagne hues with couture embroidery.',
      Color: 'Champagne',
      Fabric: 'Satin base with crystal beadwork',
      Cut: 'Structured bodice, floor-length skirt',
      Slip: 'Satin slip included',
      Dupatta: 'Not included',
      Trouser: 'Not applicable'
    }
  },
  {
    id: 'kaylana',
    title: 'Kaylana',
    description: 'Pre-order. Blush sequin fishtail dress featuring corsetry and sweeping train.',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/20250731_154310.jpg?v=1754019257&width=480',
    gallery: [
      'https://www.destinychic.com.au/cdn/shop/files/20250731_154310.jpg?v=1754019257&width=900',
      ...sharedGalleryImages
    ],
    price: '$1,650',
    availability: 'Pre-order, ships in 4 weeks',
    sku: 'FORMAL-KAYLANA',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'A blush-pink sequin fishtail gown with corseted bodice.',
      Color: 'Blush Pink',
      Fabric: 'Sequined mesh over satin lining',
      Cut: 'Fishtail silhouette with corset back',
      Slip: 'Integrated lining',
      Dupatta: 'Not included',
      Trouser: 'Not applicable'
    }
  },
  {
    id: 'anthea-blue',
    title: 'Anthea',
    description: 'Pre-order. Ice-blue crystal gown with detachable off-shoulder sleeves.',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/20250626_111348.jpg?v=1754288705&width=480',
    gallery: [
      'https://www.destinychic.com.au/cdn/shop/files/20250626_111348.jpg?v=1754288705&width=900',
      ...sharedGalleryImages
    ],
    price: '$2,150',
    availability: 'Limited availability',
    sku: 'FORMAL-ANTHEA-BLUE',
    sizes: ['S/M', 'M/L'],
    details: {
      Description: 'Ice-blue gown with crystal embellishment and detachable sleeves.',
      Color: 'Ice Blue',
      Fabric: 'Tulle with hand-set crystals',
      Cut: 'A-line with detachable off-shoulder sleeves',
      Slip: 'Raw silk slip included',
      Dupatta: 'Not included',
      Trouser: 'Not applicable'
    }
  },
  {
    id: 'anthea-split',
    title: 'Anthea',
    description: 'Pre-order. Alternative styling of the Anthea silhouette with thigh-high split.',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/DestinyChic_Formal_29_01_0865_7ec213a8-8dc0-4395-8a78-da7e294f9658.jpg?v=1710198641&width=480',
    gallery: [
      'https://www.destinychic.com.au/cdn/shop/files/DestinyChic_Formal_29_01_0865_7ec213a8-8dc0-4395-8a78-da7e294f9658.jpg?v=1710198641&width=900',
      ...sharedGalleryImages
    ],
    price: '$2,050',
    availability: 'In stock',
    sku: 'FORMAL-ANTHEA-SPLIT',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'Signature Anthea gown with thigh-high split for dramatic movement.',
      Color: 'Ivory',
      Fabric: 'Silk crepe with crystal applique',
      Cut: 'Column silhouette with high split',
      Slip: 'Silk slip included',
      Dupatta: 'Not included',
      Trouser: 'Not applicable'
    }
  },
  {
    id: 'scarlet-radiance',
    title: 'Scarlet Radiance',
    description: 'Hand-beaded sequin gown with corseted bodice and sweeping train.',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/Screenshot2025-05-20at2.04.56PM.png?v=1747714024&width=900',
    gallery: [
      'https://www.destinychic.com.au/cdn/shop/files/Screenshot2025-05-20at2.04.56PM.png?v=1747714024&width=1200',
      ...sharedGalleryImages
    ],
    price: '$2,480',
    availability: 'Made to order',
    sku: 'FORMAL-SCARLET-RADIANCE',
    sizes: ['XS/S', 'S/M', 'M/L', 'L/XL'],
    details: {
      Description: 'Hand-beaded scarlet gown with corseted bodice and dramatic train.',
      Color: 'Scarlet',
      Fabric: 'Sequined mesh with silk lining',
      Cut: 'Corseted bodice, mermaid skirt',
      Slip: 'Silk slip included',
      Dupatta: 'Optional matching cape',
      Trouser: 'Not applicable'
    }
  }
];

const Formal = () => {
  const navigate = useNavigate();

  const handleViewProduct = (look) => {
    navigate(`/formal/${look.id}`);
  };

  return (
    <section id="formal" className="products">
      <h1 className="products-header">Formal Collection</h1>
      <div className="products-grid">
        {formalLooks.map((look) => (
          <div className="product-card" key={look.id}>
            <div className="product-media-wrapper">
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
                  onClick={() => handleViewProduct(look)}
                >
                  View Details
                </button>
              </div>
            </div>
            <div className="product-body">
              <h3 className="product-title">{look.title}</h3>
              <p className="product-subtitle">{look.price}</p>
              <p className="product-details">{look.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Formal;
