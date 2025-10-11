import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [pendingScroll, setPendingScroll] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    if (!pendingScroll) {
      return;
    }

    if (location.pathname === '/') {
      requestAnimationFrame(() => {
        if (pendingScroll === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const section = document.querySelector(`#${pendingScroll}`);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }
        setPendingScroll(null);
      });
    }
  }, [location.pathname, pendingScroll]);

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSectionNavigation = (sectionId) => {
    if (sectionId === 'formal' || sectionId === 'bridal' || sectionId === 'hire' || sectionId === 'custom') {
      const targetPath = `/${sectionId}`;
      if (location.pathname !== targetPath) {
        navigate(targetPath);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setPendingScroll(null);
      setMenuOpen(false);
      return;
    }

    if (location.pathname !== '/') {
      setPendingScroll(sectionId);
      navigate('/');
    } else {
      scrollToSection(sectionId);
    }
    setMenuOpen(false);
  };

  const handleSectionLinkClick = (event, sectionId) => {
    event.preventDefault();
    handleSectionNavigation(sectionId);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      setPendingScroll('top');
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <nav className={`luxury-header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-left">
          <button
            className={`menu-btn${menuOpen ? ' active' : ''}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <button className="search-btn" aria-label="Search">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="20" y1="20" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        <div className="header-center">
          <button type="button" className="nav-title" onClick={handleLogoClick}>
            Khurram Studio
          </button>
        </div>

        <div className="header-right">
          <button
            className="book-fitting-btn"
            onClick={() => handleSectionNavigation('midbar')}
          >
            BOOK A FITTING
          </button>
          <button
            className="about-btn"
            onClick={() => handleSectionNavigation('about')}
          >
            About Us
          </button>
          <button
            className="sign-in-btn"
            onClick={() => {
              navigate('/login');
              setMenuOpen(false);
            }}
          >
            Sign In
          </button>
          <button className="account-btn" aria-label="Account">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
            </svg>
          </button>
          <button
            className="cart-btn"
            aria-label="Cart"
            onClick={() => {
              navigate('/viewcart');
              setMenuOpen(false);
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 12.39c.08.37.31.7.63.92.32.21.71.32 1.09.29H19a1.5 1.5 0 0 0 1.47-1.16L22 6H6" />
            </svg>
          </button>
        </div>
      </div>
      <div className={`nav-flyout${menuOpen ? ' open' : ''}`}>
        <ul className="nav-flyout-list">
          <li>
            <a href="/formal" onClick={(event) => handleSectionLinkClick(event, 'formal')}>Formal</a>
          </li>
          <li>
            <a href="/bridal" onClick={(event) => handleSectionLinkClick(event, 'bridal')}>Bridal</a>
          </li>
          <li>
            <a href="/hire" onClick={(event) => handleSectionLinkClick(event, 'hire')}>Hire</a>
          </li>
          <li>
            <a href="/custom" onClick={(event) => handleSectionLinkClick(event, 'custom')}>Custom</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
