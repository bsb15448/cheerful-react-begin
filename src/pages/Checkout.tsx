
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/contexts/CartContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CreditCard, Truck, MapPin, Package, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import ContactModal from '@/components/modals/ContactModal';
import StoreFinderModal from '@/components/modals/StoreFinderModal';
import { initKonnectPayment } from '@/services/konnectPayment';
import { submitOrder, type CustomerData, type OrderData, type OrderItem, type DeliveryAddress } from '@/services/orderService';

const checkoutSchema = z.object({
  // Customer Information
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(8, 'Numéro de téléphone invalide'),
  
  // Billing Address
  adresse: z.string().min(5, 'Adresse requise'),
  ville: z.string().min(2, 'Ville requise'),
  code_postal: z.string().min(4, 'Code postal requis'),
  pays: z.string().min(2, 'Pays requis'),
  
  // Delivery Options
  differentDeliveryAddress: z.boolean().default(false),
  delivery_nom: z.string().optional(),
  delivery_prenom: z.string().optional(),
  delivery_telephone: z.string().optional(),
  delivery_adresse: z.string().optional(),
  delivery_ville: z.string().optional(),
  delivery_code_postal: z.string().optional(),
  delivery_pays: z.string().optional(),
  delivery_instructions: z.string().optional(),
  
  // Order Options
  paymentMethod: z.enum(['card', 'cash_on_delivery']),
  notes: z.string().optional(),
  preferredDeliveryDate: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('checkout');
  const { items, getTotalPrice, getTotalDiscount, clearCart } = useCart();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isStoreFinderOpen, setIsStoreFinderOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      pays: 'Tunisia',
      delivery_pays: 'Tunisia',
      paymentMethod: 'card',
      differentDeliveryAddress: false,
    },
  });

  const deliveryCost = 15; // Fixed delivery cost
  const subtotal = getTotalPrice();
  const discount = getTotalDiscount();
  const total = subtotal + deliveryCost;

  const handleSubmitOrder = async (formData: CheckoutFormData) => {
    if (items.length === 0) {
      toast.error('Votre panier est vide');
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
      const orderItems: OrderItem[] = items.map(item => ({
        product_id: parseInt(item.id),
        nom_product: item.name,
        reference: `REF-${item.id}`,
        price: item.price,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        discount: item.isDiscounted ? (item.originalPrice || item.price) - item.price : 0,
      }));

      // Prepare delivery address if different
      let deliveryAddress: DeliveryAddress | undefined;
      if (formData.differentDeliveryAddress) {
        deliveryAddress = {
          nom: formData.delivery_nom || formData.nom,
          prenom: formData.delivery_prenom || formData.prenom,
          telephone: formData.delivery_telephone,
          adresse: formData.delivery_adresse || formData.adresse,
          ville: formData.delivery_ville || formData.ville,
          code_postal: formData.delivery_code_postal || formData.code_postal,
          pays: formData.delivery_pays || formData.pays,
          instructions: formData.delivery_instructions,
        };
      }

      // Prepare order data
      const orderData: OrderData = {
        items: orderItems,
        sous_total: subtotal,
        discount_amount: discount,
        delivery_cost: deliveryCost,
        total_order: total,
        status: 'pending',
        payment_method: formData.paymentMethod === 'card' ? 'Konnect' : 'Cash on Delivery',
        notes: formData.notes,
        delivery_address: deliveryAddress,
      };

      // Submit order to database
      const orderResult = await submitOrder({
        customer: customerData,
        order: orderData,
      });

      if (!orderResult.success) {
        throw new Error(orderResult.message);
      }

      console.log('Order created successfully:', orderResult);

      // Handle payment based on method
      if (formData.paymentMethod === 'card') {
        // Generate unique order ID for Konnect
        const konnectOrderId = orderResult.order_number || `ORDER-${Date.now()}`;
        
        // Initialize Konnect payment
        const paymentResult = await initKonnectPayment({
          amount: total,
          firstName: formData.prenom,
          lastName: formData.nom,
          email: formData.email,
          orderId: konnectOrderId,
        });

        // Redirect to Konnect payment page
        window.location.href = paymentResult.payUrl;
      } else {
        // Cash on delivery - clear cart and redirect to success page
        clearCart();
        navigate(`/payment-success?order_id=${orderResult.order_number}&payment_method=cash_on_delivery`);
      }

    } catch (error) {
      console.error('Error processing order:', error);
      toast.error('Une erreur est survenue lors du traitement de votre commande');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
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
            <Card>
              <CardContent className="p-8">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h1 className="text-2xl font-serif text-gray-900 mb-4">Votre panier est vide</h1>
                <p className="text-gray-600 mb-6">Ajoutez des articles à votre panier pour continuer.</p>
                <Button onClick={() => navigate('/')} className="bg-slate-900 hover:bg-slate-800 text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continuer les achats
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        <StoreFinderModal isOpen={isStoreFinderOpen} onClose={() => setIsStoreFinderOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar onStoreFinderOpen={() => setIsStoreFinderOpen(true)} />
      <Header 
        onMenuClick={() => {}} 
        onContactOpen={() => setIsContactOpen(true)}
        onBookingOpen={() => {}}
      />
      
      <div className="min-h-screen bg-gray-50 pt-40 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-3xl font-serif text-gray-900 mt-4">Commande</h1>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitOrder)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Informations personnelles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="prenom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="nom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="telephone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Billing Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Adresse de facturation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="adresse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="ville"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ville *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="code_postal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Code postal *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pays"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pays *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      Adresse de livraison
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="differentDeliveryAddress"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Livrer à une adresse différente
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    {form.watch('differentDeliveryAddress') && (
                      <div className="space-y-4 border-t pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="delivery_prenom"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Prénom du destinataire</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="delivery_nom"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nom du destinataire</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="delivery_telephone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Téléphone du destinataire</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="delivery_adresse"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adresse de livraison</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="delivery_ville"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Ville</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="delivery_code_postal"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Code postal</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="delivery_pays"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Pays</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="delivery_instructions"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Instructions de livraison</FormLabel>
                              <FormControl>
                                <Textarea {...field} placeholder="Instructions spéciales pour la livraison..." />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Mode de paiement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-2"
                            >
                              <div className="flex items-center space-x-2 border rounded-lg p-3">
                                <RadioGroupItem value="card" id="card" />
                                <Label htmlFor="card" className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span>Paiement par carte</span>
                                    <Badge variant="outline">Konnect</Badge>
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Paiement sécurisé par carte bancaire
                                  </p>
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 border rounded-lg p-3">
                                <RadioGroupItem value="cash_on_delivery" id="cash" />
                                <Label htmlFor="cash" className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span>Paiement à la livraison</span>
                                    <Badge variant="outline">Espèces</Badge>
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Payez en espèces lors de la réception
                                  </p>
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Additional Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Notes additionnelles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Commentaires sur votre commande (optionnel)</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Notes spéciales, instructions de livraison..." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Order Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Résumé de la commande</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={`${item.id}-${item.size}`} className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm text-gray-500">
                              Taille: {item.size} • Quantité: {item.quantity}
                              {item.color && ` • Couleur: ${item.color}`}
                            </p>
                          </div>
                          <div className="text-right">
                            {item.isDiscounted && (
                              <p className="text-xs text-gray-500 line-through">
                                {((item.originalPrice || item.price) * item.quantity).toFixed(2)} TND
                              </p>
                            )}
                            <p className="font-medium">
                              {(item.price * item.quantity).toFixed(2)} TND
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Order Totals */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Sous-total</span>
                        <span>{subtotal.toFixed(2)} TND</span>
                      </div>
                      
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Réduction</span>
                          <span>-{discount.toFixed(2)} TND</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span>Livraison</span>
                        <span>{deliveryCost.toFixed(2)} TND</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>{total.toFixed(2)} TND</span>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Traitement...'
                      ) : form.watch('paymentMethod') === 'card' ? (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Payer avec carte
                        </>
                      ) : (
                        <>
                          <Package className="w-4 h-4 mr-2" />
                          Confirmer la commande
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      En passant votre commande, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <StoreFinderModal isOpen={isStoreFinderOpen} onClose={() => setIsStoreFinderOpen(false)} />
    </div>
  );
};

export default Checkout;
