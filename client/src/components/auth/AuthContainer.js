import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

const AuthContainer = () => {
  const [authMode, setAuthMode] = useState("register"); // 'login' | 'register' | 'forgot-password'
  const [userType, setUserType] = useState("user"); // 'user' | 'vendor'

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-20 h-20 bg-white rounded-full"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              <span className="text-orange-400">Sign Up</span> to Get The Best
              <br />
              Deals, <span className="text-red-400">Exclusive</span> Offers with
              <br />
              One Dial USA
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12"
          >
            <div className="relative">
              <div className="w-64 h-32 bg-white rounded-lg shadow-lg relative">
                <div className="absolute top-4 left-4 w-12 h-8 bg-gray-800 rounded"></div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-16 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-pink-400 rounded-t-full"></div>
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-yellow-400 rounded-full mb-2"></div>
                <div className="w-16 h-20 bg-orange-400 rounded-lg"></div>
              </div>
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-8 -right-8 w-8 h-8 bg-yellow-400 rounded-full"
              ></motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -top-4 -left-12 w-6 h-6 bg-green-400 rounded-full"
              ></motion.div>
              <motion.div
                animate={{ y: [-3, 7, -3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-8 -right-16 w-10 h-10 bg-purple-400 rounded-full"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {authMode === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <LoginForm
                  onSwitchToRegister={() => setAuthMode("register")}
                  onSwitchToForgotPassword={() =>
                    setAuthMode("forgot-password")
                  }
                  userType={userType}
                  onUserTypeChange={setUserType}
                />
              </motion.div>
            )}
            {authMode === "register" && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RegisterForm
                  onSwitchToLogin={() => setAuthMode("login")}
                  userType={userType}
                />
              </motion.div>
            )}
            {authMode === "forgot-password" && (
              <motion.div
                key="forgot-password"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ForgotPasswordForm
                  onSwitchToLogin={() => setAuthMode("login")}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
