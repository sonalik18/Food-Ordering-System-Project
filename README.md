# Food-Ordering-System 🍽️
## 📸 Project Screenshots

### Screenshot 1
![Screenshot 594](screenshots/Screenshot%20(594).png)

### Screenshot 6
![Screenshot 599](screenshots/Screenshot%20(599).png)

### Screenshot 7
![Screenshot 600](screenshots/Screenshot%20(600).png)

### Screenshot 8
![Screenshot 601](screenshots/Screenshot%20(601).png)

### Screenshot 9
![Screenshot 602](screenshots/Screenshot%20(602).png)

### Screenshot 10
![Screenshot 603](screenshots/Screenshot%20(603).png)

### Screenshot 11
![Screenshot 604](screenshots/Screenshot%20(604).png)


### Screenshot 2
![Screenshot 595](screenshots/Screenshot%20(595).png)

### Screenshot 3
![Screenshot 596](screenshots/Screenshot%20(596).png)


### Screenshot 13
![Screenshot 606](screenshots/Screenshot%20(606).png)

### Screenshot 14
![Screenshot 607](screenshots/Screenshot%20(607).png)

### Screenshot 15
![Screenshot 608](screenshots/Screenshot%20(608).png)

### Screenshot 16
![Screenshot 609](screenshots/Screenshot%20(609).png)

### Screenshot 17
![Screenshot 610](screenshots/Screenshot%20(610).png)

### Screenshot 18
![Screenshot 611](screenshots/Screenshot%20(611).png)

### Screenshot 19
![Screenshot 613](screenshots/Screenshot%20(613).png)

## 📌 Project Description
The Food Ordering System is a web-based application that allows users to browse an online food menu, search for dishes, and place food orders.  
This project is developed using **React.js**.

🖥 Frontend (React.js)

In my Online Food Ordering System, I used React.js to build a responsive and user-friendly interface.

When a user clicks on slides or food items, an onClick event is triggered in React.

This event allows users to view food details or directly add items to the cart.

I used React state (useState) to temporarily store selected item data and manage UI changes such as image sliders and modals.

Props were used to pass data from parent components to child components, such as sending food item details to individual item cards.

Food items like title, price, quantity, and image path are stored in arrays and displayed dynamically using the map() method.

🛒 Cart & Order Functionality (Redux)

I used Redux to manage the cart data globally across the application.

When the user clicks on the “Add to Cart” button, a Redux action is dispatched, and the selected item is stored in the Redux store.

The Redux store ensures that cart data is accessible across different pages of the application.

When the user navigates to the cart page, the cart items are fetched from the Redux store and displayed.

Redux helps maintain cart data consistency during page navigation.

⚙ Backend (Node.js + Express)

I used Node.js with Express.js to handle backend operations and server-side logic.

The backend processes tasks such as managing users, handling orders, and communicating with the database.

REST APIs are created to add food items, place orders, update menu details, and fetch order history.

When a user places an order, the cart data is sent from the frontend to the backend using API calls (Axios/Fetch).

🗄 Database (SQL)

I used an SQL database to store and manage structured data securely.

The database stores information such as food items, categories, customer details, cart data, orders, and payment records.

The Orders table stores all placed order details, while the Cart table maintains cart-related data.

SQL ensures reliable and structured storage of application data.

🔔 Pop-up / Modal

I used Bootstrap Modal to show order confirmation pop-ups.

The modal is controlled using React state to open and close it after successful order placement.

This improves user interaction and provides clear feedback to the user.

🛠 Key Concepts Used

State – To manage UI changes and track selected items

Props – To pass data between components

Redux – For global cart state management

onClick Events – For user interactions like adding items and placing orders

API Calls – For frontend-backend communication

SQL Database – For permanent and secure data storage

## 🚀 Features
- Categorized food menu (Indian, Junk Food, Chat Food)
- Dish search functionality
- Responsive user interface
- User-friendly design
- Fast and smooth navigation

## 🛠️ Technologies Used
- React.js
- JavaScript
- HTML
- CSS
- bootstrap

## 📂 Project Structure
- `src/components` – Contains all React components
- `src/assets` – Stores images and static files
- `App.js` – Main application file
- `index.js` – Entry point of the application

## ▶️ How to Run the Project
1. Clone the repository  
   ```bash
   git clone https://github.com/sonalik18/Food-Ordering-System.git
