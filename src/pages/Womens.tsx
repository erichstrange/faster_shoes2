import React from 'react';
import { Filter } from 'lucide-react';
import AddToCartButton from '../components/AddToCartButton';

const Womens = () => {
  const products = [
    {
      id: 'flex-runner-womens',
      name: "Flex Runner",
      price: "$119.99",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
      category: "Running"
    },
    {
      id: 'cloud-step-womens',
      name: "Cloud Step",
      price: "$149.99",
      image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c",
      category: "Casual"
    },
    {
      id: 'sprint-light-womens',
      name: "Sprint Light",
      price: "$169.99",
      image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842",
      category: "Running"
    },
    {
      id: 'city-walker-womens',
      name: "City Walker",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1562183241-b937e95585b6",
      category: "Casual"
    },
    {
      id: 'marathon-elite-womens',
      name: "Marathon Elite",
      price: "$189.99",
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570",
      category: "Running"
    },
    {
      id: 'urban-chic-womens',
      name: "Urban Chic",
      price: "$139.99",
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
      category: "Casual"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Women's Shoes</h1>
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

export default Womens;