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
        <li><Link to="/">Home</Link></li>

        {/* Updated — takes user to the new Product Gallery page */}
        <li><Link to="product-gallery">Products</Link></li>

        {/* Contact stays inside home page for now */}
        <li><a href="#contact">Contact</a></li>

        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
