
import { PackConfig } from "../packsConfig";

export const medecinPackConfig: PackConfig = {
  id: "medecin",
  title: "Pack Médical",
  description: "Tenues professionnelles pour personnel médical",
  image: "/VetementDeTravail/BlouseMedical.jpg",
  totalPrice: "349.99",
  discount: "15%",
  availability: "in-stock",
  items: [
    { 
      id: "blouse-medicale-1", 
      name: "Blouse Médicale", 
      description: "Pour les médecins, qualité supérieure antimicrobienne", 
      image: "/VetementDeTravail/BlouseMedical.jpg",
      price: "149.99",
      isPersonalizable: true
    },
    { 
      id: "tunique-medicale-1", 
      name: "Tunique Médicale", 
      description: "Pour les infirmiers, confort et praticité", 
      image: "/VetementDeTravail/TuniqueMedical.png",
      price: "119.99",
      isPersonalizable: true
    },
    { 
      id: "pantalon-medical-1", 
      name: "Pantalon Médical", 
      description: "Confort toute la journée avec poches multiples", 
      image: "/VetementDeTravail/CombinaionDeTravail.jpg",
      price: "99.99",
      isPersonalizable: false
    },
  ]
};
