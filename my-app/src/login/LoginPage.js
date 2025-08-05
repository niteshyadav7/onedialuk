import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const pics = "https://www.pressreleasepower.com/assets/images/logo.png";

const LoginPage = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password, rememberMe };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );
      toast.success("Login successful!");
      console.log(response);

      localStorage.setItem("token", response.data.token); // Save token
      navigate("/"); // Redirect to dashboard
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#05164d] to-[#2798df] text-white flex justify-center items-center flex-col">
      <div className="text-[35px] text-center mb-[25px] font-light">
        <img src={pics} alt="Logo" className="h-16 mx-auto" />
      </div>

      <div className="bg-white w-[90%] max-w-[400px] shadow-xl p-6">
        <h3 className="text-gray-700 text-center text-sm mb-6 font-semibold">
          Sign in Required to Access Dashboard
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            <Mail className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>

          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            <Lock className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>

          <div className="relative mb-4 w-full h-[80px] text-gray-500 flex justify-center items-center border border-dashed rounded border-gray-300 text-sm">
            Captcha (Coming soon)
          </div>

          <div className="flex justify-between items-center mb-4 text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
            <Link className="text-[#3c8dbc] hover:text-green-600">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <LogIn className="h-5 w-5" />
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
