import { useState } from 'react';
import { Users, Phone, Calendar, Star, Clock, MapPin, Plus, X, CheckCircle, AlertTriangle } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  license: string;
  licenseExpiry: string;
  status: 'available' | 'on_trip' | 'off_duty';
  rating: number;
  totalTrips: number;
  hoursThisWeek: number;
  maxHoursWeek: number;
  assignedVehicle?: string;
  currentLocation?: string;
  schedule: { day: string; start: string; end: string }[];
}

const mockDrivers: Driver[] = [
  { id: 'D-001', name: 'Ahmed Benali', phone: '+33 6 12 34 56 78', email: 'ahmed@lstransport.fr', license: 'VTC-13-2024-001', licenseExpiry: '2027-06-15', status: 'available', rating: 4.9, totalTrips: 342, hoursThisWeek: 28, maxHoursWeek: 48, assignedVehicle: 'Mercedes V-Class', currentLocation: 'Marseille', schedule: [{ day: 'Lun-Ven', start: '06:00', end: '18:00' }] },
  { id: 'D-002', name: 'Karim Hadj', phone: '+33 6 98 76 54 32', email: 'karim@lstransport.fr', license: 'VTC-13-2024-002', licenseExpiry: '2026-12-01', status: 'on_trip', rating: 4.7, totalTrips: 218, hoursThisWeek: 35, maxHoursWeek: 48, assignedVehicle: 'Mercedes Sprinter', currentLocation: 'Aéroport Nice', schedule: [{ day: 'Mar-Sam', start: '08:00', end: '20:00' }] },
  { id: 'D-003', name: 'Youssef Mansouri', phone: '+33 6 45 67 89 01', email: 'youssef@lstransport.fr', license: 'VTC-13-2024-003', licenseExpiry: '2026-05-20', status: 'off_duty', rating: 4.8, totalTrips: 156, hoursThisWeek: 40, maxHoursWeek: 48, assignedVehicle: 'Mercedes Classe E', schedule: [{ day: 'Mer-Dim', start: '10:00', end: '22:00' }] },
  { id: 'D-004', name: 'Omar Slimani', phone: '+33 6 11 22 33 44', email: 'omar@lstransport.fr', license: 'VTC-13-2024-004', licenseExpiry: '2027-09-30', status: 'available', rating: 4.6, totalTrips: 89, hoursThisWeek: 20, maxHoursWeek: 48, schedule: [{ day: 'Lun-Ven', start: '14:00', end: '02:00' }] },
];

