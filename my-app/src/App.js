import { Routes, Route } from "react-router-dom";
import PageByTitle from "./components/pages/PageByTitle";
import HomePage from "./components/pages/HomePage";
import ContactPage from "./components/pages/ContactPage";

// import ServiceContainer from "./components/pages/Test";
// import Card from "./components/pages/Test";
// import ExpertiseSection from "./components/pages/Test2";
import BlogPage from "./components/pages/BlogPage";
// import BlogPage1 from "./components/pages/Test";
// import Test from "./components/pages/Test";
// import AboutPage from "./components/pages/AboutPage";
// import ButtonList from "./components/pages/Test";

const App = () => {
  return (
    <div className="overflow-x-hidden w-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:title" element={<PageByTitle />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </div>
  );
};

export default App;
