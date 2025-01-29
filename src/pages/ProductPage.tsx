import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { products } from '../data/products';
import AddToCartButton from '../components/AddToCartButton';

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showSizes, setShowSizes] = useState(false);
  const [showDescription, setShowDescription] = useState(true);

  const product = products.find(p => p.id === productId);

  if (!product) {
    navigate('/');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-lg"
          />
          <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-600">(124 reviews)</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{product.price}</p>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold mb-3">Color</h3>
            <div className="flex space-x-3">
              {product.colors.map(color => (
                <button
                  key={color.hex}
                  onClick={() => setSelectedColor(color.hex)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === color.hex ? 'border-blue-600' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="relative">
            <button
              onClick={() => setShowSizes(!showSizes)}
              className="w-full flex items-center justify-between border rounded-lg px-4 py-2"
            >
              <span>{selectedSize ? `Size: ${selectedSize}` : 'Select Size'}</span>
              {showSizes ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {showSizes && (
              <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg">
                <div className="grid grid-cols-3 gap-2 p-4">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setShowSizes(false);
                      }}
                      className={`px-4 py-2 rounded ${
                        selectedSize === size
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart */}
          <AddToCartButton product={product} />

          {/* Description */}
          <div>
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="w-full flex items-center justify-between py-4 border-b"
            >
              <span className="font-semibold">Description</span>
              {showDescription ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {showDescription && (
              <div className="py-4 space-y-4">
                <p className="text-gray-600">{product.description}</p>
                <h4 className="font-semibold">Features:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;