import React from 'react';
import '../App.css';

const bridalLooks = [
  {
    title: 'Evangeline',
    description: 'Handcrafted lace bodice with sheer sleeves and cascading tulle skirt.',
    image:
      'https://images.pexels.com/photos/3617553/pexels-photo-3617553.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    title: 'Melody',
    description: 'Modern satin column gown featuring pearl button back detailing.',
    image:
      'https://images.pexels.com/photos/949225/pexels-photo-949225.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    title: 'Odessa',
    description: 'Romantic off-the-shoulder silhouette with delicate floral appliqué.',
    image:
      'https://images.pexels.com/photos/3014858/pexels-photo-3014858.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    title: 'Celestine',
    description: 'Illusion neckline and organza layers for a floating bridal moment.',
    image:
      'https://images.pexels.com/photos/949224/pexels-photo-949224.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    title: 'Aurielle',
    description: 'Sequined corset with structured overskirt designed for dramatic aisles.',
    image:
      'https://images.pexels.com/photos/256737/pexels-photo-256737.jpeg?auto=compress&cs=tinysrgb&w=900'
  }
];

const Bridal = () => {
  return (
    <section id="bridal" className="bridal-section">
      <div className="bridal-wrapper">
        <div className="bridal-text">
          <p className="bridal-eyebrow">Bridal Collection</p>
        </div>

        <div className="bridal-gallery">
          {bridalLooks.map((look) => (
            <div className="bridal-card" key={look.title}>
              <img src={look.image} alt={look.title} className="bridal-image" />
              <div className="bridal-card-overlay">
                <h3>{look.title}</h3>
                <p>{look.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bridal;
