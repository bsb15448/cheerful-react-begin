import { useState } from 'react';
import { Save, Plus, Trash2, Info } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

interface PricingRule {
  id: string;
  label: string;
  type: 'per_km' | 'per_hour' | 'flat' | 'per_minute';
  value: number;
  currency: string;
  description: string;
}

interface ZoneRate {
  id: string;
  from: string;
  to: string;
  basePrice: number;
  pricePerKm: number;
}

const defaultRules: PricingRule[] = [
  { id: 'base_fare', label: '', type: 'flat', value: 15, currency: '€', description: '' },
  { id: 'price_per_km', label: '', type: 'per_km', value: 2.20, currency: '€', description: '' },
  { id: 'waiting_per_min', label: '', type: 'per_minute', value: 0.50, currency: '€', description: '' },
  { id: 'night_surcharge', label: '', type: 'flat', value: 10, currency: '€', description: '' },
  { id: 'airport_supplement', label: '', type: 'flat', value: 20, currency: '€', description: '' },
  { id: 'hourly_rate', label: '', type: 'per_hour', value: 55, currency: '€', description: '' },
];

const defaultZones: ZoneRate[] = [
  { id: 'z1', from: 'Nice Aéroport', to: 'Monaco', basePrice: 80, pricePerKm: 2.50 },
  { id: 'z2', from: 'Nice Aéroport', to: 'Cannes', basePrice: 90, pricePerKm: 2.30 },
  { id: 'z3', from: 'Marseille Aéroport', to: 'Aix-en-Provence', basePrice: 60, pricePerKm: 2.00 },
  { id: 'z4', from: 'Marseille', to: 'Cassis', basePrice: 55, pricePerKm: 2.10 },
];

