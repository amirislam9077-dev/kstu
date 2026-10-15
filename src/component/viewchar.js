import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { CART_STORAGE_KEY, readStoredCartItems, persistCartItems } from '../utils/cartStorage';
import { BACKEND_URL } from '../utils/api';

// Phone photos are several MB: resize to at most 1600px and save as JPEG before sending
const shrinkImage = (file, maxSide = 1600, quality = 0.82) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Unreadable image'));
    };
    img.src = url;
  });

// Banks and mobile wallets in Pakistan for the deposit slip
const PAKISTAN_BANKS = [
  'Allied Bank (ABL)',
  'Askari Bank',
  'Bank Al Habib',
  'Bank Alfalah',
  'Bank Islami',
  'Bank of Khyber',
  'Bank of Punjab (BOP)',
  'Dubai Islamic Bank',
  'Faysal Bank',
  'First Women Bank',
  'Habib Bank (HBL)',
  'Habib Metropolitan Bank',
  'JS Bank',
  'MCB Bank',
  'MCB Islamic Bank',
  'Meezan Bank',
  'National Bank of Pakistan (NBP)',
  'Samba Bank',
  'Silkbank',
  'Sindh Bank',
  'Soneri Bank',
  'Standard Chartered',
  'Summit Bank',
  'United Bank (UBL)',
  'Al Baraka Bank',
  'Bank of Azad Jammu & Kashmir',
  'Zarai Taraqiati Bank (ZTBL)',
  'HBL Microfinance Bank',
  'Mobilink Microfinance Bank',
  'Telenor Microfinance Bank',
  'U Microfinance Bank',
  'Khushhali Microfinance Bank',
  'JazzCash',
  'Easypaisa',
  'SadaPay',
  'NayaPay',
  'Raast',
  'Other'
];

// Messages under each box when it's empty or wrong
const FIELD_MESSAGES = {
  email: 'Please enter your email.',
  emailInvalid: 'Please enter a valid email, e.g. name@gmail.com.',
  name: 'Please enter your name.',
  address: 'Please enter your address.',
  city: 'Please select your city.',
  phone: 'Please enter your phone number.',
  phoneInvalid: 'Enter 10 digits starting with 3, e.g. 3001234567.',
  depositSlip: 'Please attach your deposit slip picture.',
  referenceNo: 'Please enter the reference number.',
  bankName: 'Please select your bank.'
};

const COUNTRIES = [
  'Afghanistan',
  'Åland Islands',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antigua & Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Ascension Island',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia & Herzegovina',
  'Botswana',
  'Brazil',
  'British Indian Ocean Territory',
  'British Virgin Islands',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Caribbean Netherlands',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos (Keeling) Islands',
  'Colombia',
  'Comoros',
  'Congo - Brazzaville',
  'Congo - Kinshasa',
  'Cook Islands',
  'Costa Rica',
  'Croatia',
  'Curaçao',
  'Cyprus',
  'Czechia',
  'Côte d’Ivoire',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Falkland Islands',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French Southern Territories',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hong Kong SAR',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macao SAR',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar (Burma)',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Niue',
  'Norfolk Island',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palestinian Territories',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Pitcairn Islands',
  'Poland',
  'Portugal',
  'Qatar',
  'Réunion',
  'Romania',
  'Russia',
  'Rwanda',
  'Samoa',
  'San Marino',
  'São Tomé & Príncipe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Sint Maarten',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Georgia & South Sandwich Islands',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'St. Barthélemy',
  'St. Helena',
  'St. Kitts & Nevis',
  'St. Lucia',
  'St. Martin',
  'St. Pierre & Miquelon',
  'St. Vincent & Grenadines',
  'Sudan',
  'Suriname',
  'Svalbard & Jan Mayen',
  'Sweden',
  'Switzerland',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tokelau',
  'Tonga',
  'Trinidad & Tobago',
  'Tristan da Cunha',
  'Tunisia',
  'Türkiye',
  'Turkmenistan',
  'Turks & Caicos Islands',
  'Tuvalu',
  'US Outlying Islands',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Wallis & Futuna',
  'Western Sahara',
  'Yemen',
  'Zambia',
  'Zimbabwe'
];

