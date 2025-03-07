
/**
 * This utility helps transform product data between different formats for CategoryTemplate
 * It specifically handles the transition between 'image' and 'images' properties
 */

// Convert products with 'images' property to products with 'image' property for CategoryTemplate
export const mapProductsForCategoryTemplate = (products: any[]) => {
  return products.map(product => ({
    ...product,
    image: product.images ? product.images[0] : '/placeholder.png'
  }));
};

// Convert products with 'image' property to products with 'images' property
export const mapProductsWithImages = (products: any[]) => {
  return products.map(product => ({
    ...product,
    images: product.image ? [product.image] : ['/placeholder.png']
  }));
};

// Transform a complete category content object for CategoryTemplate
export const mapCategoryContent = (content: any) => {
  if (!content || !content.products) return content;
  
  return {
    ...content,
    products: mapProductsForCategoryTemplate(content.products)
  };
};
