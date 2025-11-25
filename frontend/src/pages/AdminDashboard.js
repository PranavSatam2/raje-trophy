import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

function AdminDashboard() {

  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    // When login/logout updates localStorage, update state
    const updateRole = () => setRole(localStorage.getItem("role"));

    window.addEventListener("storage", updateRole);

    return () => {
      window.removeEventListener("storage", updateRole);
    };
  }, []);

  useEffect(() => {
    // When user logs in/out in same tab, manually update
    const interval = setInterval(() => {
      const newRole = localStorage.getItem("role");
      if (newRole !== role) {
        setRole(newRole);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [role]);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "250px", height: "120vh" }}>
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
          {/* <li className="nav-item">
            <Link to="view-sold-trophies" className="nav-link text-white">View Sale Trophy</Link>
          </li> */}
          <li className="nav-item">
            <Link to="view-all-sold-trophies" className="nav-link text-white">View All Sale Trophy</Link>
          </li>
          <li className="nav-item">
            <Link to="add-payment" className="nav-link text-white">Add Payment</Link>
          </li>
          {/* <li className="nav-item">
            <Link to="view-payments" className="nav-link text-white">View Payment Info</Link>
          </li> */}
          {role === "ADMIN" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="images-add">
                  Add Images
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="images-view">
                  View Images
                </Link>
              </li>
            </>
          )}
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
