import React, { forwardRef } from 'react';
import heroMedia from '../picture/hero8.jpg';

const Hero2 = forwardRef((props, ref) => {
  return (
    <section className="hero" ref={ref}>
      <div className="hero-inner">
        <div className="hero-left">
          <h1 className="hero-title">33 Years of Trust, Experience & Excellence</h1>
          <p className="hero-copy">
            AJ Real Estate is Karachi's most trusted real estate partner with over three decades of proven expertise. We deliver exceptional opportunities in property sales, purchases, and investments.
            <br /><br />
            Our vision extends beyond transactions – we turn dreams into reality through residential plots, commercial spaces, and strategic investments tailored to modern market trends.
          </p>
          <div className="hero-features">
            <h3 className="features-title">Why Choose Us?</h3>
            <ul className="features-list">
              <li>✓ 33 years of successful experience</li>
              <li>✓ Strong partnerships with Karachi's top developers</li>
              <li>✓ Secure investment opportunities</li>
              <li>✓ Professional & transparent services</li>
            </ul>
          </div>
          <p className="hero-tagline">
            <strong>AJ Real Estate – Your Most Reliable Partner</strong>
          </p>
        </div>
        <div className="hero-right">
          <img src={heroMedia} alt="The Fridman Group" className="hero-media" />
        </div>
      </div>
    </section>
  );
});

Hero2.displayName = 'Hero2';

export default Hero2;


