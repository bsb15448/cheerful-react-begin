
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Send, 
  Type, 
  Image as ImageIcon, 
  Home, 
  CheckCircle2, 
  Upload, 
  Trash2, 
  Eye, 
  FileText,
  Building2,
  Calendar,
  Phone,
  AtSign,
  User,
  Package,
  Ruler,
  Hash,
  FileQuestion,
  Info,
  AlertTriangle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { productSidesConfigs } from "@/components/personalization/config/productSidesConfig";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuoteRequestSteps } from "@/components/devis/QuoteRequestSteps";
import { UploadedFileCard } from "@/components/devis/UploadedFileCard";
import { SuccessFeedback } from "@/components/devis/SuccessFeedback";
import { DesignCard } from "@/components/devis/DesignCard";
import ProductSelector from "@/components/devis/ProductSelector";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  company: z.string().optional(),
  productName: z.string().min(2, "Nom du produit requis"),
  quantity: z.number().min(1, "La quantité minimum est de 1"),
  size: z.string().min(1, "Taille requise"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  deadline: z.string().optional(),
  additionalNotes: z.string().optional(),
});

const standardSizes = [
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
  { label: "Sur mesure", value: "sur-mesure" },
  { label: "Autre", value: "autre" }
];

const Devis = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [designs, setDesigns] = useState<any[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [useCustomSize, setUseCustomSize] = useState(false);
  const designData = location.state;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      productName: designData?.productName || "",
      quantity: designData?.quantity || 1,
      size: designData?.selectedSize || "",
      description: designData?.items ? 
        `Pack ${designData.productName} comprenant: ${designData.items.map((item: any) => item.name).join(', ')}` : 
        "",
      deadline: "",
      additionalNotes: "",
    },
  });

  useEffect(() => {
    if (designData) {
      const existingDesignsString = sessionStorage.getItem('designs');
      const existingDesigns = existingDesignsString ? JSON.parse(existingDesignsString) : [];
      
      const designExists = existingDesigns.some(
        (design: any) => design.designNumber === designData.designNumber
      );
      
      if (!designExists) {
        const updatedDesigns = [...existingDesigns, designData];
        sessionStorage.setItem('designs', JSON.stringify(updatedDesigns));
        setDesigns(updatedDesigns);
      } else {
        setDesigns(existingDesigns);
      }

      // Populate the form with pack data if it's a pack
      if (designData.designNumber?.startsWith('PACK-')) {
        form.setValue('productName', designData.productName || '');
        form.setValue('quantity', designData.quantity || 1);
        form.setValue('size', designData.selectedSize || '');
        if (designData.items) {
          form.setValue('description', 
            `Pack ${designData.productName} comprenant: ${designData.items.map((item: any) => item.name).join(', ')}`
          );
        }
      }
    }
  }, [designData, form]);

  useEffect(() => {
    if (!location.state) {
      const cachedDesigns = sessionStorage.getItem('designs');
      if (cachedDesigns) {
        setDesigns(JSON.parse(cachedDesigns));
      }
    }
  }, [location.state]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    const validFiles = files.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "Erreur",
          description: `${file.name} dépasse la taille maximale de 5MB`,
          variant: "destructive",
        });
        return false;
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast({
          title: "Erreur",
          description: `${file.name} n'est pas un type de fichier autorisé`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const totalQuantity = designs.reduce((sum, design) => sum + design.quantity, 0);
  const isQuoteRequestEnabled = designs.length > 0 && totalQuantity >= 1;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    // Create FormData to handle file uploads
    const formData = new FormData();
    uploadedFiles.forEach((file, index) => {
      formData.append(`file-${index}`, file);
    });

    // Add form values to FormData
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    // Add designs if any
    if (designs.length > 0) {
      formData.append('designs', JSON.stringify(designs));
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', {
        formValues: values,
        designs,
        files: uploadedFiles
      });
      
      toast({
        title: "Demande envoyée avec succès",
        description: "Nous avons bien reçu votre demande de devis et vous contacterons prochainement.",
      });
      
      sessionStorage.removeItem('designs');
      setIsSuccess(true);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi du formulaire",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (isSuccess) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  const nextStep = () => {
    const fieldsToValidate = currentStep === 1 
      ? ['name', 'email', 'phone', 'company'] 
      : ['productName', 'quantity', 'size', 'description'];
    
    form.trigger(fieldsToValidate as any)
      .then((isValid) => {
        if (isValid) {
          window.scrollTo(0, 0);
          setCurrentStep(prev => prev + 1);
        }
      });
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSizeChange = (value: string) => {
    form.setValue('size', value);
    setUseCustomSize(value === 'autre' || value === 'sur-mesure');
  };

  if (isSuccess) {
    return <SuccessFeedback onBackToHome={handleBack} />;
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="hover:bg-gray-100"
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          
          <div className="hidden md:block">
            <QuoteRequestSteps currentStep={currentStep} />
          </div>
        </div>

        <div className="md:hidden mb-6">
          <QuoteRequestSteps currentStep={currentStep} />
        </div>

        {designs.length > 0 && (
          <Card className="mb-8 overflow-hidden border-primary/10 shadow-md">
            <CardHeader className="bg-primary/5 pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl text-primary">
                  Devis - {designs.length} produit{designs.length > 1 ? 's' : ''}
                </CardTitle>
                <div className="bg-primary/10 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Total articles:</span>
                    <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
                      {totalQuantity} unités
                    </Badge>
                  </div>
                </div>
              </div>
              <CardDescription>
                Les designs personnalisés suivants seront inclus dans votre demande de devis
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <ScrollArea className="h-[300px] lg:h-[400px]">
                <div className="p-6">
                  {designs.map((design, index) => (
                    <DesignCard 
                      key={index} 
                      design={design} 
                      productSidesConfigs={productSidesConfigs} 
                    />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="p-6 bg-primary/5 border-b flex items-center gap-4">
                  <div className="hidden md:flex items-center justify-center bg-primary/10 h-12 w-12 rounded-full">
                    {currentStep === 1 ? (
                      <User className="h-6 w-6 text-primary" />
                    ) : currentStep === 2 ? (
                      <Package className="h-6 w-6 text-primary" />
                    ) : (
                      <FileText className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-primary">
                      {currentStep === 1 ? "Informations de contact" : 
                      currentStep === 2 ? "Détails du produit" : 
                      "Fichiers et confirmation"}
                    </h1>
                    <p className="text-gray-600 mt-1">
                      {currentStep === 1 ? "Veuillez fournir vos informations de contact" : 
                      currentStep === 2 ? "Décrivez le produit et ses spécifications" : 
                      "Ajoutez des fichiers supplémentaires si nécessaire"}
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <User className="h-4 w-4 text-primary/70" />
                                Nom complet
                              </FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Votre nom" className="border-gray-300 focus:border-primary focus:ring-primary/30" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <AtSign className="h-4 w-4 text-primary/70" />
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input {...field} type="email" placeholder="Votre email" className="border-gray-300 focus:border-primary focus:ring-primary/30" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary/70" />
                                Téléphone
                              </FormLabel>
                              <FormControl>
                                <Input {...field} type="tel" placeholder="Votre numéro" className="border-gray-300 focus:border-primary focus:ring-primary/30" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-primary/70" />
                                Entreprise (optionnel)
                              </FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Nom de votre entreprise" className="border-gray-300 focus:border-primary focus:ring-primary/30" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Alert className="bg-primary/5 border-primary/20">
                        <Info className="h-4 w-4 text-primary" />
                        <AlertTitle>Besoin d'aide?</AlertTitle>
                        <AlertDescription>
                          Notre équipe commerciale est disponible au <span className="font-medium">+216 71 234 567</span> pour vous accompagner dans votre demande de devis.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="productName"
                          render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2">
                              <FormLabel className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-primary/70" />
                                Nom du produit
                              </FormLabel>
                              <FormControl>
                                <ProductSelector
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="quantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Hash className="h-4 w-4 text-primary/70" />
                                Quantité
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="number" 
                                  min="1"
                                  className="border-gray-300 focus:border-primary focus:ring-primary/30"
                                  onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="size"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Ruler className="h-4 w-4 text-primary/70" />
                                Taille
                              </FormLabel>
                              <Select
                                onValueChange={handleSizeChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary/30">
                                    <SelectValue placeholder="Sélectionnez une taille" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {standardSizes.map((size) => (
                                    <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              
                              {useCustomSize && (
                                <Input
                                  placeholder="Précisez la taille..."
                                  className="mt-2 border-gray-300 focus:border-primary focus:ring-primary/30"
                                  onChange={(e) => form.setValue('size', e.target.value)}
                                />
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="deadline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary/70" />
                                Date souhaitée (optionnel)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="date"
                                  className="border-gray-300 focus:border-primary focus:ring-primary/30"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mt-6">
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-primary/70" />
                                Description détaillée
                              </FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  placeholder="Décrivez votre projet en détail..."
                                  className="min-h-[120px] border-gray-300 focus:border-primary focus:ring-primary/30"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      <FormField
                        control={form.control}
                        name="additionalNotes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <FileQuestion className="h-4 w-4 text-primary/70" />
                              Notes supplémentaires (optionnel)
                            </FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field}
                                placeholder="Autres informations importantes..."
                                className="min-h-[100px] border-gray-300 focus:border-primary focus:ring-primary/30"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-2">
                          <Upload className="h-5 w-5 text-primary/70" />
                          <Label className="text-lg">Fichiers joints (optionnel)</Label>
                        </div>
                        
                        <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 mb-4">
                          <FormDescription className="flex items-start gap-2 text-sm">
                            <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium mb-1">Fichiers acceptés :</p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Images (JPG, PNG, GIF)</li>
                                <li>Documents (PDF, DOC, DOCX)</li>
                                <li>Taille maximale : 5MB par fichier</li>
                              </ul>
                            </div>
                          </FormDescription>
                        </div>
                        
                        <div className="grid gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('file-upload')?.click()}
                            className="w-full border-dashed border-2 border-primary/30 bg-white hover:bg-primary/5 text-primary py-8"
                          >
                            <Upload className="mr-2 h-5 w-5" />
                            Déposer ou sélectionner des fichiers
                          </Button>
                          <input
                            id="file-upload"
                            type="file"
                            multiple
                            accept={ALLOWED_FILE_TYPES.join(',')}
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                          
                          {uploadedFiles.length > 0 && (
                            <div className="grid gap-3 mt-2">
                              {uploadedFiles.map((file, index) => (
                                <UploadedFileCard
                                  key={index}
                                  file={file}
                                  onView={() => window.open(URL.createObjectURL(file))}
                                  onRemove={() => removeFile(index)}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t">
                        <Card className="bg-primary/5 border-primary/10">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                              <div>
                                <h3 className="font-medium text-gray-800">Récapitulatif de votre demande</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  Veuillez vérifier vos informations avant de soumettre votre demande de devis.
                                </p>
                                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Nom:</span>
                                    <span className="font-medium">{form.getValues().name}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Email:</span>
                                    <span className="font-medium">{form.getValues().email}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Téléphone:</span>
                                    <span className="font-medium">{form.getValues().phone}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Produit:</span>
                                    <span className="font-medium">{form.getValues().productName}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Quantité:</span>
                                    <span className="font-medium">{form.getValues().quantity}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Taille:</span>
                                    <span className="font-medium">{form.getValues().size}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between mt-10">
                    {currentStep > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={isLoading}
                        className="border-gray-300 hover:bg-gray-50"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Précédent
                      </Button>
                    ) : (
                      <div></div>
                    )}

                    {currentStep < 3 ? (
                      <Button 
                        type="button" 
                        onClick={nextStep}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Suivant
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="px-6 py-2 bg-primary hover:bg-primary/90"
                        disabled={!form.formState.isValid || isLoading}
                      >
                        {isLoading ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center space-x-2"
                          >
                            <span>Envoi en cours</span>
                            <motion.div className="inline-flex space-x-1">
                              {[0, 1, 2].map((i) => (
                                <motion.span
                                  key={i}
                                  className="h-2 w-2 bg-white rounded-full"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ 
                                    duration: 0.5, 
                                    repeat: Infinity, 
                                    repeatDelay: 0.2,
                                    delay: i * 0.2
                                  }}
                                />
                              ))}
                            </motion.div>
                          </motion.div>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Envoyer la demande
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Devis;
