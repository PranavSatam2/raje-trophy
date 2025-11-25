import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import api from "../services/axiosInstance";  // ✅ Uses JWT axios instancea
import "./PaymentSheet.css";

function PaymentSheet() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [savingIndex, setSavingIndex] = useState(null);
  const rowsPerPage = 10;

  const saveTimers = useRef({});
  const API_URL = "https://rajesports07.in/api/payments"; // ✅ Uses base from axiosInstance
  // const API_URL = "http://localhost:8080/api/payments";

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });


      const data = res.data || [];
      setPayments(data);
      setFilteredPayments(data);
    } catch (err) {
      console.error("Error loading payments", err);
      alert("Session expired or unauthorized. Please login again.");
    } finally {
      setLoading(false);
    }
  };

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

  const handleChange = (index, field, value) => {
    const updated = [...filteredPayments];
    updated[index][field] = value;
    setFilteredPayments(updated);

    const globalIndex = payments.findIndex((p) => p.id === updated[index].id);
    if (globalIndex !== -1) {
      const updatedAll = [...payments];
      updatedAll[globalIndex][field] = value;
      setPayments(updatedAll);
    }

    triggerAutoSave(index);
  };

  const triggerAutoSave = (index) => {
    clearTimeout(saveTimers.current[index]);

    saveTimers.current[index] = setTimeout(() => {
      const payment = filteredPayments[index];

      const isRowComplete = [
        "paymentDate",
        "paymentAmount",
        "transactionId",
        "paymentDoneBy",
        "paymentWho",
        "paymentMethod",
      ].every((field) => payment[field] && payment[field].toString().trim() !== "");

      if (!isRowComplete) return;
      handleAutoSave(index);
    }, 2000);
  };

  const handleAutoSave = async (index) => {
    const payment = filteredPayments[index];
    if (!payment) return;

    setSavingIndex(index);
    try {
      if (payment.id) {
        await axios.put(`${API_URL}/${payment.id}`, payment, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });


      } else {
        const res = await axios.post(API_URL, payment, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });


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
      if (id) await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });


      setPayments((prev) => prev.filter((p) => p.id !== id));
      setFilteredPayments((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      alert("Error deleting record");
    }
  };

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
                      onChange={(e) => handleChange(globalIndex, "paymentDate", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={p.paymentAmount || ""}
                      onChange={(e) => handleChange(globalIndex, "paymentAmount", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={p.transactionId || ""}
                      onChange={(e) => handleChange(globalIndex, "transactionId", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={p.paymentDoneBy || ""}
                      onChange={(e) => handleChange(globalIndex, "paymentDoneBy", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={p.paymentWho || ""}
                      onChange={(e) => handleChange(globalIndex, "paymentWho", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={p.paymentMethod || ""}
                      onChange={(e) => handleChange(globalIndex, "paymentMethod", e.target.value)}
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
        <span>Page {currentPage} of {totalPages || 1}</span>
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
