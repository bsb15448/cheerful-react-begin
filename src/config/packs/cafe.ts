
import { PackConfig } from "../packsConfig";

export const cafePackConfig: PackConfig = {
  id: "cafe",
  title: "Pack Café",
  description: "Tenues et accessoires pour les cafés et bars",
  image: "/VetementServiceHotellerie/PackCafe.png",
  totalPrice: "299.99",
  discount: "15%",
  availability: "in-stock",
  items: [
    { 
      id: "tablier-cuisine-1", 
      name: "Tablier Barista", 
      description: "Protection élégante avec espace pour accessoires", 
      image: "/VetementDeCuisine/TablierDeChef.jpg",
      price: "89.99",
      isPersonalizable: true
    },
    { 
      id: "veste-hotel-1", 
      name: "Uniforme de Service", 
      description: "Tenue professionnelle élégante pour service en salle", 
      image: "/VetementServiceHotellerie/UniformeDeService.jpg",
      price: "119.99",
      isPersonalizable: true
    },
    { 
      id: "chaussures-cuisine-1", 
      name: "Chaussures Confort", 
      description: "Pour le service de longue durée, confort maximal", 
      image: "/ChausureDeTravail/ChaussureDeCuisine.jpg",
      price: "109.99",
      isPersonalizable: false
    },
  ]
};
