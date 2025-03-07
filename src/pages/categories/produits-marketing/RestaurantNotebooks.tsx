
import React from 'react';
import { products } from '@/config/products';
import CategoryTemplate from '@/components/categories/CategoryTemplate';

const RestaurantNotebooks = () => {
  const restaurantNotebookProducts = products.filter(
    product => product.category === 'produits-marketing' && 
    (product.name.toLowerCase().includes('carnet') || 
     product.description.toLowerCase().includes('restaurant'))
  );

  const categoryData = {
    title: "Carnets Restaurant",
    description: "Solutions personnalisées pour la gestion des commandes en restauration",
    bannerImage: "/ProduitsMarketing/ProduitMarketingBanner.jpg",
    features: [
      {
        title: "Praticité",
        description: "Formats adaptés aux besoins spécifiques de la restauration"
      },
      {
        title: "Personnalisation",
        description: "Intégration de votre logo et de votre identité visuelle"
      },
      {
        title: "Organisation",
        description: "Structure optimisée pour la prise de commandes efficace"
      }
    ],
    products: restaurantNotebookProducts.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.startingPrice),
      image: product.image || '/placeholder.png'
    }))
  };

  return (
    <CategoryTemplate 
      data={categoryData}
      parentPath="/produits-marketing"
      parentName="Produits Marketing"
    />
  );
};

export default RestaurantNotebooks;
