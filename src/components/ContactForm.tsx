
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, User, MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
  const { toast } = useToast();
  const { t } = useTranslation('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Erreur",
        description: t('form.validation.nameRequired'),
        variant: 'destructive'
      });
      return false;
    }
    if (!formData.email.trim()) {
      toast({
        title: "Erreur",
        description: t('form.validation.emailRequired'),
        variant: 'destructive'
      });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast({
        title: "Erreur",
        description: t('form.validation.emailInvalid'),
        variant: 'destructive'
      });
      return false;
    }
    if (!formData.phone.trim()) {
      toast({
        title: "Erreur",
        description: t('form.validation.phoneRequired'),
        variant: 'destructive'
      });
      return false;
    }
    if (!formData.message.trim()) {
      toast({
        title: "Erreur",
        description: t('form.validation.messageRequired'),
        variant: 'destructive'
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('https://draminesaid.com/lucci/api/insert_message.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nom_client: formData.name,
          email_client: formData.email,
          telephone_client: formData.phone,
          message_client: formData.message
        })
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: "Message envoyé",
          description: t('form.success')
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erreur",
        description: t('form.error'),
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-light text-gray-900 mb-4 font-montserrat">
          {t('form.title')}
        </h2>
        <p className="text-gray-600">
          {t('form.description')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2 text-gray-700">
              <User className="w-4 h-4" />
              {t('form.name')}
            </Label>
            <Input 
              id="name" 
              type="text" 
              value={formData.name} 
              onChange={e => handleInputChange('name', e.target.value)} 
              className="w-full border-gray-200 focus:border-gray-400 focus:ring-0" 
              disabled={isSubmitting} 
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4" />
              {t('form.phone')}
            </Label>
            <Input 
              id="phone" 
              type="tel" 
              value={formData.phone} 
              onChange={e => handleInputChange('phone', e.target.value)} 
              className="w-full border-gray-200 focus:border-gray-400 focus:ring-0" 
              disabled={isSubmitting} 
              required 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2 text-gray-700">
            <Mail className="w-4 h-4" />
            {t('form.email')}
          </Label>
          <Input 
            id="email" 
            type="email" 
            value={formData.email} 
            onChange={e => handleInputChange('email', e.target.value)} 
            className="w-full border-gray-200 focus:border-gray-400 focus:ring-0" 
            disabled={isSubmitting} 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium flex items-center gap-2 text-gray-700">
            <MessageSquare className="w-4 h-4" />
            {t('form.message')}
          </Label>
          <Textarea 
            id="message" 
            value={formData.message} 
            onChange={e => handleInputChange('message', e.target.value)} 
            placeholder={t('form.messagePlaceholder')}
            className="w-full min-h-[120px] resize-none border-gray-200 focus:border-gray-400 focus:ring-0" 
            disabled={isSubmitting} 
            required 
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-black text-white hover:bg-gray-800 py-3 font-medium text-base flex items-center justify-center gap-2" 
          disabled={isSubmitting}
        >
          {isSubmitting ? t('form.sending') : (
            <>
              <Send className="w-4 h-4" />
              {t('form.send')}
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
