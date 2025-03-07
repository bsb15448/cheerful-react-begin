
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "@/components/ui/image";
import { Check, Info } from "lucide-react";
import { PackItem } from "@/config/packsConfig";

interface PackItemModalProps {
  item: PackItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const PackItemModal = ({ item, isOpen, onClose }: PackItemModalProps) => {
  if (!item) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            {item.name}
            {item.isPersonalizable && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs ml-2">
                <Check className="h-3 w-3 mr-1" /> Personnalisable
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Détails du produit inclus dans votre pack
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          <div className="bg-gray-50 rounded-md overflow-hidden">
            <Image 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover aspect-square"
            />
          </div>
          
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-gray-700 mb-3">{item.description}</p>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">À partir de</span>
                  <span className="font-bold text-primary">{item.price} TND</span>
                </div>
                
                <div className="border-t border-gray-100 pt-3">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    <Info className="h-3 w-3 mr-1" /> Inclus dans le pack
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex justify-end border-t border-gray-100 pt-4 mt-4">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PackItemModal;
