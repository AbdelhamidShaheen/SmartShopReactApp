import { useEffect, useRef, useState } from "react";
import api from "../Api";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../Store/AuthSlice";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const is_authenticated = useSelector((state) => state.auth.is_authenticated); // Replace with actual authentication logic
  const user = useSelector((state) => state.auth.user); // Replace with actual authentication logic
  const dispatch = useDispatch();
  const totalPages = useRef(5); // Assuming there are 5 pages of products
  const renderCount = useRef(0); // Assuming there are 5 pages of products
  renderCount.current = renderCount.current + 1;

  // Fetch Products
  useEffect(() => {
    setLoading(true);

    api
      .get(`/products?page=${currentPage}&per_page=8`)
      .then((res) => {
        setProducts(res.data.data);
        totalPages.current = res.data.meta.last_page;
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  const logout = function () {
    api
      .post("/auth/logout/")
      .then((response) => {
        // Handle successful logout, e.g., clear token, redirect, etc.
        dispatch(logoutAction()); 
      })
      .catch((error) => {
        // Handle logout error, e.g., show error message
        console.error("Logout failed: " + error);
      });
  };

  return (
    <div className="min-h-screen bg-rose-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-3xl font-bold text-rose-600">SmartShop</h1>

          {/* Links */}
          {/* <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <a href="#" className="hover:text-rose-500 transition">
              Home
            </a>

            <a href="#" className="text-rose-500 font-semibold">
              Products
            </a>

            <a href="#" className="hover:text-rose-500 transition">
              Contact
            </a>
          </div> */}

          {/* Login */}
          {is_authenticated ? (
            <>
            
              <span className="text-rose-600 font-semibold">
                Welcome, {user.name}!
              </span>
              <button
                onClick={logout}
                className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-xl font-semibold shadow-md shadow-rose-200 transition"
              >
                Logout
              </button>{" "}
            </>
          ) : (
            <Link
              to="/login"
              className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-xl font-semibold shadow-md shadow-rose-200 transition"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-gray-800">Our Products</h2>

          <p className="text-gray-500 mt-2">Discover our elegant collection</p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-rose-500 text-xl font-semibold">
              Loading products...
            </p>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg border border-rose-100 hover:shadow-2xl transition duration-300"
                >
                  {/* Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-60 w-full object-contain p-5 bg-white"
                  />

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-rose-500 font-bold mt-3 text-xl">
                      ${product.price}
                    </p>

                    <button className="mt-5 w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-2xl font-medium transition">
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-12">
              {/* Prev */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 rounded-xl border border-rose-200 bg-white text-rose-500 hover:bg-rose-100 transition"
              >
                Prev
              </button>

              {/* Pages */}
              {[...Array(totalPages.current)].map((_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-11 h-11 rounded-xl font-semibold transition ${
                      currentPage === page
                        ? "bg-rose-500 text-white shadow-lg shadow-rose-200"
                        : "bg-white text-rose-500 border border-rose-200 hover:bg-rose-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next */}
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages.current),
                  )
                }
                className="px-4 py-2 rounded-xl border border-rose-200 bg-white text-rose-500 hover:bg-rose-100 transition"
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
