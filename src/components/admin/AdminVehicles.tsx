import { useState } from 'react';
import { Car, Check, Wrench, Plus, Edit2, Fuel, Users, Calendar } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

interface Vehicle {
  id: string;
  name: string;
  plate: string;
  type: string;
  capacity: number;
  status: 'available' | 'in_use' | 'maintenance';
  fuel: number;
  nextService: string;
  image: string;
  trips: number;
}

const mockVehicles: Vehicle[] = [
  { id: '1', name: 'Mercedes Classe V', plate: 'AB-123-CD', type: 'Van Premium', capacity: 7, status: 'available', fuel: 85, nextService: '15 Avr', image: '', trips: 234 },
  { id: '2', name: 'Mercedes Sprinter', plate: 'EF-456-GH', type: 'Minibus', capacity: 12, status: 'in_use', fuel: 62, nextService: '20 Avr', image: '', trips: 189 },
  { id: '3', name: 'BMW Série 7', plate: 'IJ-789-KL', type: 'Berline', capacity: 3, status: 'available', fuel: 90, nextService: '10 Mai', image: '', trips: 312 },
  { id: '4', name: 'Renault Master', plate: 'MN-012-OP', type: 'Van', capacity: 9, status: 'maintenance', fuel: 45, nextService: '28 Mar', image: '', trips: 156 },
  { id: '5', name: 'Audi A8', plate: 'QR-345-ST', type: 'Berline Luxe', capacity: 3, status: 'available', fuel: 78, nextService: '05 Mai', image: '', trips: 98 },
  { id: '6', name: 'Mercedes EQV', plate: 'UV-678-WX', type: 'Van Électrique', capacity: 7, status: 'in_use', fuel: 55, nextService: '22 Avr', image: '', trips: 67 },
];

export default function AdminVehicles() {
  const { t } = useI18n();
  const [_view] = useState<'grid' | 'list'>('grid');

  const statusConfig: Record<string, { label: string; color: string; icon: typeof Check }> = {
    available: { label: t('admin.available'), color: 'text-emerald-400 bg-emerald-500/10', icon: Check },
    in_use: { label: t('admin.inUse'), color: 'text-blue-400 bg-blue-500/10', icon: Car },
    maintenance: { label: t('admin.maintenance'), color: 'text-amber-400 bg-amber-500/10', icon: Wrench },
  };

  const available = mockVehicles.filter((v) => v.status === 'available').length;
  const inUse = mockVehicles.filter((v) => v.status === 'in_use').length;
  const maint = mockVehicles.filter((v) => v.status === 'maintenance').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-white">{t('admin.vehicles')}</h1>
          <p className="text-sm text-white/40 mt-1">{t('admin.fleetManagement')}</p>
        </div>
        <button className="btn-primary text-[12px] !py-2.5 !px-5 w-fit flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" />
          <span>{t('admin.addVehicle')}</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: t('admin.available'), value: available, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: t('admin.inUse'), value: inUse, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: t('admin.maintenance'), value: maint, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((s) => (
          <div key={s.label} className="bg-[#14141f] border border-white/5 rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-white/35 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockVehicles.map((v) => {
          const st = statusConfig[v.status];
          const StIcon = st.icon;
          return (
            <div key={v.id} className="bg-[#14141f] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors">
              <div className="p-4 pb-3 flex items-start justify-between">
                <div>
                  <h3 className="text-[14px] font-semibold text-white/90">{v.name}</h3>
                  <p className="text-[11px] text-white/30 font-mono mt-0.5">{v.plate}</p>
                </div>
                <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full ${st.color}`}>
                  <StIcon className="w-3 h-3" />
                  {st.label}
                </span>
              </div>

              <div className="px-4 pb-4 space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 rounded-lg bg-white/[0.02]">
                    <Users className="w-3.5 h-3.5 text-white/25 mx-auto mb-1" />
                    <p className="text-[12px] font-medium text-white/60">{v.capacity}</p>
                    <p className="text-[9px] text-white/25">{t('admin.seats')}</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/[0.02]">
                    <Fuel className="w-3.5 h-3.5 text-white/25 mx-auto mb-1" />
                    <p className="text-[12px] font-medium text-white/60">{v.fuel}%</p>
                    <p className="text-[9px] text-white/25">{t('admin.fuel')}</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/[0.02]">
                    <Calendar className="w-3.5 h-3.5 text-white/25 mx-auto mb-1" />
                    <p className="text-[12px] font-medium text-white/60">{v.trips}</p>
                    <p className="text-[9px] text-white/25">{t('admin.trips')}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[10px] text-white/30 mb-1">
                    <span>{t('admin.fuel')}</span>
                    <span>{v.fuel}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${v.fuel > 60 ? 'bg-emerald-500' : v.fuel > 30 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${v.fuel}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[10px] text-white/25">{t('admin.nextService')}: {v.nextService}</span>
                  <button className="p-1.5 rounded-md hover:bg-white/5 text-white/30 hover:text-brand-gold transition-colors">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
