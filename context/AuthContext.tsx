import React, { createContext, useContext, useEffect, useState } from "react";
import { getToken, saveToken, removeToken } from "@/utils/tokenStorage";
import { AuthService } from "@/services/authServices";
import { useRouter } from "expo-router";

import { UserType } from "@/Types/alias";

type AuthContextType = {
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string;
  user: UserType | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await getToken();
      setToken(savedToken);
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");

    const {
      token: newToken,
      user,
      error: loginError,
      message,
    } = await AuthService.login(email, password);

    setIsLoading(false);

    if (!loginError && newToken) {
      await saveToken(newToken);
      setUser(user);
      setToken(newToken);
      router.replace("/(tabs)");
    } else {
      setError(message || "Login failed");
    }
  };

  const logout = async () => {
    await removeToken();
    setToken(null);
    router.replace("/login");
  };


  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) return;

      try {
        const { user, message } = await AuthService.getCurrentUser();
        if (user) {
          setUser(user);
        } else {
          console.warn("No user found:", message);
        }
      } catch (err) {
        console.error("Failed to fetch current user", err);
      }
    };

    fetchCurrentUser();
  }, [token]); 

  return (
    <AuthContext.Provider
      value={{ token, isLoading, login, logout, error, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
