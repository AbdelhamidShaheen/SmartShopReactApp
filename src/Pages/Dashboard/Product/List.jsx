import { useEffect, useRef, useState } from "react";
import api from "../../../Api";
import { Link } from "react-router-dom";

export default function List() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const paginationData = useRef({});

  useEffect(() => {
    api.get(`dashboard/products?page=${currentPage}&per_page=8`).then((res) => {
      setProducts(res.data.data);
      setTotalPages(res.data.meta.last_page);
      paginationData.current = res.data.meta;
    });
  }, [currentPage]);

  const deleteProduct = (productId) => {
    api
      .delete(`/dashboard/products/${productId}`)
      .then((res) => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId),
        );
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div className="rounded-xl bg-white shadow">
      <div className="flex items-center justify-between border-b p-6">
        <div>
          <h2 className="text-2xl font-bold">Products</h2>
          <p className="text-gray-500">Manage your products</p>
        </div>

        <Link
          to="/dashboard/products/create"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          + Add Product
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 p-6">
        <input
          placeholder="Search..."
          className="rounded-lg border px-4 py-2"
        />

        <select className="rounded-lg border px-4 py-2">
          <option>All Categories</option>
        </select>

        <select className="rounded-lg border px-4 py-2">
          <option>All Status</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">
                <input type="checkbox" />
              </th>

              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <input type="checkbox" />
                </td>

                <td className="p-4">
                  <img
                    src={item.image}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                </td>

                <td className="p-4 font-medium">{item.name}</td>

                <td className="p-4">${item.price}</td>

                <td className="p-4 text-right space-x-2">
                  <button
                    className="rounded bg-red-100 px-3 py-1 text-red-600"
                    onClick={() => deleteProduct(item.id)}
                  >
                    Delete
                  </button>

                  <Link
                    to={`/dashboard/products/${item.id}/details`}
                    className="rounded bg-green-100 px-3 py-1 text-green-600"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t p-6">
        <p className="text-sm text-gray-500">
          Showing {paginationData.current.current_page}–
          {Math.min(
            paginationData.current.current_page *
              paginationData.current.per_page,
            paginationData.current.total,
          )}{" "}
          of {paginationData.current.total} products
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="rounded border px-3 py-2"
          >
            Previous
          </button>

          {/* Pages */}
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded ${
                  currentPage === page
                    ? "bg-blue-600 px-3 py-2 text-white"
                    : "bg-white text-ellipsis border px-3 py-2"
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="rounded border px-3 py-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
