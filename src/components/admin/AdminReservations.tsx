import { useState } from 'react';
import { Search, Filter, MoreVertical, Eye, Check, X, Phone, Mail } from 'lucide-react';

const mockReservations = [
  { id: 'RES-2024-001', client: 'Jean Dupont', phone: '+33 6 12 34 56 78', email: 'jean@email.com', type: 'Aéroport', date: '2024-03-27', time: '08:00', pickup: 'Nice Aéroport', dropoff: 'Monaco', passengers: 3, status: 'confirmed', amount: 180 },
  { id: 'RES-2024-002', client: 'Marie Leclerc', phone: '+33 6 98 76 54 32', email: 'marie@email.com', type: 'Événement', date: '2024-03-28', time: '19:00', pickup: 'Hôtel Carlton, Cannes', dropoff: 'Palais des Festivals', passengers: 2, status: 'pending', amount: 350 },
  { id: 'RES-2024-003', client: 'Pierre Martin', phone: '+33 6 55 44 33 22', email: 'pierre@email.com', type: 'Excursion', date: '2024-03-29', time: '09:30', pickup: 'Marseille Centre', dropoff: 'Cassis - Calanques', passengers: 5, status: 'confirmed', amount: 520 },
  { id: 'RES-2024-004', client: 'Sophie Bernard', phone: '+33 6 11 22 33 44', email: 'sophie@email.com', type: 'Pro', date: '2024-03-30', time: '07:00', pickup: 'Aix-en-Provence', dropoff: 'Marseille Aéroport', passengers: 1, status: 'cancelled', amount: 120 },
  { id: 'RES-2024-005', client: 'Lucas Moreau', phone: '+33 6 77 88 99 00', email: 'lucas@email.com', type: 'Aéroport', date: '2024-04-01', time: '14:00', pickup: 'Toulon', dropoff: 'Nice Aéroport', passengers: 4, status: 'pending', amount: 290 },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  confirmed: { label: 'Confirmé', color: 'bg-emerald-500/10 text-emerald-400' },
  pending: { label: 'En attente', color: 'bg-amber-500/10 text-amber-400' },
  cancelled: { label: 'Annulé', color: 'bg-red-500/10 text-red-400' },
};

export default function AdminReservations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRes, setSelectedRes] = useState<string | null>(null);

  const filtered = mockReservations.filter((r) => {
    const matchSearch = r.client.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-white">Réservations</h1>
          <p className="text-sm text-white/40 mt-1">{mockReservations.length} réservations au total</p>
        </div>
        <button className="btn-primary text-[12px] !py-2.5 !px-5 w-fit">
          <span>+ Nouvelle réservation</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <input
            type="text"
            placeholder="Rechercher par nom ou ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#14141f] border border-white/5 rounded-lg pl-10 pr-4 py-2.5 text-[13px] text-white placeholder:text-white/25 focus:outline-none focus:border-brand-gold/30"
          />
        </div>
        <div className="flex gap-2">
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
              {s === 'all' ? 'Tous' : statusConfig[s]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block bg-[#14141f] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {['ID', 'Client', 'Type', 'Date', 'Trajet', 'PAX', 'Montant', 'Statut', ''].map((h) => (
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
                <td className="px-4 py-3 text-[12px] text-white/50">{r.type}</td>
                <td className="px-4 py-3">
                  <p className="text-[12px] text-white/60">{r.date}</p>
                  <p className="text-[11px] text-white/30">{r.time}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-[11px] text-white/50 truncate max-w-[180px]">{r.pickup}</p>
                  <p className="text-[11px] text-white/30 truncate max-w-[180px]">→ {r.dropoff}</p>
                </td>
                <td className="px-4 py-3 text-[12px] text-white/50">{r.passengers}</td>
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
                    <button className="p-1.5 rounded-md hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors">
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
          <div key={r.id} className="bg-[#14141f] border border-white/5 rounded-xl p-4 space-y-3">
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
              <div><span className="text-white/25">Type:</span> <span className="text-white/50">{r.type}</span></div>
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
    </div>
  );
}
