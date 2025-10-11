import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';

const Thanks = () => {
  const navigate = useNavigate();

  const navigateHome = React.useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <div className="thanks-page">
      <section className="thanks-hero">
        <div className="thanks-pill">Order Confirmed</div>
        <h1 className="thanks-title">Thank you for your order! 🙏</h1>
        <p className="thanks-subtitle">
          We truly appreciate your trust in us. Our manager will contact you as soon as possible to confirm the details and assist you further.
        </p>
      </section>

      <section className="thanks-content">
        <div className="thanks-card">
          <p className="thanks-message">
            If you have any questions or special requests, please feel free to message us anytime. We look forward to serving you and hope you’ll love your purchase!
          </p>
          <div className="thanks-actions">
            <button type="button" className="thanks-button thanks-button--primary" onClick={navigateHome}>
              Back to Home
            </button>
          </div>
        </div>
      </section>

      <div className="thanks-footer-spacer" />
      <Footer />
    </div>
  );
};

export default Thanks;
