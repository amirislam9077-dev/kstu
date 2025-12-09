import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './navbar';
import Slider from './component/slider';
import Hero5 from './component/hero5';
import Midbar from './component/midbar';
import Banner5 from './component/banner5';
import Product from './component/product';
import Product5 from './component/product5';
import Product6 from './component/product6';
import Login from './component/login';
import Footer from './component/footer';
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

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
};

const HomePage = () => (
  <>
    <section className="hero-section">
      <div className="image-gallery">
        <div className="image-container">
          <img
            src="https://www.destinychic.com.au/cdn/shop/files/DestinyChic_Formal_29_01_0302.jpg?v=1708439188&width=720"
            alt="Elegant formal dress - Red sequined gown"
            className="gallery-image"
          />
        </div>
        <div className="image-container">
          <img
            src="https://www.destinychic.com.au/cdn/shop/files/DestinyChic_Formal_29_01_0178.jpg?v=1708430720&width=720"
            alt="Elegant formal dress - Silver and gold gowns"
            className="gallery-image"
          />
        </div>
      </div>
    </section>
    <Hero5 />
    <Midbar />
    <Banner5 />
    <Product />
    <Product5 />
    <Product6 />
  </>
);

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <ScrollToTop />
      <Navbar />
      {location.pathname === '/' && <Slider />}
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
          <Route path="/login" element={<Login />} />
          <Route path="/viewcart" element={<ViewChar />} />
          <Route path="/thanks" element={<Thanks />} />
        </Routes>
        {location.pathname !== '/thanks' && <Footer />}
      </main>
    </div>
  );
}

export default App;
