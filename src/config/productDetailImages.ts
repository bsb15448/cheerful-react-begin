
export interface ProductDetailImages {
  productId: string;
  images: string[];
}

export const productDetailImages: ProductDetailImages[] = [
  // Vêtements Cuisine
  {
    productId: "veste-cuisine-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },
  {
    productId: "tablier-cuisine-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },
  {
    productId: "pantalon-cuisine-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },

  // Vêtements Boulanger
  {
    productId: "veste-boulanger-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },
  {
    productId: "tablier-boulanger-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },

  // Vêtements Boucher
  {
    productId: "veste-boucher-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },
  {
    productId: "tablier-boucher-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },
  {
    productId: "accessoire-boucher-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },

  // Vêtements Esthétique
  {
    productId: "blouse-esthetique-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },
  {
    productId: "tunique-esthetique-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },
  {
    productId: "accessoire-esthetique-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },

  // Vêtements Médicaux
  {
    productId: "blouse-medicale-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },
  {
    productId: "tunique-medicale-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },
  {
    productId: "pantalon-medical-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },

  // Vêtements Hôtellerie
  {
    productId: "veste-hotel-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },
  {
    productId: "tablier-hotel-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },
  {
    productId: "tenue-accueil-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },

  // Vêtements de Travail
  {
    productId: "combinaison-travail-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },
  {
    productId: "veste-travail-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },
  {
    productId: "blouse-travail-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },
  {
    productId: "tunique-travail-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },

  // Chaussures
  {
    productId: "chaussures-cuisine-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },
  {
    productId: "chaussures-securite-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },
  {
    productId: "bottes-securite-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },

  // Marketing Products
  {
    productId: "drapeau-marketing-1",
    images: ["/CommingSoon.png", "/CommingSoon.png", "/CommingSoon.png"]
  },
  {
    productId: "mug-marketing-1",
    images: ["/ProductImages/BlackMug.png", "/ProductImages/BlackMug.png", "/ProductImages/BlackMug.png"]
  },
  {
    productId: "carnet-marketing-1",
    images: ["/ProductImages/WhiteNotebook.png", "/ProductImages/WhiteNotebook.png", "/ProductImages/WhiteNotebook.png"]
  },
  {
    productId: "sac-marketing-1",
    images: ["/ProductImages/YellowSac.png", "/ProductImages/YellowSac.png", "/ProductImages/YellowSac.png"]
  }
];

export const getProductImages = (productId: string): string[] => {
  const product = productDetailImages.find(p => p.productId === productId);
  return product?.images || [];
};
