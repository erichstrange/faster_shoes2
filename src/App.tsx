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
import CheckoutPage from './pages/CheckoutPage'; // <-- ADD THIS
import CheckoutSuccess from './pages/CheckoutSuccess';
import ProductPage from './pages/ProductPage';
import { CartProvider } from './context/CartContext';

/**
 * Top-level component. We create a child AppRoutes that
 * captures irclickid on any route.
 */
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

/**
 * A separate component that:
 * 1) Watches for route changes
 * 2) Stores ?irclickid in localStorage if found
 * 3) Defines all your routes
 */
function AppRoutes() {
  const location = useLocation();

  // Store ?irclickid in localStorage on ANY route, if present
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

        {/* NEW: CheckoutPage route */}
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/checkoutSuccess" element={<CheckoutSuccess />} />
        <Route path="/product/:productId" element={<ProductPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
}
