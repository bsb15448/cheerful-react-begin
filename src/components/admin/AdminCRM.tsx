import { useState } from 'react';
import { Users, Phone, Mail, Calendar, Star, MessageSquare, Plus, Search, X } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

interface CRMCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  totalBookings: number;
  totalSpent: number;
  lastTrip: string;
  rating: number;
  notes: string[];
  followUpDate?: string;
  tags: string[];
}

const mockCustomers: CRMCustomer[] = [
  { id: 'C-001', firstName: 'Jean', lastName: 'Dupont', email: 'jean.dupont@email.com', phone: '+33 6 12 34 56 78', totalBookings: 12, totalSpent: 2450, lastTrip: '2026-03-25', rating: 5, notes: ['Client fidèle, préfère Mercedes', 'Toujours ponctuel'], followUpDate: '2026-04-05', tags: ['VIP', 'Régulier'] },
  { id: 'C-002', firstName: 'Marie', lastName: 'Leclerc', email: 'marie.l@email.com', phone: '+33 6 98 76 54 32', totalBookings: 5, totalSpent: 890, lastTrip: '2026-03-20', rating: 4, notes: ['Voyage souvent avec enfants'], tags: ['Famille'] },
  { id: 'C-003', firstName: 'Pierre', lastName: 'Martin', email: 'p.martin@corp.com', phone: '+33 6 45 67 89 01', totalBookings: 28, totalSpent: 8200, lastTrip: '2026-03-28', rating: 5, notes: ['Compte entreprise', 'Facturation mensuelle'], followUpDate: '2026-04-01', tags: ['Entreprise', 'VIP'] },
  { id: 'C-004', firstName: 'Sophie', lastName: 'Bernard', email: 'sophie.b@email.com', phone: '+33 6 11 22 33 44', totalBookings: 3, totalSpent: 520, lastTrip: '2026-03-15', rating: 4, notes: [], tags: ['Nouveau'] },
];

export default function AdminCRM() {
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CRMCustomer | null>(null);
  const [newNote, setNewNote] = useState('');

  const filtered = mockCustomers.filter(c =>
    `${c.firstName} ${c.lastName} ${c.email} ${c.id}`.toLowerCase().includes(search.toLowerCase())
  );

  const tagColors: Record<string, string> = {
    VIP: 'bg-brand-gold/15 text-brand-gold',
    Régulier: 'bg-emerald-500/15 text-emerald-400',
    Entreprise: 'bg-blue-500/15 text-blue-400',
    Famille: 'bg-purple-500/15 text-purple-400',
    Nouveau: 'bg-cyan-500/15 text-cyan-400',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-white">{t('admin.crm')}</h1>
          <p className="text-sm text-white/40 mt-1">{t('admin.crm.desc')}</p>
        </div>
        <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-gold text-brand-black text-[12px] font-semibold hover:brightness-110 transition">
          <Plus className="w-3.5 h-3.5" />
          {t('admin.crm.addCustomer')}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: t('admin.crm.totalCustomers'), value: '156', icon: Users },
          { label: t('admin.crm.vipCustomers'), value: '24', icon: Star },
          { label: t('admin.crm.followUps'), value: '8', icon: Calendar },
          { label: t('admin.crm.avgSpend'), value: '€342', icon: MessageSquare },
        ].map(s => (
          <div key={s.label} className="bg-[#14141f] border border-white/5 rounded-xl p-4">
            <s.icon className="w-4 h-4 text-brand-gold/60 mb-2" />
            <p className="text-lg font-bold text-white">{s.value}</p>
            <p className="text-[11px] text-white/35 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('admin.crm.searchPlaceholder')}
          className="w-full bg-[#14141f] border border-white/5 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-brand-gold/30 focus:outline-none"
        />
      </div>

      {/* Customer List */}
      <div className="space-y-2">
        {filtered.map(c => (
          <div
            key={c.id}
            onClick={() => setSelectedCustomer(c)}
            className="bg-[#14141f] border border-white/5 rounded-xl p-4 hover:border-white/10 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/15 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-brand-gold">{c.firstName[0]}{c.lastName[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/80">{c.firstName} {c.lastName}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[11px] text-white/30">{c.email}</span>
                    <span className="text-[11px] text-white/30">{c.totalBookings} {t('admin.crm.bookings')}</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2">
                {c.tags.map(tag => (
                  <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-full ${tagColors[tag] || 'bg-white/5 text-white/40'}`}>{tag}</span>
                ))}
                <span className="text-sm font-semibold text-brand-gold ml-2">€{c.totalSpent.toLocaleString()}</span>
              </div>
            </div>
            {c.followUpDate && (
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-400/70">
                <Calendar className="w-3 h-3" />
                {t('admin.crm.followUp')}: {c.followUpDate}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCustomer(null)}>
          <div className="bg-[#14141f] border border-white/10 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-gold/15 flex items-center justify-center">
                  <span className="text-sm font-bold text-brand-gold">{selectedCustomer.firstName[0]}{selectedCustomer.lastName[0]}</span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{selectedCustomer.firstName} {selectedCustomer.lastName}</h3>
                  <p className="text-[11px] text-white/30">{selectedCustomer.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-white/30 hover:text-white/60">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              {/* Contact */}
              <div className="grid grid-cols-2 gap-3">
                <a href={`mailto:${selectedCustomer.email}`} className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition">
                  <Mail className="w-4 h-4 text-brand-gold/60" />
                  <span className="text-xs text-white/60 truncate">{selectedCustomer.email}</span>
                </a>
                <a href={`tel:${selectedCustomer.phone}`} className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition">
                  <Phone className="w-4 h-4 text-brand-gold/60" />
                  <span className="text-xs text-white/60">{selectedCustomer.phone}</span>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-lg bg-white/[0.03]">
                  <p className="text-lg font-bold text-white">{selectedCustomer.totalBookings}</p>
                  <p className="text-[10px] text-white/30">{t('admin.crm.bookings')}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/[0.03]">
                  <p className="text-lg font-bold text-brand-gold">€{selectedCustomer.totalSpent.toLocaleString()}</p>
                  <p className="text-[10px] text-white/30">{t('admin.crm.totalSpent')}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/[0.03]">
                  <div className="flex items-center justify-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < selectedCustomer.rating ? 'text-brand-gold fill-brand-gold' : 'text-white/10'}`} />
                    ))}
                  </div>
                  <p className="text-[10px] text-white/30 mt-1">{t('admin.crm.rating')}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {selectedCustomer.tags.map(tag => (
                  <span key={tag} className={`text-[11px] px-2.5 py-1 rounded-full ${tagColors[tag] || 'bg-white/5 text-white/40'}`}>{tag}</span>
                ))}
              </div>

              {/* Notes */}
              <div>
                <h4 className="text-xs font-medium text-white/50 mb-2">{t('admin.crm.notes')}</h4>
                <div className="space-y-1.5">
                  {selectedCustomer.notes.map((note, i) => (
                    <div key={i} className="text-xs text-white/50 p-2 rounded bg-white/[0.02]">• {note}</div>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <input
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    placeholder={t('admin.crm.addNote')}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-brand-gold/30"
                  />
                  <button className="px-3 py-2 rounded-lg bg-brand-gold/15 text-brand-gold text-xs font-medium hover:bg-brand-gold/25 transition">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
