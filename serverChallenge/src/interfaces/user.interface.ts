export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  role_id: number;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}
