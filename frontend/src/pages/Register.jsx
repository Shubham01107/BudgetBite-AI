
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChefHat, User, Mail, Lock, Eye, EyeOff, ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import "../App.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      await register(
        form.name.trim(),
        form.email.trim(),
        form.password
      );

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
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
          maxWidth: "460px",
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

        <div style={{ marginTop: "30px" }}>
          <p style={{ color: "#26845b", fontWeight: "700" }}>
            GET STARTED
          </p>

          <h1 style={{
            fontSize: "32px",
            color: "#17251e",
            margin: "10px 0"
          }}>
            Create your account
          </h1>

          <p style={{ color: "#777", lineHeight: "1.6" }}>
            Start planning smarter meals without stretching your budget.
          </p>
        </div>

        <form onSubmit={handleRegister} style={{ marginTop: "28px" }}>
          <label style={{ fontWeight: "600", color: "#263b30" }}>
            Full Name
          </label>

          <div style={inputStyle}>
            <User size={19} color="#829187" />
            <input
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
              style={fieldStyle}
            />
          </div>

          <label style={{
            fontWeight: "600",
            color: "#263b30",
            display: "block",
            marginTop: "18px"
          }}>
            Email Address
          </label>

          <div style={inputStyle}>
            <Mail size={19} color="#829187" />
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              style={fieldStyle}
            />
          </div>

          <label style={{
            fontWeight: "600",
            color: "#263b30",
            display: "block",
            marginTop: "18px"
          }}>
            Password
          </label>

          <div style={inputStyle}>
            <Lock size={19} color="#829187" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              minLength={8}
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
            {loading ? "Creating Account..." : "Create Account"}
            {!loading && <ArrowRight size={19} />}
          </button>
        </form>

        <p style={{
          textAlign: "center",
          color: "#777",
          marginTop: "24px"
        }}>
          Already have an account?{" "}
          <Link to="/login" style={{
            color: "#218354",
            fontWeight: "700",
            textDecoration: "none"
          }}>
            Login
          </Link>
        </p>

        <p style={{ textAlign: "center", marginTop: "22px" }}>
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
  marginTop: "9px",
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
  marginTop: "26px",
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

export default Register;
