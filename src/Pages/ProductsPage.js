// src/components/ProductsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Financial Products</h2>
      <ul style={styles.list}>
        {products.map((product) => (
          <li key={product.id} style={styles.item}>
            <img src={product.image_url} alt={product.name} style={styles.image} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Risk Level:</strong> {product.risk_level}</p>
            <p><strong>Return Rate:</strong> {product.return_rate}%</p>
            <Link to={`/product/${product.id}`}>
              <button style={styles.button}>Learn More</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    padding: 0,
  },
  item: {
    border: '1px solid #e6e6e6',
    borderRadius: '10px',
    padding: '15px',
    margin: '10px',
    width: '280px',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
  },
  itemHover: {
    transform: 'scale(1.05)',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  description: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
};

export default ProductsPage;