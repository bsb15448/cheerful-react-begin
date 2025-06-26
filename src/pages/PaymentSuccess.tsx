
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Package, Download, Home } from 'lucide-react';
import Header from '@/components/layout/Header';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import ContactModal from '@/components/modals/ContactModal';
import StoreFinderModal from '@/components/modals/StoreFinderModal';
import { useState } from 'react';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('checkout');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isStoreFinderOpen, setIsStoreFinderOpen] = useState(false);

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
            <CardHeader className="pb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-3xl font-serif text-gray-900 mb-2">
                {t('paymentSuccess.title', 'Merci pour votre commande !')}
              </CardTitle>
              <p className="text-gray-600 text-lg">
                {t('paymentSuccess.subtitle', 'Votre paiement a été traité avec succès')}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">
                  {t('paymentSuccess.confirmationMessage', 'Vous recevrez un email de confirmation sous peu avec tous les détails de votre commande.')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Package className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">
                      {t('paymentSuccess.tracking.title', 'Suivi de commande')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('paymentSuccess.tracking.description', 'Suivez votre commande en temps réel')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Download className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">
                      {t('paymentSuccess.receipt.title', 'Reçu')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('paymentSuccess.receipt.description', 'Téléchargez votre reçu')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-4">
                <Button 
                  onClick={() => navigate('/')} 
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3"
                >
                  <Home className="w-4 h-4 mr-2" />
                  {t('paymentSuccess.continueButton', 'Continuer mes achats')}
                </Button>
                
                <Button 
                  onClick={() => setIsContactOpen(true)}
                  variant="outline" 
                  className="w-full border-gray-300 py-3"
                >
                  {t('paymentSuccess.supportButton', 'Contacter le support')}
                </Button>
              </div>

              <div className="text-sm text-gray-500 pt-4 border-t border-gray-200">
                <p>{t('paymentSuccess.helpText', 'Besoin d\'aide ? Notre équipe est disponible 24/7 pour vous assister.')}</p>
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
