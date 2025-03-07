
import React from 'react';
import { products } from '@/config/products';
import CategoryTemplate from '@/components/categories/CategoryTemplate';

const BusinessCards = () => {
  const businessCardProducts = products.filter(
    product => product.category === 'produits-marketing' && 
    (product.name.toLowerCase().includes('carte') || 
     product.description.toLowerCase().includes('carte de visite'))
  );

  const categoryData = {
    title: "Cartes de Visite",
    description: "Cartes de visite professionnelles personnalisées pour votre entreprise",
    bannerImage: "/ProduitsMarketing/ProduitMarketingBanner.jpg",
    features: [
      {
        title: "Design Professionnel",
        description: "Designs modernes et élégants adaptés à votre image de marque"
      },
      {
        title: "Qualité d'Impression",
        description: "Impression haute définition sur papier premium"
      },
      {
        title: "Personnalisation Complète",
        description: "Options multiples pour créer des cartes uniques qui vous ressemblent"
      }
    ],
    products: businessCardProducts.map(product => ({
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

export default BusinessCards;
