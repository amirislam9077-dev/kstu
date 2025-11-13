import React from 'react';

const sharedGalleryImages = [
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80'
];

export const product5Items = [
  {
    id: 'shehrzad',
    title: 'Shehrzad',
    description: 'Exquisite formal wear with elegant embellishments and premium craftsmanship.',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/DestinyChic_Formal_29_01_0302.jpg?v=1708439188&width=720',
    gallery: [
      'https://www.destinychic.com.au/cdn/shop/files/DestinyChic_Formal_29_01_0302.jpg?v=1708439188&width=720',
      ...sharedGalleryImages
    ],
    price: 'Rs.311,000',
    availability: 'In stock',
    sku: 'PRODUCT5-SHEHRZAD',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'Exquisite formal wear with elegant embellishments and premium craftsmanship.',
      Color: 'Red',
      Fabric: 'Premium embroidered fabric',
      Cut: 'Tailored formal cut',
      Slip: 'Satin slip included',
      Dupatta: 'Optional matching dupatta',
      Trouser: 'Not applicable'
    }
  },
  {
    id: 'joona-product5',
    title: 'Joona',
    description: 'Sophisticated design with intricate detailing and luxurious fabric.',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/DestinyChic_Formal_29_01_0178.jpg?v=1708430720&width=720',
    gallery: [
      'https://www.destinychic.com.au/cdn/shop/files/DestinyChic_Formal_29_01_0178.jpg?v=1708430720&width=720',
      ...sharedGalleryImages
    ],
    price: 'Rs.90,000.00',
    availability: 'In stock',
    sku: 'PRODUCT5-JOONA',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'Sophisticated design with intricate detailing and luxurious fabric.',
      Color: 'Gold/Silver',
      Fabric: 'Luxurious embroidered fabric',
      Cut: 'Classic formal cut',
      Slip: 'Satin slip included',
      Dupatta: 'Not included',
      Trouser: 'Not applicable'
    }
  },
  {
    id: 'adaye-product5',
    title: 'Adaye',
    description: 'Contemporary formal wear with modern styling and elegant finish.',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/Screenshot2025-05-20at2.04.56PM.png?v=1747714024&width=720',
    gallery: [
      'https://www.destinychic.com.au/cdn/shop/files/Screenshot2025-05-20at2.04.56PM.png?v=1747714024&width=720',
      ...sharedGalleryImages
    ],
    price: 'Rs.72,000',
    availability: 'In stock',
    sku: 'PRODUCT5-ADAYE',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'Contemporary formal wear with modern styling and elegant finish.',
      Color: 'Scarlet',
      Fabric: 'Premium couture fabric',
      Cut: 'Modern silhouette',
      Slip: 'Satin slip included',
      Dupatta: 'Not included',
      Trouser: 'Not applicable'
    }
  }
];
