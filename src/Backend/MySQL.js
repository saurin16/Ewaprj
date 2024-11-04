// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mysql = require('mysql2');  // Use mysql2 instead of mysql

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // Your MySQL username
  password: 'andon123',  // Your MySQL password
  database: 'ewa-prj'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Route to handle form submission and store data
app.post('/api/submit-form', (req, res) => {
  const { name, email, address, phone, income, expenses, savings } = req.body;

  const sql = `INSERT INTO user_details (name, email, address, phone, income, expenses, savings) 
               VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [name, email, address, phone, income, expenses, savings], (err, result) => {
    if (err) {
      console.error('Error inserting data into database: ', err);
      res.status(500).send('Server error');
    } else {
      res.status(200).send('Form data saved successfully');
    }
  });
});


// Route to fetch financial products
app.get('/api/products', (req, res) => {
    const sql = 'SELECT * FROM financial_products';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching data: ', err);
        res.status(500).send('Server error');
      } else {
        res.json(result);
      }
    });
  });
  
  // Route to fetch a single product by ID
  app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM financial_products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error fetching product: ', err);
        res.status(500).send('Server error');
      } else {
        res.json(result[0]);
      }
    });
  });

  // Route to add a product to the cart
app.post('/api/add-to-cart', (req, res) => {
  const { product_id, product_name, quantity, price, user_id } = req.body;

  const sql = `INSERT INTO cart (product_id, product_name, quantity, price, user_id) 
               VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [product_id, product_name, quantity, price, user_id], (err, result) => {
    if (err) {
      console.error('Error adding product to cart: ', err);
      res.status(500).send('Server error');
    } else {
      res.status(200).send('Product added to cart successfully');
    }
  });
});

// Route to get cart items for a user
app.get('/api/cart/:user_id', (req, res) => {
  const { user_id } = req.params;
  const sql = 'SELECT * FROM cart WHERE user_id = ?';

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error('Error fetching cart data: ', err);
      res.status(500).send('Server error');
    } else {
      res.json(result);
    }
  });
});

// Checkout endpoint with confirmation number
app.post('/api/checkout', (req, res) => {
  const { name, email, billing_address, credit_card_number, expiration_date, cvv, cart_id } = req.body;

  // Generate a unique confirmation number
  const confirmationNumber = `CONF${Date.now()}`;

  const sql = `INSERT INTO checkout (name, email, billing_address, credit_card_number, expiration_date, cvv, cart_id, confirmation_number)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [name, email, billing_address, credit_card_number, expiration_date, cvv, cart_id, confirmationNumber], (err, result) => {
    if (err) {
      console.error('Error saving checkout info: ', err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json({ message: 'Checkout successful', confirmationNumber });
    }
  });
});

// Start the server on port 5000 to avoid conflicts with React
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});