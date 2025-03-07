
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/config/products';
import { toast } from '@/components/ui/use-toast';
import ProductCard from '@/components/products/ProductCard';
import { ProductConfig } from '@/config/products';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<ProductConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWishlistItems = () => {
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        try {
          const wishlistIds = JSON.parse(storedWishlist) as string[];
          const items = products.filter(product => wishlistIds.includes(product.id));
          setWishlistItems(items);
        } catch (error) {
          console.error('Error loading wishlist:', error);
          setWishlistItems([]);
        }
      } else {
        setWishlistItems([]);
      }
      setIsLoading(false);
    };

    loadWishlistItems();
  }, []);

  const removeFromWishlist = (productId: string) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);
    
    const wishlistIds = updatedWishlist.map(item => item.id);
    localStorage.setItem('wishlist', JSON.stringify(wishlistIds));
    
    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de vos favoris",
      className: "bg-gray-800 text-white",
    });
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem('wishlist');
    toast({
      title: "Liste de favoris vidée",
      description: "Tous les produits ont été retirés de vos favoris",
      className: "bg-gray-800 text-white",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 hover:bg-gray-100"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Mes Favoris
          <Heart className="h-6 w-6 text-red-500" />
        </h1>
        
        {wishlistItems.length > 0 && (
          <Button 
            variant="outline" 
            onClick={clearWishlist}
            className="text-red-500 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Vider la liste
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-8 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
          </div>
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="text-center py-16 space-y-6">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <Heart className="h-10 w-10 text-gray-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Votre liste de favoris est vide</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Ajoutez des produits à votre liste de favoris pour les retrouver facilement plus tard.
            </p>
          </div>
          <Button onClick={() => navigate('/metiers')} className="mt-4">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Découvrir nos produits
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.startingPrice}
                image={product.image || "/placeholder.png"}
                isPersonalizable={product.isPersonalizable}
              />
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50"
                title="Retirer des favoris"
              >
                <Heart className="h-5 w-5 fill-red-500 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
