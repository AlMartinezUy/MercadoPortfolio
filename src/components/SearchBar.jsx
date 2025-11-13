import React, { useState } from 'react';
import { useCart } from '../store/cartContext';

const SearchBar = () => {
  const { setQuery } = useCart();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    setQuery(trimmed);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    // actualizar la query en tiempo real (para que el easter egg aparezca sin apretar Enter)
    setQuery(value);
  };

  return (
    <div className="searchbar">
      <form className="searchbar__form" onSubmit={handleSubmit} role="search" aria-label="Buscar productos">
        <input
          type="text"
          className="searchbar__input"
          placeholder="Buscar productos, marcas y más... (probá 'programador')"
          value={inputValue}
          onChange={handleInputChange}
          aria-label="Escribe tu búsqueda"
        />
        <button 
          type="submit" 
          className="searchbar__btn"
          aria-label="Buscar"
        >
          <svg className="searchbar__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
