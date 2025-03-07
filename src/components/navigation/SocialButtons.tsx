
import React, { useState, useEffect } from 'react';
import { MessageSquare } from "lucide-react";

const SocialButtons: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    // Auto-collapse the help button after 4 seconds
    const timer = setTimeout(() => {
      setIsExpanded(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="https://wa.me/+33600000000"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed right-6 bottom-6 z-50 flex items-center ${
        isExpanded ? 'gap-3 px-5' : 'justify-center p-4'
      } bg-green-500 hover:bg-green-600 text-white py-4 rounded-full shadow-lg transition-all duration-300`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <MessageSquare className="h-6 w-6" />
      {isExpanded && <span className="font-medium whitespace-nowrap text-lg">Besoin d'aide ?</span>}
    </a>
  );
};

export default SocialButtons;
