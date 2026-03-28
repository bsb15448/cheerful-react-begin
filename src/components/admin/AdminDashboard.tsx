import { TrendingUp, Users, Car, CalendarDays, ArrowUpRight, ArrowDownRight, Clock, MapPin, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useI18n } from '../../lib/i18n';
import type { ReservationStatus } from '../../lib/types';

const revenueData = [
  { month: 'Jan', revenue: 4200 }, { month: 'Fév', revenue: 5800 },
  { month: 'Mar', revenue: 4900 }, { month: 'Avr', revenue: 7200 },
  { month: 'Mai', revenue: 6100 }, { month: 'Juin', revenue: 8400 },
  { month: 'Juil', revenue: 9200 },
];

const recentBookings = [
  { id: 'RES-001', client: 'Jean Dupont', serviceType: 'airport' as const, date: '27 Mar', status: 'confirmed' as ReservationStatus, amount: 180 },
  { id: 'RES-002', client: 'Marie Leclerc', serviceType: 'event' as const, date: '28 Mar', status: 'pending' as ReservationStatus, amount: 350 },
  { id: 'RES-003', client: 'Pierre Martin', serviceType: 'excursion' as const, date: '29 Mar', status: 'confirmed' as ReservationStatus, amount: 520 },
  { id: 'RES-004', client: 'Sophie Bernard', serviceType: 'business' as const, date: '30 Mar', status: 'pending' as ReservationStatus, amount: 240 },
];

export default function AdminDashboard() {
  const { t } = useI18n();

  const stats = [
    { label: t('admin.totalReservations'), value: '147', change: '+12%', up: true, icon: CalendarDays },
    { label: t('admin.visitors'), value: '2,340', change: '+8%', up: true, icon: Users },
    { label: t('admin.revenue'), value: '€45,200', change: '+18%', up: true, icon: TrendingUp },
    { label: t('admin.activeVehicles'), value: '6/8', change: '-1', up: false, icon: Car },
  ];

  const serviceLabels: Record<string, string> = {
    airport: t('service.airport'),
    business: t('service.business'),
    event: t('service.event'),
    excursion: t('service.excursion'),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-white">{t('admin.dashboard')}</h1>
          <p className="text-sm text-white/40 mt-1">{t('admin.overview')}</p>
        </div>
        <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[12px] text-white/50 hover:text-white/70 hover:border-white/20 transition-colors">
          <Download className="w-3.5 h-3.5" />
          {t('admin.exportData')}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#14141f] border border-white/5 rounded-xl p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="w-4 h-4 text-brand-gold/60" />
              <span className={`text-[11px] font-medium flex items-center gap-0.5 ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-lg md:text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-[11px] text-white/35 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Chart + Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
        <div className="lg:col-span-3 bg-[#14141f] border border-white/5 rounded-xl p-4 md:p-6">
          <h3 className="text-sm font-medium text-white/70 mb-4">{t('admin.monthlyRevenue')}</h3>
          <div className="h-[240px] md:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(38, 72%, 52%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(38, 72%, 52%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                  itemStyle={{ color: 'hsl(38, 72%, 52%)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(38, 72%, 52%)" fill="url(#goldGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#14141f] border border-white/5 rounded-xl p-4 md:p-6">
          <h3 className="text-sm font-medium text-white/70 mb-4">{t('admin.recentBookings')}</h3>
          <div className="space-y-3">
            {recentBookings.map((b) => (
              <div key={b.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-white/80 truncate">{b.client}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-white/30">{serviceLabels[b.serviceType]}</span>
                    <span className="text-[11px] text-white/20">·</span>
                    <span className="text-[11px] text-white/30">{b.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-semibold text-brand-gold">€{b.amount}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    b.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {b.status === 'confirmed' ? t('admin.confirmed') : t('admin.pending')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: t('admin.newBooking'), icon: CalendarDays },
          { label: t('admin.addVehicle'), icon: Car },
          { label: t('admin.viewSchedule'), icon: Clock },
          { label: t('admin.serviceArea'), icon: MapPin },
        ].map((action) => (
          <button
            key={action.label}
            className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-[#14141f] hover:border-brand-gold/20 hover:bg-brand-gold/5 transition-all duration-200 text-left"
          >
            <action.icon className="w-4 h-4 text-brand-gold/60" />
            <span className="text-[12px] font-medium text-white/50">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
