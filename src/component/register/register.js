import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./register.css";


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  function registerHandler() {
    if (!username || !email || !password) {
      setError("Please fill all fields");
    } else if (!email.includes("@")) {
      setError("Enter valid email");
    } else if (password.length < 5) {
      setError("Password must be at least 5 characters");
    } else {
      setError("");
      sessionStorage.setItem(
        "user",
        JSON.stringify({ name: username, email, password })
      );
      history.push("/login");
    }
  }

  return (
    <div className="auth-body">
      <div className="auth-card">
        <h2>Register</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={registerHandler}>Register</button>

        <p className="auth-text">
          Already have an account? <span onClick={() => history.push("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
