import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewPayments.css';

function ViewPayments() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/payments')
      .then(res => setPayments(res.data))
      .catch(() => alert('Error fetching payments!'));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/payments/${id}`)
      .then(() => setPayments(prev => prev.filter(p => p.id !== id)))
      .catch(() => alert('Error deleting payment'));
  };

  const handleEdit = (id) => {
    navigate(`/edit-payment/${id}`);
  };

  return (
    <div className="payments-table-container">
      <h2 className="payments-title">Payment Records</h2>
      <div className="table-wrapper">
        <table className="payments-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Done By</th>
              <th>Who</th>
              <th>Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.paymentDate}</td>
                <td>₹ {payment.paymentAmount}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.paymentDoneBy}</td>
                <td>{payment.paymentWho}</td>
                <td>{payment.paymentMethod}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(payment.id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(payment.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewPayments;
