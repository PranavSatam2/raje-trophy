import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import AddTrophy from "./AddTrophy";
import ViewTrophy from "./ViewTrophy";
import EditTrophy from "./EditTrophy";
import DeleteTrophy from "./DeleteTrophy";

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
            <Link to="edit-trophy" className="nav-link text-white">Edit Trophy</Link>
          </li>
          <li className="nav-item">
            <Link to="delete-trophy" className="nav-link text-white">Delete Trophy</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <Routes>
          <Route path="add-trophy" element={<AddTrophy />} />
          <Route path="view-trophy" element={<ViewTrophy />} />
          <Route path="edit-trophy" element={<EditTrophy />} />
          <Route path="delete-trophy" element={<DeleteTrophy />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
