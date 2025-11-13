import React from 'react';

const sharedGalleryImages = [
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80'
];

export const product6Items = [
  {
    id: 'aurora',
    title: 'Aurora',
    description: 'Elegant design with premium fabric and sophisticated styling.',
    image:
      'https://www.deepakperwani.com/images/thumbs/0009486_drs1137.jpeg',
    gallery: [
      'https://www.deepakperwani.com/images/thumbs/0009486_drs1137.jpeg',
      ...sharedGalleryImages
    ],
    price: 'Rs.110,000',
    availability: 'In stock',
    sku: 'PRODUCT6-AURORA',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'Elegant design with premium fabric and sophisticated styling.',
      Color: 'Mixed tones',
      Fabric: 'Premium designer fabric',
      Cut: 'Designer cut with modern silhouette',
      Slip: 'Satin slip included',
      Dupatta: 'Optional matching dupatta',
      Trouser: 'Not applicable'
    }
  },
  {
    id: 'celestia',
    title: 'Celestia',
    description: 'Contemporary formal wear with exquisite detailing and luxurious finish.',
    image:
      'https://www.deepakperwani.com/images/thumbs/0008385_drs1100.jpeg',
    gallery: [
      'https://www.deepakperwani.com/images/thumbs/0008385_drs1100.jpeg',
      ...sharedGalleryImages
    ],
    price: 'Rs.86,500',
    availability: 'In stock',
    sku: 'PRODUCT6-CELESTIA',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'Contemporary formal wear with exquisite detailing and luxurious finish.',
      Color: 'Designer blend',
      Fabric: 'Luxurious embroidered fabric',
      Cut: 'Contemporary formal cut',
      Slip: 'Satin slip included',
      Dupatta: 'Not included',
      Trouser: 'Not applicable'
    }
  },
  {
    id: 'lunara',
    title: 'Lunara',
    description: 'Modern formal attire with elegant embellishments and refined craftsmanship.',
    image:
      'https://www.deepakperwani.com/images/thumbs/0008431_drs1112.jpeg',
    gallery: [
      'https://www.deepakperwani.com/images/thumbs/0008431_drs1112.jpeg',
      ...sharedGalleryImages
    ],
    price: 'Rs.58,750',
    availability: 'In stock',
    sku: 'PRODUCT6-LUNARA',
    sizes: ['XS/S', 'S/M', 'M/L'],
    details: {
      Description: 'Modern formal attire with elegant embellishments and refined craftsmanship.',
      Color: 'Designer selection',
      Fabric: 'Premium couture fabric',
      Cut: 'Modern designer cut',
      Slip: 'Satin slip included',
      Dupatta: 'Not included',
      Trouser: 'Not applicable'
    }
  }
];
