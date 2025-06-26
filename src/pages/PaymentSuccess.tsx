
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import ContactModal from '@/components/modals/ContactModal';
import StoreFinderModal from '@/components/modals/StoreFinderModal';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('checkout');
  const { clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const [isContactOpen, setIsContactOpen] = React.useState(false);
  const [isStoreFinderOpen, setIsStoreFinderOpen] = React.useState(false);

  useEffect(() => {
    // Clear the cart after successful payment
    clearCart();
  }, [clearCart]);

  const paymentRef = searchParams.get('payment_ref');
  const orderId = searchParams.get('order_id');

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar onStoreFinderOpen={() => setIsStoreFinderOpen(true)} />
      <Header 
        onMenuClick={() => {}} 
        onContactOpen={() => setIsContactOpen(true)}
        onBookingOpen={() => {}}
      />
      
      <div className="min-h-screen bg-gray-50 pt-40 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-serif text-gray-900 mb-4">
                {t('orderSuccess.title')}
              </h1>
              
              <p className="text-gray-600 mb-6">
                {t('orderSuccess.message')}
              </p>

              {orderId && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-2">Numéro de commande:</p>
                  <p className="font-mono text-lg font-medium text-gray-900">#{orderId}</p>
                </div>
              )}

              {paymentRef && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-2">Référence de paiement:</p>
                  <p className="font-mono text-sm text-gray-900">{paymentRef}</p>
                </div>
              )}

              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/')} 
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                >
                  {t('orderSuccess.button')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setIsContactOpen(true)}
                  className="w-full"
                >
                  Contacter le service client
                </Button>
              </div>

              <div className="mt-8 text-sm text-gray-500">
                <p>Un email de confirmation a été envoyé à votre adresse.</p>
                <p>Votre commande sera traitée dans les plus brefs délais.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <StoreFinderModal isOpen={isStoreFinderOpen} onClose={() => setIsStoreFinderOpen(false)} />
    </div>
  );
};

export default PaymentSuccess;
