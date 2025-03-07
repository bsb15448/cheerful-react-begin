
export interface MenuItem {
  title: string;
  image: string;
  path: string;
  topText: string;
  bottomText: string;
  subItems: SubItem[];
}

export interface SubItem {
  title: string;
  description: string;
  image: string;
  path: string;
}

export const menuItems: MenuItem[] = [
  {
    title: "Vêtements de cuisine",
    image: "/VetementDeCuisine/vestedecuisineImagebanner.jpg",
    path: "/vetements-cuisine",
    topText: "Vêtements",
    bottomText: "de cuisine",
    subItems: [
      {
        title: "Vestes de Chef",
        description: "Collection premium pour cuisiniers professionnels",
        image: "/Subitems/VestesdeChef.png",
        path: "/vetements-cuisine/vestes"
      },
      {
        title: "Tabliers",
        description: "Protection et style pour votre cuisine",
        image: "/Subitems/TablierCuisine.png",
        path: "/vetements-cuisine/tabliers"
      },
      {
        title: "Vestes de Boulanger",
        description: "Tenues adaptées à la boulangerie",
        image: "/Subitems/VestesDeBoulanger.png",
        path: "/vetements-cuisine/vestes-boulanger"
      },
      {
        title: "Tabliers Pro",
        description: "Protection maximale pour pâtissiers",
        image: "/Subitems/TabliersProChef.png",
        path: "/vetements-cuisine/tabliers-pro"
      },
      {
        title: "Vestes Pro Boucher",
        description: "Confort et hygiène pour la boucherie",
        image: "/Subitems/VesteProBoucher.png",
        path: "/vetements-cuisine/vestes-boucher"
      }
    ]
  },
  {
    title: "Vêtements Service & Hôtellerie",
    image: "/VetementServiceHotellerie/VetementHotelerieService.jpg",
    path: "/vetements-hotellerie",
    topText: "Vêtements",
    bottomText: "Service & Hôtellerie",
    subItems: [
      {
        title: "Uniformes de Service",
        description: "Élégance et confort pour le service",
        image: "/Subitems/UniformeDeService.png",
        path: "/vetements-hotellerie/service"
      },
      {
        title: "Tenues d'Accueil",
        description: "Pour un accueil professionnel",
        image: "/Subitems/TenueAcceuil.png",
        path: "/vetements-hotellerie/accueil"
      }
    ]
  },
  {
    title: "Vêtements de travail",
    image: "/VetementDeTravail/VetementDeTravailBanner.jpg",
    path: "/vetements-travail",
    topText: "Vêtements",
    bottomText: "de travail",
    subItems: [
      {
        title: "Combinaisons",
        description: "Protection intégrale",
        image: "/Subitems/Combinaison.png",
        path: "/vetements-travail/combinaisons"
      },
      {
        title: "Vestes de Travail",
        description: "Robustes et fonctionnelles",
        image: "/Subitems/VesteDeTravail.png",
        path: "/vetements-travail/vestes"
      },
      {
        title: "Gilets de Travail",
        description: "Flexibilité et protection",
        image: "/Subitems/GiletDeTravail.png", 
        path: "/vetements-travail/gilets"
      },
      {
        title: "Blouses Médicales",
        description: "Pour les professionnels de santé",
        image: "/Subitems/BlousesMedical.png",
        path: "/vetements-travail/blouses"
      },
      {
        title: "Tuniques Médicales",
        description: "Confort et praticité",
        image: "/Subitems/TuniqueMedical.png",
        path: "/vetements-travail/tuniques"
      }
    ]
  },
  {
    title: "Chaussures de sécurité",
    image: "/ChausureDeTravail/ChaussureDeTravail.png",
    path: "/chaussures",
    topText: "Chaussures",
    bottomText: "de sécurité",
    subItems: [
      {
        title: "Chaussures Cuisine",
        description: "Sécurité en cuisine",
        image: "/Subitems/ChaussureCuisine.png",
        path: "/chaussures/cuisine"
      },
      {
        title: "Chaussures Pro",
        description: "Protection renforcée",
        image: "/Subitems/ChaussurePro.png",
        path: "/chaussures/industrie"
      }
    ]
  },
  {
    title: "Nos packs Complet",
    image: "/Packs/PacksBanner.jpg",
    path: "/nos-packs",
    topText: "Nos",
    bottomText: "packs Complet",
    subItems: [
      {
        title: "Pack Restaurant",
        description: "Solution complète pour restaurant",
        image: "/Subitems/PackRestaurant.png",
        path: "/nos-packs/restaurant"
      },
      {
        title: "Pack Café",
        description: "Équipement pour café et brasserie",
        image: "/Subitems/PackCaffe.png",
        path: "/nos-packs/cafe"
      },
      {
        title: "Pack Hôtel",
        description: "Tout pour votre établissement hôtelier",
        image: "/Subitems/PackHotel.png",
        path: "/nos-packs/hotel"
      },
      {
        title: "Pack Médecin",
        description: "Équipement complet pour professionnels de santé",
        image: "/Subitems/PackMedecin.png",
        path: "/nos-packs/medecin"
      }
    ]
  },
  {
    title: "Produits Personalisable",
    image: "/ProduitsMarketing/ProduitMarketingBanner.jpg",
    path: "/produits-marketing",
    topText: "Produits",
    bottomText: "Personalisable",
    subItems: [
      {
        title: "Drapeaux",
        description: "Drapeaux publicitaires personnalisables",
        image: "/Subitems/Drapeaux.png",
        path: "/produits-marketing/drapeaux"
      },
      {
        title: "Mugs",
        description: "Mugs personnalisés pour votre communication",
        image: "/Subitems/Mugs.png",
        path: "/produits-marketing/mugs"
      },
      {
        title: "Carnets",
        description: "Carnets et bloc-notes personnalisés",
        image: "/Subitems/NotebookPersonalisable.png",
        path: "/produits-marketing/carnets"
      },
      {
        title: "Cartes de Visite",
        description: "Cartes de visite professionnelles personnalisées",
        image: "/Subitems/CarteVisites.png",
        path: "/produits-marketing/cartes-visite"
      },
      {
        title: "Carnets Restaurant",
        description: "Solutions sur mesure pour le secteur de la restauration",
        image: "/Subitems/NotebookRestaurent.png",
        path: "/produits-marketing/carnets-restaurant"
      },
      {
        title: "Sacs Personnalisables",
        description: "Sacs en tissu personnalisés pour votre marque",
        image: "/Subitems/SacPersonnalisable.png",
        path: "/produits-marketing/sacs"
      }
    ]
  }
];
