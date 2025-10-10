import { createContext, useContext, useReducer } from 'react';

export type BookingState = {
  destinations: string[];
  premium: boolean;
};

export type BookingContextType = {
  bookingState: BookingState;
  addDestination: (dest: string) => void;
  removeDestination: (dest: string) => void;
};

type BookingAction =
  | {
      type: 'add_destination';
      payload: string;
    }
  | {
      type: 'remove_destination';
      payload: string;
    };

const initialState = {
  destinations: [],
  premium: false,
};

const BookingContext = createContext<BookingContextType>({
  bookingState: initialState,
  addDestination: () => {},
  removeDestination: () => {},
});

function reducer(state: BookingState, action: BookingAction) {
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
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
}

export default function BookingContextProvider({ children }: { children: React.ReactNode }) {
  const [bookingState, bookingDispatch] = useReducer(reducer, initialState);

  function addDestination(dest: string) {
    bookingDispatch({ type: 'add_destination', payload: dest });
  }

  function removeDestination(dest: string) {
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
