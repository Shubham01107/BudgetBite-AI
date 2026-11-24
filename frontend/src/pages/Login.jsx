
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChefHat, Mail, Lock, ArrowRight, Eye, EyeOff
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import "../App.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email.trim(), password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f8f8f2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "30px 20px"
    }}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "#fff",
          padding: "42px",
          borderRadius: "24px",
          boxShadow: "0 15px 50px rgba(0,0,0,0.07)"
        }}
      >
        <Link to="/" style={{
          textDecoration: "none",
          color: "#174b37",
          display: "flex",
          alignItems: "center",
          gap: "9px",
          fontWeight: "800",
          fontSize: "22px"
        }}>
          <ChefHat size={30} /> BudgetBite
        </Link>

        <div style={{ marginTop: "35px" }}>
          <p style={{ color: "#26845b", fontWeight: "700" }}>
            WELCOME BACK
          </p>

          <h1 style={{
            fontSize: "32px",
            color: "#17251e",
            margin: "10px 0"
          }}>
            Login to your account
          </h1>

          <p style={{ color: "#777", lineHeight: "1.6" }}>
            Your smarter food planning journey continues here.
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ marginTop: "30px" }}>
          <label style={{ fontWeight: "600", color: "#263b30" }}>
            Email Address
          </label>

          <div style={inputStyle}>
            <Mail size={19} color="#829187" />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={fieldStyle}
            />
          </div>

          <label style={{
            fontWeight: "600",
            color: "#263b30",
            display: "block",
            marginTop: "22px"
          }}>
            Password
          </label>

          <div style={inputStyle}>
            <Lock size={19} color="#829187" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={fieldStyle}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "#829187"
              }}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          {error && (
            <p style={{
              color: "#c0392b",
              background: "#fff0ed",
              padding: "12px",
              borderRadius: "10px",
              fontSize: "14px",
              marginTop: "16px"
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...buttonStyle,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Logging in..." : "Login to BudgetBite"}
            {!loading && <ArrowRight size={19} />}
          </button>
        </form>

        <p style={{
          textAlign: "center",
          color: "#777",
          marginTop: "25px"
        }}>
          Don't have an account?{" "}
          <Link to="/register" style={{
            color: "#218354",
            fontWeight: "700",
            textDecoration: "none"
          }}>
            Create Account
          </Link>
        </p>

        <p style={{ textAlign: "center", marginTop: "25px" }}>
          <Link to="/" style={{
            color: "#829187",
            textDecoration: "none",
            fontSize: "14px"
          }}>
            ← Back to Home
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

const inputStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  border: "1px solid #e5e9e5",
  borderRadius: "12px",
  padding: "14px",
  marginTop: "10px",
  background: "#fcfdfb"
};

const fieldStyle = {
  border: "none",
  outline: "none",
  background: "transparent",
  width: "100%",
  fontSize: "14px",
  color: "#17251e"
};

const buttonStyle = {
  width: "100%",
  marginTop: "28px",
  padding: "16px",
  border: "none",
  borderRadius: "12px",
  background: "#174b37",
  color: "white",
  fontSize: "15px",
  fontWeight: "700",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px"
};

export default Login;
