import React from "react";
import ForgotPasswordForm from "../auth/ForgotPasswordForm";
import AuthContainers from "../auth/AuthContainers";

const ForgotPage = () => {
  return (
    <div className="min-h-screen flex">
      <AuthContainers />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPage;
