import { Request } from "express";
import { IUser } from "./user.interface";

export interface RequestExt extends Request {
  user?: IUser & { role: { name: string } };
}
