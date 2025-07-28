import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/pages/NavbarPage";
import LoginPage from "./components/pages/LoginPage";
import Register from "./components/pages/RegisterPage";
import Home from "./components/pages/Home";
import ForgotPage from "./components/pages/ForgotPage";
import CheckerPage from "./components/pages/CheckerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPage />,
      },
      {
        path: "/check",
        element: <CheckerPage />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
