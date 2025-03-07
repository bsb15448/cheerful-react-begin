
import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Check, Download, Home, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/components/cart/CartProvider';
import { generateOrderPDF } from '@/utils/orderPdfGenerator';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  
  // Get payment details from URL params
  const paymentRef = searchParams.get('payment_ref') || 'N/A';
  const orderInfo = localStorage.getItem('customerInfo');
  const orderDetails = orderInfo ? JSON.parse(orderInfo) : null;
  const cartItems = items;
  
  useEffect(() => {
    // Auto-download PDF after a short delay
    const timer = setTimeout(() => {
      handleDownloadPDF();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleDownloadPDF = async () => {
    if (!orderDetails || cartItems.length === 0) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le reçu. Certaines informations sont manquantes.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGeneratingPDF(true);
    
    try {
      // Calculate totals
      const subtotal = cartItems.reduce((acc, item) => acc + ((item.price || 0) * item.quantity), 0);
      const shipping = subtotal >= 255 ? 0 : 7.99;
      const total = subtotal + shipping;
      
      // Generate a unique order number
      const orderNumber = `${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;
      
      // Generate the PDF
      await generateOrderPDF({
        orderNumber,
        customerName: `${orderDetails.firstName} ${orderDetails.lastName}`,
        email: orderDetails.email,
        phone: orderDetails.phone || "Non spécifié",
        address: orderDetails.address || "Non spécifiée",
        date: new Date().toLocaleString('fr-FR'),
        items: cartItems,
        subtotal,
        shipping,
        total
      });
      
      toast({
        title: "Succès",
        description: "Votre facture a été téléchargée.",
        variant: "default"
      });
      
      setPdfGenerated(true);
      
      // Clear the cart after successful order
      setTimeout(() => {
        clearCart();
        setIsGeneratingPDF(false);
      }, 500);
      
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le reçu PDF.",
        variant: "destructive"
      });
      setIsGeneratingPDF(false);
    }
  };
  
  const handleGoHome = () => {
    clearCart();
    navigate('/');
  };
  
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto rounded-lg bg-white shadow-xl p-8"
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-24 w-24 bg-green-100 rounded-full mb-6">
            <Check className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Merci pour votre commande!</h1>
          <p className="text-gray-600 mb-8">
            Votre paiement a été traité avec succès. Vous recevrez bientôt un email de confirmation.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Détails de la commande</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Référence de paiement:</span>
              <span className="font-medium">{paymentRef}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Statut:</span>
              <span className="text-green-600 font-medium">Payé</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
            >
              <Download className="h-4 w-4" />
              {isGeneratingPDF ? 'Génération...' : pdfGenerated ? 'Télécharger à nouveau' : 'Télécharger la facture'}
            </Button>
            <Button 
              onClick={handleGoHome}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Retour à l'accueil
            </Button>
            <Button 
              variant="secondary"
              className="flex items-center gap-2"
              asChild
            >
              <Link to="/cart">
                <ShoppingBag className="h-4 w-4" />
                Mon panier
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
