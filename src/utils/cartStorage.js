export const CART_STORAGE_KEY = 'sharedCartItems';
export const LEGACY_CART_KEYS = ['formalCartItems', 'bridalCartItems'];

export const createLineId = (productId, sizeValue) => `${productId}::${(sizeValue || 'default').toLowerCase()}`;

const sanitizeCartItems = (items) =>
  items
    .filter((item) => item && typeof item.id === 'string')
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
