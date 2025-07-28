import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { loginSchema } from "../utils/validation";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { LoginRoleSelector } from "../components/auth/LoginRoleSelector";

export const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      role: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/dashboard");
    } catch (error) {
      // Error is handled by context and displayed via toast
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setValue("role", role);
  };

  return (
    <div className="min-h-screen flex justify-center">
      {/* Left Side - Hero Section */}
      {/* <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full opacity-20"
            style={{ filter: "blur(40px)" }}
          />
          <div
            className="absolute top-40 right-32 w-24 h-24 bg-blue-400 rounded-full opacity-30"
            style={{ filter: "blur(30px)" }}
          />
          <div
            className="absolute bottom-32 left-32 w-28 h-28 bg-blue-300 rounded-full opacity-25"
            style={{ filter: "blur(35px)" }}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              <span className="text-orange-400">Sign Up</span> to Get The Best
              <br />
              Deals, <span className="text-orange-400">Exclusive</span> Offers
              with
              <br />
              <span className="text-white">One Dial UK</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-12"
          >
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-8 max-w-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-12 bg-gray-800 rounded-lg"></div>
                <div className="w-12 h-12 bg-orange-400 rounded-lg"></div>
                <div className="w-12 h-12 bg-blue-400 rounded-full"></div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div className="mt-6 w-16 h-16 bg-pink-400 rounded-full mx-auto"></div>
            </div>
          </motion.div>
        </div>
      </div> */}

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <LoginRoleSelector
              selectedRole={selectedRole}
              onRoleSelect={handleRoleSelect}
              error={errors.role?.message}
            />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">
              Sign in to get the best deals, exclusive offers with{" "}
              <span className="text-orange-500 font-semibold">
                One Dial USA
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              {...register("email")}
              type="email"
              label="Email"
              placeholder="Enter Email"
              icon={<Mail size={20} />}
              error={errors.email?.message}
            />

            <Input
              {...register("password")}
              type="password"
              label="Password"
              placeholder="Enter Password"
              error={errors.password?.message}
            />

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={!selectedRole}
            >
              Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Forget password
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Not Registered yet?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Join Now
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
