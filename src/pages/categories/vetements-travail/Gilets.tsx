
import React from 'react';
import { products } from '@/config/products';
import CategoryPage from '@/components/categories/CategoryPage';

const Gilets = () => {
  // Get products of type 'gilets'
  const giletProducts = products.filter(
    product => product.type === 'gilets'
  );

  return (
    <CategoryPage />
  );
};

export default Gilets;