const PAKISTAN_CITIES = [
  'Abbottabad',
  'Ahmedpur East',
  'Ahmadpur Sial',
  'Arifwala',
  'Attock',
  'Bahawalnagar',
  'Bahawalpur',
  'Bannu',
  'Basirpur',
  'Chakwal',
  'Chaman',
  'Charsadda',
  'Chichawatni',
  'Chiniot',
  'Chishtian',
  'Daska',
  'Dera Ghazi Khan',
  'Dera Ismail Khan',
  'Dina',
  'Faisalabad',
  'Gujranwala',
  'Gujrat',
  'Gwadar',
  'Hafizabad',
  'Haripur',
  'Hyderabad',
  'Islamabad',
  'Jacobabad',
  'Jaranwala',
  'Jhelum',
  'Kamalia',
  'Kāmoke',
  'Karachi',
  'Kasur',
  'Khairpur',
  'Khanewal',
  'Khanpur',
  'Khushab',
  'Kohat',
  'Kot Addu',
  'Lahore',
  'Larkana',
  'Layyah',
  'Lodhran',
  'Mandi Bahauddin',
  'Mardan',
  'Mirpur Khas',
  'Multan',
  'Muzaffargarh',
  'Narowal',
  'Nowshera',
  'Okara',
  'Peshawar',
  'Quetta',
  'Rahim Yar Khan',
  'Rawalpindi',
  'Sadiqabad',
  'Sahiwal',
  'Sargodha',
  'Sheikhupura',
  'Sialkot',
  'Sukkur',
  'Swabi',
  'Swat',
  'Tando Adam',
  'Taxila',
  'Toba Tek Singh',
  'Vehari',
  'Wah Cantonment'
];

