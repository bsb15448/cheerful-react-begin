import { useState } from 'react';
import { FileText, Download, Send, Plus, Search, Eye, X, Check } from 'lucide-react';
import { useI18n } from '../../lib/i18n';
import { generateInvoicePdf } from '../../lib/invoicePdf';

interface Invoice {
  id: string;
  reservationId: string;
  clientName: string;
  clientEmail: string;
  date: string;
  dueDate: string;
  items: { description: string; qty: number; unitPrice: number; total: number }[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  paidDate?: string;
}

const mockInvoices: Invoice[] = [
  { id: 'INV-2026-001', reservationId: 'RES-001', clientName: 'Jean Dupont', clientEmail: 'jean@email.com', date: '2026-03-25', dueDate: '2026-04-25', items: [{ description: 'Transfert Aéroport Marseille → Nice', qty: 1, unitPrice: 180, total: 180 }], subtotal: 180, tax: 36, total: 216, status: 'paid', paidDate: '2026-03-27' },
  { id: 'INV-2026-002', reservationId: 'RES-002', clientName: 'Marie Leclerc', clientEmail: 'marie@email.com', date: '2026-03-28', dueDate: '2026-04-28', items: [{ description: 'Soirée événement — Mise à disposition 5h', qty: 1, unitPrice: 350, total: 350 }], subtotal: 350, tax: 70, total: 420, status: 'sent' },
  { id: 'INV-2026-003', reservationId: 'RES-003', clientName: 'Pierre Martin', clientEmail: 'p.martin@corp.com', date: '2026-03-20', dueDate: '2026-04-10', items: [{ description: 'Excursion Côte d\'Azur — Journée complète', qty: 1, unitPrice: 520, total: 520 }, { description: 'Supplément attente 45min', qty: 1, unitPrice: 45, total: 45 }], subtotal: 565, tax: 113, total: 678, status: 'overdue' },
  { id: 'INV-2026-004', reservationId: 'RES-004', clientName: 'Sophie Bernard', clientEmail: 'sophie@email.com', date: '2026-03-30', dueDate: '2026-04-30', items: [{ description: 'Transfert professionnel Aix → Marseille', qty: 1, unitPrice: 120, total: 120 }], subtotal: 120, tax: 24, total: 144, status: 'draft' },
];

export default function AdminInvoices() {
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const statusConfig: Record<string, { label: string; className: string }> = {
    draft: { label: t('admin.invoices.draft'), className: 'bg-white/5 text-white/40' },
    sent: { label: t('admin.invoices.sent'), className: 'bg-blue-500/10 text-blue-400' },
    paid: { label: t('admin.invoices.paid'), className: 'bg-emerald-500/10 text-emerald-400' },
    overdue: { label: t('admin.invoices.overdue'), className: 'bg-red-500/10 text-red-400' },
  };

  const filtered = mockInvoices.filter(inv => {
    const matchSearch = `${inv.id} ${inv.clientName}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || inv.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalRevenue = mockInvoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0);
  const totalPending = mockInvoices.filter(i => i.status === 'sent').reduce((s, i) => s + i.total, 0);
  const totalOverdue = mockInvoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-white">{t('admin.invoices')}</h1>
          <p className="text-sm text-white/40 mt-1">{t('admin.invoices.desc')}</p>
        </div>
        <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-gold text-brand-black text-[12px] font-semibold hover:brightness-110 transition">
          <Plus className="w-3.5 h-3.5" />
          {t('admin.invoices.create')}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#14141f] border border-white/5 rounded-xl p-4">
          <FileText className="w-4 h-4 text-brand-gold/60 mb-2" />
          <p className="text-lg font-bold text-white">{mockInvoices.length}</p>
          <p className="text-[11px] text-white/35">{t('admin.invoices.total')}</p>
        </div>
        <div className="bg-[#14141f] border border-white/5 rounded-xl p-4">
          <Check className="w-4 h-4 text-emerald-400/60 mb-2" />
          <p className="text-lg font-bold text-emerald-400">€{totalRevenue.toLocaleString()}</p>
          <p className="text-[11px] text-white/35">{t('admin.invoices.collected')}</p>
        </div>
        <div className="bg-[#14141f] border border-white/5 rounded-xl p-4">
          <Send className="w-4 h-4 text-blue-400/60 mb-2" />
          <p className="text-lg font-bold text-blue-400">€{totalPending.toLocaleString()}</p>
          <p className="text-[11px] text-white/35">{t('admin.invoices.pending')}</p>
        </div>
        <div className="bg-[#14141f] border border-white/5 rounded-xl p-4">
          <FileText className="w-4 h-4 text-red-400/60 mb-2" />
          <p className="text-lg font-bold text-red-400">€{totalOverdue.toLocaleString()}</p>
          <p className="text-[11px] text-white/35">{t('admin.invoices.overdueAmount')}</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('admin.invoices.searchPlaceholder')}
            className="w-full bg-[#14141f] border border-white/5 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-brand-gold/30 focus:outline-none"
          />
        </div>
        <div className="flex gap-1.5">
          {['all', 'draft', 'sent', 'paid', 'overdue'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-lg text-[11px] font-medium transition-colors ${
                filterStatus === s ? 'bg-brand-gold/15 text-brand-gold' : 'bg-white/5 text-white/40 hover:text-white/60'
              }`}
            >
              {s === 'all' ? t('admin.all') : statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Invoice List */}
      <div className="space-y-2">
        {filtered.map(inv => (
          <div
            key={inv.id}
            onClick={() => setSelectedInvoice(inv)}
            className="bg-[#14141f] border border-white/5 rounded-xl p-4 hover:border-white/10 cursor-pointer transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/[0.03] flex items-center justify-center">
                <FileText className="w-4 h-4 text-brand-gold/60" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">{inv.id}</p>
                <p className="text-[11px] text-white/30">{inv.clientName} · {inv.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${statusConfig[inv.status].className}`}>
                {statusConfig[inv.status].label}
              </span>
              <span className="text-sm font-semibold text-brand-gold">€{inv.total.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedInvoice(null)}>
          <div className="bg-[#14141f] border border-white/10 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">{selectedInvoice.id}</h3>
                <p className="text-[11px] text-white/30">{t('admin.invoices.reservation')}: {selectedInvoice.reservationId}</p>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="text-white/30 hover:text-white/60">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/30">{t('admin.invoices.client')}</p>
                  <p className="text-sm text-white/80">{selectedInvoice.clientName}</p>
                  <p className="text-[11px] text-white/30">{selectedInvoice.clientEmail}</p>
                </div>
                <span className={`text-[11px] px-3 py-1 rounded-full font-medium ${statusConfig[selectedInvoice.status].className}`}>
                  {statusConfig[selectedInvoice.status].label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-white/[0.03]">
                  <p className="text-white/30 mb-0.5">{t('admin.invoices.issueDate')}</p>
                  <p className="text-white/70">{selectedInvoice.date}</p>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.03]">
                  <p className="text-white/30 mb-0.5">{t('admin.invoices.dueDate')}</p>
                  <p className="text-white/70">{selectedInvoice.dueDate}</p>
                </div>
              </div>

              {/* Items table */}
              <div className="border border-white/5 rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 gap-2 p-3 bg-white/[0.03] text-[10px] text-white/30 uppercase tracking-wider">
                  <div className="col-span-6">{t('admin.invoices.description')}</div>
                  <div className="col-span-2 text-center">{t('admin.invoices.qty')}</div>
                  <div className="col-span-2 text-right">{t('admin.invoices.unitPrice')}</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                {selectedInvoice.items.map((item, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 p-3 border-t border-white/5 text-xs">
                    <div className="col-span-6 text-white/60">{item.description}</div>
                    <div className="col-span-2 text-center text-white/50">{item.qty}</div>
                    <div className="col-span-2 text-right text-white/50">€{item.unitPrice}</div>
                    <div className="col-span-2 text-right text-white/70">€{item.total}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-white/40">
                  <span>{t('admin.invoices.subtotal')}</span>
                  <span>€{selectedInvoice.subtotal}</span>
                </div>
                <div className="flex justify-between text-white/40">
                  <span>{t('admin.invoices.tax')} (20%)</span>
                  <span>€{selectedInvoice.tax}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-brand-gold pt-2 border-t border-white/5">
                  <span>Total TTC</span>
                  <span>€{selectedInvoice.total}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    generateInvoicePdf(selectedInvoice, {
                      title: t('admin.invoices.pdf.title'),
                      company: t('admin.invoices.pdf.company'),
                      billTo: t('admin.invoices.pdf.billTo'),
                      invoiceNumber: t('admin.invoices.pdf.invoiceNumber'),
                      issueDate: t('admin.invoices.issueDate'),
                      dueDate: t('admin.invoices.dueDate'),
                      status: t('admin.invoices.pdf.status'),
                      paymentDate: t('admin.invoices.pdf.paymentDate'),
                      description: t('admin.invoices.description'),
                      qty: t('admin.invoices.qty'),
                      unitPrice: t('admin.invoices.unitPrice'),
                      subtotal: t('admin.invoices.subtotal'),
                      tax: t('admin.invoices.tax'),
                      totalTTC: t('admin.invoices.pdf.totalTTC'),
                      thankYou: t('admin.invoices.pdf.thankYou'),
                      footer: t('admin.invoices.pdf.footer'),
                      page: t('admin.invoices.pdf.page'),
                      statusLabel: statusConfig[selectedInvoice.status].label,
                      client: t('admin.invoices.client'),
                      reservation: t('admin.invoices.reservation'),
                    });
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-gold/10 text-brand-gold text-xs font-medium hover:bg-brand-gold/20 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  {t('admin.invoices.downloadPdf')}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition">
                  <Send className="w-3.5 h-3.5" />
                  {t('admin.invoices.sendEmail')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
