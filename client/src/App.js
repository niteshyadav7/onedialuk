import React from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
import AuthContainer from "./components/auth/AuthContainer";
import Dashboard from "./components/Dashboard";

const AppContent = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? <Dashboard /> : <AuthContainer />;
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
