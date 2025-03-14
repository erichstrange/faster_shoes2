import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';

const CheckoutSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.dataLayer = window.dataLayer || [];

        // 1) UTT_ConversionPageView
        window.dataLayer.push({
            event: 'UTT_ConversionPageView',
            page: 'CheckoutSuccess',
        });

        // 2) Grab ?irclickid= from the URL or localStorage
        const searchParams = new URLSearchParams(location.search);
        let irclickid = searchParams.get('irclickid') || '';
        if (!irclickid) {
            irclickid = localStorage.getItem('irclickid') || '';
        }

        // 3) Also retrieve the real orderId and totalValue from localStorage
        const storedSummary = localStorage.getItem('orderSummary');
        let realOrderId = 'test-order';
        let realTotalValue = '0.00';

        if (storedSummary) {
            try {
                const parsed = JSON.parse(storedSummary);
                if (parsed.orderId) {
                    realOrderId = parsed.orderId; // e.g. "wg4nbvj9t"
                }
                if (typeof parsed.total === 'number') {
                    realTotalValue = parsed.total.toFixed(2); // e.g. "159.99"
                }
            } catch (err) {
                console.error('Failed to parse storedSummary:', err);
            }
        }

        // 4) Push impactConversion with the real order ID and total
        window.dataLayer.push({
            event: 'impactConversion',
            orderId: realOrderId,
            clickId: irclickid,
            totalValue: realTotalValue,
            currency: 'USD',
        });

        console.log('impactConversion event fired with ID:', irclickid);
        console.log('impactConversion orderId, totalValue:', realOrderId, realTotalValue);

        // Optionally clear that storedSummary if you don't want it to persist
        localStorage.removeItem('orderSummary');
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
