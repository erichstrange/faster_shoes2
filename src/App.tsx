/**
 * File Name: App.tsx
 * Full Path: /Users/mac/WebstormProjects/faster_shoes2/src/App.tsx
 */
import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Mens from './pages/Mens';
import Womens from './pages/Womens';
import Sale from './pages/Sale';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccess from './pages/CheckoutSuccess';
import ProductPage from './pages/ProductPage';
import { CartProvider } from './context/CartContext';

function App() {
    return (
        <Router basename="/erich">
            <CartProvider>
                <div className="min-h-screen bg-gray-50 flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                        <AppRoutes />
                    </main>
                    <Footer />
                </div>
            </CartProvider>
        </Router>
    );
}

export default App;

function AppRoutes() {
    const location = useLocation();

    // Capture ?irclickid on any route
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const cid = params.get('irclickid');
        if (cid) {
            localStorage.setItem('irclickid', cid);
        }
    }, [location]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mens" element={<Mens />} />
            <Route path="/womens" element={<Womens />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkoutSuccess" element={<CheckoutSuccess />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}


// <script type="text/javascript"> (function(a,b,c,d,e,f,g){e['ire_o']=c;e[c]=e[c]||function(){(e[c].a=e[c].a||[]).push(arguments)};f=d.createElement(b);g=d.getElementsByTagName(b)[0];f.async=1;f.src=a;g.parentNode.insertBefore(f,g);})('https://utt.impactcdn.com/A6033180-002e-43c2-b298-8782ae72cffc65535.js','script','ire',document,window); ire('identify', {customerid: '' /*INSERT CUSTOMER ID*/, customeremail: '' /*INSERT SHA1 HASHED CUSTOMER EMAIL*/}); </script>