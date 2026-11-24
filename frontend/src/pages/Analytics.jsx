import { useMemo } from "react";
import { BarChart3, TrendingUp, Wallet, ShoppingBag, Target, ArrowUpRight } from "lucide-react";
export default function Analytics() {
  const expenses = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("budgetbite_expenses")) || []; }
    catch { return []; }
  }, []);
  const groceryItems = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("budgetbite_grocery")) || []; }
    catch { return []; }
  }, []);
  const budget = Number(localStorage.getItem("budgetbite_monthly_budget")) || 5000;
  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const remaining = budget - totalSpent;
  const percentage = budget > 0 ? Math.min(totalSpent / budget * 100, 100) : 0;
  const money = value => "₹" + Number(value).toLocaleString("en-IN");
  const categoryData = Object.entries(
    expenses.reduce((acc, item) => {
      acc[item.category || "Other"] = (acc[item.category || "Other"] || 0) + Number(item.amount || 0);
      return acc;
    }, {})
  ).map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount);
  const today = new Date();
  const weekData = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (6 - index));
    const key = `${day.getFullYear()}-${String(day.getMonth()+1).padStart(2,"0")}-${String(day.getDate()).padStart(2,"0")}`;
    const amount = expenses.filter(e => e.date === key).reduce((sum, e) => sum + Number(e.amount || 0), 0);
    return { label: day.toLocaleDateString("en-IN", { weekday: "short" }), amount };
  });
  const maxWeek = Math.max(...weekData.map(d => d.amount), 1);
  const maxCategory = Math.max(...categoryData.map(d => d.amount), 1);
  const groceryTotal = groceryItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const average = expenses.length ? totalSpent / expenses.length : 0;
  return (
    <div className="analytics-page">
      <style>{`
        .analytics-page{max-width:1250px;margin:auto;padding:28px;color:#17251f}
        .analytics-hero{background:linear-gradient(120deg,#123d30,#21664c);padding:30px;border-radius:24px;color:white;display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
        .analytics-hero h1{font-size:30px;margin:10px 0}.analytics-hero p{color:#d3e8dc;margin:0}
        .analytics-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:15px;margin:22px 0}
        .analytics-stat,.analytics-card{background:white;border:1px solid #e8eee9;border-radius:18px;padding:21px}
        .analytics-stat small{color:#78877e}.analytics-stat strong{display:block;font-size:25px;margin-top:10px}
        .analytics-stat-icon{display:flex;justify-content:space-between;color:#28744d}
        .analytics-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:18px}
        .analytics-card h2{font-size:19px;margin:0 0 8px}.analytics-muted{color:#849188;font-size:13px}
        .analytics-bars{height:220px;display:flex;align-items:flex-end;justify-content:space-around;gap:12px;padding:22px 5px 0}
        .analytics-bar-wrap{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:8px;min-width:0}
        .analytics-bar{width:min(38px,75%);background:linear-gradient(180deg,#60b786,#21664c);border-radius:9px 9px 3px 3px;min-height:3px}
        .analytics-bar-label{font-size:12px;color:#849188}
        .analytics-cat{margin:20px 0}
        .analytics-cat-head{display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px}
        .analytics-track{height:9px;border-radius:20px;background:#edf2ed;overflow:hidden}
        .analytics-track div{height:100%;background:#32845b;border-radius:20px}
        .analytics-insight{background:#f1f7ed;border-radius:15px;padding:17px;margin-top:18px;color:#315d40}
        .analytics-empty{text-align:center;padding:35px 10px;color:#849188}
        @media(max-width:900px){.analytics-stats{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:700px){.analytics-page{padding:15px}.analytics-grid{grid-template-columns:1fr}.analytics-hero h1{font-size:25px}}
        @media(max-width:420px){.analytics-stats{grid-template-columns:1fr}}
      `}</style>
      <section className="analytics-hero">
        <div>
          <div style={{display:"flex",alignItems:"center",gap:8,color:"#d5f36a",fontWeight:700}}>
            <BarChart3 size={18}/> SMART FINANCIAL INSIGHTS
          </div>
          <h1>Analytics Dashboard 📊</h1>
          <p>Understand your spending habits and make smarter money decisions.</p>
        </div>
        <div style={{color:"#d5f36a",fontWeight:700}}>YOUR OVERVIEW</div>
      </section>
      <section className="analytics-stats">
        <div className="analytics-stat">
          <div className="analytics-stat-icon"><small>Total Expenses</small><TrendingUp size={19}/></div>
          <strong>{money(totalSpent)}</strong>
        </div>
        <div className="analytics-stat">
          <div className="analytics-stat-icon"><small>Remaining Budget</small><Wallet size={19}/></div>
          <strong style={{color:remaining<0?"#d34c4c":"#238653"}}>{money(remaining)}</strong>
        </div>
        <div className="analytics-stat">
          <div className="analytics-stat-icon"><small>Average Expense</small><ArrowUpRight size={19}/></div>
          <strong>{money(average)}</strong>
        </div>
        <div className="analytics-stat">
          <div className="analytics-stat-icon"><small>Grocery Estimate</small><ShoppingBag size={19}/></div>
          <strong>{money(groceryTotal)}</strong>
        </div>
      </section>
      <section className="analytics-grid">
        <div className="analytics-card">
          <h2>Weekly Spending</h2>
          <p className="analytics-muted">Your expenses over the last 7 days</p>
          {expenses.length === 0 ? (
            <div className="analytics-empty">Add expenses in Budget Tracker to see your chart.</div>
          ) : (
            <div className="analytics-bars">
              {weekData.map(day => (
                <div className="analytics-bar-wrap" key={day.label}>
                  <span style={{fontSize:11,color:"#78877e"}}>{day.amount ? money(day.amount) : ""}</span>
                  <div className="analytics-bar" style={{height:Math.max(day.amount/maxWeek*145,3)}}/>
                  <span className="analytics-bar-label">{day.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="analytics-card">
          <h2>Budget Performance</h2>
          <p className="analytics-muted">Your monthly budget utilization</p>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:30}}>
            <span style={{color:"#78877e",fontSize:13}}>Budget used</span>
            <strong style={{fontSize:25}}>{Math.round(percentage)}%</strong>
          </div>
          <div className="analytics-track" style={{height:13,marginTop:12}}>
            <div style={{width:percentage+"%",background:percentage>=100?"#d34c4c":"#32845b"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:12,fontSize:13,color:"#78877e"}}>
            <span>Spent: {money(totalSpent)}</span><span>Budget: {money(budget)}</span>
          </div>
          <div className="analytics-insight">
            <div style={{display:"flex",gap:8,alignItems:"center",fontWeight:700}}>
              <Target size={18}/> Spending Insight
            </div>
            <p style={{fontSize:13,lineHeight:1.6,marginBottom:0}}>
              {totalSpent === 0 ? "Start adding expenses to receive useful spending insights." :
               remaining < 0 ? "Your spending has exceeded the monthly budget. Review your expenses." :
               percentage >= 80 ? "You have used most of your budget. Keep an eye on upcoming expenses." :
               "You are currently within your budget. Keep tracking your spending!"}
            </p>
          </div>
        </div>
      </section>
      <section className="analytics-card" style={{marginTop:18}}>
        <h2>Category-wise Breakdown</h2>
        <p className="analytics-muted">See where your money goes</p>
        {categoryData.length === 0 ? (
          <div className="analytics-empty">Your category breakdown will appear after adding expenses.</div>
        ) : categoryData.map(item => (
          <div className="analytics-cat" key={item.name}>
            <div className="analytics-cat-head">
              <strong>{item.name}</strong>
              <span>{money(item.amount)} · {Math.round(item.amount/Math.max(totalSpent,1)*100)}%</span>
            </div>
            <div className="analytics-track">
              <div style={{width:item.amount/maxCategory*100+"%"}}/>
            </div>
          </div>
        ))}
      </section>
      <p className="analytics-muted" style={{marginTop:14}}>Analytics are calculated from your saved Budget and Grocery data in this browser.</p>
    </div>
  );
}
