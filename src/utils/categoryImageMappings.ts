// Map category paths to their corresponding banner images
export const categoryBannerMap: Record<string, string> = {
  // Main categories
  "/vetements-cuisine": "/Subitems/VetementCuisineBanner.png",
  "/vetements-hotellerie": "/Subitems/VetementsServiceBanner.png",
  "/vetements-travail": "/Subitems/VetementDeTravailBanner.png",
  "/chaussures": "/Subitems/ChausureSecuriteBanner.png",
  "/nos-packs": "/Subitems/NoPacksBanner.png",
  "/produits-marketing": "/Subitems/ProduitPersonalisableBaner.png",
  
  // Subcategories
  // Vêtements de Cuisine
  "/vetements-cuisine/vestes": "/Subitems/Banners/VetementDeCuisineBannerSubItems.png",
  "/vetements-cuisine/tabliers": "/Subitems/Banners/VetementDeCuisineBannerSubItems.png",
  "/vetements-cuisine/pantalons": "/Subitems/Banners/VetementDeCuisineBannerSubItems.png",
  
  // Vêtements Boulanger & Pâtissier
  "/vetements-boulanger/vestes": "/Subitems/Banners/VetementDeCuisineBannerSubItems.png",
  "/vetements-boulanger/tabliers": "/Subitems/Banners/VetementDeCuisineBannerSubItems.png",
  "/vetements-boulanger/tabliers-boucher": "/Subitems/Banners/VetementDeCuisineBannerSubItems.png",
  "/vetements-boulanger/accessoires": "/Subitems/Banners/VetementDeCuisineBannerSubItems.png",
  
  // Vêtements Service & Hôtellerie
  "/vetements-hotellerie/service": "/Subitems/Banners/VetementServiceSubItemsBanner.png",
  "/vetements-hotellerie/accueil": "/Subitems/Banners/VetementServiceSubItemsBanner.png",
  "/vetements-hotellerie/accessoires": "/Subitems/Banners/VetementServiceSubItemsBanner.png",
  
  // Vêtements de Travail
  "/vetements-travail/blouses": "/Subitems/Banners/VetementDeServiceBannerSubitems.png",
  "/vetements-travail/tuniques": "/Subitems/Banners/VetementDeServiceBannerSubitems.png",
  "/vetements-travail/combinaisons": "/Subitems/Banners/VetementDeServiceBannerSubitems.png",
  "/vetements-travail/vestes": "/Subitems/Banners/VetementDeServiceBannerSubitems.png",
  "/vetements-travail/gilets": "/Subitems/Banners/VetementDeServiceBannerSubitems.png",
  
  // Chaussures de sécurité
  "/chaussures/cuisine": "/Subitems/Banners/ChaussuresDeSecurite.png",
  "/chaussures/industrie": "/Subitems/Banners/ChaussuresDeSecurite.png",
  "/chaussures/accessoires": "/Subitems/Banners/ChaussuresDeSecurite.png",
  
  // Produits Marketing - ensuring all use the same banner
  "/produits-marketing/drapeaux": "/Subitems/Banners/ProduitsPersonalisableBanner.png",
  "/produits-marketing/tshirts": "/Subitems/Banners/ProduitsPersonalisableBanner.png",
  "/produits-marketing/mugs": "/Subitems/Banners/ProduitsPersonalisableBanner.png",
  "/produits-marketing/carnets": "/Subitems/Banners/ProduitsPersonalisableBanner.png",
  "/produits-marketing/cartes-visite": "/Subitems/Banners/ProduitsPersonalisableBanner.png",
  "/produits-marketing/carnets-restaurant": "/Subitems/Banners/ProduitsPersonalisableBanner.png",
  "/produits-marketing/sacs": "/Subitems/Banners/ProduitsPersonalisableBanner.png",
  
  // Nos Packs
  "/nos-packs/restaurant": "/Subitems/Banners/PackRestaurantBanner.png",
  "/nos-packs/hotel": "/Subitems/Banners/PackHotelBanner.png",
  "/nos-packs/caffe": "/Subitems/Banners/PackCaffeBanner.png",
  "/nos-packs/medecin": "/Subitems/Banners/PackMedecinBanner.png"
};

export const getCategoryBanner = (path: string): string => {
  // First check if we have an exact match
  if (categoryBannerMap[path]) {
    return categoryBannerMap[path];
  }
  
  // If not, try to find a parent category match
  const pathParts = path.split('/').filter(Boolean);
  if (pathParts.length > 0) {
    const mainCategory = `/${pathParts[0]}`;
    return categoryBannerMap[mainCategory] || "/placeholder.png";
  }
  
  return "/placeholder.png";
};
