
import { Link } from "react-router-dom";
import ProcessSection from "@/components/personalization/ProcessSection";
import PackCard from "@/components/packs/PackCard";
import { Button } from "@/components/ui/button";
import { packsConfig } from "@/config/packsConfig";
import { Package } from "lucide-react";

const NosPacks = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-1">
          <span className="text-primary">Nos</span>{" "}
          <span className="text-secondary">Packs</span>
        </h1>
        <p className="text-2xl text-gray-700 font-medium mb-4">Complet</p>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Des solutions complètes adaptées à tous les métiers. Découvrez nos packs professionnels pour équiper votre établissement.
        </p>
      </div>

      {/* Process Section */}
      <ProcessSection />

      {/* Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-12">
        {packsConfig.map((pack) => (
          <PackCard
            key={pack.id}
            title={pack.title}
            description={pack.description}
            imageSrc={pack.image}
            path={`/nos-packs/${pack.id}`}
            itemCount={pack.items.length}
            price={pack.totalPrice}
            discount={pack.discount}
          />
        ))}
      </div>

      {/* Featured Pack - New Section */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8 my-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <div className="flex items-center mb-4">
              <Package className="text-primary mr-2 h-6 w-6" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Pack en vedette</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Pack Restaurant Complet</h2>
            <p className="text-gray-600 mb-6">
              Notre solution la plus populaire pour les restaurants, incluant des vêtements de cuisine professionnels, 
              des tabliers et des chaussures de sécurité. Tout ce dont vous avez besoin pour équiper votre restaurant.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <span className="block text-sm text-gray-500">Prix total</span>
                <span className="block text-xl font-bold text-primary">399.99 TND</span>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <span className="block text-sm text-gray-500">Articles inclus</span>
                <span className="block text-xl font-bold">4 items</span>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <span className="block text-sm text-gray-500">Économie</span>
                <span className="block text-xl font-bold text-green-600">15%</span>
              </div>
            </div>
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
              <Link to="/nos-packs/restaurant">Découvrir ce pack</Link>
            </Button>
          </div>
          <div className="md:w-1/2">
            <img 
              src="/Packs/PackRestaurant.jpg" 
              alt="Pack Restaurant" 
              className="rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 rounded-xl p-8 my-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Besoin d'un pack sur mesure?</h2>
        <p className="text-gray-600 mb-6">
          Nous pouvons créer un pack personnalisé adapté à vos besoins spécifiques.
        </p>
        <Button className="bg-primary text-white px-6 py-3">
          Contactez-nous
        </Button>
      </div>
    </div>
  );
};

export default NosPacks;
