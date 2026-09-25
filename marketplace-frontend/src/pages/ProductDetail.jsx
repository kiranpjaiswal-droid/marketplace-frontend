import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import axios from "axios";

const API_URL = "http://localhost:5002";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false); // naya
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        title: product.title,
        price: product.price,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500); // 1.5 second baad wapas normal
  };

  if (!product) {
    return <div className="max-w-3xl mx-auto px-6 py-10 text-ink/50">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs uppercase tracking-wide text-ink/50 mb-3">
        {product.seller?.storeName}
      </div>

      <h1 className="font-display text-4xl font-medium mb-4">{product.title}</h1>

      <p className="text-ink/70 text-base leading-relaxed mb-6 max-w-lg">
        {product.description}
      </p>

      <div className="font-display text-4xl font-semibold text-teal mb-8">
        ${product.price}
      </div>

      <button
        onClick={handleAddToCart}
        className={`px-8 py-3 rounded-full font-medium transition-colors ${
          added
            ? "bg-teal text-cream"
            : "bg-amber text-ink hover:bg-amber/90"
        }`}
      >
        {added ? "Added Successfully" : "Add to cart"}
      </button>
    </div>
  );
}

export default ProductDetail;