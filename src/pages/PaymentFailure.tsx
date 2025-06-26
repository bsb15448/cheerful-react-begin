
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, ArrowLeft, Phone, Home } from 'lucide-react';
import Header from '@/components/layout/Header';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import ContactModal from '@/components/modals/ContactModal';
import StoreFinderModal from '@/components/modals/StoreFinderModal';
import { useState } from 'react';

const PaymentFailure = () => {
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
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <X className="w-10 h-10 text-red-600" />
              </div>
              <CardTitle className="text-3xl font-serif text-gray-900 mb-2">
                {t('paymentFailure.title', 'Paiement échoué')}
              </CardTitle>
              <p className="text-gray-600 text-lg">
                {t('paymentFailure.subtitle', 'Une erreur est survenue lors du traitement de votre paiement')}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-medium">
                  {t('paymentFailure.errorMessage', 'Votre commande n\'a pas pu être traitée. Aucun montant n\'a été débité.')}
                </p>
              </div>

              <div className="text-left space-y-2">
                <h3 className="font-semibold text-gray-900">
                  {t('paymentFailure.possibleReasons', 'Raisons possibles :')}
                </h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>{t('paymentFailure.reason1', 'Fonds insuffisants sur votre carte')}</li>
                  <li>{t('paymentFailure.reason2', 'Informations de carte incorrectes')}</li>
                  <li>{t('paymentFailure.reason3', 'Connexion interrompue')}</li>
                  <li>{t('paymentFailure.reason4', 'Limite de transaction dépassée')}</li>
                </ul>
              </div>

              <div className="pt-6 space-y-4">
                <Button 
                  onClick={() => navigate('/checkout')} 
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('paymentFailure.retryButton', 'Réessayer le paiement')}
                </Button>
                
                <Button 
                  onClick={() => navigate('/')}
                  variant="outline" 
                  className="w-full border-gray-300 py-3"
                >
                  <Home className="w-4 h-4 mr-2" />
                  {t('paymentFailure.homeButton', 'Retour à l\'accueil')}
                </Button>

                <Button 
                  onClick={() => setIsContactOpen(true)}
                  variant="outline" 
                  className="w-full border-gray-300 py-3"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t('paymentFailure.supportButton', 'Contacter le support')}
                </Button>
              </div>

              <div className="text-sm text-gray-500 pt-4 border-t border-gray-200">
                <p>{t('paymentFailure.helpText', 'Si le problème persiste, contactez votre banque ou notre support client.')}</p>
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

export default PaymentFailure;
