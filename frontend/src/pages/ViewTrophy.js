import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrophyService from "../services/TrophyService";

function ViewTrophy() {
  const [trophies, setTrophies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedImage, setSelectedImage] = useState(null); // For modal

  useEffect(() => {
    loadTrophies();
  }, []);

  const loadTrophies = async () => {
    try {
      const res = await TrophyService.getAllTrophies();
      setTrophies(res.data);
    } catch (err) {
      console.error("Error fetching trophies", err);
    }
  };

  const rows = trophies.flatMap((trophy) =>
    trophy.sizes.map((variant, index) => ({
      id: `${trophy.id}-${index}`,
      trophyCode: trophy.trophyCode,
      ...variant,
    }))
  );

  const filteredRows = rows.filter((row) => {
    const term = searchTerm.toLowerCase();
    return (
      row.trophyCode.toLowerCase().includes(term) ||
      String(row.size).toLowerCase().includes(term) ||
      String(row.price).toLowerCase().includes(term) ||
      String(row.quantity).toLowerCase().includes(term) ||
      (row.colour && row.colour.toLowerCase().includes(term)) ||
      (row.location && row.location.toLowerCase().includes(term)) ||
      (row.doe && row.doe.toLowerCase().includes(term)) ||
      (row.soldDate && row.soldDate.toLowerCase().includes(term)) ||
      (row.soldPrice && String(row.soldPrice).toLowerCase().includes(term))
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const userRole = localStorage.getItem("role");


  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="container mt-4">
      <h3 className="text-success mb-3">Trophy List</h3>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by code, size, price, colour, location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Code</th>
            <th>Size</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Colour</th>
            <th>Location</th>
            <th>Date</th>
            <th>Sold Date</th>
            <th>Sold Price</th>
            <th>Sale Price</th>
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
              <td>{row.soldDate ? row.soldDate.split("T")[0] : ""}</td>
              <td>₹{row.soldPrice}</td>
              <td>₹{row.salePrice}</td>
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
                  to={`/admin/dashboard/edit/${row.trophyCode}/${row.size}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>

                {/* Show delete button only if role = ADMIN */}
                {userRole === "ADMIN" && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      if (window.confirm(`Delete size ${row.size} for trophy ${row.trophyCode}?`)) {
                        TrophyService.deleteTrophy(row.trophyCode, row.size)
                          .then((res) => {
                            alert(res.data || "Deleted Successfully");
                            window.location.reload();
                          })
                          .catch((err) => {
                            console.error("Delete failed", err);
                            alert("Failed to delete");
                          });
                      }
                    }}
                  >
                    Delete
                  </button>
                )}
              </td>

            </tr>
          ))}
          {currentRows.length === 0 && (
            <tr>
              <td colSpan="11" className="text-center text-muted">
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
            <button className="page-link" onClick={() => setCurrentPage((p) => p - 1)}>
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i + 1}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage((p) => p + 1)}>
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

export default ViewTrophy;
