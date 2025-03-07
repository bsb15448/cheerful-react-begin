
import React, { useState, useEffect } from 'react';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/types/product";
import { packConfigurations } from "@/config/packs";

interface ProductSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ProductSelector = ({ value, onChange }: ProductSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [packProducts, setPackProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // This would be replaced with an actual API call in a real app
    // For now, we'll use a mock list of products
    const mockProducts: Product[] = [
      { id: "1", name: "T-shirt personnalisé", description: "T-shirt coton bio", startingPrice: "10€", category: "vêtements", type: "t-shirt", metier_type: "general" },
      { id: "2", name: "Polo brodé", description: "Polo haut de gamme", startingPrice: "15€", category: "vêtements", type: "polo", metier_type: "general" },
      { id: "3", name: "Veste chef cuisine", description: "Veste professionnelle", startingPrice: "30€", category: "vêtements", type: "veste", metier_type: "cuisine" },
      { id: "4", name: "Tablier barista", description: "Tablier café premium", startingPrice: "25€", category: "vêtements", type: "tablier", metier_type: "café" },
      { id: "5", name: "Blouse médicale", description: "Blouse professionnelle", startingPrice: "40€", category: "vêtements", type: "blouse", metier_type: "médical" },
      { id: "6", name: "Mug personnalisé", description: "Mug céramique", startingPrice: "8€", category: "produits-marketing", type: "mug", metier_type: "général" },
      { id: "7", name: "Cartes de visite", description: "Cartes premium", startingPrice: "50€/100pcs", category: "produits-marketing", type: "cartes", metier_type: "général" },
      { id: "8", name: "Cahier restaurant", description: "Cahier personnalisé", startingPrice: "12€", category: "produits-marketing", type: "cahier", metier_type: "restaurant" },
      { id: "9", name: "Drapeau publicitaire", description: "Drapeau extérieur", startingPrice: "60€", category: "produits-marketing", type: "drapeau", metier_type: "général" },
      { id: "10", name: "Sac promotionnel", description: "Sac réutilisable", startingPrice: "5€", category: "produits-marketing", type: "sac", metier_type: "général" },
    ];

    // Create pack products from the packConfigurations
    const packs: Product[] = Object.values(packConfigurations).map((pack, index) => ({
      id: `pack-${index + 1}`,
      name: `Pack ${pack.title}`,
      description: pack.description,
      startingPrice: pack.totalPrice,
      category: "packs",
      type: "pack",
      metier_type: pack.id
    }));

    setProducts(mockProducts);
    setPackProducts(packs);
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPacks = packProducts.filter(pack =>
    pack.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pack.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simple handler to select a product or pack
  const handleSelect = (productName: string) => {
    onChange(productName);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-10 bg-white text-left font-normal"
        >
          {value
            ? [...products, ...packProducts].find((product) => product.name === value)?.name || value
            : "Sélectionnez un produit"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-white" align="start">
        <Command className="w-full">
          <CommandInput 
            placeholder="Rechercher un produit..." 
            onValueChange={setSearchQuery}
            className="h-9"
          />
          <CommandEmpty>Aucun produit trouvé.</CommandEmpty>
          <ScrollArea className="h-[300px]">
            <CommandGroup heading="Packs">
              {filteredPacks.map((pack) => (
                <CommandItem
                  key={pack.id}
                  value={pack.name}
                  onSelect={() => handleSelect(pack.name)}
                  className="flex items-center py-3"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === pack.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div>
                    <p className="font-medium">{pack.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {pack.description} · À partir de {pack.startingPrice}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Vêtements">
              {filteredProducts
                .filter(product => product.category === "vêtements")
                .map((product) => (
                  <CommandItem
                    key={product.id}
                    value={product.name}
                    onSelect={() => handleSelect(product.name)}
                    className="flex items-center py-3"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === product.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.description} · À partir de {product.startingPrice}
                      </p>
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
            <CommandGroup heading="Produits marketing">
              {filteredProducts
                .filter(product => product.category === "produits-marketing")
                .map((product) => (
                  <CommandItem
                    key={product.id}
                    value={product.name}
                    onSelect={() => handleSelect(product.name)}
                    className="flex items-center py-3"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === product.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.description} · À partir de {product.startingPrice}
                      </p>
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProductSelector;
