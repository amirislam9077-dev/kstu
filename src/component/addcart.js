import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const AddCart = ({ items, subtotal, onClose, onIncrease, onDecrease, onRemove, onViewCart }) => {
  const navigate = useNavigate();
  const formatCurrency = (value) => `Rs.${value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const hasItems = items.length > 0;

  const handleContinueShopping = () => {
    if (typeof onClose === 'function') {
      onClose();
    }

    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="cart-overlay" role="dialog" aria-modal="true">
      <aside className="cart-panel">
        <header className="cart-panel-header">
          <div>
            <p className="cart-panel-count">{hasItems ? `${totalItems} item${totalItems > 1 ? 's' : ''}` : '0 items'}</p>
            <h2 className="cart-panel-title">Shopping Cart</h2>
          </div>
          <button type="button" className="cart-panel-close" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </header>

        {!hasItems ? (
          <div className="cart-panel-empty">
            <p className="cart-empty-text">Your cart is empty.</p>
            <button type="button" className="cart-panel-link" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-panel-body">
              {items.map((item) => {
                const lineKey = item.lineId || item.id;
                return (
                  <article className="cart-line" key={lineKey}>
                    <div className="cart-line-media">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="cart-line-content">
                      <h3 className="cart-line-title">{item.title}</h3>
                      <div className="cart-line-meta">
                        {item.size && <span className="cart-meta-pill">{item.size}</span>}
                        {item.sku && (
                          <span className="cart-meta-code" title="Product SKU">
                            {item.sku}
                          </span>
                        )}
                      </div>
                      <div className="cart-line-price">{formatCurrency(item.price)}</div>
                      <div className="cart-line-footer">
                        <div className="cart-qty-control">
                          <button
                            type="button"
                            onClick={() => onDecrease(lineKey)}
                            aria-label={`Decrease quantity of ${item.title}`}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onIncrease(lineKey)}
                            aria-label={`Increase quantity of ${item.title}`}
                          >
                            +
                          </button>
                        </div>
                        <div className="cart-line-total">{formatCurrency(item.price * item.quantity)}</div>
                        <button
                          type="button"
                          className="cart-line-remove"
                          onClick={() => onRemove(lineKey)}
                          aria-label={`Remove ${item.title}`}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <footer className="cart-panel-footer">
              <div className="cart-summary-row">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="cart-summary-row strong">
                <span>Total:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <p className="cart-tax-note">Tax included and shipping calculated at checkout</p>
              <button type="button" className="cart-checkout-btn" onClick={handleContinueShopping}>
                Continue Shopping
              </button>
              <button
                type="button"
                className="cart-panel-link"
                onClick={onViewCart || onClose}
              >
                View Cart
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
};

export default AddCart;
