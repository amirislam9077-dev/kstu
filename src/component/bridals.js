import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const sharedGalleryImages = [
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80'
];

export const bridalLooks = [
  {
    id: 'evangeline',
    title: 'Evangeline',
    description: 'Bridal couture gown featuring hand-beaded lace bodice and cascading tulle skirt.',
    image:
      'https://www.mariab.pk/cdn/shop/files/D-9AFront_A_71a7de19-867b-4b0b-ad62-9cd5297154a9_2400x2400.jpg?v=1764230410',
    gallery: [
      'https://www.mariab.pk/cdn/shop/files/D-9AFront_A_71a7de19-867b-4b0b-ad62-9cd5297154a9_2400x2400.jpg?v=1764230410',
      ...sharedGalleryImages
    ],
    price: 'Rs.685,000',
    availability: 'Made to order',
    sku: 'BRIDAL-EVANGELINE',
    sizes: ['XS', 'S', 'M', 'L'],
    details: {
      Description: 'Hand-beaded lace bodice with illusion neckline and layered tulle train.',
      Color: 'Champagne',
      Fabric: 'French lace with silk organza',
      Cut: 'Ball gown with cathedral train',
      Veil: 'Cathedral veil included',
      Accessories: 'Crystal belt included'
    }
  },
  {
    id: 'melody',
    title: 'Melody',
    description: 'Minimalist satin column gown with pearl button back detailing.',
    image:
      'https://www.mariab.pk/cdn/shop/files/D-8BFront_A_1aa4233c-0883-4837-ac68-05ae5fe34bf2_2400x2400.jpg?v=1764230355',
    gallery: [
      'https://www.mariab.pk/cdn/shop/files/D-8BFront_A_1aa4233c-0883-4837-ac68-05ae5fe34bf2_2400x2400.jpg?v=1764230355',
      ...sharedGalleryImages
    ],
    price: 'Rs.554,000',
    availability: 'In stock',
    sku: 'BRIDAL-MELODY',
    sizes: ['XS', 'S', 'M'],
    details: {
      Description: 'Crepe satin gown with clean lines and structured corsetry.',
      Color: 'Ivory',
      Fabric: 'Heavyweight satin',
      Cut: 'Column silhouette',
      Veil: 'Optional chapel veil',
      Accessories: 'Pearl buttons and detachable overskirt'
    }
  },
  {
    id: 'odessa',
    title: 'Odessa',
    description: 'Romantic off-the-shoulder gown with floral appliqué and soft shimmer.',
    image:
      'https://www.mariab.pk/cdn/shop/files/D-9BFront_A_d96ff5a0-50ef-48ac-9db2-1efd905b1e1d_2400x2400.jpg?v=1764230477',
    gallery: [
      'https://www.mariab.pk/cdn/shop/files/D-9BFront_A_d96ff5a0-50ef-48ac-9db2-1efd905b1e1d_2400x2400.jpg?v=1764230477',
      ...sharedGalleryImages
    ],
    price: 'Rs.630,000',
    availability: 'Limited availability',
    sku: 'BRIDAL-ODESSA',
    sizes: ['S', 'M', 'L'],
    details: {
      Description: 'Off-the-shoulder bodice with hand-applied floral appliqué.',
      Color: 'Soft Blush',
      Fabric: 'Organza over soft tulle',
      Cut: 'A-line silhouette',
      Veil: 'Matching floral veil',
      Accessories: 'Detachable sleeves included'
    }
  },
  {
    id: 'celestine',
    title: 'Celestine',
    description: 'Illusion neckline gown with layered organza and hand-beaded bodice.',
    image:
      'https://www.mariab.pk/cdn/shop/files/D-10AFront_A_92b97791-08cf-49a9-8802-88adced7acac_2400x2400.jpg?v=1764230585',
    gallery: [
      'https://www.mariab.pk/cdn/shop/files/D-10AFront_A_92b97791-08cf-49a9-8802-88adced7acac_2400x2400.jpg?v=1764230585',
      ...sharedGalleryImages
    ],
    price: 'Rs.644,000',
    availability: 'Pre-order, ships in 5 weeks',
    sku: 'BRIDAL-CELESTINE',
    sizes: ['XS', 'S', 'M', 'L'],
    details: {
      Description: 'Illusion neckline with hand-beaded bodice and cascading organza skirt.',
      Color: 'Ivory',
      Fabric: 'Organza with crystal beadwork',
      Cut: 'Layered A-line',
      Veil: 'Organza veil included',
      Accessories: 'Hand-beaded belt'
    }
  },
  {
    id: 'aurielle',
    title: 'Aurielle',
    description: 'Sequined corset gown with detachable overskirt designed for dramatic aisles.',
    image:
      'https://www.mariab.pk/cdn/shop/files/D-10BFront_A_40a42f00-92ba-4df6-bb5f-a09180685421_2400x2400.jpg?v=1764230651',
    gallery: [
      'https://www.mariab.pk/cdn/shop/files/D-10BFront_A_40a42f00-92ba-4df6-bb5f-a09180685421_2400x2400.jpg?v=1764230651',
      ...sharedGalleryImages
    ],
    price: 'Rs.728,000',
    availability: 'Made to order',
    sku: 'BRIDAL-AURIELLE',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    details: {
      Description: 'Corseted bodice with full overskirt and shimmering beadwork.',
      Color: 'Champagne',
      Fabric: 'Sequined mesh over silk lining',
      Cut: 'Mermaid silhouette with detachable overskirt',
      Veil: 'Matching beaded veil available',
      Accessories: 'Optional cape'
    }
  },
  {
    id: 'seraphina',
    title: 'Seraphina',
    description: 'Elegant bridal gown with intricate embellishments and timeless silhouette.',
    image:
      'https://www.mariab.pk/cdn/shop/files/D-4Front_A_000e1a04-8902-4660-8063-48d468ed0579_2400x2400.jpg?v=1762857821',
    gallery: [
      'https://www.mariab.pk/cdn/shop/files/D-4Front_A_000e1a04-8902-4660-8063-48d468ed0579_2400x2400.jpg?v=1762857821',
      ...sharedGalleryImages
    ],
    price: 'Rs.770,000',
    availability: 'Made to order',
    sku: 'BRIDAL-SERAPHINA',
    sizes: ['XS', 'S', 'M', 'L'],
    details: {
      Description: 'Exquisite bridal gown with hand-embroidered details and flowing train.',
      Color: 'Ivory',
      Fabric: 'Silk with intricate embellishments',
      Cut: 'Classic A-line silhouette',
      Veil: 'Embellished cathedral veil included',
      Accessories: 'Matching jewelry set'
    }
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
              <p className="product-subtitle">{look.price}</p>
              <p className="product-details">{look.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Bridal;
