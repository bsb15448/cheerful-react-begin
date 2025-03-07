
import { PackConfig } from "../packsConfig";

export const restaurantPackConfig: PackConfig = {
  id: "restaurant",
  title: "Pack Restaurant",
  description: "Équipement complet pour les professionnels de la restauration",
  image: "/VetementDeCuisine/Pack_chef.png",
  totalPrice: "399.99",
  discount: "15%",
  availability: "in-stock",
  items: [
    { 
      id: "veste-cuisine-1", 
      name: "Veste de Chef", 
      description: "Veste professionnelle pour cuisine avec finitions premium", 
      image: "/VetementDeCuisine/VesteDeChef.jpg",
      price: "129.99",
      isPersonalizable: true
    },
    { 
      id: "tablier-cuisine-1", 
      name: "Tablier Professionnel", 
      description: "Protection robuste pour la cuisine avec poches multiples", 
      image: "/VetementDeCuisine/TablierDeChef.jpg",
      price: "79.99",
      isPersonalizable: true
    },
    { 
      id: "pantalon-cuisine-1", 
      name: "Pantalon de Cuisine", 
      description: "Confort et durabilité pour un usage intensif", 
      image: "/VetementDeCuisine/PontalonDeChef.jpg",
      price: "99.99",
      isPersonalizable: false
    },
    { 
      id: "chaussures-cuisine-1", 
      name: "Chaussures de Sécurité", 
      description: "Antidérapantes et résistantes pour la sécurité en cuisine", 
      image: "/ChausureDeTravail/ChaussureDeCuisine.jpg",
      price: "129.99",
      isPersonalizable: false
    },
  ]
};
