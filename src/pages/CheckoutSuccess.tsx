import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="mb-8 text-green-500">
        <Check className="h-16 w-16 mx-auto" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for your purchase. We'll send you an email with your order details shortly.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default CheckoutSuccess;