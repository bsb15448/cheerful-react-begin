
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

const ProductCard = ({ id, name, description, price, image }: ProductCardProps) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden border hover:shadow-lg transition-all duration-300">
      {/* Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          DÉSTOCKAGE -30%
        </span>
      </div>
      
      <Link to={`/product/${id}`} className="block">
        <div className="aspect-square bg-gray-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold mb-2">{name}</h3>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
        </Link>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">À partir de</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">{price} €</span>
              <span className="text-sm text-gray-500 line-through">
                {(parseFloat(price) * 1.3).toFixed(2)} €
              </span>
            </div>
          </div>
          <Button asChild>
            <Link to="/personalization">Personnaliser</Link>
          </Button>
        </div>
        {/* Reviews */}
        <div className="mt-3 flex items-center gap-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-4 h-4 text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">(4 avis)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