const formatCurrency = (value) =>
  `Rs.${Number(value || 0).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

const useStoredCart = () => {
  const [items, setItems] = React.useState(() => readStoredCartItems());

  React.useEffect(() => {
    setItems(readStoredCartItems());
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleStorage = (event) => {
      if (!event.key || event.key === CART_STORAGE_KEY) {
        setItems(readStoredCartItems());
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const updateItems = React.useCallback((updater) => {
    setItems((prevItems) => {
      const nextItems = typeof updater === 'function' ? updater(prevItems) : updater;
      if (nextItems !== prevItems) {
        persistCartItems(nextItems);
      }
      return nextItems;
    });
  }, []);

  return [items, updateItems];
};

const ViewChar = () => {
  const [items, setItems] = useStoredCart();
  const subtotal = React.useMemo(
    () => items.reduce((total, item) => total + Number(item.price || 0) * (item.quantity || 0), 0),
    [items]
  );
  const formRef = React.useRef(null);
  const [sendStatus, setSendStatus] = React.useState({ state: 'idle', message: '' });
  const [depositSlip, setDepositSlip] = React.useState(null); // { name, dataUrl }
  const [slipError, setSlipError] = React.useState('');
  const [fieldErrors, setFieldErrors] = React.useState({});

  // Typing in a box clears that box's message
  const clearFieldError = (event) => {
    const { name } = event.target;
    if (name && fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };
  const inputClass = (name, base = 'viewchar-input') => `${base}${fieldErrors[name] ? ' viewchar-input--error' : ''}`;
  const fieldError = (name) => fieldErrors[name] && <span className="viewchar-field-error">{fieldErrors[name]}</span>;

  const handleSlipChange = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }
    setSlipError('');
    if (!file.type.startsWith('image/')) {
      setSlipError('Please choose a picture (JPG or PNG).');
      return;
    }
    try {
      setDepositSlip({ name: file.name, dataUrl: await shrinkImage(file) });
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.depositSlip;
        return next;
      });
    } catch (error) {
      setSlipError('This picture could not be read. Please try another one.');
    }
  };
  const backendBaseUrl = BACKEND_URL;
  const hasItems = items.length > 0;
  const navigate = useNavigate();

  const adjustItemQuantity = React.useCallback(
    (lineId, delta) => {
      setItems((prevItems) => {
        let changed = false;

        const nextItems = prevItems.map((item) => {
          const key = item.lineId || item.id;
          if (key !== lineId) {
            return item;
          }

          const currentQty = Number(item.quantity) || 1;
          const nextQty = Math.max(1, currentQty + delta);

          if (nextQty === currentQty) {
            return item;
          }

          changed = true;
          return { ...item, quantity: nextQty };
        });

        return changed ? nextItems : prevItems;
      });
    },
    [setItems]
  );

  const handleDecreaseQuantity = React.useCallback(
    (lineId) => {
      adjustItemQuantity(lineId, -1);
    },
    [adjustItemQuantity]
  );

  const handleIncreaseQuantity = React.useCallback(
    (lineId) => {
      adjustItemQuantity(lineId, 1);
    },
    [adjustItemQuantity]
  );

  const handleRemoveItem = React.useCallback(
    (lineId) => {
      setItems((prevItems) => {
        const nextItems = prevItems.filter((item) => (item.lineId || item.id) !== lineId);
        if (nextItems.length !== prevItems.length) {
          persistCartItems(nextItems);
        }
        return nextItems;
      });
    },
    [setItems]
  );

  const handleSendOrder = React.useCallback(
    async (event) => {
      event?.preventDefault?.();

      if (!hasItems) {
        setSendStatus({ state: 'error', message: 'Your cart is empty.' });
        return;
      }

      if (!formRef.current) {
        setSendStatus({ state: 'error', message: 'Unable to read the order form.' });
        return;
      }

      const formData = new FormData(formRef.current);
      const payload = {
        email: formData.get('email')?.trim() || '',
        remarks: formData.get('remarks')?.trim() || '',
        country: formData.get('country') || '',
        name: formData.get('name')?.trim() || '',
        address: formData.get('address')?.trim() || '',
        city: formData.get('city') || '',
        phone: formData.get('phone')?.trim() ? `+92${formData.get('phone').trim()}` : '',
        shippingMethod: formData.get('shippingMethod')?.trim() || '',
        bankName: formData.get('bankName')?.trim() || '',
        referenceNo: formData.get('referenceNo')?.trim() || '',
        depositSlip: depositSlip?.dataUrl || '',
        wantsEmails: formData.get('wantsEmails') === 'on',
        saveInfo: formData.get('saveInfo') === 'on',
        items: items.map((item) => ({
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          sku: item.sku,
          collection: item.collection
        })),
        subtotal
      };

      const phoneDigits = formData.get('phone')?.trim() || '';
      const errors = {};
      if (!payload.email) errors.email = FIELD_MESSAGES.email;
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) errors.email = FIELD_MESSAGES.emailInvalid;
      if (!payload.name) errors.name = FIELD_MESSAGES.name;
      if (!payload.address) errors.address = FIELD_MESSAGES.address;
      if (!payload.city) errors.city = FIELD_MESSAGES.city;
      if (!phoneDigits) errors.phone = FIELD_MESSAGES.phone;
      else if (!/^3\d{9}$/.test(phoneDigits)) errors.phone = FIELD_MESSAGES.phoneInvalid;
      if (!payload.depositSlip) errors.depositSlip = FIELD_MESSAGES.depositSlip;
      if (!payload.referenceNo) errors.referenceNo = FIELD_MESSAGES.referenceNo;
      if (!payload.bankName) errors.bankName = FIELD_MESSAGES.bankName;

      setFieldErrors(errors);
      if (Object.keys(errors).length) {
        setSendStatus({ state: 'error', message: 'Please fill in the boxes marked in red.' });
        // Bring the first box with a problem into view
        const first = formRef.current.querySelector(`[name="${Object.keys(errors)[0]}"]`) ||
          formRef.current.querySelector('.viewchar-slip');
        if (first) {
          first.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (typeof first.focus === 'function') first.focus({ preventScroll: true });
        }
        return;
      }

      setSendStatus({ state: 'loading', message: 'Sending order...' });

      try {
        const response = await fetch(`${backendBaseUrl}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        let result = {};
        try {
          result = await response.json();
        } catch (error) {
          // ignore JSON parse errors and fall back to status handling below
        }

        if (!response.ok) {
          throw new Error(result.message || 'Failed to send the order. Please try again.');
        }

        setSendStatus({ state: 'success', message: result.message || 'Order sent successfully.' });
        setItems([]);
        formRef.current.reset();
        setDepositSlip(null);
        setFieldErrors({});
        navigate('/thanks', { replace: true });
      } catch (error) {
        setSendStatus({ state: 'error', message: error.message || 'Failed to send the order. Please try again.' });
      }
    },
    [backendBaseUrl, depositSlip, hasItems, items, navigate, setItems, subtotal]
  );

  const handleBack = () => {
    if (typeof window === 'undefined') {
      return;
    }

    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.close();
    }
  };

  return (
    <div className="viewchar-page">
      <header className="viewchar-header">
        <h1>Your Cart</h1>
      </header>

      {!hasItems ? (
        <section className="viewchar-empty">
          <p>Your cart is currently empty.</p>
          <button type="button" className="viewchar-back" onClick={handleBack}>
            Go Back To Previous Page
          </button>
        </section>
      ) : (
        <div className="viewchar-layout">
          <section className="viewchar-table">
            <div className="viewchar-table-header">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            {items.map((item) => {
              const lineKey = item.lineId || item.id;
              return (
                <article className="viewchar-row" key={lineKey}>
                  <div className="viewchar-product">
                    <img src={item.image} alt={item.title} />
                    <div className="viewchar-product-info">
                      <h3>{item.title}</h3>
                      {item.size && <p className="viewchar-meta">{item.size}</p>}
                      {item.sku && <p className="viewchar-meta">Barcode: {item.sku}</p>}
                      {item.collection && (
                        <p className="viewchar-meta">Collection Name: {item.collection}</p>
                      )}
                    </div>
                  </div>
                  <div className="viewchar-price">{formatCurrency(item.price)}</div>
                  <div className="viewchar-quantity cart-qty-control">
                    <button
                      type="button"
                      onClick={() => handleDecreaseQuantity(lineKey)}
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => handleIncreaseQuantity(lineKey)}
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="viewchar-qty-remove"
                      onClick={() => handleRemoveItem(lineKey)}
                      aria-label={`Remove ${item.title}`}
                    >
                      ×
                    </button>
                  </div>
                  <div className="viewchar-total">{formatCurrency(item.price * item.quantity)}</div>
                </article>
              );
            })}

            <div className="viewchar-payment-summary">
              <h3>Payment Summary</h3>
              <dl>
                <div>
                  <dt>Subtotal</dt>
                  <dd>{formatCurrency(subtotal)}</dd>
                </div>
                <div className="strong">
                  <dt>Total</dt>
                  <dd>{formatCurrency(subtotal)}</dd>
                </div>
              </dl>
              <p>Tax included and shipping calculated at checkout.</p>
            </div>
          </section>

          <aside className="viewchar-summary">
            <form
              ref={formRef}
              className="viewchar-checkout-form"
              onSubmit={handleSendOrder}
              onInput={clearFieldError}
              onChange={clearFieldError}
              noValidate
              data-state={sendStatus.state}
            >
              <section className="viewchar-section">
                <div className="viewchar-section-header">
                  <h3 className="viewchar-section-title">Contact</h3>
                  <a href="/login" className="viewchar-section-link">
                    Sign in
                  </a>
                </div>
                <label className="viewchar-field">
                  <span>Email</span>
                  <input name="email" type="email" className={inputClass('email')} placeholder="Email" required />
                  {fieldError('email')}
                </label>
                <label className="viewchar-checkbox">
                  <input name="wantsEmails" type="checkbox" defaultChecked />
                  <span>Email me with news and offers</span>
                </label>
              </section>

              <section className="viewchar-section">
                <div className="viewchar-section-header">
                  <h3 className="viewchar-section-title">Delivery</h3>
                </div>
                <label className="viewchar-field">
                  <span>Country/Region</span>
                  <select name="country" className="viewchar-select" defaultValue="Pakistan" required>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="viewchar-field">
                  <span>Your name</span>
                  <input name="name" type="text" className={inputClass('name')} placeholder="Your name" required />
                  {fieldError('name')}
                </label>

                <label className="viewchar-field">
                  <span>Address</span>
                  <input name="address" type="text" className={inputClass('address')} placeholder="Address" required />
                  {fieldError('address')}
                </label>

                <label className="viewchar-field">
                  <span>City</span>
                  <select name="city" className={inputClass('city', 'viewchar-select')} defaultValue="" required>
                    <option value="" disabled>
                      Select city
                    </option>
                    {PAKISTAN_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {fieldError('city')}
                </label>

                <label className="viewchar-field">
                  <span>Phone</span>
                  <div className="viewchar-phone">
                    <span className="viewchar-phone-prefix">+92</span>
                    <input
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      className={inputClass('phone')}
                      placeholder="3XXXXXXXXX"
                      maxLength={10}
                      pattern="3[0-9]{9}"
                      title="10 digits starting with 3, e.g. 3001234567"
                      onInput={(event) => {
                        // Digits only; drop a leading 0, 92 or 0092 the customer may type out of habit
                        event.target.value = event.target.value
                          .replace(/\D/g, '')
                          .replace(/^(00)?92/, '')
                          .replace(/^0+/, '')
                          .slice(0, 10);
                      }}
                      required
                    />
                  </div>
                  {fieldError('phone') || <span className="viewchar-field-note">10 digits after +92, e.g. 3001234567</span>}
                </label>

                <div className="viewchar-field">
                  <span>Deposit slip picture</span>
                  <label className={`viewchar-slip${depositSlip ? ' has-file' : ''}${fieldErrors.depositSlip ? ' has-error' : ''}`}>
                    <input type="file" accept="image/*" onChange={handleSlipChange} />
                    {depositSlip ? (
                      <>
                        <img src={depositSlip.dataUrl} alt="Deposit slip preview" />
                        <span className="viewchar-slip-text">
                          {depositSlip.name}
                          <small>Tap to change</small>
                        </span>
                      </>
                    ) : (
                      <span className="viewchar-slip-text">
                        Attach a photo of your bank deposit slip
                        <small>JPG or PNG</small>
                      </span>
                    )}
                  </label>
                  {slipError ? <span className="viewchar-field-error">{slipError}</span> : fieldError('depositSlip')}
                </div>

                <label className="viewchar-field">
                  <span>Reference No</span>
                  <input
                    name="referenceNo"
                    type="text"
                    className={inputClass('referenceNo')}
                    placeholder="Transaction / reference number on the slip"
                    maxLength={100}
                    required
                  />
                  {fieldError('referenceNo')}
                </label>

                <label className="viewchar-field">
                  <span>Bank name</span>
                  <select name="bankName" className={inputClass('bankName', 'viewchar-select')} defaultValue="" required>
                    <option value="" disabled>
                      Select your bank
                    </option>
                    {PAKISTAN_BANKS.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                  {fieldError('bankName')}
                </label>

                <label className="viewchar-field">
                  <span>Remarks</span>
                  <textarea
                    name="remarks"
                    className="viewchar-textarea"
                    placeholder="Add any remarks"
                    rows={3}
                  />
                </label>

                <label className="viewchar-checkbox">
                  <input name="saveInfo" type="checkbox" />
                  <span>Save this information for next time</span>
                </label>
              </section>

              <section className="viewchar-section">
                <div className="viewchar-section-header">
                  <h3 className="viewchar-section-title">Payment</h3>
                </div>
                <p className="viewchar-section-subtitle">All transactions are secure and encrypted.</p>
                <div className="viewchar-payment-info">
                  <p>Payment via Credit/Debit Cards, UnionPay, Bank Account and Digital Wallets</p>
                  <p>
                    After clicking “Pay now”, you will be redirected to Payment via Credit/Debit Cards, UnionPay, Bank
                    Account and Digital Wallets to complete your purchase securely.
                  </p>
                </div>
                {sendStatus.state !== 'idle' && (
                  <div className={`viewchar-status viewchar-status--${sendStatus.state}`} role="alert">
                    {sendStatus.message}
                  </div>
                )}
                <button
                  type="submit"
                  className="viewchar-send-order"
                  disabled={sendStatus.state === 'loading'}
                >
                  {sendStatus.state === 'loading' ? 'Sending…' : 'Send Order'}
                </button>
                <div
                  className="viewchar-nav-buttons"
                  style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}
                >
                  <button type="button" className="viewchar-send-order" onClick={() => window.history.back()}>
                    View Last Page
                  </button>
                  <button type="button" className="viewchar-send-order" onClick={() => window.location.assign('/') }>
                    Main Page
                  </button>
                </div>
              </section>
            </form>
          </aside>
        </div>
      )}
    </div>
  );
};

export default ViewChar;
