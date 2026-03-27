import { useState } from 'react';
import { Search, Globe, FileText, CheckCircle, AlertTriangle, XCircle, ExternalLink, RefreshCw } from 'lucide-react';

interface SEOPage {
  path: string;
  title: string;
  description: string;
  titleLength: number;
  descLength: number;
  h1: string;
  score: number;
  issues: string[];
}

const pages: SEOPage[] = [
  {
    path: '/',
    title: 'L.S Transport — Van Prestige | Transport Privé PACA',
    description: 'Service de transport privé premium dans la région PACA. Van Mercedes, chauffeur professionnel. Aéroport, événements, excursions.',
    titleLength: 52,
    descLength: 138,
    h1: 'Transport Privé d\'Exception',
    score: 92,
    issues: [],
  },
  {
    path: '/#services',
    title: 'Nos Services — L.S Transport',
    description: 'Découvrez nos services de transport : transferts aéroport, événements, excursions touristiques, déplacements professionnels.',
    titleLength: 32,
    descLength: 124,
    h1: 'Nos Services',
    score: 78,
    issues: ['Ajouter des mots-clés longue traîne', 'Description trop courte'],
  },
  {
    path: '/#booking',
    title: 'Réservation — L.S Transport',
    description: 'Réservez votre transport privé en PACA. Devis gratuit en quelques minutes.',
    titleLength: 29,
    descLength: 72,
    h1: 'Réserver',
    score: 65,
    issues: ['Meta description trop courte (<120 caractères)', 'Titre trop court', 'Ajouter schema markup'],
  },
];

const keywords = [
  { keyword: 'transport privé PACA', position: 3, volume: 720, trend: 'up' },
  { keyword: 'chauffeur privé Nice', position: 5, volume: 480, trend: 'up' },
  { keyword: 'van avec chauffeur Cannes', position: 8, volume: 320, trend: 'stable' },
  { keyword: 'transfert aéroport Nice', position: 12, volume: 1200, trend: 'down' },
  { keyword: 'transport événement PACA', position: 6, volume: 260, trend: 'up' },
  { keyword: 'excursion privée Provence', position: 15, volume: 390, trend: 'stable' },
];

const checklist = [
  { item: 'Balise title optimisée', done: true },
  { item: 'Meta description unique', done: true },
  { item: 'Balise H1 unique', done: true },
  { item: 'Images avec attribut alt', done: true },
  { item: 'Schema.org LocalBusiness', done: false },
  { item: 'Sitemap XML', done: false },
  { item: 'robots.txt configuré', done: true },
  { item: 'Open Graph tags', done: false },
  { item: 'Canonical URLs', done: true },
  { item: 'Viewport meta tag', done: true },
  { item: 'Lazy loading images', done: true },
  { item: 'HTTPS actif', done: true },
];

