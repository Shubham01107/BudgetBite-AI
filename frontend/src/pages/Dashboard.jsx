
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChefHat, LayoutDashboard, CalendarDays, ShoppingBasket,
  Wallet, TrendingUp, Sparkles, Settings, LogOut,
  Utensils, ArrowUpRight, Menu, X
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userName = user?.name || "there";

  const stats = [
    { title: "Weekly Budget", value: "₹1,500", detail: "Your planned spending", icon: Wallet },
    { title: "Meals Planned", value: "21", detail: "Across 7 days", icon: Utensils },
    { title: "Grocery Items", value: "18", detail: "On your shopping list", icon: ShoppingBasket },
    { title: "Budget Saved", value: "₹320", detail: "Compared to last week", icon: TrendingUp }
  ];

  const meals = [
    { name: "Paneer Rice Bowl", time: "Lunch", price: "₹45", emoji: "🍚" },
    { name: "Vegetable Poha", time: "Breakfast", price: "₹25", emoji: "🥗" },
    { name: "Dal & Roti", time: "Dinner", price: "₹35", emoji: "🍛" }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f7f8f3", color: "#1b3025" }}>

      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{
          position: "fixed", inset: 0, background: "#0006", zIndex: 5
        }} />
      )}

      <aside style={{
        width: "245px", background: "#153e2d", color: "white",
        padding: "28px 20px", display: "flex", flexDirection: "column",
        position: "fixed", top: 0, bottom: 0,
        left: menuOpen ? 0 : "-270px",
        zIndex: 10, transition: "left .3s ease"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "22px", fontWeight: "800" }}>
          <ChefHat size={30} /> BudgetBite
          <button onClick={() => setMenuOpen(false)} style={closeStyle}><X /></button>
        </div>

        <p style={sectionStyle}>WORKSPACE</p>

        <SidebarItem to="/dashboard" icon={<LayoutDashboard />} label="Dashboard" active />
        <SidebarItem to="/meal-planner" icon={<CalendarDays />} label="Meal Planner" />
        <SidebarItem to="/grocery" icon={<ShoppingBasket />} label="Grocery List" />
        <SidebarItem to="/budget" icon={<Wallet />} label="Budget Tracker" />
        <SidebarItem to="/analytics" icon={<TrendingUp />} label="Analytics" />

        <div style={{ marginTop: "auto" }}>
          <SidebarItem to="/dashboard" icon={<Settings />} label="Settings" />
          <SidebarItem
            to="/login"
            icon={<LogOut />}
            label="Logout"
            onClick={handleLogout}
          />
        </div>
      </aside>

      <main style={{ width: "100%", padding: "28px clamp(18px, 4vw, 48px)", maxWidth: "1500px", margin: "0 auto" }}>

        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "15px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button onClick={() => setMenuOpen(true)} style={menuButton}><Menu /></button>
            <div>
              <p style={{ color: "#6d8174", margin: 0, fontSize: "13px" }}>YOUR FOOD OVERVIEW</p>
              <h1 style={{ fontSize: "27px", margin: "6px 0" }}>
                Good evening, {userName}! 👋
              </h1>
              <p style={{ color: "#809087", fontSize: "13px", margin: "4px 0 0" }}>
                {user?.email || ""}
              </p>
            </div>
          </div>

          <Link to="/" style={{ textDecoration: "none", color: "#286344", fontWeight: "700" }}>
            Visit Home ↗
          </Link>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: "30px", padding: "30px", borderRadius: "22px",
            background: "linear-gradient(110deg, #174b37, #28764e)",
            color: "white", display: "flex", justifyContent: "space-between",
            alignItems: "center", gap: "20px", flexWrap: "wrap"
          }}>
          <div>
            <p style={{ color: "#c8e4d2", fontWeight: "700", fontSize: "13px" }}>
              WELCOME TO YOUR SMART FOOD COMPANION
            </p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", margin: "8px 0" }}>
              Hey {userName}, eat well. Spend smart.
            </h2>
            <p style={{ color: "#e0eee4", marginBottom: "22px" }}>
              Your meals, groceries and budget — all in one place.
            </p>
            <Link to="/meal-planner" style={heroButton}>
              <Sparkles size={17} /> Generate Meal Plan
            </Link>
          </div>
          <div style={{ fontSize: "90px" }}>🥑</div>
        </motion.section>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "16px", marginTop: "25px" }}>
          {stats.map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * .08 }}
              style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#6c8173", fontSize: "13px" }}>{item.title}</span>
                <item.icon size={20} color="#25804f" />
              </div>
              <h2 style={{ fontSize: "27px", margin: "15px 0 5px" }}>{item.value}</h2>
              <p style={{ color: "#819087", fontSize: "12px", margin: 0 }}>{item.detail}</p>
            </motion.div>
          ))}
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "20px", marginTop: "25px" }}>

          <div style={cardStyle}>
            <h2 style={{ fontSize: "19px", margin: 0 }}>Today's Meals</h2>
            <p style={{ color: "#809087", fontSize: "13px" }}>Your meal schedule</p>

            {meals.map(meal => (
              <div key={meal.name} style={{
                display: "flex", alignItems: "center", gap: "13px",
                padding: "14px 0", borderTop: "1px solid #edf0eb"
              }}>
                <div style={{ fontSize: "28px", background: "#f2f6ef", padding: "10px", borderRadius: "12px" }}>{meal.emoji}</div>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: "14px" }}>{meal.name}</strong>
                  <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#829087" }}>{meal.time}</p>
                </div>
                <strong>{meal.price}</strong>
              </div>
            ))}
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: "19px", marginTop: 0 }}>Quick Actions</h2>
            <p style={{ color: "#809087", fontSize: "13px" }}>Make food planning easier</p>

            <ActionButton to="/meal-planner" icon={<Sparkles />} title="Generate a Meal Plan" subtitle="Create a weekly plan" />
            <ActionButton to="/grocery" icon={<ShoppingBasket />} title="Manage Groceries" subtitle="Track your shopping list" />
            <ActionButton to="/budget" icon={<TrendingUp />} title="View Spending" subtitle="Understand your expenses" />
          </div>
        </section>

        <p style={{ textAlign: "center", color: "#91a096", fontSize: "12px", marginTop: "35px" }}>
          BudgetBite AI · Eat smart, live better.
        </p>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, to, onClick }) {
  return (
    <Link to={to} onClick={onClick} style={{ textDecoration: "none" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "13px",
        padding: "13px 12px", borderRadius: "10px",
        marginTop: "7px", background: active ? "#ffffff20" : "transparent",
        color: active ? "white" : "#c4d6ca",
        fontSize: "14px", cursor: "pointer"
      }}>
        {icon} {label}
      </div>
    </Link>
  );
}

