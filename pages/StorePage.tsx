
import React from 'react';
import Store from '../components/Store';

const StorePage: React.FC<any> = ({ cart, onAddToCart, onUpdateQuantity }) => {
  return <Store cart={cart} onAddToCart={onAddToCart} onUpdateQuantity={onUpdateQuantity} />;
};

export default StorePage;
