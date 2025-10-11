import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleViewProduct = (look) => {
    navigate(`/hire/${look.id}`);
  };

  return (
    <section id="hire" className="formal-section">
      <div className="formal-wrapper">
        <div className="formal-text">
          <p className="formal-eyebrow">Hire Collection</p>
        </div>

        <div className="formal-gallery">
          {hireLooks.map((look) => (
            <div className="formal-card" key={look.id}>
              <button
                type="button"
                className="formal-media"
                onClick={() => handleViewProduct(look)}
                aria-label={`View ${look.title}`}
              >
                <img src={look.image} alt={look.title} className="formal-image" />
                <div className="formal-card-overlay">
                  <h3>{look.title}</h3>
                  <p>{look.description}</p>
                </div>
              </button>
              <div className="formal-card-footer">
                <span className="formal-price">{look.price}</span>
                <button
                  className="formal-cart-btn"
                  type="button"
                  onClick={() => handleViewProduct(look)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hire;
