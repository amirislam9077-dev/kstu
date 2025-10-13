import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const heroCategories = [
  {
    title: 'Formal Dresses',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/Untitled_design_-_2024-03-20T142943.292.png?v=1710908989&width=720',
    path: '/formal'
  },
  {
    title: 'Bridal Dresses',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/DestinyChic_Formal_29_01_0311.jpg?v=1708439184&width=720',
    path: '/bridal'
  },
  {
    title: 'Hire Dresses',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/WR6-017_1_8b944173-d80d-4a8c-b7ef-48ffb27924f2.jpg?v=1708043991&width=720',
    path: '/hire'
  },
  {
    title: 'Custom Dresses',
    image:
      'https://www.destinychic.com.au/cdn/shop/files/Destiny_13_0081_f18781ae-1cf3-4a68-88dc-0addb536fd6a.jpg?v=1708481764&width=720',
    path: '/custom'
  }
];

const Hero5 = () => {
  const navigate = useNavigate();

  const handleCardClick = (category) => {
    if (category.path) {
      navigate(category.path);
    }
  };

  return (
    <section className="hero5-section">
      <a href="#contact" className="hero5-contact-btn">Contact Us</a>
      <div className="hero5-gallery">
        {heroCategories.map((category) => (
          <div
            className="hero5-card"
            key={category.title}
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(category)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleCardClick(category);
              }
            }}
          >
            <img src={category.image} alt={category.title} className="hero5-image" />
            <div className="hero5-label">{category.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero5;
