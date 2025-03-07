
import { menuItems } from "./menuConfig";
import { getPackConfigById, packConfigurations } from "./packs";

export interface PackItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: string;
  isPersonalizable?: boolean;
}

export interface PackConfig {
  id: string;
  title: string;
  description: string;
  image: string;
  items: PackItem[];
  totalPrice?: string;
  discount?: string;
  availability?: "in-stock" | "limited" | "out-of-stock";
}

// Extract pack data from menuItems for consistency
const extractPacksFromMenu = (): PackConfig[] => {
  const packsMenuItem = menuItems.find(item => item.title === "Nos packs Complet");
  
  if (!packsMenuItem || !packsMenuItem.subItems) {
    return [];
  }
  
  return packsMenuItem.subItems.map(subItem => {
    const pathSegments = subItem.path.split('/');
    const id = pathSegments[pathSegments.length - 1];
    
    // Use the dedicated pack config if available
    const packConfig = packConfigurations[id];
    if (packConfig) {
      return packConfig;
    }
    
    // Fallback to creating a pack from menu item
    return {
      id,
      title: subItem.title,
      description: subItem.description,
      image: subItem.image,
      items: [],
      totalPrice: "0.00",
      discount: "15%",
      availability: "in-stock"
    };
  });
};

export const packsConfig = extractPacksFromMenu();

export const getPackById = (packId: string | undefined): PackConfig | undefined => {
  if (!packId) return undefined;
  
  // First try to get the pack from the dedicated config
  const packFromDedicatedConfig = getPackConfigById(packId);
  if (packFromDedicatedConfig) return packFromDedicatedConfig;
  
  // Then try to find it in the extracted configs
  const packFromConfig = packsConfig.find(pack => pack.id === packId);
  if (packFromConfig) return packFromConfig;
  
  // If not found in any config, try to create it from menu
  const packsMenuItem = menuItems.find(item => item.title === "Nos packs Complet");
  if (!packsMenuItem || !packsMenuItem.subItems) return undefined;
  
  const subItem = packsMenuItem.subItems.find(item => {
    const pathSegments = item.path.split('/');
    const id = pathSegments[pathSegments.length - 1];
    return id === packId;
  });
  
  if (!subItem) return undefined;
  
  return {
    id: packId,
    title: subItem.title,
    description: subItem.description,
    image: subItem.image,
    items: [],
    totalPrice: "0.00",
    discount: "15%",
    availability: "in-stock"
  };
};
