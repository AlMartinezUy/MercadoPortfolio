import { useCart } from '../store/cartContext';
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productsApi';
import { products as localProducts } from '../data/products';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  const { query, showBestOffer } = useCart();
  const [items, setItems] = useState(localProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      
      // Si no hay busqueda, usamos los productos locales y evitamos llamadas externas
      if (!query || !query.trim()) {
        setItems(localProducts);
        setLoading(false);
        return;
      }
const apiItems = await fetchProducts({ query });
      if (!alive) return;
      setItems(apiItems.length ? apiItems : localProducts);
      setLoading(false);
    })();
    return () => { alive = false };
  }, [query]);

  // Filtrar productos basado en la query
  const filteredProducts = items;

  // Componente para la mejor oferta (Easter Egg)
  const BestOfferCard = () => (
    <div className="best-offer">
      <div className="best-offer__badge">
        ¡LA MEJOR OFERTA!
      </div>
      <h2 className="best-offer__title">
        Desarrollador Full Stack
      </h2>
      <p className="best-offer__subtitle">
        ¡El producto más exclusivo que estás buscando!
      </p>
      <div className="best-offer__actions">
        <a 
          href={import.meta.env.VITE_CV_URL || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn--primary best-offer__btn"
        >
          Ver CV
        </a>
        <a 
          href={import.meta.env.VITE_GITHUB_URL || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn--secondary best-offer__btn"
        >
          GitHub
        </a>
        <a 
          href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || ''}?subject=Contacto desde MercadoPortfolio`}
          className="btn btn--success best-offer__btn"
        >
          Contactar
        </a>
      </div>
    </div>
  );

  return (
    <section className="product-grid">
      <div className="container">
        <h2 className="product-grid__title">
          {query ? `Resultados para "${query}"` : 'Productos Destacados'}
        </h2>
        
        <div className="product-grid__container">
          {/* Easter egg: mostrar la mejor oferta si la query contiene palabras clave */}
          {showBestOffer && <BestOfferCard />}
          
          {filteredProducts.length > 0 && (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}

          {filteredProducts.length === 0 && !showBestOffer && (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '2rem',
              color: 'var(--text-muted)'
           }}>
             No se encontraron productos para "{query}"
           </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ProductGrid;