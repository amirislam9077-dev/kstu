import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

const MOBILE_LINKS = [
  ['new-arrival', 'New Arrival'],
  ['sale', 'Sale'],
  ['formal', 'Formal'],
  ['bridal', 'Bridal'],
  ['wedding-formal', 'Wedding Formal'],
  ['ready-to-wear', 'Ready to Wear'],
  ['unstitched', 'Unstitched'],
  ['party', 'Party'],
  ['tiktok', 'TikTok']
];

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

    // Homepage sections don't scroll the window; they report the section shown instead.
    const handleSectionChange = (event) => {
      setScrolled(event.detail.index > 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('fullpage:change', handleSectionChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('fullpage:change', handleSectionChange);
    };
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
          window.dispatchEvent(new CustomEvent('fullpage:goto', { detail: { index: 0 } }));
        } else {
          window.dispatchEvent(new CustomEvent('fullpage:goto', { detail: { id: pendingScroll } }));
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
    window.dispatchEvent(new CustomEvent('fullpage:goto', { detail: { id: sectionId } }));
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSectionNavigation = (sectionId) => {
    if (['sale', 'formal', 'bridal', 'hire', 'custom', 'party', 'new-arrival', 'wedding-formal', 'ready-to-wear', 'unstitched', 'tiktok'].includes(sectionId)) {
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
      window.dispatchEvent(new CustomEvent('fullpage:goto', { detail: { index: 0 } }));
    }
    setMenuOpen(false);
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav className={`luxury-header${scrolled || !isHomePage ? ' scrolled' : ''}`}>
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
            type="button"
            className="about-btn"
            onClick={() => handleSectionNavigation('new-arrival')}
          >
            New Arrival
          </button>
          <button
            type="button"
            className="about-btn"
            onClick={() => handleSectionNavigation('sale')}
          >
            Sale
          </button>
          <button
            type="button"
            className="about-btn"
            onClick={() => handleSectionNavigation('formal')}
          >
            Formal
          </button>
          <button
            type="button"
            className="about-btn"
            onClick={() => handleSectionNavigation('bridal')}
          >
            Bridal
          </button>
          <button
            type="button"
            className="about-btn"
            onClick={() => handleSectionNavigation('wedding-formal')}
          >
            Wedding Formal
          </button>
          <button
            type="button"
            className="about-btn"
            onClick={() => handleSectionNavigation('ready-to-wear')}
          >
            Ready to Wear
          </button>
          <button
            type="button"
            className="about-btn"
            onClick={() => handleSectionNavigation('unstitched')}
          >
            Unstitched
          </button>
          <button
            type="button"
            className="about-btn"
            onClick={() => handleSectionNavigation('party')}
          >
            Party
          </button>
          <button
            type="button"
            className="about-btn"
            onClick={() => handleSectionNavigation('tiktok')}
          >
            TikTok
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
      {/* Phones: all menu links always visible in one row (swipe sideways for more) */}
      <div className="mobile-nav-strip">
        {MOBILE_LINKS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`mobile-nav-link${location.pathname === `/${id}` ? ' active' : ''}`}
            onClick={() => handleSectionNavigation(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={`nav-flyout${menuOpen ? ' open' : ''}`}>
        <ul className="nav-flyout-list">
          <li>
            <a href="/new-arrival" onClick={(event) => handleSectionLinkClick(event, 'new-arrival')}>New Arrival</a>
          </li>
          <li>
            <a href="/sale" onClick={(event) => handleSectionLinkClick(event, 'sale')}>Sale</a>
          </li>
          <li>
            <a href="/formal" onClick={(event) => handleSectionLinkClick(event, 'formal')}>Formal</a>
          </li>
          <li>
            <a href="/bridal" onClick={(event) => handleSectionLinkClick(event, 'bridal')}>Bridal</a>
          </li>
          <li>
            <a href="/wedding-formal" onClick={(event) => handleSectionLinkClick(event, 'wedding-formal')}>Wedding Formal</a>
          </li>
          <li>
            <a href="/ready-to-wear" onClick={(event) => handleSectionLinkClick(event, 'ready-to-wear')}>Ready to Wear</a>
          </li>
          <li>
            <a href="/unstitched" onClick={(event) => handleSectionLinkClick(event, 'unstitched')}>Unstitched</a>
          </li>
          <li>
            <a href="/party" onClick={(event) => handleSectionLinkClick(event, 'party')}>Party</a>
          </li>
          <li>
            <a href="/tiktok" onClick={(event) => handleSectionLinkClick(event, 'tiktok')}>TikTok</a>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                navigate('/login');
                setMenuOpen(false);
              }}
            >
              Sign In
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                navigate('/viewcart');
                setMenuOpen(false);
              }}
            >
              View Cart
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
