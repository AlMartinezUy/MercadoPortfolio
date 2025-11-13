import React, { useEffect } from 'react';
import { useCart } from '../store/cartContext';
import { formatPrice } from '../data/products';

const CartDrawer = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    clearCart, 
    cartTotal,
    removeItem,
    setModalProduct
  } = useCart();

  const handleClose = () => setIsCartOpen(false);

  // Cerrar con ESC
  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCartOpen]);

  const handleSendOrder = () => {
    if (!cart || cart.length === 0) return;
    // Flujo especial de compra no disponible
    setModalProduct({ id: 'checkout', title: 'Compra no disponible' });
  };

  return (
    <>
      {/* Overlay clickeable */}
      {isCartOpen && (
        <div
          className="overlay"
          onClick={handleClose}
          aria-hidden="true"
          style={{ zIndex: 'var(--z-overlay)' }}
        />
      )}

      <aside
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={`drawer ${isCartOpen ? 'drawer--open' : ''}`}
      >
        <div className="drawer__inner">
          <div className="drawer__header">
            <h3 id="cart-title" className="drawer__title">Carrito</h3>
            <button
              type="button"
              className="drawer__close"
              onClick={handleClose}
              aria-label="Cerrar carrito"
              title="Cerrar"
            >
              ×
            </button>
          </div>

          <div className="drawer__content">
            {(!cart || cart.length === 0) ? (
              <div className="drawer__empty">
                <div className="drawer__empty-icon">🛒</div>
                <p>Tu carrito está vacío.</p>
              </div>
            ) : (
              <div>
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="cart-item__image"
                    />

                    <div className="cart-item__info">
                      <div className="cart-item__title">{item.title}</div>
                      <div className="cart-item__price">
                        {formatPrice(item.price)}
                      </div>
                    </div>

                    <div>
                      <div className="cart-item__quantity">
                        <button
                          type="button"
                          className="cart-item__qty-btn"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          aria-label="Disminuir cantidad"
                          title="Disminuir"
                        >
                          –
                        </button>
                        <span className="cart-item__qty-value">{item.quantity}</span>
                        <button
                          type="button"
                          className="cart-item__qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Aumentar cantidad"
                          title="Aumentar"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="btn btn--link"
                        onClick={() => removeItem(item.id)}
                        style={{ marginTop: '8px' }}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="drawer__footer">
            <div className="drawer__total">
              <span>Total</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>
            <div className="drawer__actions">
              <button
                type="button"
                className="btn btn--secondary drawer__btn"
                onClick={clearCart}
                disabled={!cart?.length}
              >
                Vaciar
              </button>
              <button
                type="button"
                className="btn btn--primary drawer__btn"
                onClick={handleSendOrder}
                disabled={!cart?.length}
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;