export default function AdminSEO() {
  const [activeTab, setActiveTab] = useState<'pages' | 'keywords' | 'checklist'>('pages');

  const overallScore = Math.round(pages.reduce((acc, p) => acc + p.score, 0) / pages.length);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-white">SEO</h1>
          <p className="text-sm text-white/40 mt-1">Optimisation pour les moteurs de recherche</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[12px] text-white/50 hover:text-white/70 hover:border-white/20 transition-colors w-fit">
          <RefreshCw className="w-3.5 h-3.5" />
          Analyser le site
        </button>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#14141f] border border-white/5 rounded-xl p-6 text-center">
          <div className="w-20 h-20 mx-auto rounded-full border-4 border-brand-gold/30 flex items-center justify-center mb-3">
            <span className="text-2xl font-bold text-brand-gold">{overallScore}</span>
          </div>
          <p className="text-[13px] text-white/60">Score SEO global</p>
          <p className="text-[10px] text-white/25 mt-1">Basé sur {pages.length} pages</p>
        </div>
        <div className="bg-[#14141f] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-[13px] text-white/60">Points forts</span>
          </div>
          <ul className="space-y-2">
            {['Titres bien optimisés', 'HTTPS actif', 'Site responsive', 'Vitesse correcte'].map((p) => (
              <li key={p} className="text-[11px] text-emerald-400/70 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-400" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#14141f] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-[13px] text-white/60">À améliorer</span>
          </div>
          <ul className="space-y-2">
            {['Schema.org manquant', 'Open Graph à ajouter', 'Sitemap XML', 'Meta descriptions courtes'].map((p) => (
              <li key={p} className="text-[11px] text-amber-400/70 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-amber-400" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#14141f] border border-white/5 rounded-lg p-1 w-fit">
        {[
          { id: 'pages' as const, label: 'Pages', icon: FileText },
          { id: 'keywords' as const, label: 'Mots-clés', icon: Search },
          { id: 'checklist' as const, label: 'Checklist', icon: CheckCircle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-[12px] font-medium transition-colors ${
              activeTab === tab.id ? 'bg-brand-gold/10 text-brand-gold' : 'text-white/40 hover:text-white/60'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pages Tab */}
      {activeTab === 'pages' && (
        <div className="space-y-4">
          {pages.map((page) => (
            <div key={page.path} className="bg-[#14141f] border border-white/5 rounded-xl p-4 md:p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-3.5 h-3.5 text-white/25" />
                    <span className="text-[11px] text-white/25 font-mono">{page.path}</span>
                  </div>
                  <h3 className="text-[14px] text-blue-400">{page.title}</h3>
                  <p className="text-[12px] text-white/40 mt-1">{page.description}</p>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold ${
                  page.score >= 80 ? 'bg-emerald-500/10 text-emerald-400' :
                  page.score >= 60 ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                }`}>
                  {page.score}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
                <div>
                  <span className="text-white/25">Title</span>
                  <p className={`font-medium ${page.titleLength >= 30 && page.titleLength <= 60 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {page.titleLength} car.
                  </p>
                </div>
                <div>
                  <span className="text-white/25">Description</span>
                  <p className={`font-medium ${page.descLength >= 120 && page.descLength <= 160 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {page.descLength} car.
                  </p>
                </div>
                <div>
                  <span className="text-white/25">H1</span>
                  <p className="font-medium text-white/50">{page.h1}</p>
                </div>
                <div>
                  <span className="text-white/25">Problèmes</span>
                  <p className={`font-medium ${page.issues.length === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {page.issues.length === 0 ? 'Aucun' : page.issues.length}
                  </p>
                </div>
              </div>

              {page.issues.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  {page.issues.map((issue) => (
                    <div key={issue} className="flex items-center gap-2 text-[11px] text-amber-400/70">
                      <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                      {issue}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Keywords Tab */}
      {activeTab === 'keywords' && (
        <div className="bg-[#14141f] border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['Mot-clé', 'Position', 'Volume', 'Tendance'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-white/30 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {keywords.map((kw) => (
                  <tr key={kw.keyword} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-[13px] text-white/70">{kw.keyword}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[13px] font-bold ${kw.position <= 5 ? 'text-emerald-400' : kw.position <= 10 ? 'text-amber-400' : 'text-white/40'}`}>
                        #{kw.position}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-white/40">{kw.volume}/mois</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                        kw.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' :
                        kw.trend === 'down' ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-white/40'
                      }`}>
                        {kw.trend === 'up' ? '↑ Hausse' : kw.trend === 'down' ? '↓ Baisse' : '→ Stable'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Checklist Tab */}
      {activeTab === 'checklist' && (
        <div className="bg-[#14141f] border border-white/5 rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white/70">Checklist SEO technique</h3>
            <span className="text-[11px] text-white/30">
              {checklist.filter((c) => c.done).length}/{checklist.length} complété
            </span>
          </div>
          <div className="space-y-2">
            {checklist.map((c) => (
              <div key={c.item} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                {c.done ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400/50 flex-shrink-0" />
                )}
                <span className={`text-[13px] ${c.done ? 'text-white/50' : 'text-white/70'}`}>{c.item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
