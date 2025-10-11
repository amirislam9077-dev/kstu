import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const midCategories = [
  { label: 'Formal', type: 'route', value: '/formal' },
  { label: 'Bridal', type: 'route', value: '/bridal' },
  { label: 'Hire', type: 'route', value: '/hire' },
  { label: 'Custom', type: 'route', value: '/custom' }
];

const Midbar = () => {
  const navigate = useNavigate();

  const handleClick = (event, item) => {
    event.preventDefault();

    if (item.type === 'route') {
      navigate(item.value);
      return;
    }

    const target = document.querySelector(item.value);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="midbar" className="midbar-section">
      <div className="midbar-inner">
        <h2 className="midbar-heading">Destiny Chic</h2>
        <p className="midbar-description">
          As Brisbane and Australia&apos;s leading custom-made dress boutique specialising in formal and bridal dresses,
          we offer an unparalleled selection available for purchase or hire. In addition, we provide the option for
          customised dresses, ensuring a truly unique and personalised garment to suit your preferences.
        </p>
        <h3 className="midbar-subheading">Dress Boutique in Brisbane</h3>
        <div className="midbar-actions">
          {midCategories.map((item) => (
            <a
              key={item.label}
              href={item.value}
              className="midbar-button"
              onClick={(event) => handleClick(event, item)}
            >
              {item.label}
            </a>
          ))}
        </div>
        <a href="#read-more" className="midbar-readmore">Read More</a>
      </div>
    </section>
  );
};

export default Midbar;
