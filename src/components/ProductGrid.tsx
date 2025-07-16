
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { useTranslation } from 'react-i18next';

const ProductGrid = () => {
  const { filteredProducts } = useProducts();
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(9);
  const { t } = useTranslation('productGrid');

  const handleQuickView = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredProducts.length));
  };

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMoreProducts = visibleCount < filteredProducts.length;

  if (filteredProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-16 text-center">
        <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-4">
          {t('noProducts.title')}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          {t('noProducts.description')}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Section Title */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4 font-montserrat tracking-wide">
          {t('title')}
        </h2>
        <div className="w-20 sm:w-24 h-px bg-gray-300 mx-auto"></div>
      </div>

      {/* Products Grid - Fixed 3 columns layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={() => handleQuickView(product.id)}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreProducts && (
        <div className="text-center">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            size="lg"
            className="px-6 sm:px-8 py-2 sm:py-3 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-medium tracking-wide text-sm uppercase transition-all duration-300"
          >
            {t('loadMore')} ({filteredProducts.length - visibleCount} {t('remaining')})
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
