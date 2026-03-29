import { useState } from 'react';
import { Save, Lock, Palette } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export default function AdminSettings() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState('general');

  const sections = [
    { id: 'general', label: 'Général', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Lock },
    { id: 'branding', label: 'Marque', icon: Palette },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-white">{t('admin.settings')}</h1>
        <p className="text-sm text-white/40 mt-1">{t('admin.settingsTitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1 bg-[#14141f] border border-white/5 rounded-xl p-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[13px] font-medium transition-colors ${
                  activeSection === s.id
                    ? 'bg-brand-gold/10 text-brand-gold'
                    : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                }`}
              >
                <s.icon className="w-4 h-4" />
                {s.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 bg-[#14141f] border border-white/5 rounded-xl p-4 md:p-6">
          {activeSection === 'general' && (
            <div className="space-y-6">
              <h3 className="text-[15px] font-medium text-white/80 mb-4">Informations générales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Nom de l\'entreprise', value: 'L.S Transport', type: 'text' },
                  { label: 'Email', value: 'contact@lstransport.fr', type: 'email' },
                  { label: 'Téléphone', value: '+33 6 00 00 00 00', type: 'tel' },
                  { label: 'SIRET', value: 'XXX XXX XXX XXXXX', type: 'text' },
                  { label: 'Adresse', value: 'Région PACA, France', type: 'text' },
                  { label: 'Site web', value: 'lstransport.fr', type: 'url' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-[11px] text-white/35 uppercase tracking-wider mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-white/70 focus:outline-none focus:border-brand-gold/30"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-[11px] text-white/35 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  rows={3}
                  defaultValue="Service de transport privé d'exception dans la région PACA."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-white/70 focus:outline-none focus:border-brand-gold/30 resize-none"
                />
              </div>
              <button className="btn-primary text-[12px] !py-2.5 !px-6 flex items-center gap-2">
                <Save className="w-3.5 h-3.5" />
                <span>Enregistrer</span>
              </button>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-[15px] font-medium text-white/80 mb-4">Préférences de notification</h3>
              {[
                { label: 'Nouvelle réservation', desc: 'Recevoir un email à chaque nouvelle demande', enabled: true },
                { label: 'Rappels', desc: 'Rappel 24h avant chaque trajet', enabled: true },
                { label: 'Annulations', desc: 'Notification en cas d\'annulation', enabled: true },
                { label: 'Rapports hebdomadaires', desc: 'Résumé des statistiques chaque lundi', enabled: false },
                { label: 'Alertes maintenance', desc: 'Rappel d\'entretien des véhicules', enabled: true },
              ].map((notif) => (
                <div key={notif.label} className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02]">
                  <div>
                    <p className="text-[13px] text-white/70">{notif.label}</p>
                    <p className="text-[11px] text-white/30 mt-0.5">{notif.desc}</p>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${notif.enabled ? 'bg-brand-gold' : 'bg-white/10'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${notif.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6">
              <h3 className="text-[15px] font-medium text-white/80 mb-4">Sécurité du compte</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] text-white/35 uppercase tracking-wider mb-2">Mot de passe actuel</label>
                  <input type="password" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-white/70 focus:outline-none focus:border-brand-gold/30" />
                </div>
                <div>
                  <label className="block text-[11px] text-white/35 uppercase tracking-wider mb-2">Nouveau mot de passe</label>
                  <input type="password" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-white/70 focus:outline-none focus:border-brand-gold/30" />
                </div>
                <div>
                  <label className="block text-[11px] text-white/35 uppercase tracking-wider mb-2">Confirmer</label>
                  <input type="password" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-white/70 focus:outline-none focus:border-brand-gold/30" />
                </div>
              </div>
              <button className="btn-primary text-[12px] !py-2.5 !px-6 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Mettre à jour</span>
              </button>
            </div>
          )}

          {activeSection === 'branding' && (
            <div className="space-y-6">
              <h3 className="text-[15px] font-medium text-white/80 mb-4">Identité visuelle</h3>
              <div>
                <label className="block text-[11px] text-white/35 uppercase tracking-wider mb-2">Logo</label>
                <div className="flex items-center gap-4">
                  <img src="/images/logo.png" alt="Logo" className="h-12 bg-white/5 rounded-lg p-2" />
                  <button className="text-[12px] text-brand-gold/70 hover:text-brand-gold transition-colors">
                    Changer le logo
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Or principal', color: 'hsl(38, 72%, 52%)' },
                  { label: 'Or clair', color: 'hsl(38, 60%, 65%)' },
                  { label: 'Noir', color: 'hsl(0, 0%, 5%)' },
                  { label: 'Crème', color: 'hsl(38, 25%, 92%)' },
                ].map((c) => (
                  <div key={c.label} className="text-center">
                    <div className="w-full aspect-square rounded-xl border border-white/10 mb-2" style={{ backgroundColor: c.color }} />
                    <p className="text-[10px] text-white/30">{c.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
