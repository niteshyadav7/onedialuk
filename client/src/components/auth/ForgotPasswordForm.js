

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordReset, clearError } from '../../store/slices/authSlice';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPasswordForm = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(requestPasswordReset({ email })).unwrap();
      setIsSuccess(true);
    } catch (error) {
      // Error handled in slice
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-auto text-center"
      >
        <div className="bg-green-50 p-8 rounded-2xl border border-green-200">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <Button onClick={onSwitchToLogin} variant="primary" className="w-full">
            Back to Sign In
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password</h2>
        <p className="text-gray-600">Enter your email to reset your password</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
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
          Send Reset Link
        </Button>

        <Button
          onClick={onSwitchToLogin}
          variant="ghost"
          className="w-full flex items-center justify-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Sign In
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
