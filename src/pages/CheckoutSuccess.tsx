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

        // For demonstration, read ?irclickid= or else from localStorage
        const searchParams = new URLSearchParams(location.search);
        let irclickid = searchParams.get('irclickid') || '';
        if (!irclickid) {
            irclickid = localStorage.getItem('irclickid') || '';
        }

        // Retrieve real order data from localStorage
        const storedSummary = localStorage.getItem('orderSummary');
        let realOrderId = 'test-order';
        let realTotalValue = '0.00';

        if (storedSummary) {
            try {
                const parsed = JSON.parse(storedSummary);
                if (parsed.orderId) {
                    realOrderId = parsed.orderId; // e.g. "yg8ty279p"
                }
                if (typeof parsed.total === 'number') {
                    realTotalValue = parsed.total.toFixed(2); // e.g. "129.99"
                }
            } catch (err) {
                console.error('Failed to parse storedSummary:', err);
            }
        }

        // Retrieve the customerId from localStorage
        const realCustomerId = localStorage.getItem('customerId') || '';

        // Fire the parent (primary) conversion event
        const parentObj = {
            event: 'impactConversion',    // you can keep or rename
            orderId: realOrderId,         // parent's order ID
            clickId: irclickid,           // so partner credit is via click if found
            totalValue: realTotalValue,
            currency: 'USD',

            // Include the same customerid that was stored
            customerid: realCustomerId,
        };

        console.log('Pushing parent event to dataLayer:', parentObj);
        window.dataLayer.push(parentObj);

    }, [location.search]);

    // Handler to fire the "child" event
    // This child event uses the parent’s orderId or the same customerid to link
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

        // Example child event. Adjust keys to match your Impact child event config.
        const childObj = {
            event: 'impactConversionChild',
            parentOrderId: realOrderId,  // or "parentTransactionId" if your child event expects that
            totalValue: '0.00',          // or some child revenue
            currency: 'USD',

            // The same customerid to ensure linking
            customerid: realCustomerId,

            // Notice we do NOT pass a new clickId, so it doesn't override
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

                {/* ADDED: Button to fire the child event */}
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
