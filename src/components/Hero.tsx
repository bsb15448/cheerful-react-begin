import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="hero-gradient min-h-[90vh] flex items-center justify-center px-4">
      <div className="max-w-3xl mx-auto text-center text-white space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          Welcome to Your Next
          <br /> Amazing Project
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto">
          Start building something incredible with modern web technologies and a beautiful user interface.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="group">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};