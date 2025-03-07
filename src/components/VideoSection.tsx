
import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Play } from 'lucide-react';
import ReactPlayer from 'react-player/lazy';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    
    // Scroll to video if needed
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <h2 className="text-3xl font-bold text-primary">La Qualité ELLES</h2>
            <p className="text-gray-600">
              Chez ELLES, nous nous engageons à fournir des vêtements professionnels de la plus haute qualité. 
              Notre processus de fabrication rigoureux garantit que chaque pièce répond aux normes les plus exigeantes.
            </p>
            <p className="text-gray-600">
              Nous sélectionnons soigneusement nos matériaux pour leur durabilité et leur confort, 
              tout en respectant l'environnement. Nos artisans qualifiés apportent une attention particulière 
              aux détails, assurant ainsi des finitions impeccables.
            </p>
            <p className="text-gray-600">
              Découvrez notre savoir-faire à travers cette vidéo et comprenez pourquoi 
              les professionnels de tous secteurs font confiance à ELLES depuis plus de 13 ans.
            </p>
          </div>
          
          <div className="relative order-1 md:order-2" ref={thumbnailRef}>
            {!isPlaying ? (
              <div className="relative rounded-lg overflow-hidden shadow-xl aspect-video">
                <img 
                  src="/video/thumbnail.png" 
                  alt="Vidéo sur la qualité ELLES" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all hover:bg-black/40">
                  <Button 
                    onClick={handlePlayClick}
                    className="rounded-full w-16 h-16 flex items-center justify-center bg-primary/90 hover:bg-primary transition-all hover:scale-110"
                  >
                    <Play className="w-8 h-8 text-white" fill="white" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                  <p className="font-medium">Exemples de notre travail</p>
                </div>
              </div>
            ) : (
              <div className="rounded-lg overflow-hidden shadow-xl aspect-video">
                <ReactPlayer
                  url="/video/video.mp4" 
                  width="100%"
                  height="100%"
                  playing={isPlaying}
                  controls={true}
                  className="react-player"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
