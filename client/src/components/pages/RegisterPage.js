import React from "react";
import RegisterForm from "../auth/RegisterForm";
import AuthContainers from "../auth/AuthContainers";
// import AuthContainer from "../auth/AuthContainer";

const Register = () => {
  return (
    <div>
      <div className="min-h-screen flex">
        <AuthContainers />
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
