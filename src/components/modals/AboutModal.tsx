
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-3xl font-bold text-primary">
            Notre Histoire
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 max-h-[70vh] overflow-y-auto">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative aspect-video overflow-hidden rounded-lg md:aspect-auto md:h-full">
              <img
                src="/AboutImage.png"
                alt="Notre Histoire"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                Depuis 2010, ELLES s'engage à fournir des vêtements professionnels de la plus haute qualité. Notre mission est de combiner confort, style et professionnalisme pour les professionnels de santé et autres secteurs exigeants.
              </p>
              <p className="text-gray-600">
                Chaque pièce est conçue avec soin, en utilisant des matériaux premium et des techniques de fabrication innovantes pour garantir durabilité et confort tout au long de votre journée de travail.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">13+</div>
                  <div className="text-sm text-gray-600">Années d'expérience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10k+</div>
                  <div className="text-sm text-gray-600">Clients satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-gray-600">Support client</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
