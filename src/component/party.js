import { ProductCard } from './product5';
import '../App.css';
import BackButton from './backbutton';

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
  {
    id: 'dw-w26-48-black',
    title: '3 Piece Embroidered Linen Suit',
    description: 'Shirt Solid A-Line Shirt Round Neckline Finished With Fabric-Buttons Detailing Embroidered Border Finished with Fabric-Ball Drop Detailing Fitted Sleeves Finished With Embroidered Border & Fabric-Ball',
    image: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-48-Black-A.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-48-Black-B.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-48-Black-A.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-48-Black-B.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-48-Black-C.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-48-Black-D.jpg?width=800'
    ],
    price: 'Rs.26,990',
    availability: 'In Stock',
    sku: 'DWW2648-ESM-BLK',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    details: {
      Description: 'Shirt Solid A-Line Shirt Round Neckline Finished With Fabric-Buttons Detailing Embroidered Border Finished with Fabric-Ball Drop Detailing Fitted Sleeves Finished With Embroidered Border & Fabric-Ball',
      Occasion: 'Party, Festive',
      Category: 'Luxury Pret'
    },
  },
  {
    id: 'dw-w26-21-shocking-pink',
    title: '3 Piece Embroidered Dobby Linen Suit',
    description: 'Shirt Spray Embroidered Straight Shirt Embroidered Round Neckline Finished With Buttons Detailing Embroidered Border Embroidered Straight Sleeves Gotta-Ball Drop Hanging On Sleeves & Border Color: Sho',
    image: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-21-Maganta-A.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-21-Maganta-B.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-21-Maganta-A.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-21-Maganta-B.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-21-Maganta-C.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-21-Maganta-D.jpg?width=800'
    ],
    price: 'Rs.25,990',
    availability: 'In Stock',
    sku: 'DWW2621-ESM-SPK',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    details: {
      Description: 'Shirt Spray Embroidered Straight Shirt Embroidered Round Neckline Finished With Buttons Detailing Embroidered Border Embroidered Straight Sleeves Gotta-Ball Drop Hanging On Sleeves & Border Color: Sho',
      Occasion: 'Party, Festive',
      Category: 'Luxury Pret'
    },
  },
  {
    id: 'dw-w26-03-chocolate',
    title: '3 Piece Embroidered Dobby Linen Suit',
    description: 'Shirt Solid Straight Shirt Embroidered Round Neckline Finished With Buttons Detailing Embroidered Side Seams & Border Straight Sleeves Finished With Embroidered Border Gotta Ball Drop Detailing On Sle',
    image: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-03CHOCOLATE-A.jpg?width=800',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-03CHOCOLATE-B.jpg?width=800',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-03CHOCOLATE-A.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-03CHOCOLATE-B.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-03CHOCOLATE-C.jpg?width=800',
      'https://cdn.shopify.com/s/files/1/0620/8788/9062/files/DW-W26-03CHOCOLATE-D.jpg?width=800'
    ],
    price: 'Rs.23,990',
    availability: 'In Stock',
    sku: 'DWW2603-ESM-CHC',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    details: {
      Description: 'Shirt Solid Straight Shirt Embroidered Round Neckline Finished With Buttons Detailing Embroidered Side Seams & Border Straight Sleeves Finished With Embroidered Border Gotta Ball Drop Detailing On Sle',
      Occasion: 'Party, Festive',
      Category: 'Luxury Pret'
    },
  },
];

const Party = () => (
  <section id="party" className="shop-grid-section collection-page">
    <BackButton />
    <h1 className="collection-page-title">Party Wear</h1>
    <p className="collection-page-count">{partyLooks.length} products</p>
    <div className="shop-grid">
      {partyLooks.map((look) => (
        <ProductCard key={look.id} product={look} basePath="/party" />
      ))}
    </div>
  </section>
);

export default Party;
