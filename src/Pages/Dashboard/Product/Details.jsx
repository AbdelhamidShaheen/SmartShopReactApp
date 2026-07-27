import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../Api";

export default function Details() {

  const { productId } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details using the productId
    api.get(`/dashboard/products/${productId}`)
      .then((res) => {
        setProduct(res.data.data); // Assuming the API returns the product details in res.data
        // Handle the response and set state as needed
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, []);

  return (
    <>
      <div className="rounded-xl bg-white shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        {product ? (
          <div>
            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-4 rounded-lg" />
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            {/* Add more product details as needed */}
          </div>
        ) : ( 
          <p>Loading product details...</p>
        )}
      </div>
    </>
  );
}
