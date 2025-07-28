// src/validations/ValidationSchema.jsx
import * as yup from "yup";

const registerSchema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must not exceed 50 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  phone: yup.string().required("Phone number is required"),
  // .matches(/^\d{10,15}$/, 'Please enter a valid phone number'),
  countryCode: yup.string().required("Country code is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  role: yup
    .string()
    .oneOf(["user", "business"], "Please select a valid role")
    .required("Role is required"),
});

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  role: yup
    .string()
    .oneOf(["user", "business"], "Please select a valid role")
    .required("Role is required"),
});

export { registerSchema, loginSchema };
