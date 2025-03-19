import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 1) Set or confirm customerId **before** rendering the app
(function ensureCustomerId() {
    try {
        const existingID = localStorage.getItem('customerId');
        if (!existingID) {
            const newID = 'cust-' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('customerId', newID);
            console.log('[main.tsx] Set new customerId:', newID);
        } else {
            console.log('[main.tsx] Existing customerId:', existingID);
        }
    } catch (err) {
        console.error('[main.tsx] Failed to set customerId in localStorage:', err);
    }
})();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
