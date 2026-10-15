import React from 'react';
import '../App.css';
import { ProductCard } from './product5';
import BackButton from './backbutton';

const sharedGalleryImages = [
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80'
];

export const formalLooks = [
  {
    id: 'radha',
    title: 'Radhaaa',
    description: 'Stunning embellished formal wear with luxurious sequin work.',
    image:
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-39-A.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-39-B.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-39-A.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-39-B.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-39-C.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-39-D.jpg?width=800'
    ],
    price: 'Rs.462,000',
    availability: 'In stock',
    sku: 'FORMAL-RADHA',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'Stunning embellished formal wear with luxurious sequin work.',
      Color: 'Red',
      Fabric: 'Premium sequined fabric',
      Cut: 'Floor-length with structured bodice',
      Slip: 'Satin slip included',
      Dupatta: 'Not included',
      Trouser: 'Not applicable'
    }
  },
  {
    id: 'joona',
    title: 'Joona',
    description: 'Sophisticated formal attire with elegant design.',
    image:
      'https://www.mariab.pk/cdn/shop/files/DWW2582MehroonFront_A_2400x2400.jpg?v=1765284123&width=800',
    gallery: [
      'https://www.mariab.pk/cdn/shop/files/DWW2582MehroonFront_A_2400x2400.jpg?v=1765284123&width=800',
      ...sharedGalleryImages
    ],
    price: 'Rs.454,000',
    availability: 'In stock',
    sku: 'FORMAL-JOONA',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'Sophisticated formal attire with elegant design.',
      Color: 'Gold/Silver',
      Fabric: 'Luxurious embroidered fabric',
      Cut: 'Classic formal cut',
      Slip: 'Satin slip included',
      Dupatta: 'Not included',
      Trouser: 'Not applicable'
    }
  },
  {
    id: 'adaye',
    title: 'Adaye',
    description: 'Contemporary formal wear with modern styling.',
    image:
      'https://www.mariab.pk/cdn/shop/files/SFW2572BlackSide_C_2400x2400.jpg?v=1765283994&width=800',
    gallery: [
      'https://www.mariab.pk/cdn/shop/files/SFW2572BlackSide_C_2400x2400.jpg?v=1765283994&width=800',
      ...sharedGalleryImages
    ],
    price: 'Rs.420,000',
    availability: 'In stock',
    sku: 'FORMAL-ADAYE',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'Contemporary formal wear with modern styling.',
      Color: 'Scarlet',
      Fabric: 'Premium couture fabric',
      Cut: 'Modern silhouette',
      Slip: 'Satin slip included',
      Dupatta: 'Not included',
      Trouser: 'Not applicable'
    }
  },
  {
    id: 'seralyn',
    title: 'Seralyn',
    description: 'Pre-order. Metallic champagne couture gown with hand embroidery and sculpted bodice.',
    image:
      'https://www.mariab.pk/cdn/shop/files/DWW2531RustFront_A_2400x2400.jpg?v=1765284254&width=800',
    gallery: [
      'https://www.mariab.pk/cdn/shop/files/DWW2531RustFront_A_2400x2400.jpg?v=1765284254&width=800',
      ...sharedGalleryImages
    ],
    price: 'Rs.529,000',
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
      'https://www.mariab.pk/cdn/shop/files/SF_EA_24_19_Red_Front_2400x2400.jpg?v=1764857224&width=800',
    gallery: [
      'https://www.mariab.pk/cdn/shop/files/SF_EA_24_19_Red_Front_2400x2400.jpg?v=1764857224&width=800',
      ...sharedGalleryImages
    ],
    price: 'Rs.462,000',
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
      'https://www.mariab.pk/cdn/shop/files/MBS-W25-03-RedFront_A_2400x2400.jpg?v=1764758004&width=800',
    gallery: [
      'https://www.mariab.pk/cdn/shop/files/MBS-W25-03-RedFront_A_2400x2400.jpg?v=1764758004&width=800',
      ...sharedGalleryImages
    ],
    price: 'Rs.602,000',
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
      'https://www.mariab.pk/cdn/shop/files/SFW2530TealFront_A_2400x2400.jpg?v=1764757950&width=800',
    gallery: [
      'https://www.mariab.pk/cdn/shop/files/SFW2530TealFront_A_2400x2400.jpg?v=1764757950&width=800',
      ...sharedGalleryImages
    ],
    price: 'Rs.574,000',
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
    price: 'Rs.694,000',
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

const Formal = () => (
  <section id="sale" className="shop-grid-section collection-page">
    <BackButton />
    <h1 className="collection-page-title">Sale</h1>
    <p className="collection-page-count">{formalLooks.length} products</p>
    <div className="shop-grid">
      {formalLooks.map((look) => (
        <ProductCard key={look.id} product={look} basePath="/sale" />
      ))}
    </div>
  </section>
);

export default Formal;
