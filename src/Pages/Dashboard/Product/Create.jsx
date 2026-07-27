import { useNavigate } from "react-router-dom";
import api from "../../../Api";

export default function Create() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    api
      .post(
        "/dashboard/products",
        {
          name: e.target.name.value,
          price: e.target.price.value,
          description: e.target.description.value,
          image: e.target.image.files[0], // Assuming the image is uploaded as a file
          // Include the product data from the form fields
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((response) => {
        // Handle successful product creation, e.g., show a success message, redirect, etc.
        navigate("/dashboard/products"); // Redirect to dashboard page after product creation
      })
      .catch((error) => {
        // Handle error during product creation, e.g., show an error message
        console.error("Error creating product:", error);
      });
  };

  return (
    <>
      <form
        className="rounded-xl bg-white shadow-md  p-6 mt-2"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Create Product</h2>

        <div className="mb-4">
          <div className="flex items-center justify-center outline-1 outline-dotted h-52 w-52 rounded-md">
            <label
              htmlFor="image"
              className=" text-gray-700 font-semibold shadow-md shadow-rose-200 transition cursor-pointer"
            >
              Upload Image
            </label>
          </div>

          <input
            type="file"
            id="image"
            className="hidden w-full rounded-lg border px-4 py-2"
            placeholder="Enter image URL"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full rounded-lg border px-4 py-2"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              className="w-full rounded-lg border px-4 py-2"
              placeholder="Enter product price"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full rounded-lg border px-4 py-2"
            placeholder="Enter product description"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-xl font-semibold shadow-md shadow-rose-200 transition"
        >
          Create Product
        </button>
      </form>
    </>
  );
}
