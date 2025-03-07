
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { productColors } from "./config/productColorsConfig";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { products } from "@/config/products";

interface ProductColorSelectorProps {
  selectedCategory: string;
  selectedSide: string;
  onColorSelect: (imageUrl: string) => void;
}

const ProductColorSelector = ({
  selectedCategory,
  selectedSide,
  onColorSelect,
}: ProductColorSelectorProps) => {
  const [selectedColor, setSelectedColor] = useState<string>(() => {
    return localStorage.getItem('selectedProductColor') || "#000000";
  });

  // Get product and its available colors
  const product = products.find(p => p.id === selectedCategory);
  const productColor = productColors.find(p => p.productId === selectedCategory);
  
  // Use product's available colors if specified, otherwise use the ones from productColors
  const availableColors = product?.availableColors || 
    [...new Set(productColor?.colors.map(c => c.color) || [])];

  useEffect(() => {
    // When component mounts or selectedCategory changes, set the initial color
    if (availableColors.length > 0) {
      // Check if saved color is in available colors
      const savedColor = localStorage.getItem('selectedProductColor');
      const validSavedColor = savedColor && availableColors.includes(savedColor) 
        ? savedColor 
        : availableColors[0];
      
      handleColorSelect(validSavedColor);
    }
  }, [selectedCategory, availableColors]);

  const handleColorSelect = (color: string) => {
    // First check if this color is available for this product
    if (!availableColors.includes(color)) {
      toast.error("Cette couleur n'est pas disponible pour ce produit");
      return;
    }

    // Then check if this color variant exists for the selected side
    const colorVariant = productColor?.colors.find(
      c => c.color === color && c.sideId === selectedSide
    );

    if (colorVariant) {
      setSelectedColor(color);
      localStorage.setItem('selectedProductColor', color);
      onColorSelect(colorVariant.imageUrl);
      console.log('Setting color in localStorage:', color);
      
      // Get a nice color name for the toast
      let colorName = "sélectionnée";
      if (color === '#000000') colorName = "noire";
      else if (color === '#ffffff') colorName = "blanche";
      else if (color === '#1B2C4B') colorName = "bleu marine";
      else if (color === '#DC2626') colorName = "rouge";
      else if (color === '#FFDEE2') colorName = "rose";
      else if (color === '#D3E4FD') colorName = "bleu clair";
      else if (color === '#E5DEFF') colorName = "lavande";
      else if (color === '#FFFF00') colorName = "jaune";
      
      toast.success(`Couleur ${colorName} sélectionnée`);
    } else {
      toast.error("Cette couleur n'est pas disponible pour ce côté du produit");
    }
  };

  if (!availableColors || availableColors.length === 0) {
    return null;
  }

  return (
    <Card className="p-4">
      <Label className="text-sm font-medium mb-2 block">Couleur du produit</Label>
      <div className="flex flex-wrap gap-2">
        {availableColors.map((color) => {
          // Convert color names to presentable format for the title attribute
          let colorName = color;
          if (color === '#000000') colorName = 'Noir';
          else if (color === '#ffffff') colorName = 'Blanc';
          else if (color === '#1B2C4B') colorName = 'Bleu Marine';
          else if (color === '#DC2626') colorName = 'Rouge';
          else if (color === '#FFDEE2') colorName = 'Rose';
          else if (color === '#D3E4FD') colorName = 'Bleu Clair';
          else if (color === '#E5DEFF') colorName = 'Lavande';
          else if (color === '#FFFF00') colorName = 'Jaune';
          
          return (
            <button
              key={color}
              onClick={() => handleColorSelect(color)}
              className={cn(
                "w-8 h-8 rounded-full border-2 transition-all duration-200 ring-1 ring-gray-200",
                selectedColor === color ? "border-primary scale-110" : "border-transparent hover:scale-105"
              )}
              style={{ backgroundColor: color }}
              title={colorName}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default ProductColorSelector;
