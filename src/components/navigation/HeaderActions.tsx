
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, ClipboardList } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/components/cart/CartProvider';

interface HeaderActionsProps {
  favoritesCount?: number;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ 
  favoritesCount
}) => {
  const navigate = useNavigate();
  const { items } = useCartStore();
  const cartCount = items.length;
  const [wishlistCount, setWishlistCount] = useState(0);
  
  useEffect(() => {
    // Load wishlist count from localStorage
    const loadWishlistCount = () => {
      const wishlist = localStorage.getItem('wishlist');
      if (wishlist) {
        try {
          const wishlistItems = JSON.parse(wishlist);
          setWishlistCount(Array.isArray(wishlistItems) ? wishlistItems.length : 0);
        } catch (error) {
          console.error('Error parsing wishlist:', error);
          setWishlistCount(0);
        }
      }
    };

    loadWishlistCount();
    
    // Add event listener for storage changes
    const handleStorageChange = () => {
      loadWishlistCount();
    };
    
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('wishlistUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('wishlistUpdated', handleStorageChange);
    };
  }, []);
  
  return (
    <div className="flex items-center gap-6">
      <button
        onClick={() => navigate('/wishlist')}
        className="hidden md:flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
      >
        <div className="relative">
          <Heart className="h-6 w-6" />
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </div>
        <span className="text-sm font-medium">Favoris</span>
      </button>

      <button
        onClick={() => navigate('/cart')}
        className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
      >
        <div className="relative">
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-sm font-medium hidden md:inline">Panier</span>
      </button>

      <button
        onClick={() => navigate('/devis')}
        className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-md hover:bg-gray-900/90 transition-colors shadow-sm"
      >
        <ClipboardList className="h-5 w-5" />
        <span className="font-medium">DEMANDE DE DEVIS</span>
      </button>
    </div>
  );
};

export default HeaderActions;
