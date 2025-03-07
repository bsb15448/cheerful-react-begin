
import React from 'react';
import { products } from '@/config/products';
import CategoryTemplate from '@/components/categories/CategoryTemplate';

const VetementsBoucher = () => {
  const boucherProducts = products.filter(
    product => product.category === 'vetements-boucher' 
  );

  const categoryData = {
    title: "Vêtements de Boucher",
    description: "Des vêtements professionnels de qualité pour les bouchers",
    bannerImage: "/VetementDeBoulanger&patissier/VesteProBoucher.jpg",
    features: [
      {
        title: "Qualité Premium",
        description: "Matériaux durables et confortables pour un usage professionnel intensif"
      },
      {
        title: "Hygiène Garantie",
        description: "Tissus faciles à nettoyer et conformes aux normes d'hygiène"
      },
      {
        title: "Résistance",
        description: "Conçus pour résister aux conditions de travail des boucheries"
      }
    ],
    products: boucherProducts.map(product => ({
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

export default VetementsBoucher;
