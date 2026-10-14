import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../component/product5';
import Product5Pro from '../component/product5pro';
import { product5Items } from '../component/product5data';
import { newArrivalItems, weddingFormalItems, readyToWearItems } from '../component/collectionsdata';

// Pages for the menu links that share one layout: a product grid at
// /<slug> and a product page at /<slug>/<productId>.
export const collections = {
  'new-arrival': { title: 'New Arrival', items: newArrivalItems },
  'wedding-formal': { title: 'Wedding Formal', items: weddingFormalItems },
  'ready-to-wear': { title: 'Ready to Wear', items: readyToWearItems },
  unstitched: { title: 'Unstitched', items: product5Items }
};

export const CollectionPage = ({ slug }) => {
  const collection = collections[slug];

  return (
    <section className="shop-grid-section collection-page">
      <h1 className="collection-page-title">{collection.title}</h1>
      <p className="collection-page-count">{collection.items.length} products</p>
      <div className="shop-grid">
        {collection.items.map((product) => (
          <ProductCard key={product.id} product={product} basePath={`/${slug}`} />
        ))}
      </div>
    </section>
  );
};

export const CollectionProductPage = ({ slug }) => {
  const { productId } = useParams();
  const collection = collections[slug];

  return <Product5Pro key={productId} items={collection.items} collectionName={collection.title} />;
};
