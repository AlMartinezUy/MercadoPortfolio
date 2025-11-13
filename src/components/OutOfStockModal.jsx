import React, { useEffect } from 'react';
import { useCart } from '../store/cartContext';

const OutOfStockModal = () => {
  const { modalProduct, setModalProduct } = useCart();

  // NO mostrar si el modal actual es el de checkout del carrito
  if (!modalProduct || modalProduct.id === 'checkout') return null;

  const handleClose = () => {
    setModalProduct(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  useEffect(() => {
    if (modalProduct) {
      document.addEventListener('keydown', handleEscapeKey);
        const timer = setTimeout(() => {
        const firstButton = document.querySelector('.modal__btn');
        if (firstButton) {
          firstButton.focus();
        }
      }, 100);
      
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
        clearTimeout(timer);
      };
    }
  }, [modalProduct]);

  if (!modalProduct) return null;

  return (
    <div 
      className="overlay modal" 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="modal__content">
        <button 
          onClick={handleClose}
          className="modal__close"
          aria-label="Cerrar modal"
        >
          ×
        </button>
        
        <div className="modal__header">
          <h2 id="modal-title" className="modal__title">
            ¡Ops! Sin Stock
          </h2>
          <p className="modal__subtitle">
            {modalProduct.title}
          </p>
        </div>
        
        <div className="modal__body">
          <p id="modal-description" className="modal__message">
            ¡Ops! Parece que no nos queda más de este producto, pero te puede interesar:
          </p>
          
          <div className="modal__actions">
            <a
              href={import.meta.env.VITE_CV_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary modal__btn"
            >
              Ver mi CV
            </a>
            <a
              href={import.meta.env.VITE_GITHUB_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary modal__btn"
            >
              Mi GitHub
            </a>
            <button
              onClick={handleClose}
              className="btn btn--secondary modal__btn"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutOfStockModal;