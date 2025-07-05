
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🏆 TrophyZone</Link>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
