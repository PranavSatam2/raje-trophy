import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewSoldTrophies = () => {
  const [summary, setSummary] = useState([]);
  const [filteredSummary, setFilteredSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [selectedTrophies, setSelectedTrophies] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const API_URL = "http://localhost:8080/sold-trophies/summary";

  // Fetch aggregated summary
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        const data = res.data || [];
        setSummary(data);
        setFilteredSummary(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching summary:", err);
        setError("Failed to load summary");
        setLoading(false);
      });
  }, []);

  // Filter by trophy code
  useEffect(() => {
    const filtered = (summary || []).filter((t) =>
      t.trophyCode?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSummary(filtered);
    setCurrentPage(1); // Reset pagination
  }, [search, summary]);

  const handleCheckboxChange = (trophyCode, isChecked) => {
    if (isChecked) {
      setSelectedTrophies([...selectedTrophies, trophyCode]);
    } else {
      setSelectedTrophies(selectedTrophies.filter((code) => code !== trophyCode));
    }
  };

  const handleExport = () => {
    let url = `http://localhost:8080/sold-trophies/export-summary`;
    if (fromDate && toDate) {
      url += `?fromDate=${fromDate}&toDate=${toDate}`;
    }

    axios
      .get(url, { responseType: "blob" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "sold_trophies_summary.xlsx");
        document.body.appendChild(link);
        link.click();
        // refresh the page to reset date filters
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error exporting Excel:", err);
        alert("Failed to export Excel");
      });
  };



  // Pagination
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = (filteredSummary || []).slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil((filteredSummary || []).length / rowsPerPage);

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Sold Trophies Summary</h2>

      <div className="d-flex mb-3">
        <input
          type="date"
          className="form-control w-25 me-2"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="date"
          className="form-control w-25 me-2"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleExport}>
          Export Summary
        </button>
      </div>


      <div className="mb-3 d-flex justify-content-between align-items-center">
        <input
          type="text"
          placeholder="Search by Trophy Code"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control w-25"
        />
        {/* <button className="btn btn-success" onClick={handleExport}>
          Export Selected
        </button> */}
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              {/* <th>Select</th> */}
              <th>#</th>
              <th>Trophy Code</th>
              <th>Total Quantity Sold</th>
              <th>Total Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index}>
                {/* <td>
                  <input
                    type="checkbox"
                    checked={selectedTrophies.includes(row.trophyCode)}
                    onChange={(e) =>
                      handleCheckboxChange(row.trophyCode, e.target.checked)
                    }
                  />
                </td> */}
                <td>{indexOfFirst + index + 1}</td>
                <td>{row.trophyCode}</td>
                <td>{row.totalQuantity}</td>
                <td>{row.totalPrice}</td>
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
