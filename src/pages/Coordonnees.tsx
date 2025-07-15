
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Coordonnees = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #E8D5FF 0%, #F3E8FF 25%, #E0E7FF 50%, #F0F4FF 75%, #F8FAFF 100%)' 
      }}
    >
      <div className="container mx-auto px-4 py-16">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 text-purple-700 hover:text-purple-800 hover:bg-purple-100/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

        {/* Content */}
        <div 
          className="max-w-4xl mx-auto rounded-2xl p-8 md:p-12 shadow-2xl border border-purple-200"
          style={{
            background: 'linear-gradient(135deg, #F8FAFF 0%, #F0F4FF 25%, #E0E7FF 50%, #F3E8FF 75%, #E8D5FF 100%)'
          }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 text-center mb-8 font-baloo tracking-tight">
            Coordonnées
          </h1>
          
          <div className="shopify-policy__body">
            <div className="rte text-purple-700 leading-relaxed space-y-4">
              <p>Nom commercial&nbsp;: Ma boutique</p>
              <p>Numéro de téléphone&nbsp;: 0615569784</p>
              <p>Adresse e-mail&nbsp;: ayadimehdi4@gmail.com</p>
              <p>Adresse physique&nbsp;: 8 rue du Cdt René Mouchotte, 75014 Paris, France</p>
              <p>Numéro de TVA&nbsp;:</p>
              <p>Numéro d'entreprise&nbsp;:</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coordonnees;
