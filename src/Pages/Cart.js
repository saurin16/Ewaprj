// src/components/Cart.js
import React, { useState } from 'react';
import axios from 'axios';

const Cart = ({ cart }) => {
  const [checkoutDetails, setCheckoutDetails] = useState({
    name: '',
    email: '',
    billingAddress: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [confirmationNumber, setConfirmationNumber] = useState(null);

  const handleInputChange = (e) => {
    setCheckoutDetails({ ...checkoutDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/checkout', {
        ...checkoutDetails,
        cart_id: 1, // Replace with actual cart_id
      });
      setConfirmationNumber(response.data.confirmationNumber);
      console.log('Checkout successful:', response.data);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product.id} style={styles.product}>
              <p>{product.name}</p>
              <p>${product.return_rate}</p>
            </div>
          ))}
          <h3>Checkout</h3>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={checkoutDetails.name}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={checkoutDetails.email}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="billingAddress"
              placeholder="Billing Address"
              value={checkoutDetails.billingAddress}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="cardNumber"
              placeholder="Credit Card Number"
              value={checkoutDetails.cardNumber}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              value={checkoutDetails.expiryDate}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={checkoutDetails.cvv}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Checkout
            </button>
          </form>
          {confirmationNumber && (
            <p style={styles.confirmation}>Confirmation Number: {confirmationNumber}</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  product: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #ccc',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  confirmation: {
    marginTop: '20px',
    color: 'green',
    fontWeight: 'bold',
  },
};

export default Cart;