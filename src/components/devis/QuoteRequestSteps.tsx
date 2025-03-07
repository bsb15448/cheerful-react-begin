
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, ArrowRight } from "lucide-react";

interface QuoteRequestStepsProps {
  currentStep: number;
}

export const QuoteRequestSteps = ({ currentStep }: QuoteRequestStepsProps) => {
  const steps = [
    { number: 1, name: "Contact" },
    { number: 2, name: "Produit" },
    { number: 3, name: "Finalisation" },
  ];

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center w-full max-w-xl">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center w-full">
            <div className="relative flex flex-col items-center">
              <motion.div
                className={cn(
                  "flex items-center justify-center w-14 h-14 rounded-full border-2 transition-colors shadow-md z-10",
                  currentStep === step.number
                    ? "border-primary bg-primary text-white"
                    : currentStep > step.number
                    ? "border-primary/80 bg-primary/80 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                )}
                initial={{ scale: 0.9 }}
                animate={{ scale: currentStep === step.number ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep > step.number ? (
                  <Check className="w-7 h-7" strokeWidth={3} />
                ) : (
                  <span className="text-lg font-semibold">{step.number}</span>
                )}
              </motion.div>
              <span
                className={cn(
                  "absolute top-16 text-sm font-medium whitespace-nowrap",
                  currentStep === step.number
                    ? "text-primary font-bold"
                    : currentStep > step.number
                    ? "text-primary/70"
                    : "text-gray-500"
                )}
              >
                {step.name}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="w-full mx-4">
                <div className="relative h-1 w-full bg-gray-200 rounded-full">
                  <motion.div
                    className="absolute h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{
                      width:
                        currentStep > step.number
                          ? "100%"
                          : currentStep === step.number
                          ? "50%"
                          : "0%",
                    }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>
                <div className="flex justify-center mt-1">
                  <ArrowRight 
                    className={cn(
                      "h-5 w-5",
                      currentStep > step.number
                        ? "text-primary/80"
                        : "text-gray-300"
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
