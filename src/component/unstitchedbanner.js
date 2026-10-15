import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

// Full-screen "Unstitched" banner (Sana Safinaz style); opens the Unstitched page.

const DESKTOP_IMAGE =
  'https://sanasafinaz.com/cdn/shop/files/Web_Banner_1920_x_1080_61d95178-bc1a-4d54-b497-3bb3a6e27140.jpg?v=1791536964&width=1920';
const MOBILE_IMAGE =
  'https://sanasafinaz.com/cdn/shop/files/Mobile_Banner_1080_x_1920_de6b8a5e-be47-4511-bb49-09309563b51f.jpg?v=1791536963&width=1080';

const UnstitchedBanner = () => (
  <section className="full-banner" aria-label="Unstitched collection">
    <Link to="/unstitched" className="full-banner-link" aria-label="Shop unstitched">
      <picture>
        <source media="(max-width: 749px)" srcSet={MOBILE_IMAGE} />
        <img src={DESKTOP_IMAGE} alt="Unstitched collection" className="full-banner-image" />
      </picture>
    </Link>
  </section>
);

export default UnstitchedBanner;
