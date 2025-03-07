
import { PackConfig } from "../packsConfig";

export const hotelPackConfig: PackConfig = {
  id: "hotel",
  title: "Pack Hôtel",
  description: "Équipements essentiels pour l'industrie hôtelière",
  image: "/VetementServiceHotellerie/TenueDacceuilHotelBanner.jpg",
  totalPrice: "459.99",
  discount: "15%",
  availability: "in-stock",
  items: [
    { 
      id: "tenue-accueil-1", 
      name: "Tenue d'Accueil", 
      description: "Première impression impeccable avec finitions de qualité", 
      image: "/VetementServiceHotellerie/TenueDacceuilHotelBanner.jpg",
      price: "159.99",
      isPersonalizable: true
    },
    { 
      id: "veste-hotel-1", 
      name: "Uniforme Chambre", 
      description: "Pour le personnel d'entretien, pratique et durable", 
      image: "/VetementServiceHotellerie/UniformeDeService.jpg",
      price: "129.99",
      isPersonalizable: true
    },
    { 
      id: "veste-cuisine-1", 
      name: "Vêtements Restaurant", 
      description: "Pour le restaurant d'hôtel, style et confort", 
      image: "/VetementDeCuisine/VesteDeChef.jpg",
      price: "139.99",
      isPersonalizable: true
    },
  ]
};
