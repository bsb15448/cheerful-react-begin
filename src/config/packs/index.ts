
import { restaurantPackConfig } from "./restaurant";
import { cafePackConfig } from "./cafe";
import { hotelPackConfig } from "./hotel";
import { medecinPackConfig } from "./medecin";
import { PackConfig } from "../packsConfig";

// Export all pack configurations
export const packConfigurations: { [key: string]: PackConfig } = {
  restaurant: restaurantPackConfig,
  cafe: cafePackConfig,
  hotel: hotelPackConfig,
  medecin: medecinPackConfig
};

// Helper function to get a specific pack by ID
export const getPackConfigById = (packId: string): PackConfig | undefined => {
  return packConfigurations[packId];
};
