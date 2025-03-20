/**
 * File Name: CheckoutSuccess.tsx
 * Full Path: /Users/mac/WebstormProjects/faster_shoes2/src/pages/CheckoutSuccess.tsx
 */
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';

const CheckoutSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.dataLayer = window.dataLayer || [];

        // Grab ?irclickid from the URL (if present)
        const searchParams = new URLSearchParams(location.search);
        let irclickid = searchParams.get('irclickid') || '';

        // NOTE: We do NOT fall back to localStorage anymore.
        // If we truly want no affiliate, we'll trust no leftover clickid if none is in the URL.

        // Retrieve the order data from localStorage
        const storedSummary = localStorage.getItem('orderSummary');
        let realOrderId = 'test-order';
        let realTotalValue = '0.00';

        if (storedSummary) {
            try {
                const parsed = JSON.parse(storedSummary);
                if (parsed.orderId) {
                    realOrderId = parsed.orderId;
                }
                if (typeof parsed.total === 'number') {
                    realTotalValue = parsed.total.toFixed(2);
                }
            } catch (err) {
                console.error('Failed to parse storedSummary:', err);
            }
        }

        // Retrieve customerid from localStorage
        const realCustomerId = localStorage.getItem('customerId') || '';

        // Fire the parent event with clickId if it exists, else empty
        const parentObj = {
            event: 'impactConversion',
            orderId: realOrderId,
            clickId: irclickid, // Might be empty if none was in URL
            totalValue: realTotalValue,
            currency: 'USD',
            customerid: realCustomerId, // linking to this customer
        };
        console.log('Pushing parent event:', parentObj);
        window.dataLayer.push(parentObj);

    }, [location.search]);

    // Handler for the Child event (same "customerid", no new click)
    const handleChildEvent = () => {
        const realCustomerId = localStorage.getItem('customerId') || '';
        const storedSummary = localStorage.getItem('orderSummary');
        let realOrderId = 'test-order';

        if (storedSummary) {
            try {
                const parsed = JSON.parse(storedSummary);
                if (parsed.orderId) {
                    realOrderId = parsed.orderId;
                }
            } catch (err) {
                console.error('Failed to parse storedSummary:', err);
            }
        }

        const childObj = {
            event: 'impactConversionChild',
            orderId: realOrderId,
            totalValue: '0.00',
            currency: 'USD',
            customerid: realCustomerId,
        };
        console.log('Pushing child event:', childObj);
        window.dataLayer.push(childObj);
    };

    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <div className="mb-8 text-green-500">
                <Check className="h-16 w-16 mx-auto" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-8">
                Thanks for your purchase. We'll email order details soon.
            </p>

            <div className="space-x-4">
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition"
                >
                    Continue Shopping
                </button>

                {/* Child Event Button */}
                <button
                    onClick={handleChildEvent}
                    className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition"
                >
                    Fire Child Event
                </button>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
