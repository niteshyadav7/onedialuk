import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { Mail, User, Phone } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { registerSchema } from "../utils/validation";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { CountrySelector } from "../components/ui/CountrySelector";
import { RoleSelector } from "../components/auth/RoleSelector";

export const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      countryCode: "+1",
      role: "",
    },
  });

  const countryCode = watch("countryCode");

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate("/login");
    } catch (error) {
      // Error is handled by context and displayed via toast
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setValue("role", role);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
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
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <RoleSelector
              selectedRole={selectedRole}
              onRoleSelect={handleRoleSelect}
              error={errors.role?.message}
            />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
            <p className="text-gray-600">
              Create your account for free & join millions of businesses
              <br />
              engaged in bulk buying and selling on America's trusted B2B
              platform.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              {...register("fullName")}
              label="Full Name"
              placeholder="Full Name"
              icon={<User size={20} />}
              error={errors.fullName?.message}
            />

            <Input
              {...register("email")}
              type="email"
              label="Email Address"
              placeholder="Email Address"
              icon={<Mail size={20} />}
              error={errors.email?.message}
            />

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <CountrySelector
                  value={countryCode}
                  onChange={(code) => setValue("countryCode", code)}
                  error={errors.countryCode?.message}
                />
              </div>
              <div className="col-span-2">
                <Input
                  {...register("phone")}
                  type="tel"
                  label="Phone Number"
                  placeholder="Phone Number"
                  icon={<Phone size={20} />}
                  error={errors.phone?.message}
                />
              </div>
            </div>

            <Input
              {...register("password")}
              type="password"
              label="Password"
              placeholder="Password"
              error={errors.password?.message}
            />

            <Input
              {...register("confirmPassword")}
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              error={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={!selectedRole}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
