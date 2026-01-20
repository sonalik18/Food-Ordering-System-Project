const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sonu@1812",
  database: "food_ordering",
});

db.connect((err) => {
  if (err) {
    console.log("MySQL connection error:", err);
    return;
  }
  console.log("MySQL connected...");
});

// POST API to save order with nullable fields
app.post("/api/orders", (req, res) => {
  const {
    name,
    mobile,
    email,
    address,
    order_list,
    total,
    payment_method,
  } = req.body;

  
  if (!order_list || !total) {
    return res
      .status(400)
      .json({ error: "Please provide order_list and total" });
  }

  
  const query =
    "INSERT INTO orders (name, mobile, email, address, order_list, total, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [
      name || null,
      mobile || null,
      email || null,
      address || null,
      order_list,
      total,
      payment_method || null,
    ],
    (err, result) => {
      if (err) {
        console.log("Database insert error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Order placed successfully", orderId: result.insertId });
    }
  );
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
