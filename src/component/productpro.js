import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import { formalLooks } from './formal';
import AddCart from './addcart';
import ZoomImage from './zoomimage';
import {
  createLineId,
  readStoredCartItems,
  persistCartItems,
  parsePrice
} from '../utils/cartStorage';

const FormalInquiryForm = ({ product, selectedSize, onSizeChange }) => {
  const hasSizes = product.sizes && product.sizes.length > 0;

  return (
    <form className="formal-pro-form">
      <h3 className="formal-form-heading">Product Inquiry</h3>
      <p className="formal-form-subheading">
        Share your details and our couture specialist will reach out within 24 hours.
      </p>

      <label className="formal-form-label">
        Full Name
        <input className="formal-form-input" type="text" name="name" placeholder="Enter your name" />
      </label>

      <label className="formal-form-label">
        Email
        <input className="formal-form-input" type="email" name="email" placeholder="Enter your email" />
      </label>

      <div className="formal-form-grid">
        <label className="formal-form-label">
          Select Size
          <select
            className="formal-form-input"
            name="size"
            value={selectedSize || ''}
            onChange={(event) => onSizeChange(event.target.value)}
            disabled={!hasSizes}
          >
            {!selectedSize && <option value="" disabled>Choose a size</option>}
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <label className="formal-form-label">
          Quantity
          <input className="formal-form-input" type="number" name="quantity" min="1" defaultValue="1" />
        </label>
      </div>

      <label className="formal-form-label">
        Message
        <textarea
          className="formal-form-textarea"
          name="message"
          rows="4"
          placeholder="Share styling notes, preferred delivery dates, or custom requirements"
        />
      </label>

      <button className="formal-form-submit" type="submit">
        Submit Request
      </button>
    </form>
  );
};

