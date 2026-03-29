import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, CalendarDays, Car, BookOpen, Search,
  Settings, Menu, X, TrendingUp, LogOut, DollarSign
} from 'lucide-react';
import { useI18n, languages } from '../lib/i18n';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminReservations from '../components/admin/AdminReservations';
import AdminVehicles from '../components/admin/AdminVehicles';
import AdminCalendar from '../components/admin/AdminCalendar';
import AdminAnalytics from '../components/admin/AdminAnalytics';
import AdminSEO from '../components/admin/AdminSEO';
import AdminSettings from '../components/admin/AdminSettings';
import AdminPricing from '../components/admin/AdminPricing';

export default function Admin() {
  const { t, locale, setLocale, dir } = useI18n();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: t('admin.dashboard'), icon: LayoutDashboard },
    { id: 'reservations', label: t('admin.reservations'), icon: BookOpen },
    { id: 'vehicles', label: t('admin.vehicles'), icon: Car },
    { id: 'calendar', label: t('admin.calendar'), icon: CalendarDays },
    { id: 'pricing', label: t('admin.pricing'), icon: DollarSign },
    { id: 'analytics', label: t('admin.analytics'), icon: TrendingUp },
    { id: 'seo', label: t('admin.seo'), icon: Search },
    { id: 'settings', label: t('admin.settings'), icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminDashboard />;
      case 'reservations': return <AdminReservations />;
      case 'vehicles': return <AdminVehicles />;
      case 'calendar': return <AdminCalendar />;
      case 'pricing': return <AdminPricing />;
      case 'analytics': return <AdminAnalytics />;
      case 'seo': return <AdminSEO />;
      case 'settings': return <AdminSettings />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex" dir={dir}>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-[#0f0f18] border-r border-white/5 fixed inset-y-0 left-0 z-40">
        <div className="p-6 border-b border-white/5">
          <a href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="L.S Transport" className="h-8 w-auto" />
          </a>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-brand-gold/10 text-brand-gold'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}
            >
              <item.icon className="w-[18px] h-[18px]" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5 space-y-3">
          {/* Language switcher */}
          <div className="flex items-center gap-1.5 px-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={`w-7 h-7 rounded flex items-center justify-center transition-all ${
                  locale === lang.code ? 'bg-brand-gold/15 ring-1 ring-brand-gold/30' : 'hover:bg-white/5'
                }`}
              >
                <img src={lang.flag} alt="" className="w-5 h-3.5 rounded-[1px] object-cover" />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
              <span className="text-xs font-bold text-brand-gold">LS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white/70 truncate">Admin</p>
              <p className="text-[10px] text-white/30">admin@lstransport.fr</p>
            </div>
            <button className="text-white/30 hover:text-white/60 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0f0f18] border-b border-white/5 px-4 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="L.S Transport" className="h-7 w-auto" />
        </a>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/60">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="lg:hidden fixed inset-y-0 left-0 w-[260px] bg-[#0f0f18] border-r border-white/5 z-50 pt-16"
            >
              <nav className="py-4 px-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-brand-gold/10 text-brand-gold'
                        : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-[18px] h-[18px]" />
                    {item.label}
                  </button>
                ))}
              </nav>
              <div className="px-6 py-3 border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLocale(lang.code)}
                      className={`w-8 h-8 rounded flex items-center justify-center transition-all ${
                        locale === lang.code ? 'bg-brand-gold/15 ring-1 ring-brand-gold/30' : 'hover:bg-white/5'
                      }`}
                    >
                      <img src={lang.flag} alt="" className="w-5 h-3.5 rounded-[1px] object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-[260px] pt-14 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
