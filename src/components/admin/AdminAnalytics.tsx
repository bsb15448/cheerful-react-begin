import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Eye, Clock, Globe, Monitor, Smartphone } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

const visitorData = [
  { day: 'Mon', visitors: 120 }, { day: 'Tue', visitors: 180 },
  { day: 'Wed', visitors: 150 }, { day: 'Thu', visitors: 210 },
  { day: 'Fri', visitors: 280 }, { day: 'Sat', visitors: 340 },
  { day: 'Sun', visitors: 190 },
];

const sourceData = [
  { name: 'Google', value: 45, color: '#4285f4' },
  { name: 'Direct', value: 25, color: 'hsl(38, 72%, 52%)' },
  { name: 'Instagram', value: 15, color: '#e1306c' },
  { name: 'WhatsApp', value: 10, color: '#25d366' },
  { name: 'Other', value: 5, color: '#666' },
];

const monthlyVisitors = [
  { month: 'Oct', visitors: 1200 }, { month: 'Nov', visitors: 1800 },
  { month: 'Dec', visitors: 1400 }, { month: 'Jan', visitors: 2100 },
  { month: 'Feb', visitors: 2400 }, { month: 'Mar', visitors: 2800 },
];

const topPages = [
  { page: '/', views: 4520, label: 'Home' },
  { page: '/#booking', views: 2180, label: 'Booking' },
  { page: '/#services', views: 1840, label: 'Services' },
  { page: '/#about', views: 1200, label: 'About' },
  { page: '/#testimonials', views: 890, label: 'Testimonials' },
];

const regionData = [
  { region: 'Nice', percentage: 28 },
  { region: 'Cannes', percentage: 22 },
  { region: 'Marseille', percentage: 18 },
  { region: 'Monaco', percentage: 15 },
  { region: 'Saint-Tropez', percentage: 10 },
  { region: 'Aix-en-Provence', percentage: 7 },
];

export default function AdminAnalytics() {
  const { t } = useI18n();

  const stats = [
    { label: t('admin.visitors7d'), value: '1,470', icon: Users, change: '+12%' },
    { label: t('admin.pageViews'), value: '4,230', icon: Eye, change: '+8%' },
    { label: t('admin.avgDuration'), value: '2m 34s', icon: Clock, change: '+5%' },
    { label: t('admin.bounceRate'), value: '32%', icon: TrendingUp, change: '-3%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-white">{t('admin.analytics')}</h1>
        <p className="text-sm text-white/40 mt-1">{t('admin.analyticsTitle')}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#14141f] border border-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <s.icon className="w-4 h-4 text-brand-gold/50" />
              <span className="text-[10px] font-medium text-emerald-400">{s.change}</span>
            </div>
            <p className="text-xl font-bold text-white">{s.value}</p>
            <p className="text-[11px] text-white/30 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#14141f] border border-white/5 rounded-xl p-4 md:p-6">
          <h3 className="text-sm font-medium text-white/70 mb-4">{t('admin.weeklyVisitors')}</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitorData}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="visitors" fill="hsl(38, 72%, 52%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#14141f] border border-white/5 rounded-xl p-4 md:p-6">
          <h3 className="text-sm font-medium text-white/70 mb-4">{t('admin.trafficSources')}</h3>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                  {sourceData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {sourceData.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-white/50">{s.name}</span>
                </div>
                <span className="text-white/40">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#14141f] border border-white/5 rounded-xl p-4 md:p-6">
          <h3 className="text-sm font-medium text-white/70 mb-4">{t('admin.monthlyTrend')}</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyVisitors}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="visitors" stroke="hsl(38, 72%, 52%)" strokeWidth={2} dot={{ fill: 'hsl(38, 72%, 52%)', strokeWidth: 0, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#14141f] border border-white/5 rounded-xl p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-brand-gold/50" />
            <h3 className="text-sm font-medium text-white/70">{t('admin.regionVisitors')}</h3>
          </div>
          <div className="space-y-3">
            {regionData.map((r) => (
              <div key={r.region}>
                <div className="flex items-center justify-between text-[12px] mb-1">
                  <span className="text-white/60">{r.region}</span>
                  <span className="text-white/35">{r.percentage}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-gold/80 to-brand-gold"
                    style={{ width: `${r.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#14141f] border border-white/5 rounded-xl p-4 md:p-6">
          <h3 className="text-sm font-medium text-white/70 mb-4">{t('admin.topPages')}</h3>
          <div className="space-y-2">
            {topPages.map((p, i) => (
              <div key={p.page} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02]">
                <span className="text-[11px] font-mono text-white/20 w-5">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-[12px] text-white/60">{p.label}</p>
                  <p className="text-[10px] text-white/20 font-mono">{p.page}</p>
                </div>
                <span className="text-[12px] font-medium text-brand-gold">{p.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#14141f] border border-white/5 rounded-xl p-4 md:p-6">
          <h3 className="text-sm font-medium text-white/70 mb-4">{t('admin.devices')}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-6 rounded-xl bg-white/[0.02]">
              <Smartphone className="w-8 h-8 text-brand-gold/50 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white">62%</p>
              <p className="text-[11px] text-white/30 mt-1">{t('admin.mobile')}</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/[0.02]">
              <Monitor className="w-8 h-8 text-blue-400/50 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white">38%</p>
              <p className="text-[11px] text-white/30 mt-1">{t('admin.desktop')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
