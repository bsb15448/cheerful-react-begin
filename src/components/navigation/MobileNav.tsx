
import { Menu, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { menuItems } from '../../config/menuConfig';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileNav = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<typeof menuItems[0] | null>(null);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setIsSubmenuOpen(false);
    navigate(path);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[300px]">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        
        <div className="bg-white p-4 flex items-center justify-center border-b">
          <img src="/logo.png" alt="ELLES" className="h-12" />
        </div>

        <div className="divide-y">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
              onClick={() => {
                setActiveMenuItem(item);
                setIsSubmenuOpen(true);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-left">{item.title}</span>
              </div>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
