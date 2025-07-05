"use client";

import { useDispatch } from "react-redux";
import { signIn } from "../store/slices/authSlice";
import { useState } from "react";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = () => {
    if (username.trim() && password.trim()) {
      dispatch(signIn(username)); // Pass only the username as the token
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#f0f4f8", padding: "20px" }}>
      <div style={{ maxWidth: "400px", width: "100%", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", padding: "20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Login</h1>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button
          onClick={handleSignIn}
          style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Sign In
        </button>
        {error && <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>{error}</p>}
      </div>
    </div>
  );
}
