import React from 'react';
import logo from '../assets/logo.png';
import banner from '../assets/img.png';
// New Navigation Component
const Navigation = () => (
  <nav style={styles.nav}>
    <a href="/" style={styles.navLink}>
      <span className="mr-2">🏠</span> Home
    </a>
    <a href="/form" style={styles.navLink}>
      <span className="mr-2">📊</span> Form
    </a>
    <a href="/products" style={styles.navLink}>
      Products
    </a>
    <a href="/cart" style={styles.navLink}>
      <span className="mr-2">🛒</span> Cart
    </a>
  </nav>
);

// New About Component
const About = () => (
  <section style={styles.details}>
    <div className="flex items-center mb-6">
    <img src={logo} alt="Finance Advisor Logo" className="mr-4" style={{ width: '100px', height: '100px' }} />


      <h2 className="text-2xl font-bold">About the Project</h2>
    </div>
    <p className="mb-4">
      This project is built using React, MySQL, and Rasa Pro to provide real-time financial advice.
      You can track your income, manage your expenses, and get recommendations for investments and savings.
    </p>
    <p>
      Our AI-powered tool analyzes your financial data and gives you personalized recommendations to help
      you achieve financial stability.
    </p>
  </section>
);

const Home = () => {
  return (
    <div style={styles.container}>
      <Navigation />
      <header style={styles.hero}>
  <img src={banner} alt="Finance Advisor Banner" style={styles.banner} />
  <div className="mb-8">
    <h1 className="text-4xl font-bold mb-4">Welcome to Smart Finance Advisor</h1>
    <p className="text-lg">
      Your AI-powered financial advisory tool to help you make smarter decisions with your money.
    </p>
  </div>
  <a href="/form">
    <button style={styles.button}>Get Started</button>
  </a>
</header>

      <About /> {/* About section below the hero */}
    </div>
  );
};

const styles = {
  banner: {
    width: '50%',           
    height: 'auto',         
    borderRadius: '50px 50px 50px 50px'
  },
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    backgroundColor: 'white',
    minHeight: '70vh',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    padding: '15px 0',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    margin: '0 20px',
    fontSize: '18px',
    fontWeight: '500',
    transition: 'color 0.3s, transform 0.3s',
    display: 'flex',
    alignItems: 'center',
  },
  navLinkHover: {
    color: '#FFD700',
    transform: 'scale(1.1)',
  },
  hero: {
    backgroundColor: 'white',
    color: 'black',
    padding: '100px 20px',
    marginBottom: '20px',
    borderRadius: '0 0 50px 50px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  details: {
    backgroundColor: 'white',
    color: 'black',
    padding: '100px 20px',
    marginBottom: '20px',
    borderRadius: '0 0 50px 50px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
  },
};

export default Home;