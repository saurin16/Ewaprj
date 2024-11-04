import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product); // Add product to cart
    navigate('/cart'); // Redirect to cart page
  };

  const handleBack = () => {
    navigate('/products'); // Back to products page
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.productContainer}>
        <img src={product.image_url} alt={product.name} style={styles.image} />
        <div style={styles.detailsContainer}>
          <h2 style={styles.productName}>{product.name}</h2>
          <p style={styles.description}>{product.description}</p>
          <p style={styles.detail}><strong>Risk Level:</strong> {product.risk_level}</p>
          <p style={styles.detail}><strong>Return Rate:</strong> {product.return_rate}%</p>
          <p style={styles.detail}><strong>Monthly Savings Plan:</strong> ${product.savings_plan}</p>
          <button style={styles.button} onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button style={styles.backButton} onClick={handleBack}>
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#F5F7FA',
    padding: '20px',
  },
  productContainer: {
    display: 'flex',
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '1200px',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  image: {
    width: '400px',
    height: 'auto',
    objectFit: 'cover',
  },
  detailsContainer: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  productName: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '20px',
    color: '#555',
  },
  detail: {
    fontSize: '1.1rem',
    marginBottom: '10px',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    fontSize: '1rem',
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    fontSize: '1rem',
    marginLeft: '10px',
  },
};

export default ProductDetails;