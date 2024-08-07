import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { appDataSource } from "../db/index";
import { User } from "../entities/users.entity";
import { CustomError } from "../utils/error.handle";
import { IUser } from "../interfaces/user.interface";

const createUserHelper = async (userData: IUser): Promise<IUser> => {
  const { username, email, password, role_id } = userData;

  const existingUser = await appDataSource
    .getRepository(User)
    .findOne({ where: { email } });
  if (existingUser) {
    throw new CustomError("Email already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = appDataSource
    .getRepository(User)
    .create({ username, email, password: hashedPassword, role_id });
  const savedUser = await appDataSource.getRepository(User).save(newUser);
  return savedUser;
};

export const register = async (userData: IUser): Promise<IUser> => {
  return await createUserHelper(userData);
};

export const createUser = async (userData: IUser): Promise<IUser> => {
  return await createUserHelper(userData);
};

export const login = async (userData: {
  email: string;
  password: string;
}): Promise<string> => {
  const { email, password } = userData;
  const user = await appDataSource
    .getRepository(User)
    .findOne({ where: { email }, relations: ["role_id"] });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new CustomError("Invalid email or password", 400);
  }
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      active: user.active,
      createdAt: user.created_at,
      role: user.role_id,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const users = await appDataSource
      .getRepository(User)
      .find({ relations: ["role_id"] });
    return users;
  } catch (error) {
    throw new CustomError("Failed to fetch users", 500);
  }
};

export const getUserById = async (id: number): Promise<IUser> => {
  const user = await appDataSource
    .getRepository(User)
    .findOne({ where: { id }, relations: ["role_id"] });
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  return user;
};

export const updateUser = async (
  id: number,
  userData: Partial<IUser>
): Promise<{ user: IUser; token: string }> => {
  const user = await getUserById(id);
  appDataSource.getRepository(User).merge(user, userData);
  try {
    const updatedUser = await appDataSource.getRepository(User).save(user);

    const token = jwt.sign(
      {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        active: updatedUser.active,
        createdAt: updatedUser.created_at,
        role: updatedUser.role_id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    return { user: updatedUser, token };
  } catch (error) {
    throw new CustomError("Failed to update user", 500);
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    const result = await appDataSource.getRepository(User).delete(id);
    if (result.affected === 0) {
      throw new CustomError("User not found", 404);
    }
  } catch (error) {
    throw new CustomError("Failed to delete user", 500);
  }
};
