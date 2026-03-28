import { useState } from 'react';
import { Search, Check, X, Phone, Mail, Eye, Download } from 'lucide-react';
import { useI18n } from '../../lib/i18n';
import type { ReservationStatus, ServiceType } from '../../lib/types';

interface MockReservation {
  id: string;
  client: string;
  phone: string;
  email: string;
  serviceType: ServiceType;
  date: string;
  time: string;
  pickup: string;
  dropoff: string;
  passengers: number;
  luggage: number;
  status: ReservationStatus;
  amount: number;
  paymentStatus: 'pending' | 'paid';
  source: 'website' | 'whatsapp' | 'phone';
  notes?: string;
  createdAt: string;
}

const mockReservations: MockReservation[] = [
  { id: 'RES-2024-001', client: 'Jean Dupont', phone: '+33 6 12 34 56 78', email: 'jean@email.com', serviceType: 'airport', date: '2024-03-27', time: '08:00', pickup: 'Nice Aéroport', dropoff: 'Monaco', passengers: 3, luggage: 4, status: 'confirmed', amount: 180, paymentStatus: 'paid', source: 'website', createdAt: '2024-03-20T10:00:00Z' },
  { id: 'RES-2024-002', client: 'Marie Leclerc', phone: '+33 6 98 76 54 32', email: 'marie@email.com', serviceType: 'event', date: '2024-03-28', time: '19:00', pickup: 'Hôtel Carlton, Cannes', dropoff: 'Palais des Festivals', passengers: 2, luggage: 0, status: 'pending', amount: 350, paymentStatus: 'pending', source: 'whatsapp', createdAt: '2024-03-21T14:30:00Z' },
  { id: 'RES-2024-003', client: 'Pierre Martin', phone: '+33 6 55 44 33 22', email: 'pierre@email.com', serviceType: 'excursion', date: '2024-03-29', time: '09:30', pickup: 'Marseille Centre', dropoff: 'Cassis - Calanques', passengers: 5, luggage: 2, status: 'confirmed', amount: 520, paymentStatus: 'paid', source: 'website', createdAt: '2024-03-18T08:15:00Z' },
  { id: 'RES-2024-004', client: 'Sophie Bernard', phone: '+33 6 11 22 33 44', email: 'sophie@email.com', serviceType: 'business', date: '2024-03-30', time: '07:00', pickup: 'Aix-en-Provence', dropoff: 'Marseille Aéroport', passengers: 1, luggage: 1, status: 'cancelled', amount: 120, paymentStatus: 'pending', source: 'phone', createdAt: '2024-03-22T16:00:00Z' },
  { id: 'RES-2024-005', client: 'Lucas Moreau', phone: '+33 6 77 88 99 00', email: 'lucas@email.com', serviceType: 'airport', date: '2024-04-01', time: '14:00', pickup: 'Toulon', dropoff: 'Nice Aéroport', passengers: 4, luggage: 6, status: 'pending', amount: 290, paymentStatus: 'pending', source: 'website', createdAt: '2024-03-23T11:45:00Z' },
];

