
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define the event type to fix type errors
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  availableTickets: number;
  reservationNumbers?: string[];
}

// Temporary mock data since we can't access the original eventsData module
const eventsData: Event[] = [
  {
    id: 1,
    title: "Sample Event",
    date: "January 1, 2023",
    location: "Paris, France",
    description: "This is a sample event description.",
    imageUrl: "/images/events/event1.jpg",
    availableTickets: 100,
    reservationNumbers: ["123-456-789", "987-654-321"]
  }
];

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [foundEvent, setFoundEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (id) {
      const event = eventsData.find((event) => event.id === parseInt(id));
      setFoundEvent(event || null);
    }
  }, [id]);

  if (!foundEvent) {
    return <div>Event not found</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      className="container mx-auto mt-8 p-4 md:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Link to="/events" className="flex items-center mb-4 text-blue-500 hover:text-blue-600">
        <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Events
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={foundEvent.imageUrl} alt={foundEvent.title} className="w-full rounded-md shadow-md" />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">{foundEvent.title}</h2>
          <div className="flex items-center text-gray-300 mb-2">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {foundEvent.date}
          </div>
          <div className="flex items-center text-gray-300 mb-2">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {foundEvent.location}
          </div>
          <div className="flex items-center text-gray-300 mb-2">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              <path fillRule="evenodd" d="M3 10h14v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4z" clipRule="evenodd" />
            </svg>
            {foundEvent.availableTickets} Tickets Available
          </div>
          <p className="text-gray-400 mb-4">{foundEvent.description}</p>

          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Reservation Numbers:</h3>
            <ul>
              {foundEvent.reservationNumbers?.map((number, index) => (
                <li key={index} className="text-gray-300">
                  {number}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Link to="/contact" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Contact to Reserve
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventDetail;
