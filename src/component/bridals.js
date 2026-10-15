import React from 'react';
import '../App.css';
import { ProductCard } from './product5';
import BackButton from './backbutton';

export const bridalLooks = [
  {
    id: 'evangeline',
    title: 'Evangeline',
    description: 'Bridal couture gown featuring hand-beaded lace bodice and cascading tulle skirt.',
    image:
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/FX-26V1-14-A.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/FX-26V1-14-B.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/FX-26V1-14-A.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/FX-26V1-14-B.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/FX-26V1-14-C.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/FX-26V1-14-D.jpg?width=800'
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
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/FX-26V1-10-A.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/FX-26V1-10-B.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/FX-26V1-10-A.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/FX-26V1-10-B.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/FX-26V1-10-C.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/FX-26V1-10-D.jpg?width=800'
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
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-07-A.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-07-B.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-07-A.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-07-B.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-07-C.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-07-D.jpg?width=800'
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
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-10-A.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-10-B.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-10-A.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-10-B.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-10-C.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-10-D.jpg?width=800'
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
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-03-A_cd272fc6-4e15-4d90-8b33-090f3276634a.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-03-B_107ca4c9-738d-4453-b4d7-fe5dd6c9c9d3.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-03-A_cd272fc6-4e15-4d90-8b33-090f3276634a.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-03-B_107ca4c9-738d-4453-b4d7-fe5dd6c9c9d3.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-03-D_e7ac7bab-d252-49de-8b72-085d76067c67.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-03-F_a52506a1-133f-45c8-8c88-832dce8a4cc2.jpg?width=800'
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
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-06-A_ed7bb65b-eb8a-49eb-bc56-a9cf0b16bf33.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-06-C_c051faeb-643a-4e49-b541-0fffa0a2cc2d.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-06-A_ed7bb65b-eb8a-49eb-bc56-a9cf0b16bf33.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-06-C_c051faeb-643a-4e49-b541-0fffa0a2cc2d.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-06-D_1339f6f9-739c-442c-a785-1c93911178bb.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/EX-26V1-06-E_a60bdfe7-02fb-4595-a217-90467f11d82d.jpg?width=800'
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
  },
  {
    id: 'fx-855',
    title: 'Chashmona',
    description: 'This dazzling multi-hued Lehega Set with twinkling works of signature gota patti hand embroidery along with intricate embellishments featuring sequins, kinari, diamntes and panni work over a vivid can',
    image: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/products/d-0_front_1.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/products/d-0_closeup_1.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/products/d-0_front_1.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/products/d-0_closeup_1.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/products/d-0_side_1.jpg?width=800'
    ],
    price: 'Rs.225,000',
    availability: 'Made to order',
    sku: 'FX-855',
    sizes: ['Made to measure'],
    details: {
      Description: 'This dazzling multi-hued Lehega Set with twinkling works of signature gota patti hand embroidery along with intricate embellishments featuring sequins, kinari, diamntes and panni work over a vivid can',
      Category: 'Wedding Formal'
    }
  },
  {
    id: 'fx-860',
    title: 'Harleen',
    description: 'Inspired by the magical sight of the forest, where the sunlight filters through the lush canopy of trees and lights up the woods with its incandescent gleam.',
    image: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/products/d-00_front.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/products/d-00_closeup.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/products/d-00_front.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/products/d-00_closeup.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/products/d-00_side.jpg?width=800'
    ],
    price: 'Rs.200,000',
    availability: 'Made to order',
    sku: 'FX-860',
    sizes: ['Made to measure'],
    details: {
      Description: 'Inspired by the magical sight of the forest, where the sunlight filters through the lush canopy of trees and lights up the woods with its incandescent gleam.',
      Category: 'Wedding Formal'
    }
  }
];

const Bridal = () => (
  <section id="bridal" className="shop-grid-section collection-page">
    <BackButton />
    <h1 className="collection-page-title">Bridal</h1>
    <p className="collection-page-count">{bridalLooks.length} products</p>
    <div className="shop-grid">
      {bridalLooks.map((look) => (
        <ProductCard key={look.id} product={look} basePath="/bridal" />
      ))}
    </div>
  </section>
);

export default Bridal;
