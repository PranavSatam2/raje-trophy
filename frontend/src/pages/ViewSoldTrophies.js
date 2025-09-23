import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewSoldTrophies = () => {
  const [soldTrophies, setSoldTrophies] = useState([]);
  const [filteredTrophies, setFilteredTrophies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [selectedTrophies, setSelectedTrophies] = useState([]);

  const API_URL = "http://localhost:8080/sold-trophies";

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

  // Search filter
  useEffect(() => {
    const filtered = (soldTrophies || []).filter((t) =>
      t.trophyCode?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTrophies(filtered);
    setCurrentPage(1); // Reset to first page
  }, [search, soldTrophies]);

  const handleCheckboxChange = (trophy, isChecked) => {
    if (isChecked) {
      setSelectedTrophies([...selectedTrophies, trophy]);
    } else {
      setSelectedTrophies(selectedTrophies.filter((t) => t !== trophy));
    }
  };

  const handleExport = () => {
    // if (selectedTrophies.length === 0) {
    //   alert("Please select at least one record to export.");
    //   return;
    // }

    axios
      .post(
        "http://localhost:8080/api/trophies/export-sold-trophies",
        selectedTrophies,
        { responseType: "blob" }
      )
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "sold_trophies.xlsx");
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
      <h2 className="mb-4">Sold Trophies</h2>

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <input
          type="text"
          placeholder="Search by Trophy Code"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control w-25"
        />
        <button className="btn btn-success" onClick={handleExport}>
          Export Selected
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              {/* <th>Select</th> */}
              <th>#</th>
              <th>Trophy Code</th>
              <th>Size</th>
              <th>Quantity Sold</th>
              <th>Sold Price (₹)</th>
              <th>Total Sold Amount (₹)</th>
              <th>Sold Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {(currentRows || []).map((sold, index) => (
              <tr key={index}>
                {/* <td>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckboxChange(sold, e.target.checked)
                    }
                  />
                </td> */}
                <td>{indexOfFirst + index + 1}</td>
                <td>{sold.trophyCode}</td>
                <td>{sold.size}</td>
                <td>{sold.soldQuantity || sold.quantitySold}</td>
                <td>{sold.soldPrice}</td>
                <td>
                  {sold.soldCurrentQuantityPrice
                    ? sold.soldCurrentQuantityPrice
                    : sold.totalAmount}
                </td>
                <td>
                  {sold.soldDate
                    ? new Date(sold.soldDate).toLocaleDateString()
                    : ""}
                </td>
                <td>{sold.location}</td>
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

export default ViewSoldTrophies;
