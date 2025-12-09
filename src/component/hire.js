import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export const hireLooks = [
  {
    id: 'lumina-sequin',
    title: 'Lumina Sequin Gown',
    description: 'Floor-length champagne sequin gown with adjustable corset back.',
    image:
      'https://www.panacheapparels.com/cdn/shop/files/DSF1024.jpg?v=1740573017&width=1800',
    price: '$320 hire',
    availability: 'Hire for 4 days',
    sku: 'HIRE-LUMINA',
    sizes: ['6', '8', '10', '12'],
    details: {
      Description: 'Champagne sequin gown with structured bodice and sweeping hem.',
      Length: 'Full length',
      Fit: 'Adjustable corset back',
      Cleaning: 'Professional dry clean included'
    }
  },
  {
    id: 'noir-tuxedo',
    title: 'Noir Velvet Tuxedo',
    description: 'Tailored black velvet tuxedo with satin lapels and matching trousers.',
    image:
      'https://www.mariab.pk/cdn/shop/files/D-1BFront_A_f109f62e-8c01-4e4c-ae68-19e6a535aed0_2400x2400.jpg?v=1764229231',
    price: '$280 hire',
    availability: 'Hire for 3 days',
    sku: 'HIRE-NOIR-TUX',
    sizes: ['S', 'M', 'L', 'XL'],
    details: {
      Description: 'Single-breasted velvet tuxedo with satin lapel detail.',
      Fit: 'Slim tailoring',
      Accessories: 'Includes satin bow tie',
      Cleaning: 'Dry clean after return'
    }
  },
  {
    id: 'scarlet-cape',
    title: 'Scarlet Cape Dress',
    description: 'Statement red crepe dress with detachable cape overlay.',
    image:
      'https://www.panacheapparels.com/cdn/shop/files/46_b3d55b30-0e19-4972-9f85-5f7d5cfc9df0.jpg?v=1740572835&width=1800',
    price: '$250 hire',
    availability: 'Hire for 4 days',
    sku: 'HIRE-SCARLET-CAPE',
    sizes: ['8', '10', '12'],
    details: {
      Description: 'Bold red crepe silhouette featuring structured cape.',
      Length: 'Midi length',
      Fit: 'Fitted bodice with cape overlay',
      Cleaning: 'Complimentary press included'
    }
  },
  {
    id: 'opal-ensemble',
    title: 'Opal Beaded Ensemble',
    description: 'Ivory beaded top with flowing skirt for engagement shoots or receptions.',
    image:
      'https://www.panacheapparels.com/cdn/shop/files/18_46e5c080-e561-423c-83e9-4407d99b8ecb.jpg?v=1740572879&width=1800',
    price: '$300 hire',
    availability: 'Hire for 5 days',
    sku: 'HIRE-OPAL',
    sizes: ['S', 'M', 'L'],
    details: {
      Description: 'Two-piece beaded ensemble with soft chiffon skirt.',
      Fit: 'Relaxed fit skirt, adjustable top',
      Accessories: 'Includes belt and garment bag',
      Cleaning: 'Specialist clean provided'
    }
  },
  {
    id: 'azure-suit',
    title: 'Azure Dinner Suit',
    description: 'Modern blue dinner suit with tonal waistcoat and pocket square.',
    image:
      'https://www.mariab.pk/cdn/shop/files/D-1AFront_A_86263b23-42c8-4653-9760-a7c782a1cac3_2400x2400.jpg?v=1764229120',
    price: '$260 hire',
    availability: 'Hire for 3 days',
    sku: 'HIRE-AZURE',
    sizes: ['38', '40', '42', '44'],
    details: {
      Description: 'Three-piece dinner suit crafted in mid-weight wool.',
      Fit: 'Tailored fit',
      Accessories: 'Pocket square and cufflinks included',
      Cleaning: 'Dry-clean before handover'
    }
  }
];

const Hire = () => {
  const navigate = useNavigate();

  const handleViewProduct = (productId) => {
    navigate(`/hire/${productId}`);
  };

  return (
    <section id="hire" className="products">
      <h1 className="products-header">Hire Collection</h1>
      <div className="products-grid">
        {hireLooks.map((look) => (
          <div className="product-card" key={look.id}>
            <div className="product-media-wrapper" onClick={() => handleViewProduct(look.id)} style={{ cursor: 'pointer' }}>
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
                  Add to Cart
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

export default Hire;
