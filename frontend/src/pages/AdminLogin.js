import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../services/LoginService"; // Adjust path if needed
import "./AdminLogin.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await LoginService.login(username, password);

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);

      navigate("/admin/dashboard");
    } catch (error) {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="admin-login-page d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4 text-primary">Admin Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="admin@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
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

          <button type="submit" className="btn btn-primary w-100">Login</button>

          <div className="text-center mt-3">
            <small className="text-muted">Only authorized personnel allowed</small>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
