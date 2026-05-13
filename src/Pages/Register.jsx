function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-rose-100 p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-rose-600">
            Create Account
          </h1>

          <p className="text-rose-400 mt-3">
            Register to get started
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-rose-700 mb-2">
              Full Name
            </label>

            <input
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
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-2xl border border-rose-200 bg-rose-50/50 text-gray-700 placeholder-rose-300 outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition"
            />
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 text-sm text-rose-600">
            <input
              type="checkbox"
              className="mt-1 accent-rose-500"
            />

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
