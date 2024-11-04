// src/components/FormPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    income: '',
    expenses: '',
    savings: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/submit-form', formData);  // Use port 5000 for backend
      alert(response.data);  // Display the success message from the backend
    } catch (error) {
      console.error('Error submitting form data:', error);
      alert('Failed to submit form');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Fill in Your Personal and Financial Information</h2>
      <Link to="/">
        <button style={styles.backButton}>Back to Home</button>
      </Link>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Personal Information */}
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} required />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} required />
        </label>

        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} style={styles.input} required />
        </label>

        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={styles.input} required />
        </label>

        {/* Financial Information */}
        <label>
          Income:
          <input type="number" name="income" value={formData.income} onChange={handleChange} style={styles.input} required />
        </label>

        <label>
          Expenses:
          <input type="number" name="expenses" value={formData.expenses} onChange={handleChange} style={styles.input} required />
        </label>

        <label>
          Savings:
          <input type="number" name="savings" value={formData.savings} onChange={handleChange} style={styles.input} required />
        </label>

        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  backButton: {
    padding: '10px 15px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    width: '300px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default FormPage;