export default function AdminPricing() {
  const { t } = useI18n();
  const [rules, setRules] = useState<PricingRule[]>(defaultRules);
  const [zones, setZones] = useState<ZoneRate[]>(defaultZones);
  const [activeTab, setActiveTab] = useState<'rates' | 'zones' | 'services'>('rates');
  const [saved, setSaved] = useState(false);

  const ruleLabels: Record<string, string> = {
    base_fare: t('admin.pricing.baseFare'),
    price_per_km: t('admin.pricing.perKm'),
    waiting_per_min: t('admin.pricing.waitingTime'),
    night_surcharge: t('admin.pricing.nightSurcharge'),
    airport_supplement: t('admin.pricing.airportSupplement'),
    hourly_rate: t('admin.pricing.hourlyRate'),
  };

  const ruleDescs: Record<string, string> = {
    base_fare: t('admin.pricing.baseFareDesc'),
    price_per_km: t('admin.pricing.perKmDesc'),
    waiting_per_min: t('admin.pricing.waitingTimeDesc'),
    night_surcharge: t('admin.pricing.nightSurchargeDesc'),
    airport_supplement: t('admin.pricing.airportSupplementDesc'),
    hourly_rate: t('admin.pricing.hourlyRateDesc'),
  };

  const typeLabels: Record<string, string> = {
    per_km: t('admin.pricing.typePerKm'),
    per_hour: t('admin.pricing.typePerHour'),
    flat: t('admin.pricing.typeFlat'),
    per_minute: t('admin.pricing.typePerMin'),
  };

  const serviceRates = [
    { service: t('service.airport'), minPrice: 60, avgPrice: 120, maxKm: 80 },
    { service: t('service.business'), minPrice: 80, avgPrice: 200, maxKm: 150 },
    { service: t('service.event'), minPrice: 150, avgPrice: 350, maxKm: 100 },
    { service: t('service.excursion'), minPrice: 200, avgPrice: 500, maxKm: 200 },
  ];

  const updateRule = (id: string, value: number) => {
    setRules(rules.map(r => r.id === id ? { ...r, value } : r));
    setSaved(false);
  };

  const updateZone = (id: string, field: keyof ZoneRate, value: string | number) => {
    setZones(zones.map(z => z.id === id ? { ...z, [field]: value } : z));
    setSaved(false);
  };

  const addZone = () => {
    setZones([...zones, { id: `z${Date.now()}`, from: '', to: '', basePrice: 0, pricePerKm: 2.00 }]);
    setSaved(false);
  };

  const removeZone = (id: string) => {
    setZones(zones.filter(z => z.id !== id));
    setSaved(false);
  };

  const handleSave = () => {
    // Backend-ready: POST /api/admin/pricing with { rules, zones }
    console.log('Saving pricing config:', { rules, zones });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-white">{t('admin.pricing')}</h1>
          <p className="text-sm text-white/40 mt-1">{t('admin.pricingDesc')}</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[12px] font-medium transition-all w-fit ${
            saved
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20 hover:bg-brand-gold/20'
          }`}
        >
          <Save className="w-3.5 h-3.5" />
          {saved ? t('admin.pricing.saved') : t('admin.save')}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#14141f] border border-white/5 rounded-lg p-1 w-fit">
        {[
          { id: 'rates' as const, label: t('admin.pricing.rates') },
          { id: 'zones' as const, label: t('admin.pricing.zones') },
          { id: 'services' as const, label: t('admin.pricing.serviceRates') },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-[12px] font-medium transition-colors ${
              activeTab === tab.id ? 'bg-brand-gold/10 text-brand-gold' : 'text-white/40 hover:text-white/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Rates Tab */}
      {activeTab === 'rates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {rules.map(rule => (
            <div key={rule.id} className="bg-[#14141f] border border-white/5 rounded-xl p-5 space-y-4 hover:border-white/10 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[14px] font-medium text-white/80">{ruleLabels[rule.id]}</h3>
                  <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    rule.type === 'per_km' ? 'bg-blue-500/10 text-blue-400' :
                    rule.type === 'per_hour' ? 'bg-purple-500/10 text-purple-400' :
                    rule.type === 'per_minute' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-white/5 text-white/40'
                  }`}>
                    {typeLabels[rule.type]}
                  </span>
                </div>
                <div className="group relative">
                  <Info className="w-3.5 h-3.5 text-white/20 hover:text-white/40 cursor-help transition-colors" />
                  <div className="absolute right-0 top-6 w-48 p-2 rounded-lg bg-[#1a1a2e] border border-white/10 text-[11px] text-white/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {ruleDescs[rule.id]}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/30 text-[13px]">€</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={rule.value}
                  onChange={(e) => updateRule(rule.id, parseFloat(e.target.value) || 0)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[15px] font-semibold text-white focus:outline-none focus:border-brand-gold/30 transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Zones Tab */}
      {activeTab === 'zones' && (
        <div className="space-y-4">
          <div className="bg-[#14141f] border border-white/5 rounded-xl overflow-hidden">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    {[t('admin.pricing.from'), t('admin.pricing.to'), t('admin.pricing.basePrice'), t('admin.pricing.pricePerKm'), ''].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-white/30 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {zones.map(zone => (
                    <tr key={zone.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={zone.from}
                          onChange={(e) => updateZone(zone.id, 'from', e.target.value)}
                          className="w-full bg-transparent text-[13px] text-white/70 focus:outline-none"
                          placeholder={t('admin.pricing.from')}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={zone.to}
                          onChange={(e) => updateZone(zone.id, 'to', e.target.value)}
                          className="w-full bg-transparent text-[13px] text-white/70 focus:outline-none"
                          placeholder={t('admin.pricing.to')}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span className="text-white/30 text-[12px]">€</span>
                          <input
                            type="number"
                            step="1"
                            min="0"
                            value={zone.basePrice}
                            onChange={(e) => updateZone(zone.id, 'basePrice', parseFloat(e.target.value) || 0)}
                            className="w-20 bg-transparent text-[13px] font-medium text-white/80 focus:outline-none"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span className="text-white/30 text-[12px]">€</span>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={zone.pricePerKm}
                            onChange={(e) => updateZone(zone.id, 'pricePerKm', parseFloat(e.target.value) || 0)}
                            className="w-20 bg-transparent text-[13px] font-medium text-white/80 focus:outline-none"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => removeZone(zone.id)} className="p-1.5 rounded-md hover:bg-red-500/10 text-red-400/40 hover:text-red-400 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden p-3 space-y-3">
              {zones.map(zone => (
                <div key={zone.id} className="p-3 rounded-lg bg-white/[0.02] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-white/30 uppercase">{t('admin.pricing.from')}</span>
                    <button onClick={() => removeZone(zone.id)} className="p-1 text-red-400/40 hover:text-red-400">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <input
                    type="text" value={zone.from}
                    onChange={(e) => updateZone(zone.id, 'from', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-[12px] text-white/70 focus:outline-none"
                  />
                  <span className="text-[11px] text-white/30 uppercase block">{t('admin.pricing.to')}</span>
                  <input
                    type="text" value={zone.to}
                    onChange={(e) => updateZone(zone.id, 'to', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-[12px] text-white/70 focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-white/25">{t('admin.pricing.basePrice')}</span>
                      <input
                        type="number" value={zone.basePrice}
                        onChange={(e) => updateZone(zone.id, 'basePrice', parseFloat(e.target.value) || 0)}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-[12px] text-white/70 focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-white/25">{t('admin.pricing.pricePerKm')}</span>
                      <input
                        type="number" value={zone.pricePerKm} step="0.1"
                        onChange={(e) => updateZone(zone.id, 'pricePerKm', parseFloat(e.target.value) || 0)}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-[12px] text-white/70 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={addZone}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-dashed border-white/10 text-[12px] text-white/40 hover:text-white/60 hover:border-white/20 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            {t('admin.pricing.addZone')}
          </button>
        </div>
      )}

      {/* Service Rates Tab */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceRates.map(sr => (
            <div key={sr.service} className="bg-[#14141f] border border-white/5 rounded-xl p-5 space-y-4">
              <h3 className="text-[14px] font-medium text-white/80">{sr.service}</h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] text-white/25 uppercase tracking-wider mb-1.5">{t('admin.pricing.minPrice')}</label>
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                    <span className="text-white/30 text-[12px]">€</span>
                    <input type="number" defaultValue={sr.minPrice} className="flex-1 bg-transparent text-[13px] text-white/70 focus:outline-none w-full" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-white/25 uppercase tracking-wider mb-1.5">{t('admin.pricing.avgPrice')}</label>
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                    <span className="text-white/30 text-[12px]">€</span>
                    <input type="number" defaultValue={sr.avgPrice} className="flex-1 bg-transparent text-[13px] text-white/70 focus:outline-none w-full" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-white/25 uppercase tracking-wider mb-1.5">{t('admin.pricing.maxKm')}</label>
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                    <span className="text-white/30 text-[11px]">km</span>
                    <input type="number" defaultValue={sr.maxKm} className="flex-1 bg-transparent text-[13px] text-white/70 focus:outline-none w-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Backend integration note */}
      <div className="bg-[#14141f] border border-white/5 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-4 h-4 text-brand-gold/40 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-[12px] text-white/50">{t('admin.pricing.backendNote')}</p>
          <p className="text-[11px] text-white/25 mt-1 font-mono">POST /api/admin/pricing · GET /api/admin/pricing</p>
        </div>
      </div>
    </div>
  );
}
