import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../register/register.css";


function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  function handleSubmit() {
    if (!password || (!isLogin && (!name || !email))) {
      setError("Please fill all fields");
      return;
    }

    if (!isLogin) {
      // REGISTER
      sessionStorage.setItem(
        "user",
        JSON.stringify({ name, email, password })
      );
      setError("");
      setIsLogin(true);
    } else {
      // LOGIN
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user) {
        setError("Please register first");
      } else if (
        user.name !== name ||
        user.password !== password
      ) {
        setError("Invalid credentials");
      } else {
        setError("");
        history.push("/home");
      }
    }
  }

  return (
    <div className="auth-body">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Register"}</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="auth-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Register" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
