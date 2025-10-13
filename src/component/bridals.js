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
      'https://images.pexels.com/photos/3617553/pexels-photo-3617553.jpeg?auto=compress&cs=tinysrgb&w=900',
    gallery: [
      'https://images.pexels.com/photos/3617553/pexels-photo-3617553.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ...sharedGalleryImages
    ],
    price: '$2,450',
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
      'https://images.pexels.com/photos/949225/pexels-photo-949225.jpeg?auto=compress&cs=tinysrgb&w=900',
    gallery: [
      'https://images.pexels.com/photos/949225/pexels-photo-949225.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ...sharedGalleryImages
    ],
    price: '$1,980',
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
      'https://images.pexels.com/photos/3014858/pexels-photo-3014858.jpeg?auto=compress&cs=tinysrgb&w=900',
    gallery: [
      'https://images.pexels.com/photos/3014858/pexels-photo-3014858.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ...sharedGalleryImages
    ],
    price: '$2,250',
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
      'https://images.pexels.com/photos/949224/pexels-photo-949224.jpeg?auto=compress&cs=tinysrgb&w=900',
    gallery: [
      'https://images.pexels.com/photos/949224/pexels-photo-949224.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ...sharedGalleryImages
    ],
    price: '$2,300',
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
      'https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?auto=compress&cs=tinysrgb&w=900',
    gallery: [
      'https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ...sharedGalleryImages
    ],
    price: '$2,600',
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
  }
];

const Bridal = () => {
  const navigate = useNavigate();

  const handleViewProduct = (look) => {
    navigate(`/bridal/${look.id}`);
  };

  return (
    <section id="bridal" className="products">
      <h1 className="products-header">Bridal Collection</h1>
      <div className="products-grid">
        {bridalLooks.map((look) => (
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

export default Bridal;
