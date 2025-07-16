import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useDeliveryConfig } from '@/hooks/useDeliveryConfig';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { CalendarIcon, ArrowLeft, ShoppingBag, Check, CreditCard, Trash2, User, Phone, Mail, MapPin, Tag, Percent, Banknote, ChevronRight, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { useCurrency } from '@/context/CurrencyContext';
import { submitOrderWithPayment, type CustomerData, type OrderData, type OrderItem } from '@/services/orderService';
import { paymentConfig } from '@/config/paymentConfig';

const checkoutSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(8, 'Numéro de téléphone invalide'),
  adresse: z.string().min(5, 'Adresse requise'),
  ville: z.string().min(2, 'Ville requise'),
  code_postal: z.string().min(4, 'Code postal requis'),
  pays: z.string().min(2, 'Pays requis'),
  notes: z.string().optional(),
  paymentMethod: z.enum(['card', 'cash_on_delivery']),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { state, clearCart, removeFromCart, updateQuantity, getTotalPrice, getOriginalTotalPrice, getTotalDiscount } = useCart();
  const { 
    applyPromoCode, 
    removePromoCode, 
    getOrderSummary, 
    formatPrice,
    appliedPromoCode,
    appliedDiscount 
  } = useDeliveryConfig();
  const { convertPrice } = useCurrency();
  
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountMessage, setDiscountMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: string, size: string, name: string} | null>(null);
  const [hasNewsletterDiscount, setHasNewsletterDiscount] = useState(false);

  // Check for newsletter discount on component mount
  useEffect(() => {
    const isNewsletter = localStorage.getItem('isNewsletter');
    if (isNewsletter === 'true') {
      setHasNewsletterDiscount(true);
    }
  }, []);

  const steps = [
    { id: 1, title: 'Informations personnelles', icon: User },
    { id: 2, title: 'Détails de livraison', icon: MapPin },
    { id: 3, title: 'Paiement', icon: CreditCard }
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setValue,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      pays: 'France',
      paymentMethod: paymentConfig.bypassPayment ? 'cash_on_delivery' : 'card',
    }
  });

  // Always display prices in TND - no currency conversion on checkout
  const deliveryCost = getOrderSummary(getTotalPrice(), watch('pays') || 'France').deliveryPrice;
  const subtotal = getTotalPrice();
  const discount = getTotalDiscount();
  
  // Calculate newsletter discount (5% of subtotal)
  const newsletterDiscount = hasNewsletterDiscount ? subtotal * 0.05 : 0;
  
  // Calculate total with newsletter discount
  const totalAfterNewsletterDiscount = subtotal + deliveryCost - newsletterDiscount;
  const total = totalAfterNewsletterDiscount - appliedDiscount;

  const handleDiscountCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setDiscountCode(code);
    
    if (code.trim() === '') {
      removePromoCode();
      setDiscountMessage('');
      return;
    }
    
    const result = applyPromoCode(code, getTotalPrice());
    setDiscountMessage(result.message);
  };

  const handleDeleteItem = (id: string, size: string, name: string) => {
    setItemToDelete({ id, size, name });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete.id, itemToDelete.size);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof CheckoutFormData)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ['prenom', 'nom', 'email', 'telephone'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['adresse', 'ville', 'code_postal', 'pays'];
    }

    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      if (currentStep === 2 && !deliveryDate) {
        toast.error('Veuillez sélectionner une date de livraison');
        return;
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmitOrder = async (formData: CheckoutFormData) => {
    if (state.items.length === 0) {
      toast.error('Votre panier est vide');
      return;
    }

    if (!deliveryDate) {
      toast.error('Veuillez sélectionner une date de livraison');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare customer data
      const customerData: CustomerData = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone,
        adresse: formData.adresse,
        ville: formData.ville,
        code_postal: formData.code_postal,
        pays: formData.pays,
      };

      // Prepare order items
      const orderItems: OrderItem[] = state.items.map(item => ({
        product_id: parseInt(item.id),
        nom_product: item.name,
        reference: `REF-${item.id}`,
        price: item.price,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        discount: item.isDiscounted ? (item.originalPrice || item.price) - item.price : 0,
      }));

      // Determine payment method
      let paymentMethod: 'card' | 'cash_on_delivery' | 'test' = formData.paymentMethod;
      if (paymentConfig.bypassPayment) {
        paymentMethod = 'test';
      }

      // Calculate total discount including newsletter discount
      const totalDiscountAmount = discount + appliedDiscount + newsletterDiscount;

      // Prepare order data
      const orderData: OrderData = {
        items: orderItems,
        sous_total: subtotal,
        discount_amount: totalDiscountAmount,
        delivery_cost: deliveryCost,
        total_order: total,
        notes: formData.notes,
      };

      // Submit order
      const orderResult = await submitOrderWithPayment({
        customer: customerData,
        order: orderData,
      }, paymentMethod);

      if (!orderResult.success) {
        throw new Error(orderResult.message);
      }

      console.log('Order created successfully:', orderResult);
      
      // Remove newsletter discount after successful order
      if (hasNewsletterDiscount) {
        localStorage.removeItem('isNewsletter');
        setHasNewsletterDiscount(false);
      }
      
      clearCart();
      
      const paymentMethodParam = paymentMethod === 'test' ? 'test' : formData.paymentMethod;
      navigate(`/payment-success?order_id=${orderResult.order_number}&payment_method=${paymentMethodParam}`);

    } catch (error) {
      console.error('Error processing order:', error);
      toast.error(`Une erreur est survenue: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCurrentStepValid = () => {
    const formData = watch();
    if (currentStep === 1) {
      return formData.prenom && formData.nom && formData.email && formData.telephone;
    } else if (currentStep === 2) {
      return formData.adresse && formData.ville && formData.code_postal && formData.pays && deliveryDate;
    }
    return true;
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <div className="flex-1 bg-background flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-xl sm:text-2xl font-serif text-foreground mb-4">Votre panier est vide</h1>
            <p className="text-muted-foreground mb-8 text-sm sm:text-base">Ajoutez des articles à votre panier pour procéder au checkout</p>
            <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Continuer vos achats
            </Button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-background py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 relative">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="absolute left-0 top-2 sm:left-4 sm:top-4 p-2 hover:bg-muted rounded-full"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl sm:rounded-3xl py-6 sm:py-8 px-4 sm:px-6">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2 sm:mb-3">
                Finaliser votre commande
              </h1>
              <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
                Complétez vos informations pour finaliser votre achat en toute sécurité
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs sm:text-sm text-primary/70">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-center">Paiement 100% sécurisé • Livraison rapide • Service client 24/7</span>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8 sm:mb-12">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between relative px-4 sm:px-0">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center relative z-10">
                    <div className={cn(
                      "flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 transition-all duration-300 mb-2 sm:mb-4",
                      currentStep >= step.id 
                        ? "bg-primary border-primary text-primary-foreground shadow-lg scale-110" 
                        : "border-muted bg-background text-muted-foreground hover:border-primary/50"
                    )}>
                      {currentStep > step.id ? (
                        <Check className="w-4 h-4 sm:w-6 sm:h-6" />
                      ) : (
                        <step.icon className="w-4 h-4 sm:w-6 sm:h-6" />
                      )}
                    </div>
                    <p className={cn(
                      "text-xs sm:text-sm font-semibold text-center max-w-20 sm:max-w-24",
                      currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                    )}>
                      {step.title}
                    </p>
                  </div>
                ))}
                
                {/* Progress Line */}
                <div className="absolute top-6 sm:top-8 left-6 right-6 sm:left-8 sm:right-8 h-1 bg-muted rounded-full">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column - Form Steps */}
            <div className="space-y-4 sm:space-y-6">
              {/* Products Card */}
              <Card className="bg-card shadow-lg border border-border/50 overflow-hidden">
                <CardHeader className="border-b border-border bg-gradient-to-r from-primary/5 to-primary/10 p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl font-serif text-foreground">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                        <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold">Vos produits</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground font-normal">
                          {state.items.length} {state.items.length > 1 ? 'articles' : 'article'} sélectionnés
                        </p>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {state.items.map((item, index) => (
                      <div key={`${item.id}-${item.size}`} className="p-3 sm:p-4 lg:p-6 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="relative flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-lg bg-card border border-border shadow-sm"
                            />
                            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                              {item.quantity}
                            </div>
                            {item.isDiscounted && (
                              <div className="absolute -top-1 -left-1 bg-destructive text-destructive-foreground text-xs px-1 py-0.5 sm:px-1.5 sm:py-0.5 rounded-full font-medium">
                                -{item.discountPercentage}%
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-foreground text-sm sm:text-base lg:text-lg leading-tight pr-2">{item.name}</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteItem(item.id, item.size, item.name)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 p-1 flex-shrink-0"
                              >
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              </Button>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3">
                              <span className="flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                Taille: {item.size}
                              </span>
                              <span>Couleur: {item.color}</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 sm:gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                  className="w-6 h-6 sm:w-8 sm:h-8 p-0 text-xs"
                                >
                                  -
                                </Button>
                                <span className="w-6 sm:w-8 text-center font-medium text-sm">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                  className="w-6 h-6 sm:w-8 sm:h-8 p-0 text-xs"
                                >
                                  +
                                </Button>
                              </div>
                              
                              <div className="text-right">
                                {item.isDiscounted && item.originalPrice && (
                                  <div className="text-xs text-muted-foreground line-through">
                                    {(item.originalPrice * item.quantity).toFixed(0)} TND
                                  </div>
                                )}
                                <div className="font-semibold text-sm sm:text-lg text-foreground">
                                  {(item.price * item.quantity).toFixed(0)} TND
                                </div>
                                {item.isDiscounted && (
                                  <div className="text-xs text-green-600 font-medium">
                                    {formatPrice(((item.originalPrice || item.price) - item.price) * item.quantity)} économisé
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Form Steps */}
              <Card className="bg-card shadow-lg border border-border/50 overflow-hidden">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <form onSubmit={handleSubmit(handleSubmitOrder)} className="space-y-4 sm:space-y-6">
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                      <div className="space-y-4 sm:space-y-6">
                        <div className="text-center pb-4 sm:pb-6 border-b border-border">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                            <User className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Informations personnelles</h3>
                          <p className="text-muted-foreground text-sm sm:text-base">Veuillez remplir vos informations personnelles</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <Label htmlFor="prenom" className="text-sm">Prénom *</Label>
                            <Input
                              id="prenom"
                              {...register('prenom')}
                              className={cn("mt-1", errors.prenom ? 'border-destructive' : '')}
                            />
                            {errors.prenom && <p className="text-xs text-destructive mt-1">{errors.prenom.message}</p>}
                          </div>
                          <div>
                            <Label htmlFor="nom" className="text-sm">Nom *</Label>
                            <Input
                              id="nom"
                              {...register('nom')}
                              className={cn("mt-1", errors.nom ? 'border-destructive' : '')}
                            />
                            {errors.nom && <p className="text-xs text-destructive mt-1">{errors.nom.message}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <Label htmlFor="email" className="text-sm">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              {...register('email')}
                              className={cn("mt-1", errors.email ? 'border-destructive' : '')}
                            />
                            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                          </div>
                          <div>
                            <Label htmlFor="telephone" className="text-sm">Téléphone *</Label>
                            <Input
                              id="telephone"
                              {...register('telephone')}
                              className={cn("mt-1", errors.telephone ? 'border-destructive' : '')}
                            />
                            {errors.telephone && <p className="text-xs text-destructive mt-1">{errors.telephone.message}</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Delivery Details */}
                    {currentStep === 2 && (
                      <div className="space-y-4 sm:space-y-6">
                        <div className="text-center pb-4 sm:pb-6 border-b border-border">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                            <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Détails de livraison</h3>
                          <p className="text-muted-foreground text-sm sm:text-base">Indiquez où vous souhaitez recevoir votre commande</p>
                        </div>
                        
                        <div>
                          <Label htmlFor="adresse" className="text-sm">Adresse complète *</Label>
                          <Input
                            id="adresse"
                            {...register('adresse')}
                            className={cn("mt-1", errors.adresse ? 'border-destructive' : '')}
                          />
                          {errors.adresse && <p className="text-xs text-destructive mt-1">{errors.adresse.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <Label htmlFor="ville" className="text-sm">Ville *</Label>
                            <Input
                              id="ville"
                              {...register('ville')}
                              className={cn("mt-1", errors.ville ? 'border-destructive' : '')}
                            />
                            {errors.ville && <p className="text-xs text-destructive mt-1">{errors.ville.message}</p>}
                          </div>
                          <div>
                            <Label htmlFor="code_postal" className="text-sm">Code postal *</Label>
                            <Input
                              id="code_postal"
                              {...register('code_postal')}
                              className={cn("mt-1", errors.code_postal ? 'border-destructive' : '')}
                            />
                            {errors.code_postal && <p className="text-xs text-destructive mt-1">{errors.code_postal.message}</p>}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="pays" className="text-sm">Pays *</Label>
                          <Input
                            id="pays"
                            {...register('pays')}
                            className={cn("mt-1", errors.pays ? 'border-destructive' : '')}
                          />
                          {errors.pays && <p className="text-xs text-destructive mt-1">{errors.pays.message}</p>}
                        </div>

                        <div>
                          <Label className="text-sm">Date de livraison souhaitée *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal mt-1",
                                  !deliveryDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {deliveryDate ? format(deliveryDate, "PPP", { locale: fr }) : "Sélectionner une date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={deliveryDate}
                                onSelect={setDeliveryDate}
                                disabled={(date) =>
                                  date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div>
                          <Label htmlFor="notes" className="text-sm">Notes spéciales</Label>
                          <Textarea
                            id="notes"
                            {...register('notes')}
                            placeholder="Instructions de livraison ou commentaires..."
                            rows={3}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 3: Payment */}
                    {currentStep === 3 && (
                      <div className="space-y-4 sm:space-y-6">
                        <div className="text-center pb-4 sm:pb-6 border-b border-border">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                            <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Mode de paiement</h3>
                          <p className="text-muted-foreground text-sm sm:text-base">Choisissez votre méthode de paiement préférée</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="card"
                              value="card"
                              {...register('paymentMethod')}
                              className="w-4 h-4"
                            />
                            <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer text-sm">
                              <CreditCard className="w-4 h-4" />
                              Paiement par carte
                            </Label>
                          </div>
                          
                          {paymentConfig.enableCashOnDelivery && (
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="cash_on_delivery"
                                value="cash_on_delivery"
                                {...register('paymentMethod')}
                                className="w-4 h-4"
                              />
                              <Label htmlFor="cash_on_delivery" className="flex items-center gap-2 cursor-pointer text-sm">
                                <Banknote className="w-4 h-4" />
                                Paiement à la livraison
                              </Label>
                            </div>
                          )}
                        </div>

                        <div className="bg-muted/50 p-3 sm:p-4 rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-foreground">
                            <Shield className="w-4 h-4" />
                            <span>Paiement sécurisé SSL</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Vos informations de paiement sont cryptées et sécurisées.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6 sm:pt-8 border-t border-border">
                      {currentStep > 1 && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={prevStep}
                          className="px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Précédent
                        </Button>
                      )}
                      
                      {currentStep < 3 ? (
                        <Button 
                          type="button" 
                          onClick={nextStep}
                          disabled={!isCurrentStepValid()}
                          className="ml-auto px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg"
                        >
                          Suivant
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button 
                          type="submit" 
                          disabled={isSubmitting || !isCurrentStepValid()}
                          className="ml-auto px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Traitement...
                            </>
                          ) : (
                            <>
                              <Shield className="w-4 h-4 mr-2" />
                              Confirmer la commande
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-4 sm:space-y-6">
              <Card className="bg-card shadow-2xl border border-border/50 sticky top-4 overflow-hidden backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/15 to-primary/10 border-b border-border p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl font-serif text-foreground flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                      <Percent className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold">Récapitulatif de commande</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground font-normal">Tous les prix sont en TND</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                  {/* Promo Code */}
                  <div>
                    <Label htmlFor="discountCode" className="text-sm">Code de réduction</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="discountCode"
                        value={discountCode}
                        onChange={handleDiscountCodeChange}
                        placeholder="Entrez votre code"
                        className="text-sm"
                      />
                    </div>
                    {discountMessage && (
                      <p className={cn(
                        "text-xs mt-1",
                        appliedDiscount > 0 ? "text-green-600" : "text-destructive"
                      )}>
                        {discountMessage}
                      </p>
                    )}
                  </div>

                  {/* Order Summary */}
                  <div className="space-y-2 pt-3 sm:pt-4 border-t border-border">
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Sous-total original</span>
                        <span>{getOriginalTotalPrice().toFixed(0)} TND</span>
                      </div>
                    )}
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Remises produits</span>
                        <span>-{discount.toFixed(0)} TND</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span>Sous-total</span>
                      <span>{subtotal.toFixed(0)} TND</span>
                    </div>

                    {hasNewsletterDiscount && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Réduction newsletter (5%)</span>
                        <span>-{newsletterDiscount.toFixed(0)} TND</span>
                      </div>
                    )}

                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Code promo</span>
                        <span>-{appliedDiscount.toFixed(0)} TND</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span>Livraison</span>
                      <span>{deliveryCost > 0 ? `${deliveryCost.toFixed(0)} TND` : 'Gratuite'}</span>
                    </div>
                    
                    <div className="flex justify-between text-lg sm:text-xl font-bold pt-3 sm:pt-4 border-t-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mt-3 sm:mt-4">
                      <span className="text-primary">Total</span>
                      <div className="text-right">
                        <div className="text-primary text-xl sm:text-2xl font-extrabold">{Math.max(0, total).toFixed(0)} TND</div>
                        <div className="text-xs text-muted-foreground font-normal">
                          Paiement sécurisé en Dinars Tunisiens
                        </div>
                      </div>
                    </div>

                    {(discount + appliedDiscount + newsletterDiscount) > 0 && (
                      <div className="text-center text-sm text-green-600 font-medium bg-green-50 px-2 sm:px-3 py-2 rounded-lg">
                        🎉 Total économisé: {(discount + appliedDiscount + newsletterDiscount).toFixed(0)} TND
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg">Supprimer le produit ?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              Êtes-vous sûr de vouloir retirer "{itemToDelete?.name}" de votre panier ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <AlertDialogCancel className="w-full sm:w-auto">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <WhatsAppButton />
    </div>
  );
};

export default Checkout;
