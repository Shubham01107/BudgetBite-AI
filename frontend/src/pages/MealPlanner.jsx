import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Clock, Flame, RefreshCw, Utensils, Replace } from "lucide-react";
import { apiRequest } from "../services/api";
const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const mealTypes = [
  { key: "breakfast", type: "Breakfast", time: "8:00 AM", share: 0.25, image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=700&q=85" },
  { key: "lunch", type: "Lunch", time: "1:00 PM", share: 0.40, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=700&q=85" },
  { key: "dinner", type: "Dinner", time: "8:00 PM", share: 0.35, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=700&q=85" }
];
const alternatives = {
  breakfast: {
    Vegetarian: ["Vegetable upma","Poha with peanuts","Besan chilla with curd","Oats with banana","Idli with sambar","Dalia with milk","Aloo paratha with curd"],
    "Non-Vegetarian": ["Boiled eggs with toast","Omelette with bread","Poha with boiled eggs","Egg paratha with curd","Oats with banana","Vegetable upma"]
  },
  lunch: {
    Vegetarian: ["Dal rice with salad","Rajma rice","Chole with roti","Vegetable pulao with raita","Kadhi rice","Soya chunks with roti","Mixed vegetable khichdi"],
    "Non-Vegetarian": ["Chicken rice bowl","Egg curry with rice","Rajma rice","Chicken curry with roti","Dal rice with salad","Egg pulao"]
  },
  dinner: {
    Vegetarian: ["Paneer bhurji with roti","Dal tadka with rice","Mixed dal with roti","Vegetable khichdi with curd","Soya curry with roti","Aloo gobi with roti"],
    "Non-Vegetarian": ["Chicken curry with roti","Egg bhurji with roti","Dal tadka with rice","Chicken stir fry with rice","Egg curry with roti","Soya chunks with roti"]
  }
};
export default function MealPlanner() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [budget, setBudget] = useState(1500);
  const [preferences, setPreferences] = useState("Vegetarian");
  const [mealPlan, setMealPlan] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [replacing, setReplacing] = useState("");
  const dailyBudget = Math.round(budget / 7);
  const loadPlans = async () => {
    try {
      const token = localStorage.getItem("budgetbite_access_token");
      const data = await apiRequest("/meals/my-plans", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.mealPlans?.length) {
        const latest = data.mealPlans[0];
        setMealPlan(latest);
        setBudget(latest.dailyBudget * 7);
        setPreferences(latest.preferences || "Vegetarian");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadPlans();
  }, []);
  const generateMealPlan = async () => {
    setGenerating(true);
    setError("");
    setMessage("");
    try {
      const token = localStorage.getItem("budgetbite_access_token");
      const data = await apiRequest("/meals/generate", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ dailyBudget, preferences })
      });
      setMealPlan(data.mealPlan);
      setSelectedDay(0);
      setReplacing("");
      setMessage("Your 7-day meal plan has been saved successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };
  const replaceMeal = async (key, newMeal) => {
    if (!mealPlan?._id) return;
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const token = localStorage.getItem("budgetbite_access_token");
      const data = await apiRequest(`/meals/${mealPlan._id}/replace`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          day: days[selectedDay],
          mealType: key,
          newMeal
        })
      });
      setMealPlan(data.mealPlan);
      setReplacing("");
      setMessage(`${key.charAt(0).toUpperCase() + key.slice(1)} saved permanently in your account!`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };
  const selectedMeals = mealPlan?.meals?.find(m => m.day === days[selectedDay]);
  const estimatedCost = selectedMeals?.estimatedCost || 0;
  const dailyCalories = selectedMeals?.calories || 0;
  return (
    <main style={S.page}>
      <header style={S.header}>
        <div>
          <p style={S.eyebrow}>YOUR PERSONAL FOOD ASSISTANT</p>
          <h1 style={S.title}>Meal Planner 🍽️</h1>
          <p style={S.muted}>Eat smarter. Save more. Enjoy every meal.</p>
        </div>
        <button onClick={generateMealPlan} disabled={generating} style={S.button}>
          <Sparkles size={18}/> {generating ? "Generating..." : "Generate Meal Plan"}
        </button>
      </header>
      {error && <div style={S.error}>{error}</div>}
      {message && <div style={S.success}>{message}</div>}
      <section style={S.budget}>
        <div>
          <p style={{margin:0,color:"#d6eadc",fontSize:12,fontWeight:700}}>YOUR WEEKLY FOOD BUDGET</p>
          <h2 style={{fontSize:36,margin:"9px 0"}}>₹{budget.toLocaleString("en-IN")}</h2>
          <p style={{margin:0,color:"#d6eadc"}}>Daily target: ₹{dailyBudget}</p>
        </div>
        <div style={{fontSize:55}}>💰</div>
      </section>
      <section style={S.panel}>
        <h2 style={S.heading}>Meal Preferences</h2>
        <p style={S.muted}>Choose your preferred food type.</p>
        <select value={preferences} onChange={e=>setPreferences(e.target.value)} style={S.select}>
          <option>Vegetarian</option>
          <option>Non-Vegetarian</option>
        </select>
      </section>
      <section style={S.panel}>
        <h2 style={S.heading}>Your Weekly Schedule</h2>
        <p style={S.muted}>Select a day to view your meals.</p>
        <div style={S.days}>
          {days.map((day,i)=><button key={day} onClick={()=>{setSelectedDay(i);setReplacing("");}} style={{...S.day,background:selectedDay===i?"#174b37":"#f1f5ef",color:selectedDay===i?"white":"#42564a"}}>
            <small>{day.slice(0,3)}</small>
            <strong>{i+1}</strong>
          </button>)}
        </div>
      </section>
      <section style={{marginTop:28}}>
        <div style={S.between}>
          <div>
            <h2 style={S.heading}>Meals for {days[selectedDay]}</h2>
            <p style={S.muted}>Fresh ideas for your day.</p>
          </div>
          {selectedMeals && <strong style={{color:"#25804f"}}>₹{estimatedCost} / day</strong>}
        </div>
        {loading ? <p style={S.muted}>Loading your meal plans...</p> :
        !mealPlan ? <div style={S.empty}>
          <div style={{fontSize:45}}>🍽️</div>
          <h3>No meal plan yet</h3>
          <p style={S.muted}>Generate your first 7-day meal plan.</p>
        </div> :
        selectedMeals ? <>
          <div style={S.grid}>
            {mealTypes.map(meal=><motion.article key={meal.key} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} whileHover={{y:-5}} style={S.card}>
              <div style={S.imageWrap}>
                <img src={meal.image} alt={meal.type} style={S.image} onError={e=>{e.currentTarget.style.display="none";}}/>
                <span style={S.imageLabel}>{meal.type}</span>
              </div>
              <div style={{padding:19}}>
                <p style={S.eyebrow}>{meal.time}</p>
                <h3 style={{fontSize:18,margin:"8px 0 15px",color:"#193c2b"}}>
                  {selectedMeals[meal.key]}
                </h3>
                <div style={S.between}>
                  <span style={S.muted}><Clock size={14}/> {meal.time}</span>
                  <strong style={{color:"#25804f"}}>₹{Math.round(estimatedCost*meal.share)}</strong>
                </div>
                <div style={{...S.between,marginTop:14,color:"#829087",fontSize:13}}>
                  <span><Flame size={14}/> {Math.round(dailyCalories*meal.share)} kcal</span>
                  <Utensils size={15}/>
                </div>
                <button onClick={()=>setReplacing(replacing===meal.key?"":meal.key)} style={S.replaceButton} disabled={saving}>
                  <Replace size={15}/> {replacing===meal.key?"Close options":"Replace Meal"}
                </button>
                {replacing===meal.key && (
                  <div style={S.options}>
                    <p style={S.muted}>{saving ? "Saving your replacement..." : "Choose an alternative:"}</p>
                    {(alternatives[meal.key][preferences] || alternatives[meal.key].Vegetarian)
                      .filter(option=>option!==selectedMeals[meal.key])
                      .map(option=><button key={option} disabled={saving} onClick={()=>replaceMeal(meal.key,option)} style={S.optionButton}>
                        {option}
                      </button>)}
                  </div>
                )}
              </div>
            </motion.article>)}
          </div>
          <section style={S.panel}>
            <h2 style={S.heading}>Daily Nutrition Estimate</h2>
            <p style={S.muted}>Estimated calories for {days[selectedDay]}.</p>
            <h2 style={{color:"#25804f",fontSize:30}}>{dailyCalories} kcal</h2>
          </section>
        </> : <p style={S.muted}>No meals available for this day.</p>}
      </section>
      <section style={S.panel}>
        <h2 style={S.heading}>Daily Budget Control</h2>
        <p style={S.muted}>Adjust your weekly food budget.</p>
        <div style={S.between}>
          <strong>Weekly Budget</strong>
          <strong style={{color:"#25804f"}}>₹{budget.toLocaleString("en-IN")}</strong>
        </div>
        <input type="range" min="500" max="5000" step="100" value={budget} onChange={e=>setBudget(Number(e.target.value))} style={{width:"100%",accentColor:"#25804f",marginTop:20}}/>
        <div style={S.between}><small>₹500</small><small>₹5,000</small></div>
      </section>
      <button onClick={generateMealPlan} disabled={generating} style={{...S.button,marginTop:22}}>
        <RefreshCw size={17}/> {generating?"Generating...":"Regenerate Weekly Plan"}
      </button>
      <p style={S.muted}>Meal substitutions are saved to your account. Cost and calorie figures are approximate estimates.</p>
    </main>
  );
}
const S = {
  page:{padding:"30px clamp(18px,4vw,45px)",background:"#f7f8f3",minHeight:"100vh",color:"#193c2b"},
  header:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20},
  title:{fontSize:32,margin:"8px 0"},
  eyebrow:{color:"#278052",fontSize:11,fontWeight:800,letterSpacing:1.2},
  muted:{color:"#829087",fontSize:13},
  button:{display:"flex",alignItems:"center",gap:9,padding:"14px 20px",border:0,borderRadius:12,background:"#174b37",color:"white",fontWeight:700,cursor:"pointer"},
  replaceButton:{display:"flex",alignItems:"center",justifyContent:"center",gap:7,width:"100%",padding:11,marginTop:17,border:"1px solid #cfe1d2",borderRadius:10,background:"#f3f8f2",color:"#216344",fontWeight:700,cursor:"pointer"},
  options:{marginTop:12,padding:12,background:"#f7faf6",borderRadius:12,border:"1px solid #e4eee3"},
  optionButton:{display:"block",width:"100%",textAlign:"left",padding:10,marginTop:7,border:"1px solid #e4ebe3",borderRadius:8,background:"white",color:"#244c36",cursor:"pointer"},
  budget:{marginTop:28,padding:28,borderRadius:20,background:"linear-gradient(110deg,#174b37,#28764e)",color:"white",display:"flex",justifyContent:"space-between",alignItems:"center"},
  panel:{background:"white",padding:23,borderRadius:18,border:"1px solid #edf0eb",marginTop:25},
  heading:{fontSize:19,margin:"0 0 6px"},
  select:{width:"100%",padding:13,marginTop:12,border:"1px solid #e5ebe4",borderRadius:10,background:"#fbfcfa"},
  days:{display:"grid",gridTemplateColumns:"repeat(7,minmax(0,1fr))",gap:9,marginTop:20},
  day:{border:0,borderRadius:12,padding:"12px 3px",display:"flex",flexDirection:"column",alignItems:"center",gap:6,cursor:"pointer"},
  between:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12},
  grid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:18,marginTop:18},
  card:{background:"white",border:"1px solid #edf0eb",borderRadius:18,overflow:"hidden",boxShadow:"0 8px 24px rgba(20,60,40,.06)"},
  imageWrap:{height:190,position:"relative",background:"#e8eee6"},
  image:{width:"100%",height:"100%",objectFit:"cover",display:"block"},
  imageLabel:{position:"absolute",bottom:12,left:12,background:"rgba(20,50,35,.88)",color:"white",padding:"7px 12px",borderRadius:20,fontSize:12,fontWeight:700},
  empty:{background:"white",padding:30,borderRadius:17,textAlign:"center",marginTop:18,border:"1px solid #edf0eb"},
  error:{background:"#fff0f0",color:"#b42318",padding:12,borderRadius:10,marginTop:18},
  success:{background:"#edf8ef",color:"#26754b",padding:12,borderRadius:10,marginTop:18}
};
