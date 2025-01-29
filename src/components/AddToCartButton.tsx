import React from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: string;
    image: string;
  };
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);
  const inCart = isInCart(product.id);

  return (
    <button 
      onClick={() => addToCart(product)}
      className={`mt-4 w-full py-2 rounded-md transition flex items-center justify-center space-x-2 ${
        inCart ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
      } text-white`}
    >
      {inCart ? (
        <>
          <Check className="w-4 h-4" />
          <span>In Cart ({quantity})</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </>
      )}
    </button>
  );
};

export default AddToCartButton;