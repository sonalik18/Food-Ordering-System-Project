// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql2");

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Sonu@1812",
//   database: "food_ordering",
// });

// db.connect((err) => {
//   if (err) {
//     console.log("❌ DB Connection Error:", err);
//     return;
//   }
//   console.log("✅ DB Connected");
// });

// app.post("/api/orders", (req, res) => {
//   console.log("🔥 API HIT", req.body);

//   const {
//     name,
//     mobile,
//     email,
//     address,
//     items,
//     total,
//     payment_method = "COD",
//   } = req.body;

//   // ✅ Proper validation
//   if (
//     !name ||
//     !mobile ||
//     !email ||
//     !address ||
//     !items ||
//     !Array.isArray(items) ||
//     items.length === 0 ||
//     total == null
//   ) {
//     return res.status(400).json({
//       error: "Items or total missing",
//     });
//   }

//   const query = `
//     INSERT INTO orders
//     (name, mobile, email, address, order_list, total, payment_method)
//     VALUES (?, ?, ?, ?, ?, ?, ?)
//   `;

//   db.query(
//     query,
//     [
//       name,
//       mobile,
//       email,
//       address,
//       JSON.stringify(items), // ✅ array stored as JSON
//       total,
//       payment_method,
//     ],
//     (err, result) => {
//       if (err) {
//         console.log("❌ SQL ERROR:", err);
//         return res.status(500).json({ error: "Database error" });
//       }

//       res.status(201).json({
//         message: "Order placed successfully",
//         orderId: result.insertId,
//       });
//     }
//   );
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

/* ========================================
   IMPORT DEPENDENCIES
======================================== */
/* ========================================
   IMPORT DEPENDENCIES
======================================== */
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

/* ========================================
   APP & PORT SETUP
======================================== */
const app = express();
const PORT = 5000;

/* ========================================
   MIDDLEWARE
======================================== */
app.use(cors());
app.use(express.json()); // JSON body parsing

/* ========================================
   MYSQL CONNECTION
======================================== */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sonu@1812", // तुमचा MySQL password
  database: "food_ordering",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
    return;
  }
  console.log("✅ MySQL Connected Successfully");
});

/* ========================================
   TEST API
======================================== */
app.get("/", (req, res) => {
  res.send("✅ Food Ordering API is working");
});

/* ========================================
   PLACE ORDER API
======================================== */
app.post("/api/orders", (req, res) => {
  console.log("🔥 Order Received:", req.body);

  const { name, mobile, email, address, items, total, payment_method = "COD" } =
    req.body;

  // ✅ BASIC VALIDATION
  if (
    !name ||
    !mobile ||
    !email ||
    !address ||
    !Array.isArray(items) ||
    items.length === 0 ||
    total == null
  ) {
    return res.status(400).json({
      success: false,
      error: "Missing or invalid order data",
    });
  }

  // ✅ Convert items array → human-readable string
  const orderList = items
    .map((item, index) => {
      const price = Number(item.rate) * Number(item.cartQuantity);
      return `${index + 1}. ${item.title} (Qty: ${item.cartQuantity}) ₹${price}`;
    })
    .join("\n");

  // ✅ SQL QUERY TO INSERT ORDER
  const sql = `
    INSERT INTO orders
    (name, mobile, email, address, order_list, total, payment_method)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, mobile, email, address, orderList, total, payment_method],
    (err, result) => {
      if (err) {
        console.error("❌ Order Insert Failed:", err);
        return res.status(500).json({
          success: false,
          error: "Database insert error",
        });
      }

      res.status(201).json({
        success: true,
        message: "Order placed successfully",
        orderId: result.insertId,
      });
    }
  );
});

/* ========================================
   GET ALL ORDERS API (clean readable)
======================================== */
app.get("/api/orders", (req, res) => {
  const sql = `
    SELECT id, name, mobile, email, address,
           REPLACE(order_list, '\n', CHAR(10)) AS order_list,
           total, payment_method, created_at
    FROM orders
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Fetch Orders Failed:", err);
      return res.status(500).json({ success: false, error: "Database error" });
    }

    // ✅ Optionally, format each order list into array for frontend readability
    const formattedResults = results.map(order => ({
      ...order,
      order_list: order.order_list.split("\n") // returns array of items
    }));

    res.json({ success: true, orders: formattedResults });
  });
});

/* ========================================
   START SERVER
======================================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
