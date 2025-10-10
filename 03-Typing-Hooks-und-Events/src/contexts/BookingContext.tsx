import { createContext, useContext, useReducer } from 'react';

// Type für die Struktur des States
export type BookingState = {
  destinations: string[];
  premium: boolean;
};

// Type für die Struktur des Context-Values
export type BookingContextType = {
  bookingState: BookingState;
  addDestination: (dest: string) => void;
  removeDestination: (dest: string) => void;
};

// Discriminated Union Type: jede Action hat 'type' + 'payload'
// Das Pipe-Symbol (|) bedeutet "ODER" - nur eine dieser Formen ist gültig
// payload könnte dann unterschiedliche Typen habe; oder auch andere Properties vorhanden sein
type BookingAction =
  | {
      type: 'add_destination';
      payload: string;
    }
  | {
      type: 'remove_destination';
      payload: string;
    };

const initialState: BookingState = {
  destinations: [],
  premium: false,
};

// Context mit Type-Annotation
const BookingContext = createContext<BookingContextType>({
  bookingState: initialState,
  addDestination: () => {},
  removeDestination: () => {},
});

function reducer(state: BookingState, action: BookingAction) {
  console.log({ state, action });
  // TypeScript prüft automatisch, dass alle action.type cases abgedeckt sind
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
      // Exhaustiveness check
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
}

// Props-Type inline definiert
export default function BookingContextProvider({ children }: { children: React.ReactNode }) {
  // useReducer inferiert Types automatisch aus reducer-Funktion
  const [bookingState, bookingDispatch] = useReducer(reducer, initialState);

  // Parameter-Type stellt sicher, dass ein string übergeben wird
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
  // Return-Type wird automatisch als BookingContextType inferiert
  return useContext(BookingContext);
}
