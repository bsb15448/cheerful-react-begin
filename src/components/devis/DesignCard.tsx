
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Type, ImageIcon, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface DesignCardProps {
  design: any;
  productSidesConfigs: any[];
}

export const DesignCard = ({ design, productSidesConfigs }: DesignCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-8 last:mb-0">
      <div 
        className="flex justify-between items-start mb-4 cursor-pointer" 
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="px-3 py-1 text-sm">
            {design.designNumber?.startsWith('PACK-') ? 'Pack' : 'Design'}
          </Badge>
          <h3 className="font-medium">
            {design.designNumber?.startsWith('PACK-') ? (
              <>Pack: {design.productName}</>
            ) : (
              <>{design.productName}</>
            )}
          </h3>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Taille:</span>
              <Badge variant="secondary">{design.selectedSize}</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Quantité:</span>
              <Badge variant="secondary">{design.quantity} unités</Badge>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Separator className="my-4" />

            {design.designNumber?.startsWith('PACK-') && design.items ? (
              <div className="mb-6">
                <h3 className="font-medium mb-4 text-sm text-gray-600">Articles inclus:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {design.items.map((item: any, idx: number) => (
                    <Card key={idx} className="p-3 bg-gray-50">
                      <p className="font-medium">{item.name}</p>
                      {item.price && (
                        <p className="text-sm text-gray-600">À partir de {item.price} TND</p>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              Object.entries(design.designs || {}).map(([key, designFace]: [string, any]) => {
                const productConfig = productSidesConfigs.find(config => config.id === design.productId);
                const side = productConfig?.sides.find(s => s.id === designFace.faceId);
                const faceTitle = side?.title || designFace.faceTitle || designFace.faceId;

                return (
                  <div key={key} className="mb-6 last:mb-0">
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                      <Badge variant="outline">Face: {faceTitle}</Badge>
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <img 
                          src={designFace.canvasImage} 
                          alt={`Design ${faceTitle}`}
                          className="w-full rounded-lg border shadow-sm"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        {designFace.textElements?.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="font-medium flex items-center gap-2 text-gray-700">
                              <Type className="h-4 w-4" />
                              Textes ({designFace.textElements.length})
                            </h4>
                            <div className="grid grid-cols-1 gap-2">
                              {designFace.textElements.map((text: any, idx: number) => (
                                <Card key={idx} className="p-3 bg-gray-50">
                                  <p className="font-medium text-sm">{text.content}</p>
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                      {text.font}
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                                      <div 
                                        className="w-2 h-2 rounded-full" 
                                        style={{ backgroundColor: text.color }}
                                      />
                                      {text.color}
                                    </Badge>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          </div>
                        )}

                        {designFace.uploadedImages?.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="font-medium flex items-center gap-2 text-gray-700">
                              <ImageIcon className="h-4 w-4" />
                              Images ({designFace.uploadedImages.length})
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {designFace.uploadedImages.map((img: any, idx: number) => (
                                <div key={idx} className="relative aspect-square rounded-md overflow-hidden border">
                                  <img 
                                    src={img.url} 
                                    alt={img.name}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1">
                                    <p className="text-xs text-white truncate">
                                      {img.name}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <Separator className="mt-4" />
    </div>
  );
};
