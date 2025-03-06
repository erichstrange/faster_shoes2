import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    // 1) Fire a UTT conversion page event (optional)
    window.dataLayer.push({
      event: 'UTT_ConversionPageView',
      page: 'CheckoutSuccess',
    });

    // 2) Grab ?irclickid= from the query string or localStorage as a fallback
    const searchParams = new URLSearchParams(location.search);
    let irclickid = searchParams.get('irclickid') || '';
    if (!irclickid) {
      // If there's no param, try localStorage
      irclickid = localStorage.getItem('irclickid') || '';
    }

    // 3) Push impactConversion event with the ID
    window.dataLayer.push({
      event: 'impactConversion',
      orderId: irclickid || '',
      clickId: irclickid || '',
      totalValue: '100.00', // Hardcode or use real order data
      currency: 'USD',
    });

    // Optionally log to see if it worked
    console.log("impactConversion event fired with ID:", irclickid);

  }, [location.search]);

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