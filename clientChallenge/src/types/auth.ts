import { UserPayload } from "./user";

export interface AuthState {
  token: string | null;
  user: UserPayload | null;
  setAuth: (token: string, user: UserPayload) => void;
  hasSeenInactiveAlert: boolean;
  setHasSeenInactiveAlert: (hasSeen: boolean) => void;
  logout: () => void;
}
