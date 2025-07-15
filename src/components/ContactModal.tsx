
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Coordonnées
          </DialogTitle>
        </DialogHeader>
        <div className="shopify-policy__body">
          <div className="rte">
            <p>Nom commercial&nbsp;: Ma boutique</p>
            <p>Numéro de téléphone&nbsp;: 0615569784</p>
            <p>Adresse e-mail&nbsp;: ayadimehdi4@gmail.com</p>
            <p>Adresse physique&nbsp;: 8 rue du Cdt René Mouchotte, 75014 Paris, France</p>
            <p>Numéro de TVA&nbsp;:</p>
            <p>Numéro d'entreprise&nbsp;:</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
