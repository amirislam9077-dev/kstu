import React from 'react';
import './App.css';

const Header = () => {
  return (
    <header className="luxury-header">
      <div className="header-container">
        {/* Left side - Menu and Search */}
        <div className="header-left">
          <button className="menu-btn" aria-label="Menu">
            <svg width="26" height="20" viewBox="0 0 26 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="1" y1="1" x2="25" y2="1" />
              <line x1="1" y1="10" x2="25" y2="10" />
              <line x1="1" y1="19" x2="25" y2="19" />
            </svg>
          </button>
          <button className="search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Center - Logo */}
        <div className="header-center">
          <div className="logo">Khuram Studio</div>
        </div>

        {/* Right side - Book fitting, Account, Cart */}
        <div className="header-right">
          <button className="book-fitting-btn">BOOK A FITTING</button>
          <button className="account-btn" aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10ZM10 12.5C6.66667 12.5 0 14.1667 0 17.5V20H20V17.5C20 14.1667 13.3333 12.5 10 12.5Z" fill="white"/>
            </svg>
          </button>
          <button className="cart-btn" aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 18C7.55228 18 8 17.5523 8 17C8 16.4477 7.55228 16 7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18Z" fill="white"/>
              <path d="M17 18C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18Z" fill="white"/>
              <path d="M0 1H4L6.68 11.39C6.77144 11.8504 7.02191 12.264 7.38755 12.5583C7.75318 12.8526 8.2107 13.009 8.68 13H16.4C16.8693 13.009 17.3268 12.8526 17.6925 12.5583C18.0581 12.264 18.3086 11.8504 18.4 11.39L20 5H5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;