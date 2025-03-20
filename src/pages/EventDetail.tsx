import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, CalendarIcon, MapPinIcon, TicketIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { eventsData } from '../data/eventsData';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [foundEvent, setFoundEvent] = useState(null);

  useEffect(() => {
    if (id) {
      const event = eventsData.find((event) => event.id === parseInt(id));
      setFoundEvent(event);
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
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Back to Events
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={foundEvent.imageUrl} alt={foundEvent.title} className="w-full rounded-md shadow-md" />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">{foundEvent.title}</h2>
          <div className="flex items-center text-gray-300 mb-2">
            <CalendarIcon className="h-5 w-5 mr-2" />
            {foundEvent.date}
          </div>
          <div className="flex items-center text-gray-300 mb-2">
            <MapPinIcon className="h-5 w-5 mr-2" />
            {foundEvent.location}
          </div>
          <div className="flex items-center text-gray-300 mb-2">
            <TicketIcon className="h-5 w-5 mr-2" />
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
            <HashLink to="/contact#contact-form" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Contact to Reserve
            </HashLink>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventDetail;
