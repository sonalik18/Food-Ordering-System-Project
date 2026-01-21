// import React, { useState, useEffect } from "react";
// import Header from "../header/header";
// import "../cart/cart.css";
// import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import Footer from "../footer/footer";
// import {
//   addTocart,
//   clearCartItem,
//   decreaseCart,
//   getTotals,
//   removeCartItem,
// } from "./cartslice";

// function Cart() {
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);

//   const [showForm, setShowForm] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     email: "",
//     address: "",
//   });

//   // 🔁 Update totals when cart changes
//   useEffect(() => {
//     dispatch(getTotals());
//   }, [cart, dispatch]);

//   // 🔗 Navigate to single dish
//   function detail(id) {
//     history.push(`/singledish?id=${id}`);
//   }

//   function removeItem(item) {
//     dispatch(removeCartItem(item));
//   }

//   function decrease(item) {
//     dispatch(decreaseCart(item));
//   }

//   function increase(item) {
//     dispatch(addTocart(item));
//   }

//   function clearcart() {
//     dispatch(clearCartItem());
//   }

//   function order() {
//     if (cart.cartItems.length === 0) {
//       alert("Your cart is empty!");
//       return;
//     }
//     setShowForm(true);
//   }

//   function handleInputChange(e) {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   // 🧾 Order list display (only for textarea UI)
//   const orderDetails = cart.cartItems
//     .map(
//       (item, index) =>
//         `${index + 1}. ${item.title} (Qty: ${item.cartQuantity}) ₹${
//           item.cartQuantity * item.rate
//         }`
//     )
//     .join("\n");

//   // 🚀 Send order to backend (MATCHES BACKEND EXACTLY)
//   function sendOrderToBackend(e) {
//     e.preventDefault();

//     if (
//       !formData.name.trim() ||
//       !formData.mobile.trim() ||
//       !formData.email.trim() ||
//       !formData.address.trim()
//     ) {
//       alert("Please fill in all details");
//       return;
//     }

//     const orderData = {
//       name: formData.name,
//       mobile: formData.mobile,
//       email: formData.email,
//       address: formData.address,
//       items: cart.cartItems,          // ✅ MUST BE ARRAY (backend expects this)
//       total: cart.totalAmount,
//       payment_method: "COD",
//     };

//     console.log("🚀 Sending Order:", orderData);

//     fetch("http://localhost:5000/api/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(orderData),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           return res.json().then((err) => {
//             throw new Error(err.error || "Order failed");
//           });
//         }
//         return res.json();
//       })
//       .then((data) => {
//         alert("✅ Order placed successfully! Order ID: " + data.orderId);
//         dispatch(clearCartItem());
//         setShowForm(false);
//         setFormData({
//           name: "",
//           mobile: "",
//           email: "",
//           address: "",
//         });
//         history.push("/");
//       })
//       .catch((error) => {
//         console.error("❌ Order Error:", error);
//         alert("Error placing order: " + error.message);
//       });
//   }

//   return (
//     <div className="cart-bg">
//       <Header />

//       <div className="cart">
//         <h1 style={{ padding: "10px" }}>Shopping Cart</h1>

//         {cart.cartItems.length === 0 ? (
//           <div style={{ marginBottom: "165px", padding: "10px" }}>
//             <p>Your cart is currently empty</p>
//           </div>
//         ) : (
//           <div className="cart-main">
//             <div className="cart-main-head">
//               <h3>Product</h3>
//               <h3>Price</h3>
//               <h3>Quantity</h3>
//               <h3>Total</h3>
//             </div>

//             {cart.cartItems.map((item) => (
//               <div key={item.id} className="cart-main-body">
//                 <div className="cart-main-body-div">
//                   <img
//                     src={item.url}
//                     alt={item.title}
//                     onClick={() => detail(item.id)}
//                     style={{ cursor: "pointer" }}
//                   />
//                   <div>
//                     <h3>{item.title}</h3>
//                     <button onClick={() => removeItem(item)}>Delete</button>
//                   </div>
//                 </div>

//                 <h5>₹{item.rate}</h5>

//                 <div className="quantity">
//                   <button onClick={() => decrease(item)}>-</button>
//                   <span>{item.cartQuantity}</span>
//                   <button onClick={() => increase(item)}>+</button>
//                 </div>

//                 <h4 style={{ color: "green" }}>
//                   ₹{item.cartQuantity * item.rate}
//                 </h4>
//               </div>
//             ))}

//             <div className="cart-footer">
//               <button className="clearCart-button" onClick={clearcart}>
//                 Clear Cart
//               </button>

//               <div>
//                 <p>
//                   Subtotal{" "}
//                   <span style={{ fontSize: "12px" }}>*incl. taxes*</span> :
//                   <b style={{ fontSize: "22px" }}>
//                     {" "}
//                     ₹{cart.totalAmount}/-
//                   </b>
//                 </p>
//                 <button className="Order-button" onClick={order}>
//                   Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* 🧾 Order Form */}
//         {showForm && (
//           <div className="order-form-popup">
//             <form onSubmit={sendOrderToBackend}>
//               <h3>Enter your details</h3>

