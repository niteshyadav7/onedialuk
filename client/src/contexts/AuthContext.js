import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AuthContext = createContext(undefined);

const BASE_URL = "http://localhost:8080/api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/register`, data);
      const newUser = response.data.user;

      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      toast.success(`Welcome ${newUser.fullName}! Account created successfully.`);
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        error.message ||
        "Registration failed";
      toast.error(errMsg);
      throw new Error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/login`, data);
      const loggedInUser = response.data.user;

      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      toast.success(`Welcome back, ${loggedInUser.fullName}!`);
    } catch (error) {
      const errMsg =
        error?.response?.data?.message || error.message || "Login failed";
      toast.error(errMsg);
      throw new Error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/forgot-password`, {
        email,
      });
      toast.success(response.data.message || "Reset link sent successfully!");
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        error.message ||
        "Failed to send reset link";
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.info("You have been logged out.");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, register, login, forgotPassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
