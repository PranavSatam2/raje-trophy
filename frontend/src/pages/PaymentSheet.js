import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./PaymentSheet.css";

function PaymentSheet() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [savingIndex, setSavingIndex] = useState(null);
  const rowsPerPage = 10;

  const saveTimers = useRef({}); // to track debounce timers
  const API_URL = "http://localhost:8080/api/payments";

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get(API_URL);
      const data = res.data || [];
      setPayments(data);
      setFilteredPayments(data);
    } catch (err) {
      alert("Error loading payments");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Search filter logic
  useEffect(() => {
    const filtered = payments.filter((p) => {
      const query = searchTerm.toLowerCase();
      return (
        p.transactionId?.toLowerCase().includes(query) ||
        p.paymentDoneBy?.toLowerCase().includes(query) ||
        p.paymentWho?.toLowerCase().includes(query) ||
        p.paymentMethod?.toLowerCase().includes(query) ||
        p.paymentAmount?.toString().toLowerCase().includes(query)
      );
    });
    setFilteredPayments(filtered);
    setCurrentPage(1);
  }, [searchTerm, payments]);

  // ✅ Handle cell change
  const handleChange = (index, field, value) => {
    const updated = [...filteredPayments];
    updated[index][field] = value;
    setFilteredPayments(updated);

    // sync back to global state
    const globalIndex = payments.findIndex((p) => p.id === updated[index].id);
    if (globalIndex !== -1) {
      const updatedAll = [...payments];
      updatedAll[globalIndex][field] = value;
      setPayments(updatedAll);
    }

    // debounce auto-save
    triggerAutoSave(index);
  };

  // ✅ Debounced auto-save
  const triggerAutoSave = (index) => {
    clearTimeout(saveTimers.current[index]);

    saveTimers.current[index] = setTimeout(() => {
      const payment = filteredPayments[index];

      // ensure all required fields are filled before saving
      const isRowComplete = [
        "paymentDate",
        "paymentAmount",
        "transactionId",
        "paymentDoneBy",
        "paymentWho",
        "paymentMethod",
      ].every((field) => payment[field] && payment[field].toString().trim() !== "");

      if (!isRowComplete) return; // don’t save incomplete rows

      handleAutoSave(index);
    }, 2000); // wait 2 seconds of inactivity
  };

  const handleAutoSave = async (index) => {
    const payment = filteredPayments[index];
    if (!payment) return;

    setSavingIndex(index);
    try {
      if (payment.id) {
        await axios.put(`${API_URL}/${payment.id}`, payment);
      } else {
        const res = await axios.post(API_URL, payment);
        const updated = [...filteredPayments];
        updated[index] = res.data;
        setFilteredPayments(updated);
      }
    } catch (err) {
      console.error("Auto-save failed:", err);
    } finally {
      setSavingIndex(null);
    }
  };

  const addRow = () => {
    const newRow = {
      paymentDate: "",
      paymentAmount: "",
      transactionId: "",
      paymentDoneBy: "",
      paymentWho: "",
      paymentMethod: "",
    };
    setPayments((prev) => [...prev, newRow]);
    setFilteredPayments((prev) => [...prev, newRow]);
  };

  const handleDelete = async (id, index) => {
    try {
      if (id) await axios.delete(`${API_URL}/${id}`);
      setPayments((prev) => prev.filter((p) => p.id !== id));
      setFilteredPayments((prev) => prev.filter((_, i) => i !== index));
    } catch {
      alert("Error deleting record");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredPayments.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="sheet-container">
      <h2 className="sheet-title">💰 Payment Sheet</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search payments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table className="sheet-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Payment Date</th>
              <th>Amount (₹)</th>
              <th>Transaction ID</th>
              <th>Done By</th>
              <th>Who</th>
              <th>Method</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((p, index) => {
              const globalIndex = indexOfFirst + index;
              return (
                <tr key={p.id || globalIndex}>
                  <td>{globalIndex + 1}</td>
                  <td>
                    <input
                      type="date"
                      value={p.paymentDate || ""}
                      onChange={(e) =>
                        handleChange(globalIndex, "paymentDate", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={p.paymentAmount || ""}
                      onChange={(e) =>
                        handleChange(globalIndex, "paymentAmount", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={p.transactionId || ""}
                      onChange={(e) =>
                        handleChange(globalIndex, "transactionId", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={p.paymentDoneBy || ""}
                      onChange={(e) =>
                        handleChange(globalIndex, "paymentDoneBy", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={p.paymentWho || ""}
                      onChange={(e) =>
                        handleChange(globalIndex, "paymentWho", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={p.paymentMethod || ""}
                      onChange={(e) =>
                        handleChange(globalIndex, "paymentMethod", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="delete-row"
                      onClick={() => handleDelete(p.id, globalIndex)}
                      disabled={savingIndex === globalIndex}
                    >
                      {savingIndex === globalIndex ? "💾 Saving..." : "✖"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination-controls">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ⬅ Prev
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next ➡
        </button>
      </div>

      <div className="sheet-actions">
        <button onClick={addRow} className="add-btn">
          ➕ Add Row
        </button>
      </div>
    </div>
  );
}

export default PaymentSheet;
