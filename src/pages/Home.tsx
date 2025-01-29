import React from 'react';
import { Truck, Shield, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddToCartButton from '../components/AddToCartButton';
import { products } from '../data/products';

const Home = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <img 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">Faster Shoes</h1>
            <p className="text-xl mb-8">Run Faster. Dream Bigger.</p>
            <a href="#featured" className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition inline-block">
              Shop Now
            </a>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4">
            <Truck className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-gray-600">On orders over $100</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <RotateCcw className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold">Easy Returns</h3>
              <p className="text-gray-600">30 day return policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div id="featured" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg hover:text-blue-600 transition">{product.name}</h3>
                  </Link>
                  <p className="text-gray-600">{product.price}</p>
                  <AddToCartButton product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;