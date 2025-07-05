import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"; // Optional
import "./AdminLogin.css"; // Optional

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy login check (replace with API later)
    if (email === "admin@gmail.com" && password === "admin@123") {
      navigate("/admin/dashboard"); // Redirect to TrophyPage
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="admin-login-page d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4 text-primary">Admin Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          <div className="text-center mt-3">
            <small className="text-muted">Only authorized personnel allowed</small>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
