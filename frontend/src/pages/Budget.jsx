import { useEffect, useMemo, useState } from "react";
import {
  Wallet, TrendingUp, TrendingDown, Plus, Trash2,
  IndianRupee, PiggyBank, CalendarDays, X
} from "lucide-react";
const categories = ["Food", "Groceries", "Travel", "Education", "Shopping", "Entertainment", "Other"];
export default function Budget() {
  const [budget, setBudget] = useState(() => Number(localStorage.getItem("budgetbite_monthly_budget")) || 5000);
  const [expenses, setExpenses] = useState(() => {
    try { return JSON.parse(localStorage.getItem("budgetbite_expenses")) || []; }
    catch { return []; }
  });
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  useEffect(() => {
    localStorage.setItem("budgetbite_monthly_budget", String(budget));
  }, [budget]);
  useEffect(() => {
    localStorage.setItem("budgetbite_expenses", JSON.stringify(expenses));
  }, [expenses]);
  const totalSpent = useMemo(
    () => expenses.reduce((sum, item) => sum + Number(item.amount), 0),
    [expenses]
  );
  const remaining = budget - totalSpent;
  const percentage = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0;
  const categoryTotals = categories.map(cat => ({
    name: cat,
    amount: expenses.filter(e => e.category === cat).reduce((sum, e) => sum + Number(e.amount), 0)
  })).filter(item => item.amount > 0).sort((a, b) => b.amount - a.amount);
  function addExpense(e) {
    e.preventDefault();
    if (!title.trim() || !amount || Number(amount) <= 0) return;
    setExpenses(prev => [{
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      category,
      date
    }, ...prev]);
    setTitle("");
    setAmount("");
    setCategory("Food");
    setShowForm(false);
  }
  const money = value => "₹" + Number(value).toLocaleString("en-IN");
  return (
    <div className="budget-page">
      <style>{`
        .budget-page{max-width:1250px;margin:auto;padding:28px;color:#17251f}
        .budget-hero{background:linear-gradient(120deg,#123d30,#21664c);padding:30px;border-radius:24px;color:white;display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
        .budget-hero h1{font-size:30px;margin:10px 0}.budget-hero p{color:#d3e8dc;margin:0}
        .budget-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 18px;border:0;border-radius:12px;font-weight:700;cursor:pointer;background:#d5f36a;color:#173528}
        .budget-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin:22px 0}
        .budget-stat{background:white;border:1px solid #e8eee9;border-radius:18px;padding:21px}
        .budget-stat-top{display:flex;align-items:center;justify-content:space-between;color:#78877e;font-size:13px}
        .budget-stat strong{display:block;font-size:27px;margin-top:13px;color:#17251f}
        .budget-layout{display:grid;grid-template-columns:1.1fr .9fr;gap:18px}
        .budget-card{background:white;border:1px solid #e8eee9;border-radius:20px;padding:22px}
        .budget-card h2{font-size:19px;margin:0 0 20px}
        .budget-progress{height:12px;background:#edf2ed;border-radius:20px;overflow:hidden;margin:15px 0}
        .budget-progress div{height:100%;background:#258453;border-radius:20px;transition:width .3s}
        .budget-input{width:100%;box-sizing:border-box;padding:12px;border:1px solid #dce6dd;border-radius:10px;font:inherit;background:white}
        .budget-form{background:#f7faf7;border:1px solid #e6eee7;padding:20px;border-radius:16px;margin-bottom:20px}
        .budget-fields{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .budget-fields label{display:block;font-size:12px;color:#78877e;margin-bottom:6px}
        .budget-field{min-width:0}
        .budget-expense{display:flex;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid #edf1ed}
        .budget-expense:last-child{border:0}
        .budget-expense-icon{width:42px;height:42px;display:grid;place-items:center;border-radius:13px;background:#edf6ef;color:#24744b;flex-shrink:0}
        .budget-expense-info{flex:1;min-width:0}
        .budget-expense-info strong{display:block}.budget-expense-info small{color:#849188}
        .budget-category-row{margin:17px 0}
        .budget-category-head{display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px}
        .budget-category-track{height:8px;background:#edf2ed;border-radius:20px;overflow:hidden}
        .budget-category-track div{height:100%;background:#32845b;border-radius:20px}
        .budget-delete{border:0;background:#f4f7f4;color:#718078;border-radius:9px;padding:9px;cursor:pointer}
        .budget-empty{text-align:center;padding:30px 8px;color:#87948b}
        @media(max-width:800px){.budget-layout{grid-template-columns:1fr}}
        @media(max-width:600px){.budget-page{padding:15px}.budget-stats{grid-template-columns:1fr}.budget-hero h1{font-size:25px}.budget-fields{grid-template-columns:1fr}}
      `}</style>
      <section className="budget-hero">
        <div>
          <div style={{display:"flex",alignItems:"center",gap:8,color:"#d5f36a",fontWeight:700}}>
            <PiggyBank size={18}/> SMART MONEY TRACKER
          </div>
          <h1>Budget & Expenses 💰</h1>
          <p>Track your spending, manage your monthly budget and save smarter.</p>
        </div>
        <button className="budget-btn" onClick={() => setShowForm(!showForm)}>
          <Plus size={18}/> Add Expense
        </button>
      </section>
      <section className="budget-stats">
        <div className="budget-stat">
          <div className="budget-stat-top"><span>Monthly Budget</span><Wallet size={19}/></div>
          <strong>{money(budget)}</strong>
        </div>
        <div className="budget-stat">
          <div className="budget-stat-top"><span>Total Spent</span><TrendingDown size={19}/></div>
          <strong>{money(totalSpent)}</strong>
        </div>
        <div className="budget-stat">
          <div className="budget-stat-top"><span>Remaining Balance</span><TrendingUp size={19}/></div>
          <strong style={{color:remaining < 0 ? "#d34c4c" : "#238653"}}>{money(remaining)}</strong>
        </div>
      </section>
      {showForm && (
        <form className="budget-form" onSubmit={addExpense}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <strong>Add a new expense</strong>
            <button type="button" className="budget-delete" onClick={() => setShowForm(false)}><X size={18}/></button>
          </div>
          <div className="budget-fields">
            <div className="budget-field">
              <label>Expense name</label>
              <input className="budget-input" placeholder="e.g. Lunch" value={title} onChange={e=>setTitle(e.target.value)} required/>
            </div>
            <div className="budget-field">
              <label>Amount (₹)</label>
              <input className="budget-input" type="number" min="1" placeholder="e.g. 150" value={amount} onChange={e=>setAmount(e.target.value)} required/>
            </div>
            <div className="budget-field">
              <label>Category</label>
              <select className="budget-input" value={category} onChange={e=>setCategory(e.target.value)}>
                {categories.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="budget-field">
              <label>Date</label>
              <input className="budget-input" type="date" value={date} onChange={e=>setDate(e.target.value)} required/>
            </div>
          </div>
          <button className="budget-btn" style={{marginTop:16}} type="submit"><Plus size={17}/> Save Expense</button>
        </form>
      )}
      <section className="budget-layout">
        <div className="budget-card">
          <h2>Monthly Budget Overview</h2>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
            <span style={{color:"#78877e",fontSize:13}}>Your monthly spending limit</span>
            <strong>{Math.round(percentage)}%</strong>
          </div>
          <div className="budget-progress">
            <div style={{width:percentage+"%",background:percentage>=100?"#d34c4c":"#258453"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#78877e"}}>
            <span>{money(totalSpent)} spent</span><span>{money(budget)} budget</span>
          </div>
          <div style={{marginTop:24}}>
            <label style={{display:"block",fontSize:13,color:"#78877e",marginBottom:8}}>Update monthly budget</label>
            <div style={{display:"flex",gap:10}}>
              <input className="budget-input" type="number" min="0" value={budget} onChange={e=>setBudget(Number(e.target.value))}/>
            </div>
          </div>
          <p style={{fontSize:12,color:remaining<0?"#d34c4c":"#238653",marginTop:16}}>
            {remaining < 0 ? "You have exceeded your budget." : "You are within your monthly budget. Keep it up!"}
          </p>
        </div>
        <div className="budget-card">
          <h2>Category-wise Spending</h2>
          {categoryTotals.length === 0 ? (
            <div className="budget-empty">Your category breakdown will appear here after adding expenses.</div>
          ) : categoryTotals.map(item => (
            <div className="budget-category-row" key={item.name}>
              <div className="budget-category-head">
                <strong>{item.name}</strong><span>{money(item.amount)}</span>
              </div>
              <div className="budget-category-track">
                <div style={{width:Math.min(item.amount/Math.max(totalSpent,1)*100,100)+"%"}}/>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="budget-card" style={{marginTop:18}}>
        <h2>Recent Expenses</h2>
        {expenses.length === 0 ? (
          <div className="budget-empty">
            <CalendarDays size={34}/>
            <p>No expenses yet. Add your first expense to start tracking.</p>
          </div>
        ) : expenses.map(item => (
          <div className="budget-expense" key={item.id}>
            <div className="budget-expense-icon"><IndianRupee size={20}/></div>
            <div className="budget-expense-info">
              <strong>{item.title}</strong>
              <small>{item.category} · {item.date}</small>
            </div>
            <strong>{money(item.amount)}</strong>
            <button className="budget-delete" onClick={()=>setExpenses(prev=>prev.filter(e=>e.id!==item.id))} aria-label="Delete expense">
              <Trash2 size={17}/>
            </button>
          </div>
        ))}
      </section>
      <p style={{fontSize:12,color:"#849188",marginTop:14}}>Your budget and expenses are saved in this browser automatically.</p>
    </div>
  );
}
