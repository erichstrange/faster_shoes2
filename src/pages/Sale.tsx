import React from 'react';
import { Filter, Tag } from 'lucide-react';
import AddToCartButton from '../components/AddToCartButton';

const Sale = () => {
  const products = [
    {
      id: 'sprint-elite-x-sale',
      name: "Sprint Elite X",
      originalPrice: "$129.99",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570",
      discount: "30% OFF"
    },
    {
      id: 'air-comfort-pro-sale',
      name: "Air Comfort Pro",
      originalPrice: "$159.99",
      price: "$119.99",
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
      discount: "25% OFF"
    },
    {
      id: 'urban-walker-sale',
      name: "Urban Walker",
      originalPrice: "$99.99",
      price: "$69.99",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
      discount: "30% OFF"
    },
    {
      id: 'city-step-sale',
      name: "City Step",
      originalPrice: "$149.99",
      price: "$99.99",
      image: "https://images.unsplash.com/photo-1562183241-b937e95585b6",
      discount: "33% OFF"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-red-600 text-white p-4 rounded-lg mb-8">
        <div className="flex items-center justify-center space-x-2">
          <Tag className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Special Sale - Up to 33% OFF!</h2>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Sale Items</h1>
        <button className="flex items-center space-x-2 px-4 py-2 border rounded-md">
          <Filter className="w-5 h-5" />
          <span>Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full">
              {product.discount}
            </div>
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-gray-400 line-through">{product.originalPrice}</span>
                <span className="text-red-600 font-semibold">{product.price}</span>
              </div>
              <AddToCartButton product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sale;