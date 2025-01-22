import { MapPin, Navigation } from 'lucide-react';
import { Button } from './ui/button';

const MapSection = () => {
  const address = "123 Rue Example, Paris, France"; // Replace with your actual address
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Nous Trouver
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary/10 rounded-lg p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <p className="text-lg font-medium text-gray-700">{address}</p>
                </div>
                <p className="text-gray-600">
                  Du Lundi au Samedi : 9h - 19h
                </p>
                <Button 
                  className="w-full md:w-auto"
                  onClick={() => window.open(googleMapsUrl, '_blank')}
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  Nous trouver sur Google Maps
                </Button>
              </div>
              <div className="relative w-full md:w-1/2 h-64 rounded-lg overflow-hidden shadow-md">
                <iframe
                  title="Location Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(address)}`}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;