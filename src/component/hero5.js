import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const heroCategories = [
  {
    title: 'Formal Dresses',
    image:
      'https://www.deepakperwani.com/images/thumbs/0013371_3217.jpeg',
    path: '/formal'
  },
  {
    title: 'Bridal Dresses',
    image:
      'https://www.deepakperwani.com/images/thumbs/0014282_3346.jpeg',
    path: '/bridal'
  },
  {
    title: 'WEDDING FORMALS',
    image:
      'https://www.deepakperwani.com/images/thumbs/0012337_3058.jpeg',
    path: '/hire'
  },
  {
    title: 'Ready to Wear',
    image:
      'https://www.mariab.pk/cdn/shop/files/RTW_Web_1124X1460_1bdd776b-faae-47e2-b597-7f97f0cd9c14.jpg?v=1789455466&width=1500',
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
