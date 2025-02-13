
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import Footer from "./Footer";
import { menuItems } from '../config/menuConfig';
import TopBanner from './navigation/TopBanner';
import SearchBar from './navigation/SearchBar';
import RightActions from './navigation/RightActions';
import MobileNav from './navigation/MobileNav';
import SocialMediaLinks from './navigation/SocialMediaLinks';
import CategoryLink from './navigation/CategoryLink';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Load favorites from localStorage
  useEffect(() => {
    const favoritesStr = localStorage.getItem('favorites');
    if (favoritesStr) {
      try {
        const parsedFavorites = JSON.parse(favoritesStr);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error('Error parsing favorites:', error);
        setFavorites([]);
      }
    }
  }, [location.pathname]);

  // Check for designs in sessionStorage
  useEffect(() => {
    const designs = sessionStorage.getItem('designs');
    if (designs) {
      try {
        const parsedDesigns = JSON.parse(designs);
        setCartCount(Array.isArray(parsedDesigns) ? parsedDesigns.length : 0);
      } catch (error) {
        console.error('Error parsing designs from sessionStorage:', error);
        setCartCount(0);
      }
    } else {
      setCartCount(0);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBanner />

      <nav className="w-full bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto">
          {/* Upper Navigation */}
          <div className="flex items-center justify-between py-4 px-4">
            <MobileNav />

            {/* Logo */}
            <a href="/" className="flex-shrink-0">
              <img src="/logo.png" alt="ELLES" className="h-14" />
            </a>

            <SearchBar />
            <RightActions />
          </div>

          {/* Mobile Search */}
          <SearchBar isMobile />

          {/* Desktop Lower Navigation */}
          <div className="hidden md:block border-t">
            <div className="container mx-auto">
              <div className="flex items-center justify-between py-3">
                <NavigationMenu>
                  <NavigationMenuList>
                    {menuItems.map((item, index) => (
                      <CategoryLink 
                        key={index}
                        href={item.path}
                        topText={item.topText}
                        bottomText={item.bottomText}
                        subItems={item.subItems}
                      />
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-3 ml-4">
                  <button
                    onClick={() => navigate('/marques')}
                    className="px-6 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <span>Personalisation</span>
                  </button>
                  <button
                    onClick={() => navigate('/metiers')}
                    className="px-6 py-2.5 bg-[#FFD700] text-black rounded-md hover:bg-[#FFD700]/90 transition-colors text-sm font-medium shadow-sm flex items-center gap-2"
                  >
                    <span>MÉTIERS</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow" onClick={() => setShowSearchResults(false)}>
        {children}
      </main>

      <SocialMediaLinks />
      <Footer />
    </div>
  );
};

export default Layout;
