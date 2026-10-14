export const CART_STORAGE_KEY = 'sharedCartItems';
export const LEGACY_CART_KEYS = ['formalCartItems', 'bridalCartItems'];

export const createLineId = (productId, sizeValue) => `${productId}::${(sizeValue || 'default').toLowerCase()}`;

// 'Rs.12,500' -> 12500. The dot after 'Rs' must be dropped first, or it reads as a decimal point.
export const parsePrice = (price) => Number(String(price).replace(/^\s*rs\.?/i, '').replace(/[^\d.]/g, '')) || 0;

const sanitizeCartItems = (items) =>
  items
    .filter((item) => item && typeof item.id === 'string')
    .filter((item) => {
      // Remove items with invalid prices. Anything under Rs.1 was saved by the old
      // price parser, which read "Rs.15,000" as 0.15.
      const price = Number(item.price);
      return !isNaN(price) && price >= 1;
    })
    .map((item) => ({
      ...item,
      lineId: item.lineId || createLineId(item.id, item.size || null)
    }));

export const readStoredCartItems = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  const keys = [CART_STORAGE_KEY, ...LEGACY_CART_KEYS];
  for (const key of keys) {
    const stored = window.localStorage.getItem(key);
    if (!stored) {
      continue;
    }

    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return sanitizeCartItems(parsed);
      }
    } catch (error) {
      console.warn(`Unable to parse stored cart items for key ${key}`, error);
    }
  }

  return [];
};

export const persistCartItems = (items) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (!Array.isArray(items) || items.length === 0) {
    window.localStorage.removeItem(CART_STORAGE_KEY);
  } else {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }

  LEGACY_CART_KEYS.forEach((key) => window.localStorage.removeItem(key));
};
