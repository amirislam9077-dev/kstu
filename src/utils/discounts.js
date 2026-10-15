import { useEffect, useState } from 'react';
import { BACKEND_URL } from './api';
import { parsePrice } from './cartStorage';

// Sale discount % per collection ('sale', 'formal', ...), set from the admin page.
// Loaded once per visit and shared by every product card and product page.

let cache = null;
let request = null;
const listeners = new Set();

const loadDiscounts = () => {
  if (!request) {
    request = fetch(`${BACKEND_URL}/discounts`)
      .then((response) => (response.ok ? response.json() : {}))
      .catch(() => ({}))
      .then((data) => {
        cache = data || {};
        listeners.forEach((notify) => notify(cache));
        return cache;
      });
  }
  return request;
};

// Admin page calls this after saving so open pages show the new prices
export const setDiscountsCache = (data) => {
  cache = data || {};
  request = Promise.resolve(cache);
  listeners.forEach((notify) => notify(cache));
};

export const useDiscounts = () => {
  const [discounts, setDiscounts] = useState(cache || {});
  useEffect(() => {
    listeners.add(setDiscounts);
    loadDiscounts();
    return () => listeners.delete(setDiscounts);
  }, []);
  return discounts;
};

const formatRs = (value) => `Rs.${Math.round(value).toLocaleString('en-US')}`;

// { percent, original: 'Rs.42,990', final: 'Rs.34,392', finalNumber: 34392 }
export const applyDiscount = (price, percent) => {
  const original = parsePrice(price);
  const pct = Number(percent) > 0 ? Math.min(90, Number(percent)) : 0;
  // Whole rupees, so the card, cart and order all show the same amount
  const finalNumber = pct ? Math.round((original * (100 - pct)) / 100) : original;
  return {
    percent: pct,
    original: price,
    final: pct ? formatRs(finalNumber) : price,
    finalNumber
  };
};

export const useDiscountedPrice = (collection, price) => {
  const discounts = useDiscounts();
  return applyDiscount(price, discounts[collection]);
};
