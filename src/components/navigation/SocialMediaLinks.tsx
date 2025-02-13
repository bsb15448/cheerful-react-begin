
import { Facebook, Instagram, Youtube } from "lucide-react";

const SocialMediaLinks = () => {
  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Visit our Facebook page"
      >
        <Facebook className="h-5 w-5" />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Visit our Instagram page"
      >
        <Instagram className="h-5 w-5" />
      </a>
      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Visit our YouTube channel"
      >
        <Youtube className="h-5 w-5" />
      </a>
    </div>
  );
};

export default SocialMediaLinks;
