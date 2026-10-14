import React from 'react';
import '../App.css';
import { ProductCard } from './product5';

export const formalLooks = [
  {
    id: 'radha',
    title: 'Radhaa',
    description: 'Elegant formal gown with intricate detailing.',
    image:
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SFW26-33SeaGreen-A.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SFW26-33SeaGreen-B.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SFW26-33SeaGreen-A.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SFW26-33SeaGreen-B.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SFW26-33SeaGreen-C.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SFW26-33SeaGreen-D.jpg?width=800'
    ],
    price: 'Rs.518,000',
    availability: 'In stock',
    sku: 'FORMAL-RADHA',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'An elegant formal gown with intricate detailing.',
      Color: 'Sea Green',
      Fabric: 'Premium sequined fabric',
      Cut: 'Floor-length with structured bodice',
      Slip: 'Satin slip included',
      Dupatta: 'Not included',
      Trouser: 'Not applicable'
    }
  },
  {
    id: 'joona',
    title: 'jona',
    description: 'Sophisticated formal attire with elegant design.',
    image:
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-24BLUE-A.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-24BLUE-B.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-24BLUE-A.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-24BLUE-B.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-24BLUE-C.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-24BLUE-D.jpg?width=800'
    ],
    price: 'Rs.462,000',
    availability: 'In stock',
    sku: 'FORMAL-JOONA',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'Sophisticated formal attire with elegant design.',
      Color: 'Blue',
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
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SFW26-06Green-A.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SFW26-06Green-B.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SFW26-06Green-A.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SFW26-06Green-B.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SFW26-06Green-C.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SFW26-06Green-D.jpg?width=800'
    ],
    price: 'Rs.294,000',
    availability: 'In stock',
    sku: 'FORMAL-ADAYE',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'Contemporary formal wear with modern styling.',
      Color: 'Green',
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
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-41-Teal-A.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-41-Teal-B.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-41-Teal-A.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-41-Teal-B.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-41-Teal-C.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-41-Teal-D.jpg?width=800'
    ],
    price: 'Rs.529,000',
    availability: 'In stock',
    sku: 'FORMAL-SERALYN',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'A tonal interplay of champagne hues with couture embroidery.',
      Color: 'Teal',
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
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-33-Pink-A.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-33-Pink-B.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-33-Pink-A.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-33-Pink-B.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-33-Pink-C.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-W26-33-Pink-D.jpg?width=800'
    ],
    price: 'Rs.462,000',
    availability: 'Pre-order, ships in 4 weeks',
    sku: 'FORMAL-KAYLANA',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'A blush-pink sequin fishtail gown with corseted bodice.',
      Color: 'Pink',
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
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-EF24-01R1-A.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-EF24-01R1-B.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-EF24-01R1-A.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-EF24-01R1-B.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-EF24-01R1-C.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/SF-EF24-01R1-D.jpg?width=800'
    ],
    price: 'Rs.602,000',
    availability: 'Limited availability',
    sku: 'FORMAL-ANTHEA-BLUE',
    sizes: ['S/M', 'M/L'],
    details: {
      Description: 'Ice-blue gown with crystal embellishment and detachable sleeves.',
      Color: 'Off White',
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
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/WhatsAppImage2026-10-02at6.45.44PM_3.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/WhatsAppImage2026-10-02at6.45.44PM.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/WhatsAppImage2026-10-02at6.45.44PM_3.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/WhatsAppImage2026-10-02at6.45.44PM.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/WhatsAppImage2026-10-02at6.45.44PM_5.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/WhatsAppImage2026-10-02at6.45.44PM_4.jpg?width=800'
    ],
    price: 'Rs.574,000',
    availability: 'In stock',
    sku: 'FORMAL-ANTHEA-SPLIT',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'Signature Anthea gown with thigh-high split for dramatic movement.',
      Color: 'Red',
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
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/WhatsAppImage2026-10-02at6.46.59PM.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/WhatsAppImage2026-10-02at6.46.59PM_1.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/WhatsAppImage2026-10-02at6.46.59PM.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/WhatsAppImage2026-10-02at6.46.59PM_1.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/WhatsAppImage2026-10-02at6.46.58PM.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/WhatsAppImage2026-10-02at6.46.59PM_2.jpg?width=800'
    ],
    price: 'Rs.694,000',
    availability: 'Made to order',
    sku: 'FORMAL-SCARLET-RADIANCE',
    sizes: ['XS/S', 'S/M', 'M/L', 'L/XL'],
    details: {
      Description: 'Hand-beaded scarlet gown with corseted bodice and dramatic train.',
      Color: 'Off White',
      Fabric: 'Sequined mesh with silk lining',
      Cut: 'Corseted bodice, mermaid skirt',
      Slip: 'Silk slip included',
      Dupatta: 'Optional matching cape',
      Trouser: 'Not applicable'
    }
  }
];

const Formal = () => (
  <section id="formal" className="shop-grid-section collection-page">
    <h1 className="collection-page-title">Formal</h1>
    <p className="collection-page-count">{formalLooks.length} products</p>
    <div className="shop-grid">
      {formalLooks.map((look) => (
        <ProductCard key={look.id} product={look} basePath="/formal" />
      ))}
    </div>
  </section>
);

export default Formal;
