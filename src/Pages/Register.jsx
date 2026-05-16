import { useState } from "react";
import api from "../Api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Store/AuthSlice";

function Register() {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("/auth/register/", formdata).then((response) => {
      // Handle successful registration, e.g., show success message, redirect, etc.
      dispatch(
        login({
          user: response.data.data.user,
          token: response.data.data.access_token,
        }),
      );
      navigate("/"); // Redirect to dashboard or home page after login
    });

    // Handle registration logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-rose-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-rose-600">Create Account</h1>

          <p className="text-rose-400 mt-3">Register to get started</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-rose-700 mb-2">
              Full Name
            </label>

            <input
              name="name"
              value={formdata.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-2xl border border-rose-200 bg-rose-50/50 text-gray-700 placeholder-rose-300 outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-rose-700 mb-2">
              Email
            </label>

            <input
              name="email"
              value={formdata.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-2xl border border-rose-200 bg-rose-50/50 text-gray-700 placeholder-rose-300 outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-rose-700 mb-2">
              Password
            </label>

            <input
              name="password"
              value={formdata.password}
              onChange={handleChange}
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 rounded-2xl border border-rose-200 bg-rose-50/50 text-gray-700 placeholder-rose-300 outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-rose-700 mb-2">
              Confirm Password
            </label>

            <input
              name="password_confirmation"
              value={formdata.password_confirmation}
              onChange={handleChange}
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-2xl border border-rose-200 bg-rose-50/50 text-gray-700 placeholder-rose-300 outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition"
            />
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 text-sm text-rose-600">
            <input type="checkbox" className="mt-1 accent-rose-500" />

            <span>
              I agree to the{" "}
              <a
                href="#"
                className="font-semibold text-rose-700 hover:text-rose-800"
              >
                Terms & Conditions
              </a>
            </span>
          </label>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-2xl shadow-lg shadow-rose-200 transition duration-300"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-rose-400 mt-6">
          Already have an account?{" "}
          <a
            href="#"
            className="text-rose-600 hover:text-rose-700 font-semibold"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
