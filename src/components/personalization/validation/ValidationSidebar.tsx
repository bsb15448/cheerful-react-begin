
import { Button } from "@/components/ui/button";
import { FileText, AlertTriangle } from "lucide-react";
import { Product } from "@/types/product";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface ValidationSidebarProps {
  product: Product | undefined;
  onRequestQuote: () => void;
  designData: any;
  sizeQuantities: { [size: string]: number };
  totalQuantity: number;
  selectedSize: string;
  quantity: number;
}

const ValidationSidebar = ({
  product,
  onRequestQuote,
  designData,
  selectedSize,
  quantity
}: ValidationSidebarProps) => {
  const [showValidationDialog, setShowValidationDialog] = useState(false);

  const handleRequestQuote = () => {
    if (!selectedSize || quantity <= 0) {
      setShowValidationDialog(true);
      return;
    }
    onRequestQuote();
  };

  return (
    <div className="space-y-4">
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-2 text-primary">
          {product?.name || "Votre produit personnalisé"}
        </h2>
        
        {product?.description && (
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        )}
        
        <div className="space-y-4">
          {selectedSize && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Taille sélectionnée:</span>
              <Badge variant="outline" className="bg-gray-50">
                {selectedSize}
              </Badge>
            </div>
          )}
          
          {quantity > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Quantité:</span>
              <Badge variant="outline" className="bg-gray-50">
                {quantity} unité{quantity > 1 ? 's' : ''}
              </Badge>
            </div>
          )}
          
          <Button
            onClick={handleRequestQuote}
            className="w-full bg-gray-900 hover:bg-gray-900/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 py-6"
            size="lg"
          >
            <FileText className="mr-2 h-5 w-5" />
            Demander un devis
          </Button>
          
          <p className="text-xs text-center text-gray-500 mt-2">
            Sans engagement - Réponse sous 48h
          </p>
        </div>
      </div>

      <Dialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold flex items-center justify-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Informations Manquantes
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Veuillez compléter les informations suivantes pour continuer
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
            <ul className="space-y-2 text-sm text-gray-700">
              {!selectedSize && (
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Veuillez sélectionner une taille
                </li>
              )}
              {quantity <= 0 && (
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Veuillez indiquer une quantité valide
                </li>
              )}
            </ul>
          </div>
          <DialogFooter>
            <Button 
              onClick={() => setShowValidationDialog(false)}
              className="w-full mt-2"
            >
              Compris
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ValidationSidebar;
