import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestExt } from "../interfaces/reqExt.interface";
import { IUser } from "../interfaces/user.interface";
import { IRole } from "../interfaces/role.interface";

export const authMiddleware = (roles: Array<IRole["name"]> = []) => {
  return (req: RequestExt, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IUser & {
        role: IRole;
      };
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role.name)) {
        return res
          .status(403)
          .send("Access denied. You do not have the required role.");
      }

      next();
    } catch (ex) {
      res.status(400).send("Invalid token.");
    }
  };
};
