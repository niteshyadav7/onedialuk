import React from "react";
import AuthContainers from "../auth/AuthContainers";
import LoginForm from "../auth/LoginForm";
// import LoginForm from "../auth/LoginForm";
// import AuthContainer from "../auth/AuthContainer";

const LoginPage = () => {
  return (
    <>
      <div className="min-h-screen flex">
        <AuthContainers />
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
