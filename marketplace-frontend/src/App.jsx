import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import Cart from './pages/Cart';
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id"
        element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;