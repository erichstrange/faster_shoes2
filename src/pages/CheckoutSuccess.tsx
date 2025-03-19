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
        // Ensure the dataLayer array
        window.dataLayer = window.dataLayer || [];

        // 1) Try to get clickId from query param or localStorage
        const searchParams = new URLSearchParams(location.search);
        let irclickid = searchParams.get('irclickid') || '';
        if (!irclickid) {
            irclickid = localStorage.getItem('irclickid') || '';
        }

        // 2) Retrieve the order data from localStorage
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

        // 3) Retrieve the customerId from localStorage
        const realCustomerId = localStorage.getItem('customerId') || '';

        // 4) Fire the parent (primary) event
        const parentObj = {
            event: 'impactConversion',
            // "orderId" is the property your existing DLV - orderId listens for
            orderId: realOrderId,
            clickId: irclickid,
            totalValue: realTotalValue,
            currency: 'USD',

            // Include the same customerid so it’s passed
            customerid: realCustomerId,
        };

        console.log('Pushing parent event to dataLayer:', parentObj);
        window.dataLayer.push(parentObj);

    }, [location.search]);

    // Handler to fire the CHILD event
    const handleChildEvent = () => {
        // Retrieve the same order ID and customer ID
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

        // reuse "orderId" so  existing GTM DLV - orderId variable can grab it
        const childObj = {
            event: 'impactConversionChild',

            // CHANGED: now "orderId" instead of "parentOrderId"
            orderId: realOrderId,

            // reuse totalValue or pass "0.00" if it’s an upsell at no additional cost
            totalValue: '0.00',
            currency: 'USD',

            // Keep the same customerid
            customerid: realCustomerId,
        };

        console.log('Pushing child event to dataLayer:', childObj);
        window.dataLayer.push(childObj);
    };

    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <div className="mb-8 text-green-500">
                <Check className="h-16 w-16 mx-auto" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-8">
                Thank you for your purchase. We'll send you an email with your order details shortly.
            </p>

            <div className="space-x-4">
                {/* Continue Shopping Button */}
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition"
                >
                    Continue Shopping
                </button>

                {/* Button that fires the child event */}
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
