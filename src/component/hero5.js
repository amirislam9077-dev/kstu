import React from 'react';
import '../App.css';

const heroCategories = [
  {
    title: 'Wedding Dresses',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/Untitled_design_-_2024-03-20T142943.292.png?v=1710908989&width=720'
  },
  {
    title: 'Formal Dresses',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/DestinyChic_Formal_29_01_0311.jpg?v=1708439184&width=720'
  },
  {
    title: 'Custom Dresses',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/WR6-017_1_8b944173-d80d-4a8c-b7ef-48ffb27924f2.jpg?v=1708043991&width=720'
  },
  {
    title: 'Hire Dresses',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/Destiny_13_0081_f18781ae-1cf3-4a68-88dc-0addb536fd6a.jpg?v=1708481764&width=720'
  }
];

const Hero5 = () => {
  return (
    <section className="hero5-section">
      <a href="#contact" className="hero5-contact-btn">Contact Us</a>
      <div className="hero5-gallery">
        {heroCategories.map((category) => (
          <div className="hero5-card" key={category.title}>
            <img src={category.image} alt={category.title} className="hero5-image" />
            <div className="hero5-label">{category.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero5;
