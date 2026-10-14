import { useNavigate } from 'react-router-dom';
import '../App.css';

export const partyLooks = [
  {
    id: 'glitter-mini',
    title: 'Glitter Mini Dress',
    description: 'Sparkling glitter mini dress perfect for night parties and events.',
    image: 'https://www.panacheapparels.com/cdn/shop/files/DSF1024.jpg?v=1740573017&width=1800',
    gallery: [
      'https://www.panacheapparels.com/cdn/shop/files/DSF1024.jpg?v=1740573017&width=1800',
      'https://www.panacheapparels.com/cdn/shop/files/46_b3d55b30-0e19-4972-9f85-5f7d5cfc9df0.jpg?v=1740572835&width=1800',
    ],
    price: 'Rs.12,500',
    availability: 'In Stock',
    sku: 'PARTY-GLITTER-MINI',
    sizes: ['S', 'M', 'L', 'XL'],
    details: {
      Description: 'All-over glitter fabric with bodycon silhouette.',
      Length: 'Mini',
      Occasion: 'Party, Night Out',
      Fabric: 'Glitter stretch knit',
    },
  },
  {
    id: 'sequin-slip',
    title: 'Sequin Slip Dress',
    description: 'Elegant sequin slip dress with adjustable spaghetti straps.',
    image: 'https://www.destinychic.com.au/cdn/shop/files/DestinyChic_Formal_29_01_0302.jpg?v=1708439188&width=720',
    gallery: [
      'https://www.destinychic.com.au/cdn/shop/files/DestinyChic_Formal_29_01_0302.jpg?v=1708439188&width=720',
      'https://www.destinychic.com.au/cdn/shop/files/DestinyChic_Formal_29_01_0178.jpg?v=1708430720&width=720',
    ],
    price: 'Rs.15,000',
    availability: 'In Stock',
    sku: 'PARTY-SEQUIN-SLIP',
    sizes: ['XS', 'S', 'M', 'L'],
    details: {
      Description: 'Full sequin coverage with V-neckline and open back.',
      Length: 'Midi',
      Occasion: 'Party, Formal Event',
      Fabric: 'Sequin on mesh lining',
    },
  },
  {
    id: 'velvet-wrap',
    title: 'Velvet Wrap Dress',
    description: 'Luxurious velvet wrap dress with tie waist and flared hem.',
    image: 'https://www.mariab.pk/cdn/shop/files/D-1BFront_A_f109f62e-8c01-4e4c-ae68-19e6a535aed0_2400x2400.jpg?v=1764229231',
    gallery: [
      'https://www.mariab.pk/cdn/shop/files/D-1BFront_A_f109f62e-8c01-4e4c-ae68-19e6a535aed0_2400x2400.jpg?v=1764229231',
    ],
    price: 'Rs.11,000',
    availability: 'In Stock',
    sku: 'PARTY-VELVET-WRAP',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    details: {
      Description: 'Deep jewel-tone velvet with surplice neckline.',
      Length: 'Knee length',
      Occasion: 'Party, Dinner',
      Fabric: 'Stretch velvet',
    },
  },
  {
    id: 'feather-trim',
    title: 'Feather Trim Gown',
    description: 'Dramatic floor-length gown with feather trim at the hem.',
    image: 'https://www.panacheapparels.com/cdn/shop/files/46_b3d55b30-0e19-4972-9f85-5f7d5cfc9df0.jpg?v=1740572835&width=1800',
    gallery: [
      'https://www.panacheapparels.com/cdn/shop/files/46_b3d55b30-0e19-4972-9f85-5f7d5cfc9df0.jpg?v=1740572835&width=1800',
    ],
    price: 'Rs.22,000',
    availability: 'In Stock',
    sku: 'PARTY-FEATHER-GOWN',
    sizes: ['S', 'M', 'L'],
    details: {
      Description: 'Satin gown with ostrich feather hem trim.',
      Length: 'Floor length',
      Occasion: 'Gala, Party',
      Fabric: 'Satin with feather trim',
    },
  },
  {
    id: 'azure-party',
    title: 'Azure Party Suit',
    description: 'Modern blue party suit with tonal waistcoat, perfect for celebrations.',
    image: 'https://www.mariab.pk/cdn/shop/files/D-1AFront_A_86263b23-42c8-4653-9760-a7c782a1cac3_2400x2400.jpg?v=1764229120',
    gallery: [
      'https://www.mariab.pk/cdn/shop/files/D-1AFront_A_86263b23-42c8-4653-9760-a7c782a1cac3_2400x2400.jpg?v=1764229120',
    ],
    price: 'Rs.18,000',
    availability: 'In Stock',
    sku: 'PARTY-AZURE-SUIT',
    sizes: ['S', 'M', 'L', 'XL'],
    details: {
      Description: 'Three-piece party suit in vibrant azure.',
      Fit: 'Tailored fit',
      Occasion: 'Party, Celebration',
      Fabric: 'Premium fabric',
    },
  },
];

const Party = () => {
  const navigate = useNavigate();

  const handleViewProduct = (productId) => {
    navigate(`/party/${productId}`);
  };

  return (
    <section id="party" className="products">
      <h1 className="products-header">Party Wear Collection</h1>
      <div className="products-grid">
        {partyLooks.map((look) => (
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

export default Party;
