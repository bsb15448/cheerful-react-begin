import { CheckCircle, Zap, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Lightning Fast",
    description: "Built with performance in mind for the best user experience.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure by Default",
    description: "Enterprise-grade security built into every layer.",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Responsive Design",
    description: "Beautiful on every screen size and device.",
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Production Ready",
    description: "Thoroughly tested and ready for your next project.",
  },
];

export const Features = () => {
  return (
    <div className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything you need
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            All the essential features you need to build amazing applications
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};