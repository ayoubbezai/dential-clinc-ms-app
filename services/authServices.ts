import api from "../utils/api";
import { saveToken, removeToken } from "../utils/tokenStorage";

export const AuthService = {
  async login(email: string, password: string) {
    try {
      const response = await api.post("/auth/mobile/login", {
        email,
        password,
      });
      console.log(response);
      const token = response.data.token;
      console.log(token);

      if (token) {
        await saveToken(token);
        api.defaults.headers.Authorization = `Bearer ${token}`;
        return {
          token: response.data.token || null,
          user: response.data.user || null,
          error: null,
          message: "Login successful",
        };
      }

      return {
        token: null,
        user: null,
        error: true,
        message: "No token received",
      };
    } catch (error: any) {
      console.log(error);

      return {
        user: null,
        error: true,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get("/auth/me");
      return {
        user: response.data?.user || null,
        message: "User fetched",
      };
    } catch (error: any) {
      return {
        user: null,
        error: true,
        message: error.response?.data?.message || "Failed to fetch user",
      };
    }
  },

  async logout() {
    try {
      await api.post("/auth/logout");
      await removeToken();

      return {
        message: "Logout successful",
      };
    } catch (error) {
      return {
        error: error,
        message: "Logout failed",
      };
    }
  },
};
