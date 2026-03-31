import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface InvoiceItem {
  description: string;
  qty: number;
  unitPrice: number;
  total: number;
}

interface InvoiceData {
  id: string;
  reservationId: string;
  clientName: string;
  clientEmail: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  paidDate?: string;
}

interface PdfLabels {
  title: string;
  company: string;
  billTo: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  status: string;
  paymentDate: string;
  description: string;
  qty: string;
  unitPrice: string;
  subtotal: string;
  tax: string;
  totalTTC: string;
  thankYou: string;
  footer: string;
  page: string;
  statusLabel: string;
  client: string;
  reservation: string;
}

export function generateInvoicePdf(invoice: InvoiceData, labels: PdfLabels) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;

  // ── Header bar ──
  doc.setFillColor(15, 15, 24); // brand dark
  doc.rect(0, 0, pageWidth, 45, 'F');

  doc.setTextColor(212, 175, 55); // brand gold
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(labels.company, margin, 22);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.text(labels.title, pageWidth - margin, 22, { align: 'right' });

  doc.setFontSize(10);
  doc.setTextColor(180, 180, 180);
  doc.text(`${labels.invoiceNumber} ${invoice.id}`, pageWidth - margin, 34, { align: 'right' });

  // ── Info section ──
  let y = 60;

  // Left: Bill To
  doc.setFontSize(9);
  doc.setTextColor(140, 140, 140);
  doc.text(labels.billTo.toUpperCase(), margin, y);
  y += 7;
  doc.setFontSize(13);
  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'bold');
  doc.text(invoice.clientName, margin, y);
  y += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(invoice.clientEmail, margin, y);

  // Right: Details
  const rightX = pageWidth - margin;
  let ry = 60;
  const detailPairs = [
    [labels.issueDate, invoice.date],
    [labels.dueDate, invoice.dueDate],
    [labels.reservation, invoice.reservationId],
    [labels.status, labels.statusLabel],
  ];
  if (invoice.paidDate) {
    detailPairs.push([labels.paymentDate, invoice.paidDate]);
  }

  detailPairs.forEach(([label, value]) => {
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text(label, rightX, ry, { align: 'right' });
    ry += 5;
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'bold');
    doc.text(value, rightX, ry, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    ry += 8;
  });

  // ── Items table ──
  const tableY = Math.max(y, ry) + 15;

  autoTable(doc, {
    startY: tableY,
    margin: { left: margin, right: margin },
    head: [[labels.description, labels.qty, labels.unitPrice, 'Total']],
    body: invoice.items.map(item => [
      item.description,
      item.qty.toString(),
      `€${item.unitPrice.toLocaleString()}`,
      `€${item.total.toLocaleString()}`,
    ]),
    headStyles: {
      fillColor: [15, 15, 24],
      textColor: [212, 175, 55],
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: {
      textColor: [50, 50, 50],
      fontSize: 9,
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248],
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { halign: 'center', cellWidth: 25 },
      2: { halign: 'right', cellWidth: 35 },
      3: { halign: 'right', cellWidth: 35 },
    },
    theme: 'grid',
    styles: {
      lineColor: [230, 230, 230],
      lineWidth: 0.3,
    },
  });

  // ── Totals ──
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  const totalsX = pageWidth - margin - 80;

  const totalsRows = [
    [labels.subtotal, `€${invoice.subtotal.toLocaleString()}`],
    [`${labels.tax} (20%)`, `€${invoice.tax.toLocaleString()}`],
  ];

  totalsRows.forEach(([label, value], i) => {
    const ty = finalY + i * 8;
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(label, totalsX, ty);
    doc.text(value, pageWidth - margin, ty, { align: 'right' });
  });

  // Total TTC highlighted
  const totalLineY = finalY + totalsRows.length * 8 + 4;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.line(totalsX, totalLineY - 3, pageWidth - margin, totalLineY - 3);

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 15, 24);
  doc.text(labels.totalTTC, totalsX, totalLineY + 5);
  doc.setTextColor(212, 175, 55);
  doc.text(`€${invoice.total.toLocaleString()}`, pageWidth - margin, totalLineY + 5, { align: 'right' });

  // ── Thank you ──
  const tyY = totalLineY + 25;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text(labels.thankYou, pageWidth / 2, tyY, { align: 'center' });

  // ── Footer ──
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFillColor(15, 15, 24);
  doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
  doc.setFontSize(8);
  doc.setTextColor(140, 140, 140);
  doc.text(labels.footer, pageWidth / 2, pageHeight - 8, { align: 'center' });

  // Save
  doc.save(`${invoice.id}.pdf`);
}
