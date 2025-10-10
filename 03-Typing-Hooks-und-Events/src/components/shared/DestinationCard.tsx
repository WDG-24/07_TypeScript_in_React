import { Link } from 'react-router';
import { useTheme } from '../../contexts/ThemeContext.js';
import { useBooking } from '../../contexts/BookingContext.js';
// Type-only Import: nur der Type wird importiert
import type { Destination } from '../../types/index.js';

// Omit<Destination, 'id'> erstellt einen neuen Type: alle Properties von Destination außer 'id'
// Props werden inline destrukturiert und typisiert
const DestinationCard = ({ title, image, description, slug }: Omit<Destination, 'id'>) => {
  const { theme } = useTheme();
  const { bookingState, addDestination, removeDestination } = useBooking();

  const isBooked = bookingState.destinations.includes(slug);

  function handleBooking() {
    if (isBooked) {
      removeDestination(slug);
    } else {
      addDestination(slug);
    }
  }

  return (
    <div data-theme={theme} className='card bg-base-100 shadow-md'>
      <figure>
        <img src={image} alt='Tokyo' className='h-48 w-full object-cover' />
      </figure>
      <div className='card-body'>
        <Link to={`/destinations/${slug}`}>
          <h2 className='card-title text-lg font-semibold hover:text-primary'>{title}</h2>
        </Link>
        <p>{description}</p>
        <div className='card-actions justify-end'>
          <button type='button' className={`btn ${isBooked ? 'btn-error' : 'btn-primary'}`} onClick={handleBooking}>
            {isBooked ? 'Remove Booking' : 'Book'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
