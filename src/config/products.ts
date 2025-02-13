
export interface ProductConfig {
  id: string;
  name: string;
  description: string;
  startingPrice: string;
  image?: string;
  presentationImage?: string;
  category: string;
  type: string;
  isPersonalizable: boolean;
}

export const products: ProductConfig[] = [
  // Vêtements Cuisine
  {
    id: "veste-cuisine-1",
    name: "Veste de Chef Premium",
    description: "Veste professionnelle pour chef, confortable et élégante",
    startingPrice: "89.99",
    image: "/ProductImages/BlackButtonsTshirt.png",
    category: "vetements-cuisine",
    type: "vestes",
    isPersonalizable: true
  },
  {
    id: "tablier-cuisine-1",
    name: "Tablier Professionnel Cuisine",
    description: "Tablier robuste pour un usage intensif en cuisine",
    startingPrice: "45.99",
    image: "/ProductImages/BlackTablier.png",
    category: "vetements-cuisine",
    type: "tabliers",
    isPersonalizable: true
  },

  // Vêtements Boucher
  {
    id: "veste-boucher-1",
    name: "Veste de Boucher Classic",
    description: "Veste traditionnelle de boucher, qualité supérieure",
    startingPrice: "79.99",
    image: "/ProductImages/RedLongSleavesShirt.png",
    category: "vetements-boucher",
    type: "vestes",
    isPersonalizable: true
  },
  {
    id: "tablier-boucher-1",
    name: "Tablier de Boucher Pro",
    description: "Tablier résistant aux taches et coupures",
    startingPrice: "55.99",
    image: "/ProductImages/BlackTablier.png",
    category: "vetements-boucher",
    type: "tabliers",
    isPersonalizable: true
  },

  // Vêtements Médicaux
  {
    id: "blouse-medicale-1",
    name: "Blouse Médicale Premium",
    description: "Blouse médicale confortable et professionnelle",
    startingPrice: "69.99",
    image: "/ProductImages/BlackButtonsTshirt.png",
    category: "vetements-medicaux",
    type: "blouses",
    isPersonalizable: true
  },
  {
    id: "pantalon-medical-1",
    name: "Pantalon Médical Confort",
    description: "Pantalon médical ergonomique et respirant",
    startingPrice: "49.99",
    image: "/ProductImages/BlackButtonsTshirt.png",
    category: "vetements-medicaux",
    type: "pantalons",
    isPersonalizable: true
  },

  // Vêtements Hôtellerie
  {
    id: "veste-hotel-1",
    name: "Veste Service Hôtelier",
    description: "Veste élégante pour le service hôtelier",
    startingPrice: "89.99",
    image: "/ProductImages/BlackButtonsTshirt.png",
    category: "vetements-hotellerie",
    type: "vestes",
    isPersonalizable: true
  },
  {
    id: "tablier-hotel-1",
    name: "Tablier Service Restaurant",
    description: "Tablier élégant pour le service en restaurant",
    startingPrice: "39.99",
    image: "/ProductImages/BlackTablier.png",
    category: "vetements-hotellerie",
    type: "tabliers",
    isPersonalizable: true
  },

  // Vêtements de Travail
  {
    id: "combinaison-travail-1",
    name: "Combinaison de Travail Pro",
    description: "Combinaison résistante pour tous types de travaux",
    startingPrice: "99.99",
    image: "/ProductImages/BlackButtonsTshirt.png",
    category: "vetements-travail",
    type: "combinaisons",
    isPersonalizable: true
  },
  {
    id: "veste-travail-1",
    name: "Veste de Travail Multipoches",
    description: "Veste pratique avec nombreux rangements",
    startingPrice: "79.99",
    image: "/ProductImages/BlackButtonsTshirt.png",
    category: "vetements-travail",
    type: "vestes",
    isPersonalizable: true
  },

  // Chaussures de Sécurité
  {
    id: "chaussures-securite-1",
    name: "Chaussures de Sécurité S3",
    description: "Chaussures de sécurité confortables avec embout acier",
    startingPrice: "89.99",
    image: "/ProductImages/BlackButtonsTshirt.png",
    category: "chaussures",
    type: "securite",
    isPersonalizable: true
  },
  {
    id: "bottes-securite-1",
    name: "Bottes de Sécurité Pro",
    description: "Bottes de sécurité étanches et résistantes",
    startingPrice: "99.99",
    image: "/ProductImages/BlackButtonsTshirt.png",
    category: "chaussures",
    type: "bottes",
    isPersonalizable: true
  },

  // Produits Marketing
  {
    id: "mug-1",
    name: "Mug Personnalisé Premium",
    description: "Mug élégant pour votre café quotidien",
    startingPrice: "15.99",
    image: "/ProductImages/BlackMug.png",
    category: "produits-marketing",
    type: "accessoires",
    isPersonalizable: true
  },
  {
    id: "notebook-1",
    name: "Carnet Professionnel",
    description: "Carnet élégant pour vos notes quotidiennes",
    startingPrice: "19.99",
    image: "/ProductImages/WhiteNotebook.png",
    category: "produits-marketing",
    type: "accessoires",
    isPersonalizable: true
  },
  {
    id: "flag-1",
    name: "Drapeau Publicitaire",
    description: "Drapeau publicitaire haute visibilité",
    startingPrice: "45.99",
    image: "/ProductImages/RedMarketingFlag.png",
    category: "produits-marketing",
    type: "accessoires",
    isPersonalizable: true
  },
  {
    id: "bag-1",
    name: "Sac Shopping Premium",
    description: "Sac réutilisable personnalisable",
    startingPrice: "12.99",
    image: "/ProductImages/YellowSac.png",
    category: "produits-marketing",
    type: "accessoires",
    isPersonalizable: true
  }
];
