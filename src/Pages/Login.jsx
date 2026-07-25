import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../Api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Store/AuthSlice";
function Login() {
  const userType=useParams().userType; // Get the userType from the URL parameters
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    user_type: userType, // Set the userType in the form data
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/auth/login/", formdata)
      .then((response) => {
        // Handle successful login, e.g., store token, redirect, etc.
        dispatch(login({ user: response.data.data.user, token: response.data.data.access_token }));
        handleNavifateToUser(response.data.data.user); // Redirect based on user type
      });
      
    // Handle login logic here
  };

  const handleNavifateToUser = (user) => {
    if (user.user_type === "admin") {
      navigate("/dashboard");
    } else if (user.user_type === "customer") {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-rose-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-rose-600">Welcome Back</h1>

          <p className="text-rose-400 mt-3">Sign in to continue</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-rose-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-rose-200 bg-rose-50/50 text-gray-700 placeholder-rose-300 outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-rose-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-2xl border border-rose-200 bg-rose-50/50 text-gray-700 placeholder-rose-300 outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition"
            />
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-rose-600">
              <input type="checkbox" className="accent-rose-500" />
              Remember me
            </label>

            <a
              href="#"
              className="text-rose-500 hover:text-rose-600 font-medium"
            >
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-2xl shadow-lg shadow-rose-200 transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-rose-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-rose-600 hover:text-rose-700 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
