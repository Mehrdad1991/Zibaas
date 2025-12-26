
import React from 'react';
import CartPageUI from '../components/CartPage';

const CartPage: React.FC<any> = ({ cart, onUpdateQuantity, onGoToCheckout, onTabChange }) => {
  return (
    <CartPageUI 
      cart={cart} 
      onUpdateQuantity={onUpdateQuantity} 
      onGoToCheckout={onGoToCheckout} 
      onNavigate={onTabChange}
    />
  );
};

export default CartPage;
