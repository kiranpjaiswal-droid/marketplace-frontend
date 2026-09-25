import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-sage bg-cream">
      <Link to="/" className="font-display text-2xl font-medium text-teal">
        Marketplace
      </Link>

      <div className="flex items-center gap-6 text-sm">
        <Link to="/cart" className="text-ink hover:text-teal transition-colors">
          Cart
        </Link>

        {isAuthenticated ? (
          <>
            <span className="text-ink/70">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full border border-teal text-teal hover:bg-teal hover:text-cream transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-ink hover:text-teal transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-full bg-amber text-ink font-medium hover:bg-amber/90 transition-colors"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;