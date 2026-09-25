import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, decreaseQuantity } from "../features/cart/cartSlice";
import axios from "axios";

const API_URL = "http://localhost:5002";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");

      const orderItems = items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      const response = await axios.post(
        `${API_URL}/api/orders`,
        { items: orderItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const orderId = response.data.id;

      const paymentResponse = await axios.post(
        `${API_URL}/api/payments/checkout-session`,
        { orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      window.location.href = paymentResponse.data.checkoutUrl;
    } catch (err) {
      console.error(err);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="font-display text-2xl text-ink/60 mb-2">Your cart is empty</p>
        <p className="text-ink/40 text-sm">Add something you like from the shop.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl font-medium mb-8">Your cart</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between bg-white border border-sage rounded-2xl p-5"
          >
            <div>
              <h2 className="font-display text-lg font-medium mb-1">{item.title}</h2>
              <div className="text-ink/50 text-sm">
                ${item.price} &times; {item.quantity}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => dispatch(decreaseQuantity(item.productId))}
                className="w-8 h-8 rounded-full border border-sage text-ink hover:border-teal hover:text-teal transition-colors"
              >
                &minus;
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => dispatch(removeFromCart(item.productId))}
                className="text-xs text-ink/40 hover:text-red-500 transition-colors ml-3"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-sage pt-6">
        <div className="font-display text-2xl font-semibold text-teal">
          Total: ${total.toFixed(2)}
        </div>
        <button
          onClick={handleCheckout}
          className="px-8 py-3 rounded-full bg-teal text-cream font-medium hover:bg-teal-dark transition-colors"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;