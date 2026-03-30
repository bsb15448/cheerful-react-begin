import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { useI18n } from '../lib/i18n';

export default function AdminLogin() {
  const { login } = useAuth();
  const { t } = useI18n();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    if (!login(username, password)) {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <a href="/">
            <img src="/images/logo.png" alt="L.S Transport" className="h-10 w-auto mx-auto mb-6" />
          </a>
          <h1 className="text-xl font-semibold text-white">{t('admin.login.title')}</h1>
          <p className="text-sm text-white/40 mt-1">{t('admin.login.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#14141f] border border-white/5 rounded-2xl p-6 space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="text-xs text-red-400">{t('admin.login.error')}</p>
            </motion.div>
          )}

          <div>
            <label className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-1.5 block">
              {t('admin.login.username')}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-brand-gold/40 focus:outline-none transition-colors"
                placeholder={t('admin.login.usernamePlaceholder')}
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-1.5 block">
              {t('admin.login.password')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-white/20 focus:border-brand-gold/40 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-brand-gold text-brand-black font-semibold text-sm hover:brightness-110 transition-all"
          >
            {t('admin.login.submit')}
          </button>
        </form>

        <p className="text-center text-[11px] text-white/20 mt-6">
          © {new Date().getFullYear()} L.S Transport
        </p>
      </motion.div>
    </div>
  );
}
