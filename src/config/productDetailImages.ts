
export interface ProductDetailImages {
  productId: string;
  images: string[];
}

export const productDetailImages: ProductDetailImages[] = [
  // Vêtements Cuisine
  {
    productId: "veste-cuisine-1",
    images: [
      "/ProductImages/BlackButtonsTshirt.png",
      "/ProductImages/BlackButtonsTshirtArriere.png",
      "/ProductImages/BlackTshirt.png"
    ]
  },
  {
    productId: "tablier-cuisine-1",
    images: [
      "/ProductImages/BlackTablier.png",
      "/ProductImages/BlackTablier.png",
      "/ProductImages/BlackTablier.png"
    ]
  },

  // Vêtements Boucher
  {
    productId: "veste-boucher-1",
    images: [
      "/ProductImages/RedLongSleavesShirt.png",
      "/ProductImages/RedLongSleavesShirtBack.png",
      "/ProductImages/RedLongSleavesShirt.png"
    ]
  },
  {
    productId: "tablier-boucher-1",
    images: [
      "/ProductImages/BlackTablier.png",
      "/ProductImages/BlackTablier.png",
      "/ProductImages/BlackTablier.png"
    ]
  },

  // Vêtements Médicaux
  {
    productId: "blouse-medicale-1",
    images: [
      "/ProductImages/BlackButtonsTshirt.png",
      "/ProductImages/BlackButtonsTshirtArriere.png",
      "/ProductImages/BlackTshirt.png"
    ]
  },
  {
    productId: "pantalon-medical-1",
    images: [
      "/ProductImages/BlackButtonsTshirt.png",
      "/ProductImages/BlackButtonsTshirtArriere.png",
      "/ProductImages/BlackTshirt.png"
    ]
  },

  // Vêtements Hôtellerie
  {
    productId: "veste-hotel-1",
    images: [
      "/ProductImages/BlackButtonsTshirt.png",
      "/ProductImages/BlackButtonsTshirtArriere.png",
      "/ProductImages/BlackTshirt.png"
    ]
  },
  {
    productId: "tablier-hotel-1",
    images: [
      "/ProductImages/BlackTablier.png",
      "/ProductImages/BlackTablier.png",
      "/ProductImages/BlackTablier.png"
    ]
  },

  // Vêtements de Travail
  {
    productId: "combinaison-travail-1",
    images: [
      "/ProductImages/BlackButtonsTshirt.png",
      "/ProductImages/BlackButtonsTshirtArriere.png",
      "/ProductImages/BlackTshirt.png"
    ]
  },
  {
    productId: "veste-travail-1",
    images: [
      "/ProductImages/BlackButtonsTshirt.png",
      "/ProductImages/BlackButtonsTshirtArriere.png",
      "/ProductImages/BlackTshirt.png"
    ]
  },

  // Chaussures de Sécurité
  {
    productId: "chaussures-securite-1",
    images: [
      "/ProductImages/BlackButtonsTshirt.png",
      "/ProductImages/BlackButtonsTshirtArriere.png",
      "/ProductImages/BlackTshirt.png"
    ]
  },
  {
    productId: "bottes-securite-1",
    images: [
      "/ProductImages/BlackButtonsTshirt.png",
      "/ProductImages/BlackButtonsTshirtArriere.png",
      "/ProductImages/BlackTshirt.png"
    ]
  },

  // Marketing Products
  {
    productId: "mug-1",
    images: [
      "/ProductImages/BlackMug.png",
      "/ProductImages/BlackMug.png",
      "/ProductImages/BlackMug.png"
    ]
  },
  {
    productId: "notebook-1",
    images: [
      "/ProductImages/WhiteNotebook.png",
      "/ProductImages/WhiteNotebook.png",
      "/ProductImages/WhiteNotebook.png"
    ]
  },
  {
    productId: "flag-1",
    images: [
      "/ProductImages/RedMarketingFlag.png",
      "/ProductImages/RedMarketingFlag.png",
      "/ProductImages/RedMarketingFlag.png"
    ]
  },
  {
    productId: "bag-1",
    images: [
      "/ProductImages/YellowSac.png",
      "/ProductImages/YellowSac.png",
      "/ProductImages/YellowSac.png"
    ]
  }
];

export const getProductImages = (productId: string): string[] => {
  const product = productDetailImages.find(p => p.productId === productId);
  return product?.images || [];
};
