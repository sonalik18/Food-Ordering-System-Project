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

// **PaymentOptions component removed**

function Cart() {
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  // Removed showPaymentOptions state
  const [paymentMethod, setPaymentMethod] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  function detail(id) {
    history.push(`/singledish?id=${id}`);
  }

  function remove(ele) {
    dispatch(removeCartItem(ele));
  }

  function decrease(cartitem) {
    dispatch(decreaseCart(cartitem));
  }

  function increase(cartItem) {
    dispatch(addTocart(cartItem));
  }

  function clearcart() {
    dispatch(clearCartItem());
  }

  function order() {
    if (cart.cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setShowForm(true);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const orderDetails = cart.cartItems
    .map(
      (item, index) =>
        `${index + 1}. ${item.title} (Qty: ${item.cartQuantity}) ₹${
          item.cartQuantity * item.rate
        }`
    )
    .join("\n");

  function sendOrderToBackend(e) {
    e.preventDefault();

    const method = paymentMethod || "cod";

    if (
      !formData.name.trim() ||
      !formData.mobile.trim() ||
      !formData.email.trim() ||
      !formData.address.trim()
    ) {
      alert("Please fill in all details");
      return;
    }

    const orderData = {
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      address: formData.address,
      order_list: orderDetails,
      total: cart.totalAmount,
      payment_method: method,
    };

    // Backend call (optional)
    /*
    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to place order");
        }
        return res.json();
      })
      .then((data) => {
        alert("Order placed successfully!");
        dispatch(clearCartItem());
        setShowForm(false);
        setFormData({ name: "", mobile: "", email: "", address: "" });
        setPaymentMethod(null);
      })
      .catch((error) => {
        alert("Error placing order: " + error.message);
      });
    */

    // Without backend call just success alert:
    alert("Order placed successfully!");
    dispatch(clearCartItem());
    setShowForm(false);
    setFormData({ name: "", mobile: "", email: "", address: "" });
    setPaymentMethod(null);
  }

  // Removed handlePaymentSelect function because no popup

  return (
    <div className="cart-bg">
      <Header />
      <div className="cart">
        <h1 style={{ padding: "10px" }}>Shopping cart</h1>

        {cart.cartItems.length === 0 ? (
          <div style={{ marginBottom: "165px", padding: "10px" }}>
            <p>Your cart is currently empty</p>
          </div>
        ) : (
          <div className="cart-main">
            <div className="cart-main-head">
              <h3 className="cart-main-head-h3">Product</h3>
              <h3>Price</h3>
              <h3>Quantity</h3>
              <h3>Total</h3>
            </div>

            {cart.cartItems.map((cartItems) => (
              <div key={cartItems.id} className="cart-main-body">
                <div className="cart-main-body-div">
                  <img
                    src={cartItems.url}
                    alt={cartItems.title}
                    onClick={() => detail(cartItems.id)}
                    style={{ cursor: "pointer" }}
                  />
                  <div style={{ paddingLeft: "5px" }}>
                    <h3>{cartItems.title}</h3>
                    <button onClick={() => remove(cartItems)}>Delete</button>
                  </div>
                </div>

                <div className="cart-main-body-div2">
                  <h5>₹{cartItems.rate}</h5>
                </div>

                <div className="quantity">
                  <button onClick={() => decrease(cartItems)}>-</button>
                  <span>{cartItems.cartQuantity}</span>
                  <button onClick={() => increase(cartItems)}>+</button>
                </div>

                <div className="cart-main-body-div2">
                  <div style={{ color: "green", fontSize: "23px" }}>
                    ₹{cartItems.cartQuantity * cartItems.rate}{" "}
                  </div>
                </div>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "1100px",
                marginLeft: "10px",
              }}
            >
              <div>
                <button className="clearCart-button" onClick={clearcart}>
                  Clear cart
                </button>
              </div>
              <div>
                <p>
                  Subtotal{" "}
                  <span style={{ fontSize: "12px" }}>*including all taxes*</span>:{" "}
                  <b>
                    <span style={{ fontSize: "23px" }}>
                      ₹{cart.totalAmount}/-
                    </span>
                  </b>
                </p>

                <button className="Order-button" onClick={order}>
                  Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order form popup */}
        {showForm && (
          <div className="order-form-popup">
            <form onSubmit={sendOrderToBackend}>
              <h3>Enter your details</h3>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
              <br />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                required
                pattern="[0-9]{10}"
                title="Please enter a 10-digit mobile number"
                value={formData.mobile}
                onChange={handleInputChange}
              />
              <br />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
              <br />
              <input
                type="text"
                name="address"
                placeholder="Delivery Address"
                required
                value={formData.address}
                onChange={handleInputChange}
              />
              <br />
              <textarea
                name="order_list"
                readOnly
                value={orderDetails}
                style={{ width: "100%", height: "100px" }}
              />
              <br />
              <p>
                <b>Selected Payment Method: </b> Only Cash On Delivery
              </p>
              <button type="submit">Submit Order</button>
              <br />
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <br />
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
