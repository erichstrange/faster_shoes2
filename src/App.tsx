import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Mens from './pages/Mens';
import Womens from './pages/Womens';
import Sale from './pages/Sale';
import CartPage from './pages/CartPage';
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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mens" element={<Mens />} />
              <Route path="/womens" element={<Womens />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;