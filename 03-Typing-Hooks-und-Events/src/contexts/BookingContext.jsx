import { createContext, useContext, useReducer } from 'react';

const BookingContext = createContext();

const initialState = {
  destinations: [],
  premium: false,
};

function reducer(state, action) {
  console.log({ state, action });
  switch (action.type) {
    case 'add_destination': {
      const premium = state.destinations.length >= 2;
      return { ...state, destinations: [...state.destinations, action.payload], premium };
    }
    case 'remove_destination': {
      const premium = state.destinations.length > 3;
      const destinations = state.destinations.filter((d) => d !== action.payload);
      return { ...state, premium, destinations };
    }
    default:
      throw new Error('Unknown action: ', action.type);
  }
}

export default function BookingContextProvider({ children }) {
  const [bookingState, bookingDispatch] = useReducer(reducer, initialState);

  function addDestination(dest) {
    bookingDispatch({ type: 'add_destination', payload: dest });
  }

  function removeDestination(dest) {
    bookingDispatch({ type: 'remove_destination', payload: dest });
  }

  return (
    <BookingContext.Provider value={{ bookingState, addDestination, removeDestination }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
