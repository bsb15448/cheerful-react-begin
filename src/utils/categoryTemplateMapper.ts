
/**
 * This utility maps products with 'images' array to 'image' string for CategoryTemplate
 * CategoryTemplate expects 'image' (singular) while our data structure uses 'images' (array)
 */

export interface ProductWithImages {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  [key: string]: any;
}

export interface ProductWithImage {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  [key: string]: any;
}

export interface CategoryData {
  title: string;
  description: string;
  bannerImage: string;
  features: { title: string; description: string }[];
  products: ProductWithImages[];
}

export interface CategoryTemplateData {
  title: string;
  description: string;
  bannerImage: string;
  features: { title: string; description: string }[];
  products: ProductWithImage[];
}

/**
 * Converts products with 'images' property to products with 'image' property
 * Takes the first image from the array or uses placeholder if empty
 */
export const mapProductsForCategoryTemplate = (products: ProductWithImages[]): ProductWithImage[] => {
  return products.map(product => ({
    ...product,
    image: product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'
  }));
};

/**
 * Transforms a category data object to format required by CategoryTemplate
 */
export const mapCategoryDataForTemplate = (data: CategoryData): CategoryTemplateData => {
  return {
    ...data,
    products: mapProductsForCategoryTemplate(data.products)
  };
};
