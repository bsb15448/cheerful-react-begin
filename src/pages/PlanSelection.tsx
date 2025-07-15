import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, ChevronDown } from 'lucide-react';

import ResponsiveFloatingElements from '@/components/ui/ResponsiveFloatingElements';
const PlanSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const children = location.state?.children || [];
  const [selectedPlan, setSelectedPlan] = useState<'onetime' | 'subscription' | null>(null);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const plans = {
    subscription: {
      price: 29,
      title: 'ABONNEMENT MENSUEL',
      subtitle: '29 $/mois – Économisez 25 %',
      features: [{
        text: '1 livre surprise personnalisé par mois par enfant selon vos thématiques choisis',
        highlight: false
      }, {
        text: 'Créé avec des experts de l\'enfance pour renforcer la confiance, la gestion des émotions et l\'envie de lire',
        highlight: false
      }, {
        text: 'Chaque mois, une nouvelle aventure pleine de valeurs et de leçons de vie',
        highlight: false
      }, {
        text: 'Un moment magique à partager en famille',
        highlight: false
      }, {
        text: 'Sans engagement – Résiliable à tout moment',
        highlight: false
      }, {
        text: '8 parents sur 10 choisissent l\'abonnement pour accompagner le développement personnel de leur enfant',
        highlight: false
      }]
    },
    onetime: {
      price: 45,
      title: 'ACHAT UNIQUE',
      subtitle: '45 $ – Un cadeau inoubliable',
      features: [{
        text: 'L\'option idéale pour une occasion spéciale.',
        highlight: false
      }]
    }
  };
  const handleCardSelect = (planType: 'onetime' | 'subscription') => {
    setSelectedPlan(planType);
  };
  const handleConfirm = () => {
    if (selectedPlan) {
      navigate('/personalize', {
        state: {
          childCount: children.length || location.state?.childCount,
          selectedPlan
        }
      });
    }
  };
  return <div className="min-h-screen relative overflow-hidden font-baloo" style={{
    background: 'linear-gradient(135deg, #E8D5FF 0%, #F3E8FF 25%, #E0E7FF 50%, #F0F4FF 75%, #F8FAFF 100%)'
  }}>
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <ResponsiveFloatingElements />
      </div>

      <div className="container mx-auto px-3 md:px-4 py-3 md:py-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">
            <span className="text-slate-800">Choisissez votre aventure</span>
          </h1>
        </div>

        {/* Progress steps */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-green-400 rounded-full flex items-center justify-center shadow-md">
              <Check className="w-3 h-3 md:w-4 md:h-4 text-slate-700" />
            </div>
            <div className="w-4 md:w-8 h-1 bg-green-400"></div>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-green-400 rounded-full flex items-center justify-center shadow-md">
              <span className="text-slate-700 text-xs md:text-sm font-bold">2</span>
            </div>
            <div className="w-4 md:w-8 h-1 bg-gray-300"></div>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-xs md:text-sm font-bold">3</span>
            </div>
            <div className="w-4 md:w-8 h-1 bg-gray-300"></div>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-xs md:text-sm font-bold">4</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Plan Selection */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg mb-4 md:mb-6">
            <div className="space-y-3 md:space-y-4">
              {/* Subscription Option */}
              <div onClick={() => handleCardSelect('subscription')} className={`p-3 md:p-4 rounded-xl md:rounded-2xl cursor-pointer transition-all duration-300 border-2 relative ${selectedPlan === 'subscription' ? 'border-purple-400 bg-purple-50/50 shadow-xl scale-105' : 'border-slate-200 hover:border-orange-300 hover:shadow-lg hover:scale-[1.02]'}`}>
                {/* Badge */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-bold">
                    RECOMMANDÉ
                  </span>
                </div>

                <div className="flex flex-col">
                  <h4 className="font-bold text-slate-700 text-base md:text-lg mb-1 my-[12px]">
                    {plans.subscription.title}
                  </h4>
                  <p className="text-base md:text-lg font-semibold text-purple-600 mb-3">
                    {plans.subscription.subtitle}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-3">
                    {plans.subscription.features.slice(0, showAllFeatures ? plans.subscription.features.length : 4).map((feature, index) => <li key={index} className="flex items-start gap-2">
                        <Check className="w-3 h-3 text-green-500 mt-1 shrink-0" />
                        <span className="text-slate-600 text-xs md:text-sm leading-relaxed">
                          {feature.text}
                        </span>
                      </li>)}
                  </ul>
                  
                  {!showAllFeatures && plans.subscription.features.length > 4 && <button onClick={e => {
                  e.stopPropagation();
                  setShowAllFeatures(true);
                }} className="flex items-center gap-1 text-purple-600 text-xs font-medium hover:text-purple-700 mb-2">
                      Voir plus <ChevronDown className="w-3 h-3" />
                    </button>}
                </div>
              </div>

              {/* Onetime Option */}
              <div onClick={() => handleCardSelect('onetime')} className={`p-3 md:p-4 rounded-xl md:rounded-2xl cursor-pointer transition-all duration-300 border-2 relative ${selectedPlan === 'onetime' ? 'border-purple-400 bg-purple-50/50 shadow-xl scale-105' : 'border-slate-200 hover:border-orange-300 hover:shadow-lg hover:scale-[1.02]'}`}>
                <div className="flex flex-col">
                  <h4 className="font-bold text-slate-700 text-base md:text-lg mb-1">
                    {plans.onetime.title}
                  </h4>
                  <p className="text-base md:text-lg font-semibold text-purple-600 mb-3">
                    {plans.onetime.subtitle}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2 mb-3">
                    {plans.onetime.features.map((feature, index) => <li key={index} className="flex items-start gap-2">
                        <Check className="w-3 h-3 text-green-500 mt-1 shrink-0" />
                        <span className="text-slate-600 text-xs md:text-sm leading-relaxed">
                          {feature.text}
                        </span>
                      </li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            {selectedPlan && <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-center">
                  <Button onClick={handleConfirm} className="w-full max-w-xs px-4 md:px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold transition-all duration-300 hover:from-orange-600 hover:to-pink-600 shadow-lg text-sm md:text-base">
                    CONFIRMER MON CHOIX
                  </Button>
                </div>
              </div>}
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center max-w-3xl mx-auto mb-8">
          <Button onClick={() => navigate('/child-count')} variant="outline" className="flex items-center gap-2 px-4 md:px-6 py-3 rounded-full border-2 border-slate-300 hover:border-orange-300 transition-colors text-sm md:text-base">
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
        </div>
      </div>

    </div>;
};
export default PlanSelection;