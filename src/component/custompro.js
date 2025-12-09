import React, { useMemo } from 'react';
import emailjs from '@emailjs/browser';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import { customLooks } from './custom';
import AddCart from './addcart';
import {
  createLineId,
  readStoredCartItems,
  persistCartItems
} from '../utils/cartStorage';

const EMAILJS_SERVICE_ID = 'service_ugt6y8i';
const EMAILJS_TEMPLATE_ID = 'template_a6qs84b';
const EMAILJS_PUBLIC_KEY = 'xJQCed9Y7Bfq7u_hH';

const CustomInquiryForm = ({ product, selectedSize, onSizeChange, formRef, status, onSubmit }) => {
  const hasSizes = product.sizes && product.sizes.length > 0;

  return (
    <form
      className="formal-pro-form"
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      data-state={status.state}
    >
      <h3 className="formal-form-heading">Project Inquiry</h3>
      <p className="formal-form-subheading">
        Share your inspiration and our couture design team will respond within 24 hours.
      </p>

      <label className="formal-form-label">
        Full Name
        <input className="formal-form-input" type="text" name="name" placeholder="Enter your name" required />
      </label>

      <label className="formal-form-label">
        Email
        <input className="formal-form-input" type="email" name="email" placeholder="Enter your email" required />
      </label>

      <div className="formal-form-grid">
        <label className="formal-form-label">
          Preferred Fit / Size
          <select
            className="formal-form-input"
            name="size"
            value={selectedSize || ''}
            onChange={(event) => onSizeChange(event.target.value)}
            disabled={!hasSizes}
          >
            {!selectedSize && <option value="" disabled>Choose a preference</option>}
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <label className="formal-form-label">
          Event Date (optional)
          <input className="formal-form-input" type="date" name="eventDate" />
        </label>
      </div>

      <label className="formal-form-label">
        Project Notes
        <textarea
          className="formal-form-textarea"
          name="message"
          rows="4"
          placeholder="Tell us about the occasion, moodboard references, or fabric preferences"
          required
        />
      </label>

      {status.state !== 'idle' && (
        <div className={`formal-form-status formal-form-status--${status.state}`} role="alert">
          {status.message}
        </div>
      )}

      <button className="formal-form-submit" type="submit" disabled={status.state === 'loading'}>
        {status.state === 'loading' ? 'Sending…' : 'Submit Inquiry'}
      </button>
    </form>
  );
};

