import React from 'react';
import { Filter } from 'lucide-react';
import AddToCartButton from '../components/AddToCartButton';

const Mens = () => {
  const products = [
    {
      id: 'sprint-elite-x-mens',
      name: "Sprint Elite X",
      price: "$129.99",
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570",
      category: "Running"
    },
    {
      id: 'air-comfort-pro-mens',
      name: "Air Comfort Pro",
      price: "$159.99",
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
      category: "Casual"
    },
    {
      id: 'trail-blazer-mens',
      name: "Trail Blazer",
      price: "$189.99",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      category: "Running"
    },
    {
      id: 'urban-walker-mens',
      name: "Urban Walker",
      price: "$99.99",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
      category: "Casual"
    },
    {
      id: 'marathon-master-mens',
      name: "Marathon Master",
      price: "$199.99",
      image: "https://images.unsplash.com/photo-1556048219-bb6978360b84",
      category: "Running"
    },
    {
      id: 'street-style-pro-mens',
      name: "Street Style Pro",
      price: "$149.99",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
      category: "Casual"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Men's Shoes</h1>
        <button className="flex items-center space-x-2 px-4 py-2 border rounded-md">
          <Filter className="w-5 h-5" />
          <span>Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <span className="text-sm text-blue-600">{product.category}</span>
              <h3 className="font-semibold text-lg mt-1">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
              <AddToCartButton product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mens;