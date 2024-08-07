export interface Role {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  active: boolean | number;
  created_at: Date;
  updated_at: Date;
  role_id: Role;
}

export interface UserPayload {
  id: number;
  username: string;
  email: string;
  active: boolean | number;
  createdAt: Date;
  role: Role;
  iat: number;
  exp: number;
}

export const transformUserToPayload = (
  user: IUser,
  iat: number,
  exp: number
): UserPayload => ({
  id: user.id,
  username: user.username,
  email: user.email,
  active: user.active,
  createdAt: user.created_at,
  role: user.role_id,
  iat,
  exp,
});

export const transformPayloadToUser = (payload: UserPayload): IUser => ({
  id: payload.id,
  username: payload.username,
  email: payload.email,
  password: "",
  active: payload.active,
  created_at: payload.createdAt,
  updated_at: new Date(),
  role_id: payload.role,
});
