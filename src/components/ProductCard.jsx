import React from 'react';
import { useCart } from '../store/cartContext';
import { formatPrice, calculateInstallments } from '../data/products';

const ProductCard = ({ product }) => {
  const { addItem, setModalProduct } = useCart();

  const handleCardClick = (e) => {
      if (e.target.closest('.product-card__btn')) {
      return;
    }
    
    
    setModalProduct(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div 
      className="product-card card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick(e);
        }
      }}
      aria-label={`Ver detalles de ${product.title}`}
    >
      <div className="product-card__image-container">
        <img 
          src={product.image} 
          alt={product.title}
          className="product-card__image"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMjUgNzVIMTc1VjEyNUgxMjVWNzVaIiBzdHJva2U9IiNDQ0MiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIxMzciIGN5PSI4NyIgcj0iNCIgZmlsbD0iI0NDQyIvPgo8cGF0aCBkPSJNMTI1IDExMEwxMzUgMTAwTDE1MCA4NUwxNzUgMTEwVjEyNUgxMjVWMTEwWiIgZmlsbD0iI0NDQyIvPgo8L3N2Zz4K';
          }}
        />
        {product.discount && (
          <div className="product-card__discount">
            {product.discount}% OFF
          </div>
        )}
      </div>
      
      <div className="product-card__content">
        <h3 className="product-card__title">
          {product.title}
        </h3>
        
        <div className="product-card__price-container">
          {product.originalPrice && (
            <div className="product-card__original-price">
              {formatPrice(product.originalPrice)}
            </div>
          )}
          <div className="product-card__price">
            {formatPrice(product.price)}
          </div>
        </div>
        
        <div className="product-card__installments">
          {calculateInstallments(product.price)}
        </div>
        
        <div className="product-card__actions">
          <button 
            onClick={handleAddToCart}
            className="btn product-card__btn product-card__btn--add"
            aria-label={`Agregar ${product.title} al carrito`}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;