const FormalPro = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = useMemo(
    () => formalLooks.find((item) => item.id === productId),
    [productId]
  );

  const galleryImages = React.useMemo(() => {
    if (!product) {
      return [];
    }

    if (product.gallery && product.gallery.length > 0) {
      return product.gallery.slice(0, 4);
    }

    return product.image ? [product.image] : [];
  }, [product]);

  const [activeImage, setActiveImage] = React.useState(() => galleryImages[0] || '');
  const [isCartOpen, setCartOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState(readStoredCartItems);
  const defaultSize = React.useMemo(() => {
    if (!product?.sizes || product.sizes.length === 0) {
      return '';
    }

    const priority = ['s/m', 'small', 's', 'sm'];
    for (const target of priority) {
      const pick = product.sizes.find((size) => size.toLowerCase() === target);
      if (pick) {
        return pick;
      }
    }

    const startsWithS = product.sizes.find((size) => size.toLowerCase().startsWith('s'));
    return startsWithS || product.sizes[0];
  }, [product]);
  const [selectedSize, setSelectedSize] = React.useState(defaultSize);

  React.useEffect(() => {
    if (galleryImages.length > 0) {
      setActiveImage(galleryImages[0]);
    }
  }, [galleryImages]);

  React.useEffect(() => {
    setSelectedSize(defaultSize);
  }, [defaultSize]);

  React.useEffect(() => {
    persistCartItems(cartItems);
  }, [cartItems]);

  const handleOpenCart = () => {
    if (!product) {
      return;
    }

    const priceNumeric = parsePrice(product.price);
    const sizeValue = selectedSize || product.sizes?.[0] || null;
    const lineId = createLineId(product.id, sizeValue);
    const itemPayload = {
      lineId,
      id: product.id,
      title: product.title,
      price: priceNumeric,
      quantity: 1,
      image: product.image,
      size: sizeValue,
      sku: product.sku,
      collection: 'Formal'
    };

    setCartItems((prev) => {
      const existing = prev.find((item) => item.lineId === lineId);
      if (existing) {
        return prev.map((item) =>
          item.lineId === lineId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, itemPayload];
    });

    setCartOpen(true);
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };

  const handleIncreaseQuantity = (lineId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.lineId === lineId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (lineId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.lineId === lineId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    );
  };

  const handleRemoveItem = (lineId) => {
    setCartItems((prev) => prev.filter((item) => item.lineId !== lineId));
  };

  const handleViewCart = () => {
    setCartOpen(false);

    if (typeof window === 'undefined') {
      return;
    }

    const targetUrl = `${window.location.origin}/viewcart`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const subtotal = React.useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );

  if (!product) {
    return (
      <section className="formal-pro-page">
        <div className="formal-pro-empty">
          <p>The requested formal design could not be located.</p>
          <button className="formal-form-submit" type="button" onClick={() => navigate('/formal')}>
            Back to Collection
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="formal-pro-page">
      <button className="formal-pro-back" type="button" onClick={() => navigate(-1)}>
        ← Back to Formal Collection
      </button>

      <div className="formal-pro-content">
        <div className="formal-pro-gallery">
          <ZoomImage src={activeImage} alt={product.title} />
          {galleryImages.length > 1 && (
            <div className="formal-pro-thumbnails">
              {galleryImages.map((imageUrl) => (
                <button
                  key={imageUrl}
                  type="button"
                  className={`formal-pro-thumb ${activeImage === imageUrl ? 'active' : ''}`}
                  onClick={() => setActiveImage(imageUrl)}
                  aria-label="View product image"
                >
                  <img src={imageUrl} alt={`${product.title} variation`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="formal-pro-info">
          <p className="formal-pro-availability">{product.availability}</p>
          <h1 className="formal-pro-title">{product.title}</h1>
          <p className="formal-pro-sku">SKU: {product.sku}</p>

          <div className="formal-pro-price">{product.price}</div>

          <div className="formal-pro-size-chart">
            <span>Sizes</span>
            <div className="formal-pro-size-options">
              {product.sizes.map((size) => {
                const isSelected = size === selectedSize;
                return (
                  <button
                    key={size}
                    type="button"
                    className={`formal-size-pill${isSelected ? ' selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={isSelected}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            <button type="button" className="formal-size-chart-btn">
              Size Chart
            </button>
          </div>

          <div className="formal-pro-cta">
            <div className="formal-pro-quantity">
              <button type="button" className="formal-qty-btn" aria-label="Decrease quantity">
                −
              </button>
              <span className="formal-qty-value">1</span>
              <button type="button" className="formal-qty-btn" aria-label="Increase quantity">
                +
              </button>
            </div>
            <button className="formal-primary-btn" type="button" onClick={handleOpenCart}>
              Add to Cart
            </button>
            <button className="formal-secondary-btn" type="button">
              Buy it now
            </button>
          </div>

          <div className="formal-pro-sharing">
            <span className="formal-share-label">Share</span>
            <div className="formal-share-icons">
              <span>F</span>
              <span>W</span>
            </div>
          </div>

          <div className="formal-pro-details">
            <h2>Product Details</h2>
            <dl>
              {Object.entries(product.details).map(([label, value]) => (
                <div className="formal-detail-row" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="formal-pro-message">
            <h3>Bespoke Styling Message</h3>
            <p>
              Each couture suit is handcrafted for a flawless fit. To personalise your order, submit the inquiry form
              below and our team will curate fabric swatches, accessory pairings, and delivery timelines curated just
              for you.
            </p>
          </div>

          <FormalInquiryForm
            product={product}
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
          />
        </div>
      </div>
      {isCartOpen && (
        <AddCart
          items={cartItems}
          subtotal={subtotal}
          onClose={handleCloseCart}
          onIncrease={handleIncreaseQuantity}
          onDecrease={handleDecreaseQuantity}
          onRemove={handleRemoveItem}
          onViewCart={handleViewCart}
        />
      )}
    </section>
  );
};

export default FormalPro;