const CustomPro = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = useMemo(
    () => customLooks.find((item) => item.id === productId),
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
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [lensPosition, setLensPosition] = React.useState({ x: 0, y: 0 });
  const [zoomBackgroundPosition, setZoomBackgroundPosition] = React.useState('center');
  const [zoomBackgroundSize, setZoomBackgroundSize] = React.useState('220%');
  const imageRef = React.useRef(null);
  const imageElementRef = React.useRef(null);
  const [isCartOpen, setCartOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState(readStoredCartItems);
  const defaultSize = React.useMemo(() => {
    if (!product?.sizes || product.sizes.length === 0) {
      return '';
    }

    return product.sizes[0];
  }, [product]);
  const [selectedSize, setSelectedSize] = React.useState(defaultSize);
  const inquiryFormRef = React.useRef(null);
  const [inquiryStatus, setInquiryStatus] = React.useState({ state: 'idle', message: '' });

  const LENS_SIZE = 140;

  React.useEffect(() => {
    if (galleryImages.length > 0) {
      setActiveImage(galleryImages[0]);
    }
  }, [galleryImages]);

  React.useEffect(() => {
    setSelectedSize(defaultSize);
  }, [defaultSize]);

  const updateZoomScale = React.useCallback(() => {
    if (!imageRef.current || !imageElementRef.current) {
      return;
    }

    const container = imageRef.current;
    const imageEl = imageElementRef.current;
    const scaleX = (imageEl.naturalWidth / container.offsetWidth) * 100;
    const scaleY = (imageEl.naturalHeight / container.offsetHeight) * 100;

    if (Number.isFinite(scaleX) && Number.isFinite(scaleY) && scaleX > 0 && scaleY > 0) {
      setZoomBackgroundSize(`${scaleX}% ${scaleY}%`);
    } else {
      setZoomBackgroundSize('220%');
    }
  }, []);

  const handleImageLoad = React.useCallback(() => {
    updateZoomScale();
  }, [updateZoomScale]);

  const handleMouseMove = (event) => {
    if (!imageRef.current) {
      return;
    }

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const pointerX = event.clientX - left;
    const pointerY = event.clientY - top;
    let lensX = pointerX - LENS_SIZE / 2;
    let lensY = pointerY - LENS_SIZE / 2;

    const maxX = width - LENS_SIZE;
    const maxY = height - LENS_SIZE;
    lensX = Math.max(0, Math.min(lensX, maxX));
    lensY = Math.max(0, Math.min(lensY, maxY));

    setLensPosition({ x: lensX, y: lensY });

    const percentX = ((lensX + LENS_SIZE / 2) / width) * 100;
    const percentY = ((lensY + LENS_SIZE / 2) / height) * 100;
    setZoomBackgroundPosition(`${percentX}% ${percentY}%`);
  };

  React.useEffect(() => {
    handleImageLoad();
  }, [activeImage, handleImageLoad]);

  React.useEffect(() => {
    window.addEventListener('resize', updateZoomScale);
    return () => {
      window.removeEventListener('resize', updateZoomScale);
    };
  }, [updateZoomScale]);

  React.useEffect(() => {
    persistCartItems(cartItems);
  }, [cartItems]);

  const handleSubmitInquiry = React.useCallback(
    async (event) => {
      event.preventDefault();

      if (!inquiryFormRef.current || !product) {
        return;
      }

      const formData = new FormData(inquiryFormRef.current);
      const name = formData.get('name')?.toString().trim();
      const email = formData.get('email')?.toString().trim();
      const size = formData.get('size')?.toString() || selectedSize || 'Custom';
      const eventDate = formData.get('eventDate')?.toString().trim();
      const message = formData.get('message')?.toString().trim();

      if (!name || !email || !message) {
        setInquiryStatus({
          state: 'error',
          message: 'Please provide your name, email, and project notes before submitting.'
        });
        return;
      }

      const templateParams = {
        to_email: 'khurramstudio07@gmail.com',
        customer_name: name,
        customer_email: email,
        preferred_size: size,
        event_date: eventDate,
        project_notes: message,
        product_title: product.title,
        product_id: product.id,
        product_sku: product.sku,
        product_price: product.price,
        product_availability: product.availability,
        submitted_at: new Date().toISOString()
      };

      setInquiryStatus({ state: 'loading', message: 'Sending your inquiry…' });

      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
          publicKey: EMAILJS_PUBLIC_KEY
        });

        setInquiryStatus({
          state: 'success',
          message: 'Your inquiry has been sent. Our team will reach out within 24 hours.'
        });
        inquiryFormRef.current.reset();
        setSelectedSize(defaultSize);
      } catch (error) {
        setInquiryStatus({
          state: 'error',
          message:
            error?.text || 'Unable to send your inquiry at this time. Please try again or contact us directly.'
        });
      }
    },
    [defaultSize, product, selectedSize]
  );

  const handleOpenCart = () => {
    if (!product) {
      return;
    }

    const priceNumeric = Number(product.price.replace(/[^0-9.]/g, '')) || 0;
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
      collection: 'Custom'
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
          <p>The requested custom project could not be located.</p>
          <button className="formal-form-submit" type="button" onClick={() => navigate('/custom')}>
            Back to Collection
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="formal-pro-page">
      <button className="formal-pro-back" type="button" onClick={() => navigate(-1)}>
        ← Back to Custom Collection
      </button>

      <div className="formal-pro-content">
        <div className="formal-pro-gallery">
          <div
            className="formal-pro-main-image"
            ref={imageRef}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img src={activeImage} alt={product.title} ref={imageElementRef} onLoad={handleImageLoad} />
            {isZoomed && (
              <>
                <div
                  className="formal-zoom-lens"
                  style={{
                    width: LENS_SIZE,
                    height: LENS_SIZE,
                    transform: `translate(${lensPosition.x}px, ${lensPosition.y}px)`
                  }}
                />
                <div
                  className="formal-zoom-preview"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundPosition: zoomBackgroundPosition,
                    backgroundSize: zoomBackgroundSize
                  }}
                />
              </>
            )}
          </div>
          {galleryImages.length > 1 && (
            <div className="formal-pro-thumbnails">
              {galleryImages.map((imageUrl) => (
                <button
                  key={imageUrl}
                  type="button"
                  className={`formal-pro-thumb ${activeImage === imageUrl ? 'active' : ''}`}
                  onClick={() => setActiveImage(imageUrl)}
                  aria-label="View project image"
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
            <span>Customisation Options</span>
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
              View Portfolio
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
              Book Consultation
            </button>
          </div>

          <div className="formal-pro-sharing">
            <span className="formal-share-label">Share</span>
            <div className="formal-share-icons">
              <span>F</span>
              <span>I</span>
            </div>
          </div>

          <div className="formal-pro-details">
            <h2>Project Details</h2>
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
            <h3>Co-Creation Experience</h3>
            <p>
              Each bespoke project is a creative journey. Once we receive your inquiry, our design director will craft a
              concept board, curate luxury fabrics, and schedule your atelier visit.
            </p>
          </div>

          <CustomInquiryForm
            product={product}
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
            formRef={inquiryFormRef}
            status={inquiryStatus}
            onSubmit={handleSubmitInquiry}
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

export default CustomPro;
