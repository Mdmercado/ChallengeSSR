import { axiosInstance } from "../axios.config";
import { IUser } from "../types/user";

export const getUsers = async (): Promise<IUser[]> => {
  try {
    const response = await axiosInstance.get<IUser[]>("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/users/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};

export const updateUser = async (
  id: number,
  userData: Partial<IUser>
): Promise<{ user: IUser; token: string }> => {
  try {
    const response = await axiosInstance.put<{ user: IUser; token: string }>(
      `/users/${id}`,
      {
        ...userData,
        active: userData.active ? true : false,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};
