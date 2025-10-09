// Datei um wiederverwendbare Types zu sammeln

type User = {
  id: number;
  username: string;
  info: string;
};

type ComponentStatus = 'unset' | 'loading' | 'error' | 'success';

export type { User, ComponentStatus };
