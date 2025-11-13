import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Action types
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_CART_OPEN: 'SET_CART_OPEN',
  SET_QUERY: 'SET_QUERY',
  SET_MODAL_PRODUCT: 'SET_MODAL_PRODUCT'
};

// Initial state
const initialState = {
  cart: [],
  isCartOpen: false,
  query: '',
  modalProduct: null
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    }
    
    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload.id)
        };
      }
      
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    }
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        cart: []
      };
    
    case CART_ACTIONS.SET_CART_OPEN:
      return {
        ...state,
        isCartOpen: action.payload
      };
    
    case CART_ACTIONS.SET_QUERY:
      return {
        ...state,
        query: action.payload
      };
    
    case CART_ACTIONS.SET_MODAL_PRODUCT:
      return {
        ...state,
        modalProduct: action.payload
      };
    
    default:
      return state;
  }
};

// Context Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    // Cargar carrito desde localStorage si existe
    const savedCart = localStorage.getItem('cart');
    return savedCart 
      ? { ...initial, cart: JSON.parse(savedCart) }
      : initial;
  });

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Actions
  const addItem = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
  };

  const removeItem = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ 
      type: CART_ACTIONS.UPDATE_QUANTITY, 
      payload: { id: productId, quantity } 
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const setIsCartOpen = (isOpen) => {
    dispatch({ type: CART_ACTIONS.SET_CART_OPEN, payload: isOpen });
  };

  const setQuery = (query) => {
    dispatch({ type: CART_ACTIONS.SET_QUERY, payload: query });
  };

  const setModalProduct = (product) => {
    dispatch({ type: CART_ACTIONS.SET_MODAL_PRODUCT, payload: product });
  };

  // Computed values
  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  
  const cartTotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Easter egg: verificar si la query contiene palabras clave
  const showBestOffer = /(programador|developer|junior)/i.test(state.query || '');


  const value = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setIsCartOpen,
    setQuery,
    setModalProduct,
    cartItemsCount,
    cartTotal,
    showBestOffer
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};