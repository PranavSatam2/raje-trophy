import React from "react";
import { Link, Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "250px", height: "100vh" }}>
        <h5 className="mb-4">🏆 Admin Panel</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="add-trophy" className="nav-link text-white">Add Trophy</Link>
          </li>
          <li className="nav-item">
            <Link to="view-trophy" className="nav-link text-white">View Trophy</Link>
          </li>
          <li className="nav-item">
            <Link to="damage-trophy" className="nav-link text-white">Damage Trophy</Link>
          </li>
          <li className="nav-item">
            <Link to="view-damage-trophy" className="nav-link text-white">View Damaged Trophy</Link>
          </li>
          <li className="nav-item">
            <Link to="view-sold-trophies" className="nav-link text-white">View Sale Trophy</Link>
          </li>
          <li className="nav-item">
            <Link to="view-all-sold-trophies" className="nav-link text-white">View All Sale Trophy</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {/* This is where nested route content like EditTrophy will render */}
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
