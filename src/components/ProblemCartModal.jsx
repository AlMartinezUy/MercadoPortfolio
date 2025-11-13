import React, { useEffect } from 'react';
import { useCart } from '../store/cartContext';

const ProblemCartModal = () => {
  const { modalProduct, setModalProduct } = useCart();

  // Mostrar SOLO para el flujo de checkout del carrito.
  if (!modalProduct || modalProduct.id !== 'checkout') return null;

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
    if (modalProduct && modalProduct.id === 'checkout') {
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
            ¡Oops! ¡Ha habido un problema!
          </h2>
          <p className="modal__subtitle">
            {modalProduct.title || 'No pudimos finalizar tu compra'}
          </p>
        </div>
        
        <div className="modal__body">
          <p id="modal-description" className="modal__message">
            La compra no puede ser finalizada, ¡pero no te preocupes! ¡¡¡podemos ponerte en contacto con un programador para solucionar esto!!!
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

export default ProblemCartModal;