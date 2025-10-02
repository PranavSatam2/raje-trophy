import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAllSoldTrophies = () => {
  const [soldTrophies, setSoldTrophies] = useState([]);
  const [filteredTrophies, setFilteredTrophies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const API_URL = "http://localhost:8080/sold-trophies";

  // Fetch all sold trophies
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        const data = res.data || [];
        setSoldTrophies(data);
        setFilteredTrophies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sold trophies:", err);
        setError("Failed to load sold trophies");
        setLoading(false);
      });
  }, []);

  // Filter by trophy code
  useEffect(() => {
    const filtered = (soldTrophies || []).filter((t) =>
      t.trophyCode?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTrophies(filtered);
    setCurrentPage(1); // Reset to first page
  }, [search, soldTrophies]);


  const handleExport = () => {
    // if (selectedTrophies.length === 0) {
    //   alert("Please select at least one record to export.");
    //   return;
    // }

    axios
      .post(
        "http://localhost:8080/api/trophies/export-sold-trophies",
        {},
        { responseType: "blob" }
      )
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "All_sold_trophies.xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.error("Error exporting Excel:", err);
        alert("Failed to export Excel");
      });
  };

  // Pagination
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = (filteredTrophies || []).slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil((filteredTrophies || []).length / rowsPerPage);

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Sold Trophies</h2>

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <input
          type="text"
          placeholder="Search by Trophy Code"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control w-25"
        />
        <button className="btn btn-success" onClick={handleExport}>
          Export Trophies
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Trophy Code</th>
              <th>Size</th>
              <th>Quantity Sold</th>
              <th>Sold Price (₹)</th>
              <th>Total Sold Amount (₹)</th>
              <th>Sold Date</th>
              <th>Location</th>
              <th>Colour</th>
            </tr>
          </thead>
          <tbody>
            {(currentRows || []).map((sold, index) => (
              <tr key={index}>
                <td>{indexOfFirst + index + 1}</td>
                <td>{sold.trophyCode}</td>
                <td>{sold.size}</td>
                <td>{sold.soldQuantity}</td>
                <td>{sold.soldPrice}</td>
                <td>{sold.soldCurrentQuantityPrice || sold.soldPrice * sold.soldQuantity}</td>
                <td>{sold.soldDate ? new Date(sold.soldDate).toLocaleDateString() : ""}</td>
                <td>{sold.location}</td>
                <td>{sold.colour}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ViewAllSoldTrophies;
