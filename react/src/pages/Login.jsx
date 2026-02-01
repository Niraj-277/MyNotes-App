import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "https://mynotes-app-mgm7.onrender.com/api/v1";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token); //save token to browser
        navigate("/dashboard"); //Move to dashboard
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("something went wrong");
    }

    return (
      <div
        style={{
          maxWidth: "400px",
          margin: "50px auto",
          padding: "20px",
          border: "1px solid #ddd",
        }}
      >
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "black",
              color: "white",
            }}
          >
            Login
          </button>
        </form>
        <p>
          New here? <Link to="/register">Register</Link>
        </p>
      </div>
    );
  };
}

export default Login;
