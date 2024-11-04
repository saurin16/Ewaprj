import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import FormPage from './Pages/FormPage';
import ProductsPage from './Pages/ProductsPage';
import ProductDetails from './Component/ProductDetails';
import Chatbot from './Component/Chatbot';
import Cart from './Pages/Cart';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;