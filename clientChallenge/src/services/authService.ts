import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "../axios.config";
import { LoginResponse } from "../types/login";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/auth/login", { email, password });
  const { token } = response.data;
  return { token, user: jwtDecode(token) };
};
