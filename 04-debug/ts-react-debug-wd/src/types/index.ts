export type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  latitude: number;
  longitude: number;
  organizerId: number;
  createdAt: string;
  updatedAt: string;
};

export type EventResponse = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  results: Event[];
};

export type User = {
  id: number;
  name: string | null;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type RegisterActionType =
  | {
      success: boolean;
      error?: undefined;
    }
  | {
      error: string;
      success?: undefined;
    };

export type LoginActionType =
  | {
      success: boolean;
      user: {
        id: number;
        email: string;
      };
      token: string;
      error?: undefined;
    }
  | {
      error: string;
      success?: undefined;
      user?: undefined;
      token?: undefined;
    };

export type CreateEventActionType =
  | {
      success: boolean;
      message: string;
      error?: undefined;
    }
  | {
      error: string;
      success?: undefined;
      message?: undefined;
    };

export type LoginResponse = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
};
