
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChefHat,
  ChevronDown,
  Leaf,
  Menu,
  Moon,
  Sparkles,
  Sun,
  Wallet,
  X,
  Heart,
  Utensils,
  TrendingDown,
  ShieldCheck,
  ShoppingBasket,
} from "lucide-react";

import "../App.css";

const features = [
  {
    icon: Sparkles,
    title: "AI meal planning",
    description:
      "Get a personalized 7-day meal plan based on your budget, food preferences and routine.",
    tag: "SMART PLANNING",
  },
  {
    icon: Wallet,
    title: "Budget intelligence",
    description:
      "Know where your money goes with weekly spending insights and budget tracking.",
    tag: "SPEND SMARTER",
  },
  {
    icon: ShoppingBasket,
    title: "Smart grocery list",
    description:
      "Bring ingredients together in one organized list and make shopping easier.",
    tag: "LESS WASTE",
  },
  {
    icon: Heart,
    title: "Nutrition insights",
    description:
      "Explore estimated nutrition information and make more informed meal choices.",
    tag: "EAT BETTER",
  },
];

const meals = [
  { day: "MON", name: "Paneer rice bowl", type: "Lunch · 25 min", price: "₹45", emoji: "🍚" },
  { day: "TUE", name: "Veggie masala wrap", type: "Lunch · 15 min", price: "₹32", emoji: "🌯" },
  { day: "WED", name: "Dal & jeera rice", type: "Lunch · 20 min", price: "₹38", emoji: "🥘" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Home() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={`app ${dark ? "dark" : ""}`}>
      <header className="navbar">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-icon"><ChefHat size={21} /></span>
          <span>budget<span className="brand-green">bite</span></span>
          <span className="brand-ai">AI</span>
        </a>

        <nav className={`nav-links ${menuOpen ? "show-menu" : ""}`}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#features" onClick={closeMenu}>Features</a>
          <a href="#how-it-works" onClick={closeMenu}>How it works</a>
          <a href="#about" onClick={closeMenu}>About</a>

          <button className="mobile-theme" onClick={() => setDark(!dark)}>
            {dark ? <Sun size={17} /> : <Moon size={17} />}
            {dark ? "Light mode" : "Dark mode"}
          </button>

          <a className="mobile-start" href="#get-started" onClick={closeMenu}>
            Get started <ArrowUpRight size={16} />
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-btn"
            aria-label="Toggle theme"
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a className="login-link" href="/login">Log in</a>

          <a className="nav-button" href="/register">
            Get started <ArrowUpRight size={16} />
          </a>

          <button
            className="menu-btn"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7 }}
          >
            <div className="announcement">
              <span className="announcement-dot" />
              YOUR SMARTER WAY TO EAT
              <ArrowUpRight size={13} />
            </div>

            <h1>
              Good food.
              <br />
              <span>Better budget.</span>
              <br />
              Zero stress.
            </h1>

            <p className="hero-description">
              Your personal AI meal planner for hostel life. Eat what you love,
              stay within your budget, and make every meal count.
            </p>

            <div className="hero-buttons">
              <a href="/register" className="primary-button">
                Build my meal plan <ArrowRight size={17} />
              </a>
              <a href="#how-it-works" className="secondary-button">
                See how it works <span className="play-icon">▶</span>
              </a>
            </div>

            <div className="hero-proof">
              <div className="proof-avatars">
                <span>🍜</span><span>🥗</span><span>🍱</span>
              </div>
              <div>
                <strong>Made for everyday living</strong>
                <small>Simple planning. Smarter spending.</small>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="visual-orb orb-one" />
            <div className="visual-orb orb-two" />

            <div className="floating-note note-top">
              <span className="note-icon"><TrendingDown size={17} /></span>
              <div>
                <small>Smart spending</small>
                <strong>Budget friendly</strong>
              </div>
            </div>

            <div className="meal-dashboard">
              <div className="dashboard-heading">
                <div>
                  <span className="dashboard-kicker">YOUR WEEK AT A GLANCE</span>
                  <h3>Meal overview</h3>
                </div>
                <span className="dashboard-spark"><Sparkles size={17} /></span>
              </div>

              <div className="food-photo">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=85"
                  alt="Fresh healthy meal bowl"
                />
                <div className="photo-label">
                  <span>AI PICK OF THE DAY</span>
                  <strong>Fresh & balanced</strong>
                </div>
              </div>

              <div className="budget-overview">
                <div>
                  <small>WEEKLY FOOD BUDGET</small>
                  <h2>₹850 <span>/ ₹1,000</span></h2>
                </div>
                <span className="budget-percent">85%</span>
              </div>

              <div className="progress-track">
                <div className="progress-fill" />
              </div>

              <div className="budget-caption">
                <span>₹150 left to spend</span>
                <span>Weekly goal</span>
              </div>

              <div className="meal-list-heading">
                <strong>This week's picks</strong>
                <span>View all <ArrowUpRight size={13} /></span>
              </div>

              {meals.map((meal) => (
                <div className="meal-row" key={meal.day}>
                  <span className="meal-day">{meal.day}</span>
                  <span className="meal-emoji">{meal.emoji}</span>
                  <div className="meal-details">
                    <strong>{meal.name}</strong>
                    <small>{meal.type}</small>
                  </div>
                  <b>{meal.price}</b>
                </div>
              ))}
            </div>

            <div className="floating-note note-bottom">
              <span className="note-icon leaf-note"><Leaf size={18} /></span>
              <div>
                <small>Thoughtful choices</small>
                <strong>Eat well, daily</strong>
              </div>
              <Check size={17} className="note-check" />
            </div>
          </motion.div>
        </section>

        <section className="trust-strip">
          <span><ShieldCheck size={17} /> Built for hostel & PG life</span>
          <i />
          <span><Wallet size={17} /> Budget-first planning</span>
          <i />
          <span><Sparkles size={17} /> AI-powered suggestions</span>
        </section>

        <section className="features-section" id="features">
          <div className="section-heading">
            <span className="eyebrow">LESS PLANNING, MORE LIVING</span>
            <h2>
              Everything your meals need.
              <br />
              <span>Nothing they don't.</span>
            </h2>
            <p>
              From planning your plate to tracking your spending,
              your food routine just got a whole lot easier.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.article
                  className="feature-card"
                  key={feature.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="feature-top">
                    <span className="feature-icon"><Icon size={22} /></span>
                    <span className="feature-number">0{index + 1}</span>
                  </div>

                  <span className="feature-tag">{feature.tag}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>

                  <a href="/register">
                    Explore feature <ArrowUpRight size={15} />
                  </a>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="how-intro">
            <span className="eyebrow">THREE SIMPLE STEPS</span>
            <h2>
              Your food routine,
              <br />
              <span>figured out.</span>
            </h2>
            <p>
              No complicated planning. Just tell us what works for you,
              and let BudgetBite do the thinking.
            </p>
            <a href="/register" className="text-link">
              Let's get started <ArrowRight size={16} />
            </a>
          </div>

          <div className="steps-list">
            <div className="step-item">
              <span className="step-count">01</span>
              <div className="step-icon"><Wallet size={21} /></div>
              <div>
                <h3>Set your budget</h3>
                <p>Tell us your daily food budget and meal preferences.</p>
              </div>
              <ChevronDown className="step-arrow" size={19} />
            </div>

            <div className="step-item">
              <span className="step-count">02</span>
              <div className="step-icon"><Sparkles size={21} /></div>
              <div>
                <h3>Let AI plan your week</h3>
                <p>Get meal suggestions tailored to your needs and routine.</p>
              </div>
              <ChevronDown className="step-arrow" size={19} />
            </div>

            <div className="step-item">
              <span className="step-count">03</span>
              <div className="step-icon"><Utensils size={21} /></div>
              <div>
                <h3>Eat, track & enjoy</h3>
                <p>Follow your plan, manage groceries and keep an eye on spending.</p>
              </div>
              <Check className="step-arrow step-done" size={19} />
            </div>
          </div>
        </section>

        <section className="cta-section" id="get-started">
          <div className="cta-decoration"><span /><span /><span /></div>

          <div className="cta-content">
            <span className="cta-eyebrow">
              <Sparkles size={14} /> YOUR NEXT MEAL STARTS HERE
            </span>

            <h2>
              Make room for good food
              <br />
              and smarter choices.
            </h2>

            <p>Your budget has a plan. Your meals should too.</p>

            <a href="/register" className="cta-button">
              Get started for free <ArrowRight size={17} />
            </a>
          </div>

          <div className="cta-art">
            <ChefHat size={100} strokeWidth={1} />
          </div>
        </section>
      </main>

      <footer className="footer" id="about">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon"><ChefHat size={20} /></span>
          <span>budget<span className="brand-green">bite</span></span>
          <span className="brand-ai">AI</span>
        </a>

        <p>Eat better. Spend smarter. Live easier.</p>
        <span className="footer-copy">© 2026 BudgetBite AI</span>
      </footer>
    </div>
  );
}

export default Home;
