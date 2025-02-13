
import { Percent } from "lucide-react";

const TopBanner = () => {
  return (
    <div className="w-full bg-[#FFD700] py-2">
      <div className="container mx-auto text-center text-sm font-medium flex items-center justify-center gap-2">
        <Percent className="h-4 w-4" />
        <span>Livraison offerte dès 69€ d'achats !</span>
      </div>
    </div>
  );
};

export default TopBanner;
