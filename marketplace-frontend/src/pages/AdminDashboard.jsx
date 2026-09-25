import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5002";

function AdminDashboard() {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchPendingProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products/admin/pending`, authHeader);
      setPendingProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/orders/admin/analytics`, authHeader);
      setAnalytics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPendingProducts();
    fetchAnalytics();
  }, []);

  const handleApprove = async (productId) => {
    try {
      await axios.patch(`${API_URL}/api/products/${productId}/approve`, {}, authHeader);
      setMessage("Product approved");
      fetchPendingProducts();
    } catch (err) {
      console.error(err);
      setMessage("Failed to approve");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl font-medium mb-8">Admin dashboard</h1>

      {message && (
        <p className="text-sm text-teal bg-sage/40 rounded-lg px-4 py-2 mb-6">{message}</p>
      )}

      {analytics && (
        <div className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-sage rounded-2xl p-5">
              <div className="text-xs uppercase tracking-wide text-ink/40 mb-1">Revenue</div>
              <div className="font-display text-2xl font-semibold text-teal">
                ${analytics.totalRevenue}
              </div>
            </div>
            <div className="bg-white border border-sage rounded-2xl p-5">
              <div className="text-xs uppercase tracking-wide text-ink/40 mb-1">Orders</div>
              <div className="font-display text-2xl font-semibold">{analytics.totalOrders}</div>
            </div>
            <div className="bg-white border border-sage rounded-2xl p-5">
              <div className="text-xs uppercase tracking-wide text-ink/40 mb-1">Products</div>
              <div className="font-display text-2xl font-semibold">{analytics.totalProducts}</div>
            </div>
            <div className="bg-white border border-sage rounded-2xl p-5">
              <div className="text-xs uppercase tracking-wide text-ink/40 mb-1">Sellers</div>
              <div className="font-display text-2xl font-semibold">{analytics.totalSellers}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-display text-lg font-medium mb-3">Orders by status</h3>
              <div className="space-y-2">
                {analytics.ordersByStatus.map((row) => (
                  <div key={row.status} className="flex justify-between text-sm border-b border-sage pb-2">
                    <span className="text-ink/60">{row.status}</span>
                    <span className="font-medium">{row.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-medium mb-3">Top products</h3>
              <div className="space-y-2">
                {analytics.topProducts.map((p, index) => (
                  <div key={index} className="flex justify-between text-sm border-b border-sage pb-2">
                    <span className="text-ink/60">{p.title}</span>
                    <span className="font-medium">{p.quantitySold} sold</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <h2 className="font-display text-xl font-medium mb-4">Pending approvals</h2>

      {pendingProducts.length === 0 ? (
        <p className="text-ink/50">No products waiting for approval</p>
      ) : (
        <div className="space-y-3">
          {pendingProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between bg-white border border-sage rounded-xl px-5 py-4"
            >
              <div>
                <div className="font-medium">{product.title}</div>
                <div className="text-sm text-ink/50">
                  ${product.price} &middot; {product.seller.storeName}
                </div>
              </div>
              <button
                onClick={() => handleApprove(product.id)}
                className="px-4 py-2 rounded-full bg-teal text-cream text-sm font-medium hover:bg-teal-dark transition-colors"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;