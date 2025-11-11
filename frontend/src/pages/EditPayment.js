import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditPayment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState({
    paymentDate: '',
    paymentAmount: '',
    transactionId: '',
    paymentDoneBy: '',
    paymentWho: '',
    paymentMethod: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/payments/${id}`)
      .then(res => setPayment(res.data))
      .catch(() => alert('Error fetching payment details'));
  }, [id]);

  const handleChange = e => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/payments/${id}`, payment)
      .then(() => {
        alert('Payment updated!');
        navigate('/view-payments');
      })
      .catch(() => alert('Error updating payment'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" name="paymentDate" value={payment.paymentDate} onChange={handleChange} required />
      <input type="number" name="paymentAmount" value={payment.paymentAmount} onChange={handleChange} required />
      <input type="text" name="transactionId" value={payment.transactionId} onChange={handleChange} required />
      <input type="text" name="paymentDoneBy" value={payment.paymentDoneBy} onChange={handleChange} required />
      <input type="text" name="paymentWho" value={payment.paymentWho} onChange={handleChange} required />
      <input type="text" name="paymentMethod" value={payment.paymentMethod} onChange={handleChange} required />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditPayment;
