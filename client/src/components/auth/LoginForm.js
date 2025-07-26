import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../../store/slices/authSlice";
import Input from "../ui/Input";
import Button from "../ui/Button";

const LoginForm = ({
  onSwitchToRegister,
  onSwitchToForgotPassword,
  userType,
  onUserTypeChange,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ ...formData, userType }));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tab Buttons */}
      <div className="flex mb-8">
        <button
          className={`flex-1 py-3 px-6 text-center font-medium rounded-l-lg transition-colors ${
            userType === "user"
              ? "bg-white text-gray-800 shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => onUserTypeChange("user")}
        >
          Login as User
        </button>
        <button
          className={`flex-1 py-3 px-6 text-center font-medium rounded-r-lg transition-colors ${
            userType === "vendor"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => onUserTypeChange("vendor")}
        >
          Login as Vendor
        </button>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In</h2>
        <p className="text-gray-600">
          Sign in to get the best deals, exclusive offers with{" "}
          <span className="text-orange-500 font-semibold">One Dial USA</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            required
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm"
          >
            {error}
          </motion.div>
        )}

        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          className="w-full"
        >
          Login
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToForgotPassword}
            className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
          >
            Forget password
          </button>
        </div>

        <div className="text-center">
          <span className="text-gray-600 text-sm">Not Registered yet? </span>
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            Join Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
