// src/pages/ViewDamageTrophy.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DamageTrophyService from "../services/DamageTrophyService";

function ViewDamageTrophy() {
  const [damageTrophies, setDamageTrophies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedImage, setSelectedImage] = useState(null); // For modal

  useEffect(() => {
    fetchDamageTrophies();
  }, []);

  const fetchDamageTrophies = async () => {
    try {
      const res = await DamageTrophyService.getAllDamageTrophies();
      console.log("Fetched damaged trophies:", res.data);
      setDamageTrophies(res.data);
    } catch (err) {
      console.error("Error fetching damaged trophies:", err);
    }
  };

  // flatten like ViewTrophy
  const rows = damageTrophies.flatMap((trophy) =>
  trophy.sizes?.map((variant, index) => ({
    id: `${trophy.id}-${index}`,
    trophyCode: trophy.trophyCode,
    ...variant,
  })) || []
);

  // filter
  const filteredRows = rows.filter((row) => {
    const term = searchTerm.toLowerCase();
    return (
      row.trophyCode?.toLowerCase().includes(term) ||
      String(row.size)?.toLowerCase().includes(term) ||
      String(row.price)?.toLowerCase().includes(term) ||
      String(row.quantity)?.toLowerCase().includes(term) ||
      (row.colour && row.colour.toLowerCase().includes(term)) ||
      (row.location && row.location.toLowerCase().includes(term)) ||
      (row.doe && row.doe.toLowerCase().includes(term)) ||
      (row.damageRemark && row.damageRemark.toLowerCase().includes(term))
    );
  });

  // pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="container mt-4">
      <h3 className="text-danger mb-3">Damaged Trophy List</h3>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by code, size, remark..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-danger">
          <tr>
            <th>Code</th>
            <th>Size</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Colour</th>
            <th>Location</th>
            <th>Date of Entry</th>
            <th>Damage Remark</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row) => (
            <tr key={row.id}>
              <td>{row.trophyCode}</td>
              <td>{row.size}"</td>
              <td>₹{row.price}</td>
              <td>{row.quantity}</td>
              <td>{row.colour}</td>
              <td>{row.location}</td>
              <td>{row.doe ? row.doe.split("T")[0] : ""}</td>
              <td>{row.damageRemark || "—"}</td>
              <td>
                {row.image ? (
                  <img
                    src={`data:image/jpeg;base64,${row.image}`}
                    alt="trophy"
                    width="50"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedImage(row.image)} // 👈 open modal
                  />
                ) : (
                  "N/A"
                )}
              </td>
              <td>
                <Link
                  to={`/admin/dashboard/editdamagetrophy/${row.trophyCode}/${row.size}`}
                >
                  <button className="btn btn-warning btn-sm">Edit</button>
                </Link>
              </td>
            </tr>
          ))}
          {currentRows.length === 0 && (
            <tr>
              <td colSpan="10" className="text-center text-muted">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i + 1}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* 📸 Image Preview Modal */}
      {selectedImage && (
        <div
          className="modal show fade"
          style={{ display: "block", background: "rgba(0,0,0,0.7)" }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-body text-center">
                <img
                  src={`data:image/jpeg;base64,${selectedImage}`}
                  alt="trophy large"
                  className="img-fluid"
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedImage(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewDamageTrophy;
