import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import Navbar from './navbar';
import Slider from './component/slider';
import Hero5 from './component/hero5';
import Banner5 from './component/banner5';
import ShopByCollection from './component/collection';
import UnstitchedBanner from './component/unstitchedbanner';
import Login from './component/login';
import Footer from './component/footer';
import FullPage from './component/fullpage';
import FormalPage from './pages/FormalPage';
import BridalPage from './pages/BridalPage';
import HirePage from './pages/HirePage';
import CustomPage from './pages/CustomPage';
import FormalPro from './component/formalpro';
import BridalPro from './component/bridalspro';
import HirePro from './component/hirepro';
import CustomPro from './component/custompro';
import SalePage from './pages/SalePage';
import SalePro from './component/salepro';
import Product5Pro from './component/product5pro';
import Product6Pro from './component/product6pro';
import ViewChar from './component/viewchar';
import Thanks from './component/thanks';
import PartyPage from './pages/PartyPage';
import PartyPro from './component/partypro';
import { collections, CollectionPage, CollectionProductPage } from './pages/CollectionPage';
import AdminOrders from './pages/AdminOrders';
import TikTokPage from './pages/TikTokPage';
import AdminReturnButton from './component/adminreturn';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
};

const HomePage = () => (
  <FullPage>
    <Slider />
    <section className="hero-section">
      <div className="image-gallery">
        <div className="image-container">
          <Link to="/party">
            <img
              src="https://www.mariab.pk/cdn/shop/files/RTW_Web_1124X1460_1bdd776b-faae-47e2-b597-7f97f0cd9c14.jpg?v=1789455466&width=1500"
              alt="Party wear outfit"
              className="gallery-image"
              style={{ cursor: 'pointer' }}
            />
          </Link>
          <div className="new-arrival-bar">
            <span className="new-arrival-badge">✦ Party Wear</span>
            <Link className="new-arrival-btn" to="/party">Shop Now</Link>
          </div>
        </div>
        <div className="image-container">
          <Link to="/party">
            <img
              src="https://www.mariab.pk/cdn/shop/files/Luxury_formals_tile_1124X1460_c7280dd7-60d8-44a9-9f8a-635734132556.jpg?v=1789455721&width=1500"
              alt="Party wear outfit"
              className="gallery-image"
              style={{ cursor: 'pointer' }}
            />
          </Link>
          <div className="new-arrival-bar">
            <span className="new-arrival-badge">✦ Party Wear</span>
            <Link className="new-arrival-btn" to="/party">Shop Now</Link>
          </div>
        </div>
      </div>
    </section>
    <Hero5 />
    <Banner5 />
    <ShopByCollection />
    <UnstitchedBanner />
    <Footer />
  </FullPage>
);

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <ScrollToTop />
      {/* The admin panel has its own side menu */}
      {!location.pathname.startsWith('/admin') && <Navbar />}
      <AdminReturnButton />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/formal" element={<FormalPage />} />
          <Route path="/formal/:productId" element={<FormalPro />} />
          <Route path="/bridal/:productId" element={<BridalPro />} />
          <Route path="/bridal" element={<BridalPage />} />
          <Route path="/hire/:productId" element={<HirePro />} />
          <Route path="/hire" element={<HirePage />} />
          <Route path="/custom/:productId" element={<CustomPro />} />
          <Route path="/custom" element={<CustomPage />} />
          <Route path="/sale/:productId" element={<SalePro />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/product5/:productId" element={<Product5Pro />} />
          <Route path="/product6/:productId" element={<Product6Pro />} />
          <Route path="/party" element={<PartyPage />} />
          <Route path="/party/:productId" element={<PartyPro />} />
          {Object.keys(collections).map((slug) => [
            <Route key={slug} path={`/${slug}`} element={<CollectionPage slug={slug} />} />,
            <Route key={`${slug}-product`} path={`/${slug}/:productId`} element={<CollectionProductPage slug={slug} />} />
          ])}
          <Route path="/tiktok" element={<TikTokPage />} />
          <Route path="/admin" element={<Navigate to="/admin/orders" replace />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/viewcart" element={<ViewChar />} />
          <Route path="/thanks" element={<Thanks />} />
        </Routes>
        {location.pathname !== '/thanks' && location.pathname !== '/' && !location.pathname.startsWith('/admin') && <Footer />}
      </main>
    </div>
  );
}

export default App;
