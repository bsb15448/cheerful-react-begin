import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function WelcomeDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show dialog after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-primary mb-2"
            >
              Bienvenue!
            </motion.div>
          </DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center space-y-4"
        >
          <p className="text-lg text-gray-700">
            Découvrez l'élégance à la française
          </p>
          <p className="text-sm text-gray-600">
            Notre collection unique allie style et savoir-faire français pour vous offrir une expérience shopping exceptionnelle.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-200"
            >
              Explorer
            </button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}