import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5002";

function SellerDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState("");
  const [myProducts, setMyProducts] = useState([]);

  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products/seller/mine`, authHeader);
      setMyProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const payload = {
        title,
        description,
        price: Number(price),
        stock: Number(stock),
      };

      await axios.post(`${API_URL}/api/products`, payload, authHeader);

      setMessage("Product added successfully");
      setTitle("");
      setDescription("");
      setPrice("");
      setStock("");
      fetchMyProducts();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl font-medium mb-8">Seller dashboard</h1>

      <div className="bg-white border border-sage rounded-2xl p-6 mb-10">
        <h2 className="font-display text-xl font-medium mb-4">Add a product</h2>

        {message && (
          <p className="text-sm text-teal bg-sage/40 rounded-lg px-4 py-2 mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product title"
            className="px-4 py-3 rounded-lg border border-sage focus:outline-none focus:ring-2 focus:ring-teal sm:col-span-2"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (min 10 characters)"
            rows={3}
            className="px-4 py-3 rounded-lg border border-sage focus:outline-none focus:ring-2 focus:ring-teal sm:col-span-2"
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="px-4 py-3 rounded-lg border border-sage focus:outline-none focus:ring-2 focus:ring-teal"
          />

          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock quantity"
            className="px-4 py-3 rounded-lg border border-sage focus:outline-none focus:ring-2 focus:ring-teal"
          />

          <button
            type="submit"
            className="sm:col-span-2 px-6 py-3 rounded-full bg-amber text-ink font-medium hover:bg-amber/90 transition-colors"
          >
            Add product
          </button>
        </form>
      </div>

      <h2 className="font-display text-xl font-medium mb-4">Your listings</h2>

      <div className="space-y-3">
        {myProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between bg-white border border-sage rounded-xl px-5 py-4"
          >
            <div>
              <div className="font-medium">{product.title}</div>
              <div className="text-sm text-ink/50">
                ${product.price} &middot; Stock: {product.stock}
              </div>
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                product.isApproved
                  ? "bg-teal/10 text-teal"
                  : "bg-amber/20 text-amber-700"
              }`}
            >
              {product.isApproved ? "Approved" : "Pending approval"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerDashboard;