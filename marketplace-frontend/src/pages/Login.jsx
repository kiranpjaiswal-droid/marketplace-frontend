import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "http://localhost:5002";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(login({ user, token }));
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <h1 className="font-display text-3xl font-medium mb-8">Welcome back</h1>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border border-sage bg-white focus:outline-none focus:ring-2 focus:ring-teal"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg border border-sage bg-white focus:outline-none focus:ring-2 focus:ring-teal"
        />

        <button
          type="submit"
          className="w-full px-4 py-3 rounded-full bg-teal text-cream font-medium hover:bg-teal-dark transition-colors"
        >
          Log in
        </button>
      </form>

      <p className="text-sm text-ink/50 mt-6">
        New here?{" "}
        <Link to="/register" className="text-teal font-medium">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default Login;