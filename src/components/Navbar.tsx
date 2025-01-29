import React from 'react';
import { ShoppingBag, Menu } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { itemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 md:hidden" />
            <Link to="/" className="ml-4 text-xl font-bold">Faster Shoes</Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/"
              className={`${isActive('/') ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
            >
              Home
            </Link>
            <Link 
              to="/mens"
              className={`${isActive('/mens') ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
            >
              Men
            </Link>
            <Link 
              to="/womens"
              className={`${isActive('/womens') ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
            >
              Women
            </Link>
            <Link 
              to="/sale"
              className={`${isActive('/sale') ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
            >
              Sale
            </Link>
          </div>

          <button 
            className="relative cursor-pointer"
            onClick={() => navigate('/cart')}
          >
            <ShoppingBag className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;