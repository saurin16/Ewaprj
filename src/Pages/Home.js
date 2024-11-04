// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <header style={styles.hero}>
        <h1>Welcome to Smart Finance Advisor</h1>
        <p>Your AI-powered financial advisory tool to help you make smarter decisions with your money.</p>
        <Link to="/form">
          <button style={styles.button}>Get Started</button>
        </Link>
      </header>

      <section style={styles.details}>
        <h2>About the Project</h2>
        <p>
          This project is built using React, MySQL, and Rasa Pro to provide real-time financial advice.
          You can track your income, manage your expenses, and get recommendations for investments and savings.
        </p>
        <p>
          Our AI-powered tool analyzes your financial data and gives you personalized recommendations to help
          you achieve financial stability.
        </p>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  hero: {
    backgroundColor: '#f4f4f4',
    padding: '50px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  details: {
    margin: '20px',
  },
};

export default Home;