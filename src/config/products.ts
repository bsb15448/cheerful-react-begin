export interface ProductConfig {
  id: string;
  name: string;
  description: string;
  startingPrice: string;
  image?: string;
  presentationImage?: string;
  category: string;
  type: string;
  metier_type: string;
  isPersonalizable: boolean;
  availableColors?: string[];
}

export const products: ProductConfig[] = [
  // Vêtements Cuisine
  {
    id: "veste-cuisine-1",
    name: "Veste de Chef Premium",
    description: "Veste professionnelle pour chef, confortable et élégante",
    startingPrice: "89.99",
    image: "/CommingSoon.png",
    category: "vetements-cuisine",
    type: "vestes",
    metier_type: "Restauration",
    isPersonalizable: true,
    availableColors: ["#000000", "#ffffff", "#1B2C4B"]
  },
  {
    id: "tablier-cuisine-1",
    name: "Tablier Professionnel Cuisine",
    description: "Tablier robuste pour un usage intensif en cuisine",
    startingPrice: "45.99",
    image: "/CommingSoon.png",
    category: "vetements-cuisine",
    type: "tabliers",
    metier_type: "Restauration",
    isPersonalizable: false,
    availableColors: ["#000000", "#ffffff"]
  },
  {
    id: "pantalon-cuisine-1",
    name: "Pantalon de Chef Classic",
    description: "Pantalon de cuisine confortable et résistant aux taches",
    startingPrice: "59.99",
    image: "/CommingSoon.png",
    category: "vetements-cuisine",
    type: "pantalons",
    metier_type: "Restauration",
    isPersonalizable: false,
    availableColors: ["#000000", "#1B2C4B"]
  },

  // Vêtements Boulanger
  {
    id: "veste-boulanger-1",
    name: "Veste de Boulanger Classic",
    description: "Veste traditionnelle de boulanger en coton respirant",
    startingPrice: "75.99",
    image: "/CommingSoon.png",
    category: "vetements-boulanger",
    type: "vestes",
    metier_type: "Restauration",
    isPersonalizable: true,
    availableColors: ["#ffffff", "#1B2C4B"]
  },
  {
    id: "tablier-boulanger-1",
    name: "Tablier de Boulanger Pro",
    description: "Tablier professionnel résistant à la farine",
    startingPrice: "49.99",
    image: "/CommingSoon.png",
    category: "vetements-boulanger",
    type: "tabliers",
    metier_type: "Restauration",
    isPersonalizable: true,
    availableColors: ["#000000", "#ffffff", "#1B2C4B"]
  },

  // Vêtements Boucher
  {
    id: "veste-boucher-1",
    name: "Veste de Boucher Classic",
    description: "Veste traditionnelle de boucher, qualité supérieure",
    startingPrice: "79.99",
    image: "/CommingSoon.png",
    category: "vetements-boucher",
    type: "vestes",
    metier_type: "Industrie",
    isPersonalizable: true,
    availableColors: ["#ffffff", "#DC2626"]
  },
  {
    id: "tablier-boucher-1",
    name: "Tablier de Boucher Pro",
    description: "Tablier résistant aux taches et coupures",
    startingPrice: "55.99",
    image: "/CommingSoon.png",
    category: "vetements-boucher",
    type: "tabliers",
    metier_type: "Industrie",
    isPersonalizable: true,
    availableColors: ["#000000", "#DC2626"]
  },
  {
    id: "accessoire-boucher-1",
    name: "Manchette de Protection",
    description: "Accessoire de protection pour bouchers professionnels",
    startingPrice: "29.99",
    image: "/CommingSoon.png",
    category: "vetements-boucher",
    type: "accessoires",
    metier_type: "Industrie",
    isPersonalizable: false,
    availableColors: ["#ffffff"]
  },

  // Vêtements Esthétique
  {
    id: "blouse-esthetique-1",
    name: "Blouse Esthétique Élégante",
    description: "Blouse professionnelle pour esthéticiennes",
    startingPrice: "65.99",
    image: "/CommingSoon.png",
    category: "vetements-esthetique",
    type: "blouses",
    metier_type: "Beauté",
    isPersonalizable: true,
    availableColors: ["#ffffff", "#FFDEE2"]
  },
  {
    id: "tunique-esthetique-1",
    name: "Tunique Esthétique Moderne",
    description: "Tunique confortable pour les professionnels de la beauté",
    startingPrice: "59.99",
    image: "/CommingSoon.png",
    category: "vetements-esthetique",
    type: "tuniques",
    metier_type: "Beauté",
    isPersonalizable: true,
    availableColors: ["#ffffff", "#FFDEE2", "#D3E4FD"]
  },
  {
    id: "accessoire-esthetique-1",
    name: "Bandeau Spa Pro",
    description: "Bandeau ajustable pour professionnels de l'esthétique",
    startingPrice: "19.99",
    image: "/CommingSoon.png",
    category: "vetements-esthetique",
    type: "accessoires",
    metier_type: "Beauté",
    isPersonalizable: true,
    availableColors: ["#ffffff", "#FFDEE2"]
  },

  // Vêtements Médicaux
  {
    id: "blouse-medicale-1",
    name: "Blouse Médicale Premium",
    description: "Blouse médicale confortable et professionnelle",
    startingPrice: "69.99",
    image: "/CommingSoon.png",
    category: "vetements-medicaux",
    type: "blouses",
    metier_type: "Médical",
    isPersonalizable: true,
    availableColors: ["#ffffff", "#D3E4FD"]
  },
  {
    id: "tunique-medicale-1",
    name: "Tunique Médicale Confort",
    description: "Tunique médicale ergonomique et respirante",
    startingPrice: "59.99",
    image: "/CommingSoon.png",
    category: "vetements-medicaux",
    type: "tuniques",
    metier_type: "Médical",
    isPersonalizable: true,
    availableColors: ["#ffffff", "#D3E4FD", "#E5DEFF"]
  },
  {
    id: "pantalon-medical-1",
    name: "Pantalon Médical Stretch",
    description: "Pantalon médical confortable avec taille élastique",
    startingPrice: "49.99",
    image: "/CommingSoon.png",
    category: "vetements-medicaux",
    type: "pantalons",
    metier_type: "Médical",
    isPersonalizable: true,
    availableColors: ["#ffffff", "#D3E4FD"]
  },

  // Vêtements Hôtellerie
  {
    id: "veste-hotel-1",
    name: "Veste Service Hôtelier",
    description: "Veste élégante pour le service hôtelier",
    startingPrice: "89.99",
    image: "/CommingSoon.png",
    category: "vetements-hotellerie",
    type: "service",
    metier_type: "Transport",
    isPersonalizable: true,
    availableColors: ["#000000", "#1B2C4B"]
  },
  {
    id: "tablier-hotel-1",
    name: "Tablier Service Restaurant",
    description: "Tablier élégant pour le service en restaurant",
    startingPrice: "39.99",
    image: "/CommingSoon.png",
    category: "vetements-hotellerie",
    type: "service",
    metier_type: "Transport",
    isPersonalizable: true,
    availableColors: ["#000000", "#1B2C4B"]
  },
  {
    id: "tenue-accueil-1",
    name: "Tenue d'Accueil Premium",
    description: "Ensemble professionnel pour personnel d'accueil",
    startingPrice: "119.99",
    image: "/CommingSoon.png",
    category: "vetements-hotellerie",
    type: "accueil",
    metier_type: "Transport",
    isPersonalizable: true,
    availableColors: ["#000000", "#1B2C4B"]
  },

  // Vêtements de Travail
  {
    id: "combinaison-travail-1",
    name: "Combinaison de Travail Pro",
    description: "Combinaison résistante pour tous types de travaux",
    startingPrice: "99.99",
    image: "/CommingSoon.png",
    category: "vetements-travail",
    type: "combinaisons",
    metier_type: "Bâtiment",
    isPersonalizable: true,
    availableColors: ["#000000", "#1B2C4B", "#DC2626"]
  },
  {
    id: "veste-travail-1",
    name: "Veste de Travail Multipoches",
    description: "Veste pratique avec nombreux rangements",
    startingPrice: "79.99",
    image: "/CommingSoon.png",
    category: "vetements-travail",
    type: "vestes",
    metier_type: "Bâtiment",
    isPersonalizable: true,
    availableColors: ["#000000", "#1B2C4B"]
  },
  {
    id: "blouse-travail-1",
    name: "Blouse de Laboratoire Premium",
    description: "Blouse professionnelle pour laboratoires et industries",
    startingPrice: "65.99",
    image: "/CommingSoon.png",
    category: "vetements-travail",
    type: "blouses",
    metier_type: "Industrie",
    isPersonalizable: true,
    availableColors: ["#ffffff"]
  },
  {
    id: "tunique-travail-1",
    name: "Tunique Professionnelle",
    description: "Tunique confortable pour environnement de travail",
    startingPrice: "59.99",
    image: "/CommingSoon.png",
    category: "vetements-travail",
    type: "tuniques",
    metier_type: "Industrie",
    isPersonalizable: true,
    availableColors: ["#ffffff", "#1B2C4B"]
  },

  // Chaussures
  {
    id: "chaussures-cuisine-1",
    name: "Chaussures Antidérapantes Cuisine",
    description: "Chaussures professionnelles pour cuisine, confortables et sécurisées",
    startingPrice: "79.99",
    image: "/CommingSoon.png",
    category: "chaussures",
    type: "cuisine",
    metier_type: "Restauration",
    isPersonalizable: false,
    availableColors: ["#000000"]
  },
  {
    id: "chaussures-securite-1",
    name: "Chaussures de Sécurité S3",
    description: "Chaussures de sécurité confortables avec embout acier",
    startingPrice: "89.99",
    image: "/CommingSoon.png",
    category: "chaussures",
    type: "industrie",
    metier_type: "Sécurité",
    isPersonalizable: true,
    availableColors: ["#000000", "#1B2C4B"]
  },
  {
    id: "bottes-securite-1",
    name: "Bottes de Sécurité Pro",
    description: "Bottes de sécurité étanches et résistantes",
    startingPrice: "99.99",
    image: "/CommingSoon.png",
    category: "chaussures",
    type: "industrie",
    metier_type: "Sécurité",
    isPersonalizable: true,
    availableColors: ["#000000", "#DC2626"]
  },

  // Produits Marketing
  {
    id: "drapeau-marketing-1",
    name: "Drapeau Publicitaire",
    description: "Drapeau personnalisable pour votre communication",
    startingPrice: "49.99",
    image: "/CommingSoon.png",
    category: "produits-marketing",
    type: "drapeaux",
    metier_type: "Marketing",
    isPersonalizable: true,
    availableColors: ["#DC2626", "#ffffff"]
  },
  {
    id: "mug-marketing-1",
    name: "Mug Personnalisable",
    description: "Mug de qualité pour votre communication",
    startingPrice: "12.99",
    image: "/CommingSoon.png",
    category: "produits-marketing",
    type: "mugs",
    metier_type: "Marketing",
    isPersonalizable: true,
    availableColors: ["#000000", "#ffffff"]
  },
  {
    id: "carnet-marketing-1",
    name: "Carnet Personnalisable",
    description: "Carnet professionnel avec votre logo",
    startingPrice: "9.99",
    image: "/CommingSoon.png",
    category: "produits-marketing",
    type: "carnets",
    metier_type: "Marketing",
    isPersonalizable: true,
    availableColors: ["#ffffff"]
  },
  {
    id: "sac-marketing-1",
    name: "Sac Personnalisable",
    description: "Sac en tissu avec votre design",
    startingPrice: "7.99",
    image: "/CommingSoon.png",
    category: "produits-marketing",
    type: "sacs",
    metier_type: "Marketing",
    isPersonalizable: true,
    availableColors: ["#ffffff", "#FFFF00"]
  },

  // Add new Carte Visites product
  {
    id: "carte-visites-1",
    name: "Cartes de Visite Personnalisées",
    description: "Cartes de visite professionnelles sur mesure",
    startingPrice: "29.99",
    image: "/SubItems/CarteVisites.png",
    category: "produits-marketing",
    type: "cartes-visite",
    metier_type: "Marketing",
    isPersonalizable: true,
    availableColors: ["#ffffff"]
  },
  
  // Carnets Personalisables products
  {
    id: "notebook-perso-1",
    name: "Carnet Personnalisable Premium",
    description: "Carnet haut de gamme personnalisable pour entreprises",
    startingPrice: "14.99",
    image: "/SubItems/NotebookPersonalisable.png",
    category: "produits-marketing",
    type: "carnets",
    metier_type: "Marketing",
    isPersonalizable: true,
    availableColors: ["#ffffff", "#000000"]
  },
  
  // Carnets Restaurant products
  {
    id: "notebook-resto-1",
    name: "Carnet Restaurant Thématique",
    description: "Carnets personnalisés adaptés au secteur de la restauration",
    startingPrice: "19.99",
    image: "/SubItems/NotebookRestaurent.png",
    category: "produits-marketing",
    type: "carnets-restaurant",
    metier_type: "Marketing",
    isPersonalizable: true,
    availableColors: ["#ffffff", "#1B2C4B"]
  },
  
  // Adding one more product to each new subcategory for better display
  {
    id: "carte-visites-2",
    name: "Cartes de Visite Premium",
    description: "Cartes de visite premium avec finition de luxe",
    startingPrice: "39.99",
    image: "/SubItems/CarteVisites.png",
    category: "produits-marketing",
    type: "cartes-visite",
    metier_type: "Marketing",
    isPersonalizable: true,
    availableColors: ["#ffffff", "#000000", "#1B2C4B"]
  },
  
  {
    id: "notebook-resto-2",
    name: "Carnet Menu Élégant",
    description: "Carnet menu avec finition élégante pour restaurants haut de gamme",
    startingPrice: "24.99",
    image: "/SubItems/NotebookRestaurent.png",
    category: "produits-marketing",
    type: "carnets-restaurant",
    metier_type: "Marketing",
    isPersonalizable: true,
    availableColors: ["#ffffff", "#1B2C4B", "#000000"]
  },
  // Vêtements de Travail - Vestes
  {
    id: "veste-travail-multipoches",
    name: "Veste de Travail Multipoches",
    description: "Veste professionnelle avec multiples poches et renforts aux coudes",
    startingPrice: "79.99",
    image: "/VetementDeTravail/veste-travail-multipoches.png",
    presentationImage: "/VetementDeTravail/veste-travail-multipoches-worn.png",
    category: "vetements-travail",
    type: "vestes",
    metier_type: "Bâtiment",
    isPersonalizable: true,
    availableColors: ["#000000", "#1B2C4B", "#DC2626"]
  },
  {
    id: "veste-travail-haute-visibilite",
    name: "Veste de Travail Haute Visibilité",
    description: "Veste de sécurité haute visibilité avec bandes réfléchissantes",
    startingPrice: "89.99",
    image: "/VetementDeTravail/veste-travail-visibilite.png",
    presentationImage: "/VetementDeTravail/veste-travail-visibilite-worn.png",
    category: "vetements-travail",
    type: "vestes",
    metier_type: "Bâtiment",
    isPersonalizable: true,
    availableColors: ["#FFFF00", "#FF9900"]
  },
  {
    id: "veste-travail-softshell",
    name: "Veste de Travail Softshell",
    description: "Veste softshell imperméable et coupe-vent pour un confort optimal",
    startingPrice: "84.99",
    image: "/VetementDeTravail/veste-travail-softshell.png",
    presentationImage: "/VetementDeTravail/veste-travail-softshell-worn.png",
    category: "vetements-travail",
    type: "vestes",
    metier_type: "Bâtiment",
    isPersonalizable: true,
    availableColors: ["#000000", "#1B2C4B", "#DC2626"]
  },
  {
    id: "veste-travail-legere",
    name: "Veste de Travail Légère",
    description: "Veste professionnelle légère idéale pour la mi-saison",
    startingPrice: "69.99",
    image: "/VetementDeTravail/veste-travail-legere.png",
    presentationImage: "/VetementDeTravail/veste-travail-legere-worn.png",
    category: "vetements-travail",
    type: "vestes",
    metier_type: "Bâtiment",
    isPersonalizable: true,
    availableColors: ["#000000", "#1B2C4B", "#808080"]
  },
  // Vêtements de Travail - Gilets
  {
    id: "gilet-travail-multipoches",
    name: "Gilet de Travail Multipoches",
    description: "Gilet professionnel avec multiples poches et renforts, parfait pour une liberté de mouvement optimale",
    startingPrice: "64.99",
    image: "/VetementDeTravail/gilet-travail-multipoches.png",
    presentationImage: "/VetementDeTravail/gilet-travail-multipoches-worn.png",
    category: "vetements-travail",
    type: "gilets",
    metier_type: "Bâtiment",
    isPersonalizable: true,
    availableColors: ["#000000", "#1B2C4B", "#DC2626"]
  },
  {
    id: "gilet-travail-haute-visibilite",
    name: "Gilet de Travail Haute Visibilité",
    description: "Gilet de sécurité haute visibilité avec bandes réfléchissantes pour une protection maximale",
    startingPrice: "69.99",
    image: "/VetementDeTravail/gilet-travail-visibilite.png",
    presentationImage: "/VetementDeTravail/gilet-travail-visibilite-worn.png",
    category: "vetements-travail",
    type: "gilets",
    metier_type: "Bâtiment",
    isPersonalizable: true,
    availableColors: ["#FFFF00", "#FF9900"]
  },
  
  // Add new Sac Personnalisable products
  {
    id: "sac-personnalisable-standard",
    name: "Sac Personnalisable Standard",
    description: "Sac en tissu robuste avec personnalisation de haute qualité pour votre marque",
    startingPrice: "8.99",
    image: "/ProductImages/YellowSac.png",
    presentationImage: "/ProductImages/YellowSac-showcase.png",
    category: "produits-marketing",
    type: "sacs",
    metier_type: "Marketing",
    isPersonalizable: true,
    availableColors: ["#ffff00", "#ffffff", "#000000"]
  },
  {
    id: "sac-personnalisable-premium",
    name: "Sac Personnalisable Premium",
    description: "Sac de haute qualité avec finition luxueuse et grande surface d'impression pour votre marque",
    startingPrice: "12.99",
    image: "/ProductImages/BlackSac.png",
    presentationImage: "/ProductImages/BlackSac-showcase.png",
    category: "produits-marketing",
    type: "sacs",
    metier_type: "Marketing",
    isPersonalizable: true,
    availableColors: ["#000000", "#ffffff", "#1B2C4B"]
  },
  {
    id: "sac-personnalisable-eco",
    name: "Sac Personnalisable Écologique",
    description: "Sac éco-responsable en matériaux recyclés avec personnalisation de votre logo",
    startingPrice: "9.99",
    image: "/ProductImages/WhiteSac.png",
    presentationImage: "/ProductImages/WhiteSac-showcase.png",
    category: "produits-marketing",
    type: "sacs",
    metier_type: "Marketing",
    isPersonalizable: true,
    availableColors: ["#ffffff", "#aec9a5", "#d4e6f1"]
  }
];
