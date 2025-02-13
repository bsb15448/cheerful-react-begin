
import { useState } from 'react';
import { Minus, Plus, ShoppingBag, Heart, ArrowLeft } from 'lucide-react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { getProductImages } from '@/config/productDetailImages';
import { products } from '@/config/products';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/components/cart/CartProvider';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState("Blanc");
  const addToCart = useCartStore((state) => state.addItem);

  const productImages = getProductImages(id || '');
  const product = products.find(p => p.id === id);

  const availableColors = [
    { name: "Blanc", value: "#FFFFFF", border: "border-gray-200" },
    { name: "Noir", value: "#000000" },
    { name: "Bleu Marine", value: "#1B2C4B" },
    { name: "Rouge", value: "#DC2626" },
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une taille",
        variant: "destructive",
      });
      return;
    }

    if (!id) return;

    const numericId = parseInt(id.replace(/[^0-9]/g, '')) || Date.now();

    addToCart({
      id: `${id}-${selectedSize}-${selectedColor}`,
      quantity,
      product_id: numericId,
      size: selectedSize,
      color: selectedColor,
      itemgroup_product: product?.name || '',
    });

    toast({
      title: "✨ Produit ajouté !",
      description: `${product?.name} (Taille: ${selectedSize}, Couleur: ${selectedColor}, Quantité: ${quantity})`,
      className: "bg-primary text-white animate-bounce",
    });
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 hover:bg-gray-100" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          <div className="lg:w-24 flex lg:flex-col gap-4 order-2 lg:order-1">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="lg:flex-1 order-1 lg:order-2">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-50">
              <img
                src={productImages[selectedImage] || product.image}
                alt="Product main view"
                className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>

          <div className="lg:w-1/3 space-y-6 order-3">
            <div>
              <h1 className="text-2xl font-bold text-primary mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm">À partir de</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-red-600">{product.startingPrice} €</span>
                <span className="text-gray-500 line-through">
                  {(parseFloat(product.startingPrice) * 1.3).toFixed(2)} €
                </span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">
                  Payez en 3 ou 4 fois à partir de 10€ sans intérêts
                </p>
                <span className="bg-black text-white text-xs px-2 py-1 rounded">
                  4x sans frais
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium">Couleur disponible</label>
              <div className="flex gap-3">
                {availableColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      color.border || 'border-transparent'
                    } ${selectedColor === color.name ? 'ring-2 ring-primary ring-offset-2' : ''} 
                    transition-all duration-300 hover:scale-110 focus:outline-none`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Taille
                </label>
                <select 
                  className="w-full border rounded-md p-2"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Sélectionnez une taille</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border rounded hover:bg-gray-100 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border rounded p-2"
                min="1"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border rounded hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {product.isPersonalizable ? (
                <Link 
                  to="/personalization" 
                  className="w-full bg-primary text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Personnaliser
                </Link>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`w-full px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-102 ${
                    selectedSize 
                      ? 'bg-primary text-white hover:bg-primary/90' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Acheter maintenant
                </button>
              )}
            </div>

            <div className="space-y-2 pt-4 border-t">
              <button className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm w-full">
                <Heart className="w-4 h-4" />
                Ajouter à ma liste d'envie
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <p className="text-xs">Livraison gratuite dès 89€ TTC</p>
              </div>
              <div className="text-center">
                <p className="text-xs">Paiement 3x CB sans frais</p>
              </div>
              <div className="text-center">
                <p className="text-xs">Retour gratuit 60 jours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
