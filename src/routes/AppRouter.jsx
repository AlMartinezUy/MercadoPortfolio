import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '../store/cartContext';
import Header from '../components/Header';
import OutOfStockModal from '../components/OutOfStockModal';
import ProblemCartModal from '../components/ProblemCartModal';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import CvClassic from '../pages/CvClassic';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  return (
    <CartProvider>
      <Router>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column' 
        }}>
          <Header />
          
          
        <OutOfStockModal />
        <ProblemCartModal />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cv" element={<CvClassic />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default AppRouter;