import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import BlogList from "./components/blogs/BlogList";
import BlogForm from "./components/blogs/BlogForm";
import Pages from "./pages/Pages";
import Ads from "./pages/Ads";
import Settings from "./pages/Settings";
import LoginPage from "../login/LoginPage";
// import PrivateRoute from "./components/PrivateRoute";
import Categories from "./pages/Categories";
import CategoryForm from "./components/categories/CategoryForm";
import PrivateRoute from "./components/PrivateRoute.js";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="posts" element={<Posts />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/new" element={<CategoryForm />} />
            <Route path="categories/edit/:id" element={<CategoryForm />} />
            <Route path="blogs" element={<BlogList />} />
            <Route path="blogs/create" element={<BlogForm />} />
            <Route path="blogs/edit/:id" element={<BlogForm />} />
            <Route path="pages" element={<Pages />} />
            <Route path="ads" element={<Ads />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
