
import React from 'react';
import { products } from '@/config/products';
import CategoryTemplate from '@/components/categories/CategoryTemplate';

const VetementsEsthetique = () => {
  const esthetiqueProducts = products.filter(
    product => product.category === 'vetements-esthetique' || product.category === 'vetements-medicaux' 
  );

  const categoryData = {
    title: "Vêtements d'Esthétique",
    description: "Des vêtements professionnels élégants pour les métiers de l'esthétique",
    bannerImage: "/VetementDeTravail/BlouseMedical.jpg",
    features: [
      {
        title: "Design Élégant",
        description: "Coupe moderne et professionnelle adaptée aux métiers de l'esthétique"
      },
      {
        title: "Confort Optimal",
        description: "Tissus légers et respirants pour un confort toute la journée"
      },
      {
        title: "Praticité",
        description: "Poches et détails fonctionnels pour faciliter votre travail quotidien"
      }
    ],
    products: esthetiqueProducts.map(product => ({
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
      parentPath="/metiers"
      parentName="métiers"
    />
  );
};

export default VetementsEsthetique;
