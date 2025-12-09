import React from 'react';
import SignIn from './sign';
import logoImage from '../logo.svg';

function Header({ onAboutClick, onOffPlanClick, onValuationClick, onCeoClick, onHomeClick }) {
  return (
    <nav className="site-header">
      <div className="nav-rail nav-left">
        <button className="nav-link about-btn" onClick={onHomeClick}>Home</button>
        <button className="nav-link about-btn" onClick={onOffPlanClick}>Off Plan Projects</button>
        <button className="nav-link about-btn" onClick={onCeoClick}>CEO</button>
        <button className="nav-link about-btn" onClick={onAboutClick}>About us</button>
      </div>

      <div className="nav-logo" aria-label="ADNAN JILANI" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
        <img
          src={logoImage}
          alt="ADNAN JILANI"
          className="logo-image"
        />
      </div>

      <div className="nav-rail nav-right">
        <button className="nav-link about-btn">Sale</button>
        <button className="nav-link about-btn">Formal</button>
        <button className="nav-link about-btn">Bridal</button>
        <button className="nav-link about-btn">Hire</button>
        <button className="nav-link about-btn">Custom</button>
        <button className="nav-link about-btn" onClick={onValuationClick}>Property Valuation</button>
        <SignIn />
        <button className="nav-link cta">Request a Call</button>
      </div>
    </nav>
  );
}

export default Header;