

import React from 'react';
import Store from '../components/Store';

// Updated to receive and pass through missing props required by Store component
const StorePage: React.FC<any> = ({ 
  cart, 
  onAddToCart, 
  onUpdateQuantity,
  userRole,
  onViewProduct,
  onGoToCheckout 
}) => {
  return (
    <Store 
      cart={cart} 
      onAddToCart={onAddToCart} 
      onUpdateQuantity={onUpdateQuantity} 
      userRole={userRole}
      onViewProduct={onViewProduct}
      onGoToCheckout={onGoToCheckout}
    />
  );
};

export default StorePage;