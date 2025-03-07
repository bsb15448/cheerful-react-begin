
import jsPDF from 'jspdf';
import { CartItem } from '@/types/cart';
import autoTable from 'jspdf-autotable';

interface OrderDetails {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export const generateOrderPDF = async (order: OrderDetails): Promise<void> => {
  // Create new PDF document with professional settings
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  
  // Add company logo and branding header
  pdf.setFillColor(76, 29, 149); // Brand color background for header
  pdf.rect(0, 0, pageWidth, 30, 'F');
  
  try {
    // Add company logo 
    pdf.addImage('/logo.png', 'PNG', margin, 8, 40, 15, undefined, 'FAST');
  } catch (error) {
    // Fallback if logo fails to load
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ELLES', margin, 20);
  }
  
  // Add invoice title to header
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('FACTURE', pageWidth - margin, 20, { align: 'right' });
  
  // Set starting Y position after header
  let yPos = 40;
  
  // Invoice details section
  pdf.setTextColor(76, 29, 149);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Facture N° ${order.orderNumber}`, margin, yPos);
  pdf.setTextColor(100, 100, 100);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Date: ${order.date}`, margin, yPos + 6);
  
  yPos += 15;
  
  // Company and customer information in two columns
  // Left column - Company details
  pdf.setTextColor(80, 80, 80);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('DE', margin, yPos);
  yPos += 6;
  pdf.setFont('helvetica', 'normal');
  pdf.text('ELLES SARL', margin, yPos);
  yPos += 5;
  pdf.text('123 Rue du Commerce', margin, yPos);
  yPos += 5;
  pdf.text('1000 Tunis, Tunisie', margin, yPos);
  yPos += 5;
  pdf.text('contact@elles.tn', margin, yPos);
  yPos += 5;
  pdf.text('+216 71 123 456', margin, yPos);
  
  // Reset Y position for customer column
  yPos = 55;
  
  // Right column - Customer info
  pdf.setTextColor(80, 80, 80);
  pdf.setFont('helvetica', 'bold');
  pdf.text('FACTURER À', pageWidth / 2 + 10, yPos);
  yPos += 6;
  pdf.setFont('helvetica', 'normal');
  pdf.text(order.customerName, pageWidth / 2 + 10, yPos);
  yPos += 5;
  pdf.text(order.address, pageWidth / 2 + 10, yPos);
  yPos += 5;
  pdf.text(order.email, pageWidth / 2 + 10, yPos);
  yPos += 5;
  pdf.text(order.phone, pageWidth / 2 + 10, yPos);
  
  yPos += 15;
  
  // Add subtle separator line
  pdf.setDrawColor(220, 220, 220);
  pdf.setLineWidth(0.5);
  pdf.line(margin, yPos, pageWidth - margin, yPos);
  
  yPos += 10;
  
  // Items table with improved styling using autotable
  pdf.setTextColor(50, 50, 50);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Détails de la commande', margin, yPos);
  
  yPos += 8;
  
  // Create formatted data for autotable
  const tableData = order.items.map(item => [
    item.product_name || item.itemgroup_product || 'Produit',
    item.size || '-',
    item.color || '-',
    `${item.quantity}`,
    `${(item.price || 0).toFixed(2)} TND`,
    `${((item.price || 0) * item.quantity).toFixed(2)} TND`
  ]);
  
  // Add professional table with autoTable
  autoTable(pdf, {
    startY: yPos,
    head: [['Produit', 'Taille', 'Couleur', 'Qté', 'Prix', 'Total']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [76, 29, 149],
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [50, 50, 50],
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    margin: { left: margin, right: margin },
    columnStyles: {
      0: { cellWidth: 60 }, // Product
      1: { cellWidth: 20 }, // Size
      2: { cellWidth: 25 }, // Color
      3: { cellWidth: 15, halign: 'center' }, // Quantity
      4: { cellWidth: 25, halign: 'right' }, // Price
      5: { cellWidth: 30, halign: 'right' } // Total
    }
  });
  
  // Get the Y position after the table
  const finalY = (pdf as any).lastAutoTable.finalY + 10;
  
  // Summary box
  pdf.setFillColor(248, 249, 250);
  pdf.setDrawColor(230, 230, 230);
  pdf.rect(pageWidth - margin - 80, finalY, 80, 40, 'F');
  pdf.rect(pageWidth - margin - 80, finalY, 80, 40, 'S');
  
  // Summary content
  pdf.setTextColor(80, 80, 80);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.text('Sous-total:', pageWidth - margin - 75, finalY + 10);
  pdf.text(`${order.subtotal.toFixed(2)} TND`, pageWidth - margin - 5, finalY + 10, { align: 'right' });
  
  pdf.text('Livraison:', pageWidth - margin - 75, finalY + 20);
  pdf.text(`${order.shipping === 0 ? 'Gratuite' : `${order.shipping.toFixed(2)} TND`}`, 
    pageWidth - margin - 5, finalY + 20, { align: 'right' });
  
  // Final total with emphasis
  pdf.setTextColor(76, 29, 149);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.text('Total:', pageWidth - margin - 75, finalY + 32);
  pdf.text(`${order.total.toFixed(2)} TND`, pageWidth - margin - 5, finalY + 32, { align: 'right' });
  
  // Add professional footer
  const footerY = pageHeight - 20;
  
  // Footer separator
  pdf.setDrawColor(220, 220, 220);
  pdf.setLineWidth(0.5);
  pdf.line(margin, footerY - 10, pageWidth - margin, footerY - 10);
  
  // Footer text
  pdf.setTextColor(120, 120, 120);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.text('Merci pour votre commande!', pageWidth / 2, footerY - 5, { align: 'center' });
  
  // Company website and contact
  pdf.setTextColor(76, 29, 149);
  pdf.setFontSize(8);
  pdf.text('www.elles.tn | contact@elles.tn | +216 71 123 456', pageWidth / 2, footerY, { align: 'center' });
  
  // Add page number
  pdf.setTextColor(150, 150, 150);
  pdf.setFontSize(8);
  pdf.text(`Page 1/1`, pageWidth - margin, footerY, { align: 'right' });
  
  // Save the PDF with the order number - ensure this is actually downloading the file
  pdf.save(`facture-${order.orderNumber}.pdf`);
};
