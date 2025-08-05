import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import LoginPage from "./LoginPage"; // adjust if file path is different
import { toast } from "react-toastify";

// Mock axios and toast
jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("LoginPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form elements correctly", () => {
    renderWithRouter(<LoginPage />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  test("submits login form with valid input and redirects", async () => {
    const mockToken = "test-token-123";
    axios.post.mockResolvedValueOnce({
      data: { token: mockToken },
    });

    renderWithRouter(<LoginPage />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "securepass" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8080/api/auth/login",
        {
          email: "user@example.com",
          password: "securepass",
          rememberMe: false,
        }
      );
    });

    expect(localStorage.getItem("token")).toBe(mockToken);
    expect(toast.success).toHaveBeenCalledWith("Login successful!");
  });

  test("shows error toast on failed login", async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: { message: "Invalid credentials" },
      },
    });

    renderWithRouter(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });

  test("disables button while loading", async () => {
    axios.post.mockResolvedValueOnce({ data: { token: "123" } });

    renderWithRouter(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "securepass" },
    });

    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();

    await waitFor(() =>
      expect(submitButton).not.toHaveAttribute("disabled")
    );
  });
});
