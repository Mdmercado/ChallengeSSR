import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { handleHttp } from "../utils/error.handle";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).send("User registered successfully.");
  } catch (error) {
    handleHttp(res, "Error registering user", error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await userService.login(req.body);
    res.json({ token });
  } catch (error) {
    handleHttp(res, "Error logging in", error);
  }
};
