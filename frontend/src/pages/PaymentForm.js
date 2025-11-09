import React, { useState } from 'react';
import axios from 'axios';

function PaymentForm() {
  const [payments, setPayments] = useState([
    {
      paymentDate: '',
      paymentAmount: '',
      transactionId: '',
      paymentDoneBy: '',
      paymentWho: '',
      paymentMethod: ''
    }
  ]);

  // Handle change for specific record
  const handleChange = (index, e) => {
    const newPayments = [...payments];
    newPayments[index][e.target.name] = e.target.value;
    setPayments(newPayments);
  };

  // Add another record row dynamically
  const addNewPayment = () => {
    setPayments([
      ...payments,
      {
        paymentDate: '',
        paymentAmount: '',
        transactionId: '',
        paymentDoneBy: '',
        paymentWho: '',
        paymentMethod: ''
      }
    ]);
  };

  // Remove a record row
  const removePayment = (index) => {
    const newPayments = payments.filter((_, i) => i !== index);
    setPayments(newPayments);
  };

  // Submit multiple records to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/payments/bulk', payments);
      alert('All payments added successfully!');
      setPayments([
        {
          paymentDate: '',
          paymentAmount: '',
          transactionId: '',
          paymentDoneBy: '',
          paymentWho: '',
          paymentMethod: ''
        }
      ]);
    } catch (error) {
      console.error(error);
      alert('Error adding payments');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Multiple Payments</h2>

      {payments.map((payment, index) => (
        <div key={index} style={{ marginBottom: '20px', border: '1px solid gray', padding: '15px' }}>
          <h4>Payment #{index + 1}</h4>
          <input type="date" name="paymentDate" value={payment.paymentDate} onChange={(e) => handleChange(index, e)} required />
          <input type="number" name="paymentAmount" value={payment.paymentAmount} onChange={(e) => handleChange(index, e)} placeholder="Amount" required />
          <input type="text" name="transactionId" value={payment.transactionId} onChange={(e) => handleChange(index, e)} placeholder="Transaction Id" required />
          <input type="text" name="paymentDoneBy" value={payment.paymentDoneBy} onChange={(e) => handleChange(index, e)} placeholder="Done By" required />
          <input type="text" name="paymentWho" value={payment.paymentWho} onChange={(e) => handleChange(index, e)} placeholder="Who" required />
          <input type="text" name="paymentMethod" value={payment.paymentMethod} onChange={(e) => handleChange(index, e)} placeholder="Method" required />
          {payments.length > 1 && (
            <button type="button" onClick={() => removePayment(index)}>Remove</button>
          )}
        </div>
      ))}

      <button type="button" onClick={addNewPayment}>+ Add Another Payment</button>
      <br /><br />
      <button type="submit">Submit All</button>
    </form>
  );
}

export default PaymentForm;
