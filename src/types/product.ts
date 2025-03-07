
export interface Product {
  id: string;
  name: string;
  description: string;
  startingPrice: string;
  images: string[];  // Array of 4 images
  category: string;
  type: string;
  metier_type: string;
  isPersonalizable?: boolean;
  availableColors?: string[];
  availableSizes?: string[];
  features?: string[];
  leadTime?: string;
  minimumOrder?: number;
  priceBreaks?: {
    quantity: number;
    price: string;
  }[];
  materialInfo?: string;
  tags?: string[];
}
