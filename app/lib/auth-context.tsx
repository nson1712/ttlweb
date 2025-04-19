"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define types for authentication
interface User {
  username?: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUser = localStorage.getItem("user");

    if (storedIsLoggedIn === "true" && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Login function
  // const login = async (email: string, password: string): Promise<boolean> => {
  const login = async (email: string): Promise<boolean> => {
    try {
      // In a real app, you would make an API call here
      // For now, we'll simulate a successful login
      const userData: User = { email };

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      setIsLoggedIn(true);

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // Register function
  // const register = async (username: string, email: string, password: string): Promise<boolean> => {
  const register = async (
    username: string,
    email: string
  ): Promise<boolean> => {
    try {
      // In a real app, you would make an API call here
      // For now, we'll simulate a successful registration
      const userData: User = { username, email };

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      setIsLoggedIn(true);

      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
