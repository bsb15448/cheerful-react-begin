
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products } from "@/config/products";
import ProductCard from "@/components/products/ProductCard";
import { categoryPagesConfig, CategoryPageConfig } from "@/config/categoryPagesConfig";
import FeaturesSection from "@/components/features/FeaturesSection";
import { getCategoryBanner } from "@/utils/categoryImageMappings";
import Image from "@/components/ui/image";

const CategoryPage = () => {
  const [sortBy, setSortBy] = useState("recommended");
  const location = useLocation();
  const currentPath = location.pathname.substring(1); // Remove leading slash
  const pageConfig: CategoryPageConfig = categoryPagesConfig[currentPath];

  if (!pageConfig) {
    return <div>Category not found</div>;
  }

  // Get the banner image from our utility function or use the one from pageConfig
  const bannerImage = getCategoryBanner(location.pathname) || pageConfig.bannerImage;

  const categoryProducts = products.filter(p => {
    if (currentPath.includes('/')) {
      // This is a subcategory page
      const [category, subcategory] = currentPath.split('/');
      return p.category === category && p.type === subcategory;
    }
    // This is a main category page
    return p.category === pageConfig.categoryType;
  });

  // Determine if this is a marketing product subcategory
  const isMarketingProduct = currentPath.startsWith('produits-marketing/');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto py-3 px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            {pageConfig.parentCategory && (
              <>
                <Link 
                  to={`/${pageConfig.categoryType}`} 
                  className="hover:text-primary"
                >
                  {pageConfig.parentCategory}
                </Link>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
            <span className="text-gray-900 font-medium">{pageConfig.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Banner - Moved up right below breadcrumbs with no space between */}
      <div className="relative h-[300px] md:h-[380px] overflow-hidden">
        <Image
          src={bannerImage}
          alt={pageConfig.title}
          className="w-full h-full object-cover object-center"
          fallback="/placeholder.png"
        />
        {/* Updated styling for the overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/20">
          <div className="text-center max-w-4xl mx-auto px-4 bg-white/80 py-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-primary">
              {pageConfig.title}
            </h1>
            <p className="text-base md:text-lg mb-0 max-w-2xl mx-auto text-gray-800">
              {pageConfig.description}
            </p>
          </div>
        </div>
      </div>

      {/* Features Section - Enhanced with better styling */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-primary">Nos Avantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pageConfig.features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-3 text-primary">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section - Enhanced with better styling */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Sorting Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <h2 className="text-2xl font-bold text-primary">Nos Produits</h2>
              <div className="flex items-center gap-4 bg-white p-2 rounded-lg shadow-sm">
                <Filter className="h-5 w-5 text-gray-500" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] border-none focus:ring-0">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommandés</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="newest">Plus récents</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid - Enhanced with better card styling */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categoryProducts.map((product) => (
                <div key={product.id} className="transform transition duration-300 hover:scale-[1.02]">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.startingPrice}
                    image={product.image || '/placeholder.png'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
