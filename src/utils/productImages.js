import { bridalLooks } from '../component/bridals';
import { newArrivalItems, weddingFormalItems, readyToWearItems } from '../component/collectionsdata';
import { customLooks } from '../component/custom';
import { formalLooks } from '../component/formal';
import { hireLooks } from '../component/hire';
import { partyLooks } from '../component/party';
import { product5Items } from '../component/product5data';
import { product6Items } from '../component/product6data';
import { formalLooks as saleLooks } from '../component/sale';

// Picture for an ordered item. Older orders were saved without one, so look the
// product up by its SKU (or name) in the website's product lists.
const bySku = new Map();
const byTitle = new Map();

[
  newArrivalItems,
  saleLooks,
  formalLooks,
  bridalLooks,
  weddingFormalItems,
  readyToWearItems,
  product5Items,
  partyLooks,
  customLooks,
  hireLooks,
  product6Items
].forEach((list) => {
  (list || []).forEach((product) => {
    if (!product || !product.image) return;
    if (product.sku && !bySku.has(product.sku)) bySku.set(product.sku, product.image);
    const title = String(product.title || '').trim().toLowerCase();
    if (title && !byTitle.has(title)) byTitle.set(title, product.image);
  });
});

export const itemImage = (item) =>
  item.image_url ||
  bySku.get(item.sku) ||
  byTitle.get(String(item.title || '').trim().toLowerCase()) ||
  '';
