import { UserPayload } from "./user";

export interface LoginResponse {
  token: string;
  user: UserPayload;
}