function ActionButton({ icon, title, subtitle, to }) {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "13px",
        padding: "15px 10px", borderTop: "1px solid #edf0eb"
      }}>
        <span style={{ color: "#25804f" }}>{icon}</span>
        <span>
          <strong style={{ display: "block", color: "#243a2d", fontSize: "14px" }}>{title}</strong>
          <small style={{ color: "#819087" }}>{subtitle}</small>
        </span>
        <ArrowUpRight size={17} style={{ marginLeft: "auto", color: "#829087" }} />
      </div>
    </Link>
  );
}

const cardStyle = {
  background: "white", border: "1px solid #edf0eb",
  borderRadius: "18px", padding: "22px",
  boxShadow: "0 5px 20px rgba(30,60,40,.035)"
};

const sectionStyle = {
  color: "#91b39d", fontSize: "11px", fontWeight: "700",
  letterSpacing: "1.5px", marginTop: "45px"
};

const menuButton = {
  border: "1px solid #e3e9e3", background: "white",
  borderRadius: "10px", padding: "9px", cursor: "pointer"
};

const closeStyle = {
  marginLeft: "auto", border: "none", background: "transparent",
  color: "white", cursor: "pointer"
};

const heroButton = {
  display: "inline-flex", alignItems: "center", gap: "9px",
  padding: "13px 18px", borderRadius: "10px",
  background: "#e0f1e4", color: "#174b37",
  fontWeight: "700", textDecoration: "none"
};

export default Dashboard;