export default function AdminReservations() {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedRes, setSelectedRes] = useState<MockReservation | null>(null);

  const statusConfig: Record<string, { label: string; color: string }> = {
    confirmed: { label: t('admin.confirmed'), color: 'bg-emerald-500/10 text-emerald-400' },
    pending: { label: t('admin.pending'), color: 'bg-amber-500/10 text-amber-400' },
    cancelled: { label: t('admin.cancelled'), color: 'bg-red-500/10 text-red-400' },
    completed: { label: t('admin.completed'), color: 'bg-blue-500/10 text-blue-400' },
  };

  const serviceLabels: Record<string, string> = {
    airport: t('service.airport'),
    business: t('service.business'),
    event: t('service.event'),
    excursion: t('service.excursion'),
    other: t('service.other'),
  };

  const filtered = mockReservations.filter((r) => {
    const matchSearch = r.client.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-white">{t('admin.reservations')}</h1>
          <p className="text-sm text-white/40 mt-1">{mockReservations.length} {t('admin.totalReservations').toLowerCase()}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[12px] text-white/50 hover:text-white/70 transition-colors">
            <Download className="w-3.5 h-3.5" />
            CSV
          </button>
          <button className="btn-primary text-[12px] !py-2.5 !px-5">
            <span>{t('admin.newReservation')}</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <input
            type="text"
            placeholder={t('admin.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#14141f] border border-white/5 rounded-lg pl-10 pr-4 py-2.5 text-[13px] text-white placeholder:text-white/25 focus:outline-none focus:border-brand-gold/30"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'confirmed', 'pending', 'cancelled'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-lg text-[11px] font-medium transition-colors ${
                filterStatus === s
                  ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'
                  : 'bg-[#14141f] border border-white/5 text-white/40 hover:text-white/60'
              }`}
            >
              {s === 'all' ? t('admin.all') : statusConfig[s]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block bg-[#14141f] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {['ID', 'Client', 'Type', 'Date', 'Trajet', 'PAX', 'Source', 'Montant', 'Statut', ''].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-white/30 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-[12px] text-brand-gold/70 font-mono">{r.id}</td>
                <td className="px-4 py-3">
                  <p className="text-[13px] text-white/80">{r.client}</p>
                  <p className="text-[11px] text-white/25">{r.email}</p>
                </td>
                <td className="px-4 py-3 text-[12px] text-white/50">{serviceLabels[r.serviceType]}</td>
                <td className="px-4 py-3">
                  <p className="text-[12px] text-white/60">{r.date}</p>
                  <p className="text-[11px] text-white/30">{r.time}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-[11px] text-white/50 truncate max-w-[180px]">{r.pickup}</p>
                  <p className="text-[11px] text-white/30 truncate max-w-[180px]">→ {r.dropoff}</p>
                </td>
                <td className="px-4 py-3 text-[12px] text-white/50">{r.passengers}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    r.source === 'website' ? 'bg-blue-500/10 text-blue-400' :
                    r.source === 'whatsapp' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/40'
                  }`}>
                    {r.source}
                  </span>
                </td>
                <td className="px-4 py-3 text-[13px] font-semibold text-white/80">€{r.amount}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${statusConfig[r.status]?.color}`}>
                    {statusConfig[r.status]?.label}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {r.status === 'pending' && (
                      <>
                        <button className="p-1.5 rounded-md hover:bg-emerald-500/10 text-emerald-400/60 hover:text-emerald-400 transition-colors">
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-red-500/10 text-red-400/60 hover:text-red-400 transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => setSelectedRes(r)}
                      className="p-1.5 rounded-md hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {filtered.map((r) => (
          <div key={r.id} className="bg-[#14141f] border border-white/5 rounded-xl p-4 space-y-3" onClick={() => setSelectedRes(r)}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] font-medium text-white/80">{r.client}</p>
                <p className="text-[11px] text-brand-gold/50 font-mono">{r.id}</p>
              </div>
              <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${statusConfig[r.status]?.color}`}>
                {statusConfig[r.status]?.label}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div><span className="text-white/25">Type:</span> <span className="text-white/50">{serviceLabels[r.serviceType]}</span></div>
              <div><span className="text-white/25">Date:</span> <span className="text-white/50">{r.date} {r.time}</span></div>
              <div><span className="text-white/25">PAX:</span> <span className="text-white/50">{r.passengers}</span></div>
              <div><span className="text-white/25">Montant:</span> <span className="text-white/80 font-semibold">€{r.amount}</span></div>
            </div>
            <div className="text-[11px] text-white/35">{r.pickup} → {r.dropoff}</div>
            <div className="flex items-center gap-2 pt-1 border-t border-white/5">
              <a href={`tel:${r.phone}`} className="p-2 rounded-md bg-white/5 text-white/40 hover:text-brand-gold transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </a>
              <a href={`mailto:${r.email}`} className="p-2 rounded-md bg-white/5 text-white/40 hover:text-brand-gold transition-colors">
                <Mail className="w-3.5 h-3.5" />
              </a>
              {r.status === 'pending' && (
                <>
                  <button className="ml-auto p-2 rounded-md bg-emerald-500/10 text-emerald-400/70 hover:text-emerald-400 transition-colors">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-2 rounded-md bg-red-500/10 text-red-400/70 hover:text-red-400 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedRes && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedRes(null)}>
          <div className="bg-[#14141f] border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{selectedRes.client}</h3>
                <p className="text-[12px] text-brand-gold/60 font-mono">{selectedRes.id}</p>
              </div>
              <button onClick={() => setSelectedRes(null)} className="p-1 text-white/30 hover:text-white/60">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[13px]">
              <div>
                <span className="text-white/30 text-[11px] uppercase tracking-wider block mb-1">Type</span>
                <span className="text-white/70">{serviceLabels[selectedRes.serviceType]}</span>
              </div>
              <div>
                <span className="text-white/30 text-[11px] uppercase tracking-wider block mb-1">Statut</span>
                <span className={`text-[11px] px-2 py-1 rounded-full ${statusConfig[selectedRes.status]?.color}`}>
                  {statusConfig[selectedRes.status]?.label}
                </span>
              </div>
              <div>
                <span className="text-white/30 text-[11px] uppercase tracking-wider block mb-1">Date & Heure</span>
                <span className="text-white/70">{selectedRes.date} à {selectedRes.time}</span>
              </div>
              <div>
                <span className="text-white/30 text-[11px] uppercase tracking-wider block mb-1">Passagers / Bagages</span>
                <span className="text-white/70">{selectedRes.passengers} PAX · {selectedRes.luggage} bagages</span>
              </div>
              <div className="col-span-2">
                <span className="text-white/30 text-[11px] uppercase tracking-wider block mb-1">Trajet</span>
                <span className="text-white/70">{selectedRes.pickup} → {selectedRes.dropoff}</span>
              </div>
              <div>
                <span className="text-white/30 text-[11px] uppercase tracking-wider block mb-1">Montant</span>
                <span className="text-white font-semibold">€{selectedRes.amount}</span>
              </div>
              <div>
                <span className="text-white/30 text-[11px] uppercase tracking-wider block mb-1">Paiement</span>
                <span className={selectedRes.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'}>
                  {selectedRes.paymentStatus === 'paid' ? 'Payé' : 'En attente'}
                </span>
              </div>
              <div>
                <span className="text-white/30 text-[11px] uppercase tracking-wider block mb-1">Source</span>
                <span className="text-white/70 capitalize">{selectedRes.source}</span>
              </div>
              <div>
                <span className="text-white/30 text-[11px] uppercase tracking-wider block mb-1">Contact</span>
                <div className="flex gap-2">
                  <a href={`tel:${selectedRes.phone}`} className="text-brand-gold text-[12px]">{selectedRes.phone}</a>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-white/5">
              {selectedRes.status === 'pending' && (
                <>
                  <button className="flex-1 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-[13px] font-medium hover:bg-emerald-500/20 transition-colors">
                    {t('admin.confirmed')}
                  </button>
                  <button className="flex-1 py-2.5 rounded-lg bg-red-500/10 text-red-400 text-[13px] font-medium hover:bg-red-500/20 transition-colors">
                    {t('admin.cancelled')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
