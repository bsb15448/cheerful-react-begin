
import React from 'react';
import CategoryTemplate from '@/components/categories/CategoryTemplate';
import { products } from '@/config/products';
import { mapCategoryDataForTemplate } from '@/utils/categoryTemplateMapper';

const ProduitsMarketing = () => {
  const marketingProducts = products.filter(
    product => product.type === 'accessoires' && 
    (product.name.toLowerCase().includes('mug') || 
     product.name.toLowerCase().includes('drapeau') ||
     product.name.toLowerCase().includes('carnet') ||
     product.name.toLowerCase().includes('sac'))
  );

  const categoryData = {
    title: "Produits Marketing",
    description: "Des solutions marketing personnalisées pour votre entreprise",
    bannerImage: "/ProduitsMarketing/ProduitMarketingBanner.jpg",
    features: [
      {
        title: "Qualité Premium",
        description: "Matériaux durables et confortables pour un usage professionnel intensif"
      },
      {
        title: "Livraison Rapide",
        description: "Expédition sous 24/48h pour toute la France métropolitaine"
      },
      {
        title: "Satisfaction Garantie",
        description: "Service client disponible 6j/7 pour vous accompagner"
      }
    ],
    products: marketingProducts.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.startingPrice),
      images: product.images || ['/placeholder.png']
    }))
  };

  // Use the mapper to convert data format for CategoryTemplate
  const templateData = mapCategoryDataForTemplate(categoryData);

  return (
    <CategoryTemplate 
      data={templateData}
      parentPath="/metiers"
      parentName="métiers"
    />
  );
};

export default ProduitsMarketing;
