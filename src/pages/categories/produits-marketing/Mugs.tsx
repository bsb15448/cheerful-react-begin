
import React from 'react';
import CategoryTemplate from '../../../components/categories/CategoryTemplate';
import { mapCategoryContent } from '../../../utils/categoryTemplateMapper';

const Mugs = () => {
  const categoryContent = {
    title: "Mugs Personnalisés",
    description: "Découvrez notre collection de mugs personnalisables pour votre entreprise ou événement. Nos mugs de haute qualité sont parfaits pour les cadeaux d'entreprise, les événements promotionnels ou simplement pour renforcer l'image de votre marque au quotidien.",
    bannerImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    features: [
      {
        title: "Personnalisation complète",
        description: "Ajoutez votre logo, slogan ou design sur nos mugs de qualité supérieure."
      },
      {
        title: "Différentes tailles et styles",
        description: "Choisissez parmi notre gamme de mugs classiques, thermos ou tasses à espresso."
      },
      {
        title: "Matériaux premium",
        description: "Nos mugs sont fabriqués avec des matériaux durables et sont adaptés au lave-vaisselle."
      }
    ],
    products: [
      {
        id: "mug-01",
        name: "Mug Classique",
        description: "Mug en céramique personnalisable avec votre logo ou message",
        price: 8.99,
        images: ["/products/mugs/mug-classique.jpg", "/products/mugs/mug-classique-2.jpg"]
      },
      {
        id: "mug-02",
        name: "Thermos Personnalisé",
        description: "Thermos isotherme en acier inoxydable pour garder vos boissons chaudes ou froides",
        price: 19.99,
        images: ["/products/mugs/thermos.jpg"]
      },
      {
        id: "mug-03",
        name: "Set de 4 Mugs",
        description: "Ensemble de 4 mugs assortis avec personnalisation identique",
        price: 29.99,
        images: ["/products/mugs/set-mugs.jpg"]
      },
      {
        id: "mug-04",
        name: "Mug Magique",
        description: "Mug qui change de couleur avec la chaleur pour révéler votre design",
        price: 12.99,
        images: ["/products/mugs/mug-magique.jpg"]
      }
    ]
  };

  // Map the content to match CategoryTemplate expectations
  const mappedContent = mapCategoryContent(categoryContent);

  return <CategoryTemplate {...mappedContent} />;
};

export default Mugs;
