import React from 'react';
import SignIn from './sign';
import logoImage from '../logo.svg';

function Header({ onContactClick, onAboutClick, onOffPlanClick, onValuationClick, onCeoClick, onHomeClick }) {
  return (
    <nav className="site-header">
      <div className="nav-rail nav-left">
        <button className="nav-link about-btn" onClick={onHomeClick}>Home</button>
        <button className="nav-link about-btn" onClick={onOffPlanClick}>Off Plan Projects</button>
        <button className="nav-link about-btn" onClick={onCeoClick}>CEO</button>
        <button className="nav-link about-btn" onClick={onAboutClick}>About us</button>
        <button className="nav-link contact-btn" onClick={onContactClick}>Contact us</button>
      </div>

      <div className="nav-logo" aria-label="ADNAN JILANI" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
        <img
          src={logoImage}
          alt="ADNAN JILANI"
          className="logo-image"
        />
      </div>

      <div className="nav-rail nav-right">
        <button className="nav-link about-btn" onClick={onValuationClick}>Property Valuation</button>
        <SignIn />
        <button className="nav-link cta">Request a Call</button>
      </div>
    </nav>
  );
}

export default Header;