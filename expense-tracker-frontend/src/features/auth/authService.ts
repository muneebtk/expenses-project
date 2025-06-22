import http from "../../api/http";
import type { LoginFormData, RegisterFormData } from "./Types";

export const login = async (credentials: LoginFormData) => {
  const response = await http.post("/api/auth/login/", credentials);
  return response.data;
};

export const register = async (userData: RegisterFormData) => {
  const response = await http.post("/api/auth/signup/", userData);
  return response.data;
};

export const logout = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");

  const response = await http.post(
    "/api/auth/logout/",
    { refresh_token: refreshToken },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await http.get("/api/auth/user/");
  return response.data;
};
