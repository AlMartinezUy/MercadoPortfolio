import React from 'react';
import ProductGrid from '../components/ProductGrid';
import OutOfStockModal from '../components/OutOfStockModal';
import CartDrawer from '../components/CartDrawer';

const Home = () => {
  return (
    <main>
      <ProductGrid />
      
      {/* Modal de sin stock - se muestra condicionalmente */}
      <OutOfStockModal />
      
      {/* Drawer del carrito - se muestra condicionalmente */}
      <CartDrawer />
    </main>
  );
};

export default Home;