
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Dr. Sophie Martin",
    role: "Médecin Généraliste",
    rating: 5,
    comment: "La qualité des blouses est exceptionnelle. Je les porte quotidiennement et elles restent impeccables.",
    image: "https://placehold.co/400x400"
  },
  {
    id: 2,
    name: "Jean Dupont",
    role: "Infirmier",
    rating: 5,
    comment: "Le confort est incomparable. Ces uniformes sont parfaits pour les longues journées de travail.",
    image: "https://placehold.co/400x400"
  },
  {
    id: 3,
    name: "Marie Lambert",
    role: "Technicienne de Laboratoire",
    rating: 5,
    comment: "Service client excellent et produits de grande qualité. Je recommande vivement.",
    image: "https://placehold.co/400x400"
  }
];

const ReviewSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Ce que disent nos clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de professionnels qui nous font confiance au quotidien pour leurs vêtements de travail.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/10"
                />
                <div>
                  <h3 className="font-semibold text-primary text-lg">{review.name}</h3>
                  <p className="text-sm text-gray-600">{review.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-muted text-muted"
                  />
                ))}
              </div>
              <p className="text-gray-700 italic">&ldquo;{review.comment}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
