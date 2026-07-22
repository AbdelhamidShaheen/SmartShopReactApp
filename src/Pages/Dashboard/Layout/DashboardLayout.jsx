import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <nav className="bg-white shadow-sm border-b border-rose-100">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-3xl font-bold text-rose-600">SmartShop</h1>
           {/* Profile */}
          <div className="flex items-center gap-4"> 
            <span className="text-rose-600 font-semibold">Admin</span>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-xl font-semibold shadow-md shadow-rose-200 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
           
      <main className="flex gap-3 ">
        {/* sidebar */}
        <div className="bg-rose-50 w-64 min-h-screen p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Dashboard
          </h2>
          <ul className="space-y-2">
            <li>
           
              <Link
                to="/dashboard"
                className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-rose-100 hover:text-rose-600 transition"
              >
                Overview
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/products"
                className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-rose-100 hover:text-rose-600 transition"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/users"
                className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-rose-100 hover:text-rose-600 transition"
              >
                Users
              </Link>
            </li>
           
          </ul>
        </div>
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </>
  );
}
