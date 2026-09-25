import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5002";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="font-display text-4xl font-medium mb-8">
        Everything you need, from sellers you trust
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="block bg-white border border-sage rounded-2xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="text-xs uppercase tracking-wide text-ink/50 mb-2">
              {product.seller?.storeName}
            </div>
            <h2 className="font-display text-xl font-medium mb-2">
              {product.title}
            </h2>
            <p className="text-ink/60 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="font-display text-2xl font-semibold text-teal">
              ${product.price}
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-ink/50 mt-10">No products available yet.</p>
      )}
    </div>
  );
}

export default Home;