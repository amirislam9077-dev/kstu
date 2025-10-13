import React from 'react';
import '../App.css';

export const hireLooks = [
  {
    id: 'lumina-sequin',
    title: 'Lumina Sequin Gown',
    description: 'Floor-length champagne sequin gown with adjustable corset back.',
    image:
      'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=900',
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
      'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=900',
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
      'https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&w=900',
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
      'https://images.pexels.com/photos/3014859/pexels-photo-3014859.jpeg?auto=compress&cs=tinysrgb&w=900',
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
      'https://images.pexels.com/photos/4288984/pexels-photo-4288984.jpeg?auto=compress&cs=tinysrgb&w=900',
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
  return (
    <section id="hire" className="products">
      <h1 className="products-header">Hire Collection</h1>
      <div className="products-grid">
        {hireLooks.map((look) => (
          <div className="product-card" key={look.id}>
            <div className="product-media-wrapper">
              <img
                src={look.image}
                alt={look.title}
                className="product-image"
                style={{ objectFit: 'contain' }}
              />
              <div className="product-actions">
                <button className="action-btn" type="button">
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