//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Your Name"
//                 required
//                 value={formData.name}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="tel"
//                 name="mobile"
//                 placeholder="Mobile Number"
//                 required
//                 pattern="[0-9]{10}"
//                 value={formData.mobile}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 required
//                 value={formData.email}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Delivery Address"
//                 required
//                 value={formData.address}
//                 onChange={handleInputChange}
//               />

//               <textarea
//                 readOnly
//                 value={orderDetails}
//                 style={{ width: "100%", height: "100px" }}
//               />

//               <p>
//                 <b>Payment Method:</b> Cash on Delivery
//               </p>

//               <button type="submit">Submit Order</button>
//               <button type="button" onClick={() => setShowForm(false)}>
//                 Cancel
//               </button>
//             </form>
//           </div>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Cart;


import React, { useState, useEffect } from "react";
import Header from "../header/header";
import "../cart/cart.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Footer from "../footer/footer";
import {
  addTocart,
  clearCartItem,
  decreaseCart,
  getTotals,
  removeCartItem,
} from "./cartslice";

function Cart() {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });

  // 🔁 Update totals when cart changes
  useEffect(() => {
    dispatch(getTotals());
  }, [cart.cartItems, dispatch]);

  // 🔗 Navigate to single dish
  const detail = (id) => {
    history.push(`/singledish?id=${id}`);
  };

  const removeItem = (item) => dispatch(removeCartItem(item));
  const decrease = (item) => dispatch(decreaseCart(item));
  const increase = (item) => dispatch(addTocart(item));
  const clearcart = () => dispatch(clearCartItem());

  const order = () => {
    if (cart.cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🧾 Order list only for UI display
  const orderDetails = cart.cartItems
    .map(
      (item, index) =>
        `${index + 1}. ${item.title} (Qty: ${item.cartQuantity}) ₹${
          item.cartQuantity * Number(item.rate)
        }`
    )
    .join("\n");

  // 🚀 Send order to backend
  const sendOrderToBackend = async (e) => {
    e.preventDefault();

    const { name, mobile, email, address } = formData;

    if (!name || !mobile || !email || !address) {
      alert("Please fill in all details");
      return;
    }

    const orderData = {
      name,
      mobile,
      email,
      address,
      items: cart.cartItems, // ✅ backend expects ARRAY
      total: cart.totalAmount,
      payment_method: "COD",
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Order failed");
      }

      alert(`✅ Order placed successfully!\nOrder ID: ${data.orderId}`);

      dispatch(clearCartItem());
      setShowForm(false);
      setFormData({
        name: "",
        mobile: "",
        email: "",
        address: "",
      });

      history.push("/");
    } catch (error) {
      console.error("❌ Order Error:", error);
      alert("Error placing order: " + error.message);
    }
  };

  return (
    <div className="cart-bg">
      <Header />

      <div className="cart">
        <h1 style={{ padding: "10px" }}>Shopping Cart</h1>

        {cart.cartItems.length === 0 ? (
          <div style={{ marginBottom: "165px", padding: "10px" }}>
            <p>Your cart is currently empty</p>
          </div>
        ) : (
          <div className="cart-main">
            <div className="cart-main-head">
              <h3>Product</h3>
              <h3>Price</h3>
              <h3>Quantity</h3>
              <h3>Total</h3>
            </div>

            {cart.cartItems.map((item) => (
              <div key={item.id} className="cart-main-body">
                <div className="cart-main-body-div">
                  <img
                    src={item.url}
                    alt={item.title}
                    onClick={() => detail(item.id)}
                    style={{ cursor: "pointer" }}
                  />
                  <div>
                    <h3>{item.title}</h3>
                    <button onClick={() => removeItem(item)}>Delete</button>
                  </div>
                </div>

                <h5>₹{item.rate}</h5>

                <div className="quantity">
                  <button onClick={() => decrease(item)}>-</button>
                  <span>{item.cartQuantity}</span>
                  <button onClick={() => increase(item)}>+</button>
                </div>

                <h4 style={{ color: "green" }}>
                  ₹{item.cartQuantity * Number(item.rate)}
                </h4>
              </div>
            ))}

            <div className="cart-footer">
              <button className="clearCart-button" onClick={clearcart}>
                Clear Cart
              </button>

              <div>
                <p>
                  Subtotal{" "}
                  <span style={{ fontSize: "12px" }}>*incl. taxes*</span> :
                  <b style={{ fontSize: "22px" }}>
                    {" "}
                    ₹{cart.totalAmount}/-
                  </b>
                </p>
                <button className="Order-button" onClick={order}>
                  Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🧾 Order Form */}
        {showForm && (
          <div className="order-form-popup">
            <form onSubmit={sendOrderToBackend}>
              <h3>Enter your details</h3>

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                pattern="[0-9]{10}"
                value={formData.mobile}
                onChange={handleInputChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="address"
                placeholder="Delivery Address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />

              <textarea
                readOnly
                value={orderDetails}
                style={{ width: "100%", height: "100px" }}
              />

              <p>
                <b>Payment Method:</b> Cash on Delivery
              </p>

              <button type="submit">Submit Order</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
