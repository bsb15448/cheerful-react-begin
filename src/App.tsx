
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Index from './pages/Index';
import Metiers from './pages/Metiers';
import MetierProducts from './pages/MetierProducts';
import Cart from './pages/Cart';
import Devis from './pages/Devis';
import Personalization from './pages/Personalization';
import DesignValidation from './pages/DesignValidation';
import DesignSummary from './pages/DesignSummary';
import Favorites from './pages/Favorites';
import Wishlist from './pages/Wishlist';
import CategoryPage from './components/categories/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import NosPacks from './pages/NosPacks';
import PackDetail from './pages/packs/PackDetail';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import Sacs from './pages/categories/produits-marketing/Sacs';
import Gilets from './pages/categories/vetements-travail/Gilets';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="metiers" element={<Metiers />} />
        <Route path="metier/:metierType" element={<MetierProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/devis" element={<Devis />} />
        <Route path="/personalization" element={<Personalization />} />
        <Route path="/design-validation" element={<DesignValidation />} />
        <Route path="/design-summary" element={<DesignSummary />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
        
        {/* Packs Routes */}
        <Route path="/nos-packs" element={<NosPacks />} />
        <Route path="/nos-packs/:packId" element={<PackDetail />} />
        
        {/* All Product Marketing Routes use CategoryPage */}
        <Route path="/produits-marketing/cartes-visite" element={<CategoryPage />} />
        <Route path="/produits-marketing/carnets-restaurant" element={<CategoryPage />} />
        <Route path="/produits-marketing/drapeaux" element={<CategoryPage />} />
        <Route path="/produits-marketing/mugs" element={<CategoryPage />} />
        <Route path="/produits-marketing/carnets" element={<CategoryPage />} />
        <Route path="/produits-marketing/sacs" element={<Sacs />} />
        
        {/* Subitem routes for categories */}
        <Route path="/vetements-cuisine/vestes" element={<CategoryPage />} />
        <Route path="/vetements-cuisine/tabliers" element={<CategoryPage />} />
        <Route path="/vetements-cuisine/pantalons" element={<CategoryPage />} />
        <Route path="/vetements-cuisine/vestes-boulanger" element={<CategoryPage />} />
        <Route path="/vetements-cuisine/tabliers-pro" element={<CategoryPage />} />
        <Route path="/vetements-cuisine/vestes-boucher" element={<CategoryPage />} />
        
        <Route path="/vetements-hotellerie/service" element={<CategoryPage />} />
        <Route path="/vetements-hotellerie/accueil" element={<CategoryPage />} />
        
        <Route path="/vetements-travail/combinaisons" element={<CategoryPage />} />
        <Route path="/vetements-travail/vestes" element={<CategoryPage />} />
        <Route path="/vetements-travail/gilets" element={<Gilets />} />
        <Route path="/vetements-travail/blouses" element={<CategoryPage />} />
        <Route path="/vetements-travail/tuniques" element={<CategoryPage />} />
        
        <Route path="/chaussures/cuisine" element={<CategoryPage />} />
        <Route path="/chaussures/industrie" element={<CategoryPage />} />
        
        <Route path="/produits-marketing/drapeaux" element={<CategoryPage />} />
        <Route path="/produits-marketing/mugs" element={<CategoryPage />} />
        <Route path="/produits-marketing/carnets" element={<CategoryPage />} />
        <Route path="/produits-marketing/cartes-visite" element={<CategoryPage />} />
        <Route path="/produits-marketing/carnets-restaurant" element={<CategoryPage />} />
        
        {/* Keep the main category page routes too for backward compatibility */}
        <Route path="/vetements-cuisine" element={<CategoryPage />} />
        <Route path="/vetements-boulanger" element={<CategoryPage />} />
        <Route path="/vetements-boucher" element={<CategoryPage />} />
        <Route path="/vetements-hotellerie" element={<CategoryPage />} />
        <Route path="/vetements-esthetique" element={<CategoryPage />} />
        <Route path="/vetements-travail" element={<CategoryPage />} />
        <Route path="/chaussures" element={<CategoryPage />} />
        <Route path="/produits-marketing" element={<CategoryPage />} />
        
        <Route path="/product/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
