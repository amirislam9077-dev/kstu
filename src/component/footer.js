import React from 'react';
import '../App.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer-section">
      <div className="footer-wrapper">
        <div className="footer-column footer-newsletter">
          <h3 className="footer-heading">Newsletter</h3>
          <p className="footer-description">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form className="footer-form">
            <label className="footer-input-label" htmlFor="newsletter-name">Name</label>
            <input id="newsletter-name" type="text" className="footer-input" placeholder="Name" />
            <label className="footer-input-label" htmlFor="newsletter-email">Email</label>
            <input id="newsletter-email" type="email" className="footer-input" placeholder="Email" />
            <button type="submit" className="footer-submit">Join</button>
          </form>
        </div>

        <div className="footer-column footer-links">
          <h3 className="footer-heading">Customer Service</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#custom-dresses">Custom Dresses</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#refund">Refund Policy</a></li>
            <li><a href="#searches">Popular Searches</a></li>
          </ul>
        </div>

        <div className="footer-column footer-hours">
          <h3 className="footer-heading">We Are Open</h3>
          <ul>
            <li>Monday: 10am-5pm</li>
            <li>Tuesday: 10am-5pm</li>
            <li>Wednesday: 10am-5pm</li>
            <li>Thursday: 10am-5pm</li>
            <li>Friday: 10am-5pm</li>
            <li>Saturday: 10am-5pm</li>
            <li>Sunday: CLOSED</li>
          </ul>
        </div>

        <div className="footer-column footer-social">
          <h3 className="footer-heading">Social</h3>
          <ul className="footer-social-list">
            <li><a href="https://www.instagram.com" aria-label="Instagram">Instagram</a></li>
            <li><a href="https://www.facebook.com" aria-label="Facebook">Facebook</a></li>
            <li><a href="https://www.tiktok.com" aria-label="TikTok">TikTok</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Destiny Chic. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
