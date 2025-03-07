import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "@/components/ui/image";
import { PackConfig, PackItem, getPackById } from "@/config/packsConfig";
import { Tag, Info, AlertTriangle, Check, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import PackItemModal from "@/components/packs/PackItemModal";

const PackDetail = () => {
  const { packId } = useParams<{ packId: string }>();
  const [packInfo, setPackInfo] = useState<PackConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<PackItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!packId) {
      setLoading(false);
      return;
    }

    try {
      console.log("Looking for pack with ID:", packId);
      const pack = getPackById(packId);
      console.log("Retrieved pack:", pack);
      
      if (pack) {
        setPackInfo(pack);
      } else {
        toast.error("Pack non trouvé", {
          description: "Le pack demandé n'existe pas ou n'est pas disponible."
        });
      }
    } catch (error) {
      console.error("Error fetching pack:", error);
      toast.error("Erreur lors du chargement", {
        description: "Une erreur est survenue lors du chargement du pack."
      });
    } finally {
      setLoading(false);
    }
  }, [packId]);

  const handleRequestQuote = () => {
    if (packInfo) {
      const packDesign = {
        designNumber: `PACK-${packInfo.id.toUpperCase()}`,
        productName: packInfo.title,
        productId: packInfo.id,
        selectedSize: "Standard",
        quantity: 1,
        designs: {},
        items: packInfo.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price
        }))
      };

      const existingDesignsString = sessionStorage.getItem('designs');
      const existingDesigns = existingDesignsString ? JSON.parse(existingDesignsString) : [];
      
      const designExists = existingDesigns.some(
        (design: any) => design.designNumber === packDesign.designNumber
      );
      
      if (!designExists) {
        const updatedDesigns = [...existingDesigns, packDesign];
        sessionStorage.setItem('designs', JSON.stringify(updatedDesigns));
      }
      
      navigate('/devis', { state: packDesign });
    }
  };

  const openItemModal = (item: PackItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeItemModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!packInfo) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Pack non trouvé</h1>
        <p className="text-gray-600 mb-6 text-center">
          Nous n'avons pas pu trouver le pack que vous recherchez.
        </p>
        <Button asChild className="bg-primary">
          <Link to="/nos-packs">Voir tous nos packs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="relative mb-12 rounded-xl overflow-hidden shadow-xl animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
        <img 
          src={packInfo.image} 
          alt={packInfo.title} 
          className="w-full h-80 object-cover transition-transform hover:scale-105 duration-700"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-start text-white p-8 md:p-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {packInfo.title}
          </h1>
          <p className="text-xl max-w-2xl">{packInfo.description}</p>
          <div className="flex gap-4 mt-6">
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 shadow-lg"
              onClick={handleRequestQuote}
            >
              Demander un devis
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 mb-12 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-100">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-8 bg-primary rounded-full inline-block"></span>
              {packInfo.title}
            </h2>
            <p className="text-gray-600">Solution complète pour professionnels</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary">À partir de 100 TND</span>
              {packInfo.discount && (
                <>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 ml-2">
                    {packInfo.discount} d'économie
                  </Badge>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-700 text-lg leading-relaxed">
              Notre <span className="font-semibold">{packInfo.title}</span> est conçu pour répondre à tous vos besoins professionnels. 
              Ce pack comprend une sélection d'articles essentiels pour votre activité, 
              garantissant qualité, confort et style professionnel.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Tous nos articles sont personnalisables avec votre logo et peuvent être adaptés 
              à vos besoins spécifiques. Contactez-nous pour plus d'informations ou pour 
              demander un devis personnalisé.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Avantages clés</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary text-lg mr-2">✓</span>
                  <span>Produits de qualité professionnelle</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-lg mr-2">✓</span>
                  <span>Personnalisation avec votre logo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-lg mr-2">✓</span>
                  <span>Solution complète et économique</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-lg mr-2">✓</span>
                  <span>Conseils d'experts pour votre sélection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="relative">
            Ce pack comprend
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/30 rounded-full"></span>
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packInfo.items && packInfo.items.length > 0 ? (
            packInfo.items.map((item) => (
              <div 
                key={item.id} 
                className="group relative bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Badge for personalization */}
                {item.isPersonalizable && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-2 py-1 text-xs shadow-sm">
                      <Check className="h-3 w-3 mr-1" /> Personnalisable
                    </Badge>
                  </div>
                )}
                
                <div className="relative h-48 overflow-hidden bg-gray-50">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="space-y-0.5">
                      <p className="text-xs text-gray-500">À partir de</p>
                      <span className="font-semibold text-primary">{item.price} TND</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                      <Info className="h-3 w-3 mr-1" /> Inclus
                    </Badge>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-100">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs px-3 text-gray-700 hover:text-primary w-full"
                      onClick={() => openItemModal(item)}
                    >
                      <Eye className="h-3 w-3 mr-1" /> Voir détails
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Aucun article trouvé dans ce pack.</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-xl p-10 text-center shadow-sm">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Prêt à équiper votre établissement?</h2>
        <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
          Contactez-nous dès aujourd'hui pour obtenir un devis personnalisé adapté à vos besoins spécifiques.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white px-8"
            onClick={handleRequestQuote}
          >
            Demander un devis
          </Button>
          <Button variant="outline" size="lg" className="border-gray-300 hover:bg-gray-50">
            Commander
          </Button>
        </div>
      </div>

      {/* Item Modal */}
      <PackItemModal 
        item={selectedItem} 
        isOpen={isModalOpen} 
        onClose={closeItemModal} 
      />
    </div>
  );
};

export default PackDetail;
