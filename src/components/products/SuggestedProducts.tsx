
import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/config/products';
import { ProductConfig } from '@/config/products';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

interface SuggestedProductsProps {
  currentProductId: string;
  category?: string;
  limit?: number;
}

const SuggestedProducts = ({ currentProductId, category, limit = 3 }: SuggestedProductsProps) => {
  // Get related products (from same category if available)
  const currentProduct = products.find(p => p.id === currentProductId);
  
  // Filter products from same category, excluding current product
  const relatedProducts = products
    .filter(p => 
      p.id !== currentProductId && 
      (category ? p.category === category : p.category === currentProduct?.category)
    )
    .slice(0, limit);
  
  // If we don't have enough related products, get random products
  const randomProducts = products
    .filter(p => p.id !== currentProductId && !relatedProducts.some(rp => rp.id === p.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.max(0, limit - relatedProducts.length));
  
  // Combine related and random products
  const suggestedProducts = [...relatedProducts, ...randomProducts].slice(0, limit);
  
  if (suggestedProducts.length === 0) return null;

  return (
    <div className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Produits similaires</h2>
        <Link 
          to={`/${currentProduct?.category || 'products'}`}
          className="flex items-center text-primary hover:underline gap-1"
        >
          Voir plus <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suggestedProducts.map((product) => (
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
  );
};

export default SuggestedProducts;
