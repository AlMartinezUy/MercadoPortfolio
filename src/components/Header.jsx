import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../store/cartContext';
import SearchBar from './SearchBar';
import logo from '../assets/logo.svg';

const Header = () => {
  const { cartItemsCount, setIsCartOpen, isCartOpen } = useCart();

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__container">
          
          <Link to="/" className="header__logo">
             <img
               src={logo}
               alt="MercadoPortfolio logo"
               className="header__logo-icon"
            />
           <span className="header__logo-text">
             MercadoPortfolio
           </span>
          </Link>

          
          <div className="header__search">
            <SearchBar />
          </div>
          
          <nav className="header__nav">
            <Link to="/cv" className="header__cv-link">
              Ver versión clásica
            </Link>
            
            <button
              type="button"
              onClick={handleCartClick}
              className="header__cart-btn"
              aria-label={`Carrito de compras, ${cartItemsCount} items`}
              aria-expanded={isCartOpen ? "true" : "false"}
              aria-controls="cart-drawer"
            >
              <svg className="header__cart-icon" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-0.16 0.28-0.25 0.61-0.25 0.96 0 1.1 0.9 2 2 2h12v-2H7.42c-0.14 0-0.25-0.11-0.25-0.25l0.03-0.12L8.1 13h7.45c0.75 0 1.41-0.41 1.75-1.03L21.7 4H5.21l-0.94-2H1zM17 18c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2z"/>
              </svg>

              {cartItemsCount > 0 && (
                <span className="badge header__cart-badge">
                  {cartItemsCount}
                </span>
              )}
            </button>
            
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
