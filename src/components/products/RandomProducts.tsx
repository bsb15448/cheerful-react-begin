
import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/config/products';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

interface RandomProductsProps {
  currentProductId: string;
  title?: string;
  limit?: number;
}

const RandomProducts = ({ currentProductId, title = "Vous pourriez aussi aimer", limit = 3 }: RandomProductsProps) => {
  // Get random products, excluding current product
  const randomProducts = products
    .filter(p => p.id !== currentProductId)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
  
  if (randomProducts.length === 0) return null;

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <Link 
            to="/metiers"
            className="flex items-center text-primary hover:underline gap-1"
          >
            Explorer tous les produits <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {randomProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.startingPrice}
              image={product.image || "/placeholder.png"}
              isPersonalizable={product.isPersonalizable}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RandomProducts;