export default function AdminDrivers() {
  const { t } = useI18n();
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const statusConfig: Record<string, { label: string; className: string }> = {
    available: { label: t('admin.drivers.available'), className: 'bg-emerald-500/10 text-emerald-400' },
    on_trip: { label: t('admin.drivers.onTrip'), className: 'bg-blue-500/10 text-blue-400' },
    off_duty: { label: t('admin.drivers.offDuty'), className: 'bg-white/5 text-white/40' },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-white">{t('admin.drivers')}</h1>
          <p className="text-sm text-white/40 mt-1">{t('admin.drivers.desc')}</p>
        </div>
        <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-gold text-brand-black text-[12px] font-semibold hover:brightness-110 transition">
          <Plus className="w-3.5 h-3.5" />
          {t('admin.drivers.add')}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#14141f] border border-white/5 rounded-xl p-4">
          <Users className="w-4 h-4 text-brand-gold/60 mb-2" />
          <p className="text-lg font-bold text-white">4</p>
          <p className="text-[11px] text-white/35">{t('admin.drivers.total')}</p>
        </div>
        <div className="bg-[#14141f] border border-white/5 rounded-xl p-4">
          <CheckCircle className="w-4 h-4 text-emerald-400/60 mb-2" />
          <p className="text-lg font-bold text-white">2</p>
          <p className="text-[11px] text-white/35">{t('admin.drivers.available')}</p>
        </div>
        <div className="bg-[#14141f] border border-white/5 rounded-xl p-4">
          <Clock className="w-4 h-4 text-blue-400/60 mb-2" />
          <p className="text-lg font-bold text-white">30.8h</p>
          <p className="text-[11px] text-white/35">{t('admin.drivers.avgHours')}</p>
        </div>
        <div className="bg-[#14141f] border border-white/5 rounded-xl p-4">
          <Star className="w-4 h-4 text-brand-gold/60 mb-2" />
          <p className="text-lg font-bold text-white">4.75</p>
          <p className="text-[11px] text-white/35">{t('admin.drivers.avgRating')}</p>
        </div>
      </div>

      {/* Driver Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockDrivers.map(driver => {
          const hoursPercent = (driver.hoursThisWeek / driver.maxHoursWeek) * 100;
          const licenseExpiring = new Date(driver.licenseExpiry) < new Date(Date.now() + 90 * 86400000);

          return (
            <div
              key={driver.id}
              onClick={() => setSelectedDriver(driver)}
              className="bg-[#14141f] border border-white/5 rounded-xl p-5 hover:border-white/10 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-brand-gold/15 flex items-center justify-center">
                    <span className="text-xs font-bold text-brand-gold">{driver.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">{driver.name}</p>
                    <p className="text-[11px] text-white/30">{driver.id} · {driver.license}</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${statusConfig[driver.status].className}`}>
                  {statusConfig[driver.status].label}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <p className="text-[11px] text-white/30">{t('admin.crm.rating')}</p>
                  <p className="text-sm font-semibold text-white">{driver.rating}/5</p>
                </div>
                <div>
                  <p className="text-[11px] text-white/30">{t('admin.trips')}</p>
                  <p className="text-sm font-semibold text-white">{driver.totalTrips}</p>
                </div>
                <div>
                  <p className="text-[11px] text-white/30">{t('admin.drivers.vehicle')}</p>
                  <p className="text-sm font-semibold text-white truncate">{driver.assignedVehicle || '—'}</p>
                </div>
              </div>

              {/* Hours bar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-white/30">{t('admin.drivers.hoursWeek')}</span>
                  <span className="text-[10px] text-white/40">{driver.hoursThisWeek}/{driver.maxHoursWeek}h</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${hoursPercent > 85 ? 'bg-red-400' : hoursPercent > 60 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                    style={{ width: `${hoursPercent}%` }}
                  />
                </div>
              </div>

              {licenseExpiring && (
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-400/80">
                  <AlertTriangle className="w-3 h-3" />
                  {t('admin.drivers.licenseExpiring')}: {driver.licenseExpiry}
                </div>
              )}

              {driver.currentLocation && (
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-white/30">
                  <MapPin className="w-3 h-3" />
                  {driver.currentLocation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDriver(null)}>
          <div className="bg-[#14141f] border border-white/10 rounded-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">{selectedDriver.name}</h3>
              <button onClick={() => setSelectedDriver(null)} className="text-white/30 hover:text-white/60">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <a href={`tel:${selectedDriver.phone}`} className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition">
                  <Phone className="w-4 h-4 text-brand-gold/60" />
                  <span className="text-xs text-white/60">{selectedDriver.phone}</span>
                </a>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03]">
                  <Calendar className="w-4 h-4 text-brand-gold/60" />
                  <span className="text-xs text-white/60">{selectedDriver.schedule[0]?.day} {selectedDriver.schedule[0]?.start}-{selectedDriver.schedule[0]?.end}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-lg bg-white/[0.03]">
                  <p className="text-lg font-bold text-white">{selectedDriver.totalTrips}</p>
                  <p className="text-[10px] text-white/30">{t('admin.trips')}</p>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.03]">
                  <p className="text-lg font-bold text-brand-gold">{selectedDriver.rating}/5</p>
                  <p className="text-[10px] text-white/30">{t('admin.crm.rating')}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 rounded-lg bg-brand-gold/10 text-brand-gold text-xs font-medium hover:bg-brand-gold/20 transition">
                  {t('admin.drivers.assignTrip')}
                </button>
                <button className="flex-1 py-2.5 rounded-lg bg-white/5 text-white/50 text-xs font-medium hover:bg-white/10 transition">
                  {t('admin.drivers.editSchedule')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
