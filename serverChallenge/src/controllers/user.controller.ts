import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { handleHttp } from "../utils/error.handle";
import { RequestExt } from "../interfaces/reqExt.interface";
import { ROLES } from "../constants/roles";

export const getUsers = async (req: RequestExt, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    handleHttp(res, "Error fetching users", error);
  }
};

export const getUser = async (req: RequestExt, res: Response) => {
  try {
    const user = await userService.getUserById(+req.params.id);
    res.json(user);
  } catch (error) {
    handleHttp(res, "Error fetching user", error);
  }
};

export const createUser = async (req: RequestExt, res: Response) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.json(newUser);
  } catch (error) {
    handleHttp(res, "Error creating user", error);
  }
};

export const updateUser = async (req: RequestExt, res: Response) => {
  try {
    const userId = +req.params.id;
    if (req.user?.role.name === ROLES.USER && req.user.id !== userId) {
      return res
        .status(403)
        .send("Forbidden. You can only update your own data.");
    }

    const { user, token } = await userService.updateUser(userId, req.body);
    res.json({ user, token });
  } catch (error) {
    handleHttp(res, "Error updating user", error);
  }
};

export const deleteUser = async (req: RequestExt, res: Response) => {
  try {
    await userService.deleteUser(+req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    handleHttp(res, "Error deleting user", error);
  }
};
