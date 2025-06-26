
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/contexts/CartContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './i18n';
import Index from '@/pages/Index';
import ProductDetailsPage from '@/pages/ProductDetailsPage';
import CategoryPage from '@/pages/CategoryPage';
import Contact from '@/pages/Contact';
import Checkout from '@/pages/Checkout';
import PaymentSuccess from '@/pages/PaymentSuccess';
import PaymentFailure from '@/pages/PaymentFailure';
import NotFound from '@/pages/NotFound';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminClients from '@/pages/admin/AdminClients';
import AdminReservations from '@/pages/admin/AdminReservations';
import AdminMessages from '@/pages/admin/AdminMessages';
import AdminNewsletter from '@/pages/admin/AdminNewsletter';
import AdminVisitors from '@/pages/admin/AdminVisitors';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failure" element={<PaymentFailure />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/clients" element={<AdminClients />} />
            <Route path="/admin/reservations" element={<AdminReservations />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/newsletter" element={<AdminNewsletter />} />
            <Route path="/admin/visitors" element={<AdminVisitors />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
