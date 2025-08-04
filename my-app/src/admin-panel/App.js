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

function App() {
  const handleBlogSave = (blogData) => {
    // In a real app, this would save to a database
    console.log("Saving blog:", blogData);
  };

  const handleBlogDelete = (id) => {
    // In a real app, this would delete from a database
    console.log("Deleting blog:", id);
  };

  return (
    <Router>
      <div className="App">
        {/* <h1>Hello</h1> */}
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="posts" element={<Posts />} />
            <Route
              path="blogs"
              element={<BlogList onDelete={handleBlogDelete} />}
            />
            <Route
              path="blogs/new"
              element={<BlogForm onSave={handleBlogSave} />}
            />
            <Route
              path="blogs/edit/:id"
              element={<BlogForm onSave={handleBlogSave} />}
            />
            <Route path="pages" element={<Pages />} />
            <Route path="ads" element={<Ads />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
