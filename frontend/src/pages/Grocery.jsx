import { useEffect, useMemo, useState } from "react";
import { ShoppingBasket, Plus, Trash2, CheckCircle2, Circle, Search, Package, Sparkles, X } from "lucide-react";
const initialItems = [
  { id: 1, name: "Milk", category: "Dairy", quantity: "2 litres", price: 120, bought: false },
  { id: 2, name: "Rice", category: "Grains", quantity: "5 kg", price: 280, bought: false },
  { id: 3, name: "Eggs", category: "Protein", quantity: "12 pieces", price: 90, bought: true },
];
export default function Grocery() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("budgetbite_grocery")) || initialItems; }
    catch { return initialItems; }
  });
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  useEffect(() => { localStorage.setItem("budgetbite_grocery", JSON.stringify(items)); }, [items]);
  const total = useMemo(() => items.reduce((sum, item) => sum + Number(item.price || 0), 0), [items]);
  const boughtTotal = useMemo(() => items.filter(i => i.bought).reduce((sum, item) => sum + Number(item.price || 0), 0), [items]);
  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  const remaining = items.filter(i => !i.bought).length;
  const categories = ["Vegetables", "Fruits", "Dairy", "Grains", "Protein", "Snacks", "Other"];
  function addItem(e) {
    e.preventDefault();
    if (!name.trim() || !quantity.trim() || price === "") return;
    setItems(prev => [{ id: Date.now(), name: name.trim(), category, quantity: quantity.trim(), price: Number(price), bought: false }, ...prev]);
    setName(""); setQuantity(""); setPrice(""); setShowForm(false);
  }
  function toggleItem(id) {
    setItems(prev => prev.map(item => item.id === id ? { ...item, bought: !item.bought } : item));
  }
  return (
    <div className="grocery-page">
      <style>{`
        .grocery-page{color:#17251f;padding:28px;max-width:1250px;margin:auto;font-family:inherit}
        .grocery-hero{background:linear-gradient(120deg,#123d30,#21664c);color:white;border-radius:24px;padding:30px;display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
        .grocery-hero h1{font-size:30px;margin:10px 0}.grocery-hero p{color:#d3e8dc;margin:0}
        .grocery-btn{border:0;border-radius:12px;padding:12px 18px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:8px}
        .grocery-primary{background:#d5f36a;color:#173528}
        .grocery-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin:22px 0}
        .grocery-stat{background:white;border:1px solid #e8eee9;border-radius:18px;padding:20px}
        .grocery-stat small{color:#78877e}.grocery-stat strong{display:block;font-size:25px;margin-top:8px}
        .grocery-panel{background:white;border:1px solid #e8eee9;border-radius:20px;padding:22px}
        .grocery-toolbar{display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:20px}
        .grocery-search{display:flex;align-items:center;gap:9px;border:1px solid #e0e8e2;border-radius:12px;padding:11px 14px;min-width:220px}
        .grocery-search input{border:0;outline:0;width:100%;font:inherit}
        .grocery-item{display:flex;align-items:center;gap:13px;padding:15px 4px;border-bottom:1px solid #edf1ed}
        .grocery-item:last-child{border:0}.grocery-item-info{flex:1;min-width:0}
        .grocery-item-info strong{display:block}.grocery-item-info small{color:#849188}
        .grocery-item.bought strong{text-decoration:line-through;color:#9aa59d}
        .grocery-price{font-weight:700;white-space:nowrap}
        .grocery-icon-btn{border:0;background:#f4f7f4;color:#718078;border-radius:10px;padding:9px;cursor:pointer}
        .grocery-form{background:#f7faf7;border:1px solid #e6eee7;padding:20px;border-radius:16px;margin-bottom:20px}
        .grocery-fields{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:12px}
        .grocery-fields input,.grocery-fields select{width:100%;box-sizing:border-box;padding:12px;border:1px solid #dce6dd;border-radius:10px;background:white;font:inherit}
        .grocery-empty{text-align:center;padding:45px 10px;color:#87948b}
        @media(max-width:700px){.grocery-page{padding:15px}.grocery-stats{grid-template-columns:1fr}.grocery-fields{grid-template-columns:1fr 1fr}.grocery-hero h1{font-size:25px}}
        @media(max-width:420px){.grocery-fields{grid-template-columns:1fr}.grocery-price{font-size:13px}}
      `}</style>
      <section className="grocery-hero">
        <div>
          <div style={{display:"flex",alignItems:"center",gap:8,color:"#d5f36a",fontWeight:700}}><Sparkles size={17}/> SMART GROCERY PLANNER</div>
          <h1>Your Grocery Manager 🛒</h1>
          <p>Plan your shopping, track expenses and stay within your budget.</p>
        </div>
        <button className="grocery-btn grocery-primary" onClick={() => setShowForm(!showForm)}><Plus size={18}/> Add Item</button>
      </section>
      <section className="grocery-stats">
        <div className="grocery-stat"><small>Total Grocery Cost</small><strong>₹{total.toLocaleString("en-IN")}</strong></div>
        <div className="grocery-stat"><small>Items Remaining</small><strong>{remaining}</strong></div>
        <div className="grocery-stat"><small>Purchased Value</small><strong>₹{boughtTotal.toLocaleString("en-IN")}</strong></div>
      </section>
      <section className="grocery-panel">
        {showForm && <form className="grocery-form" onSubmit={addItem}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <strong>Add grocery item</strong>
            <button type="button" className="grocery-icon-btn" onClick={() => setShowForm(false)}><X size={18}/></button>
          </div>
          <div className="grocery-fields">
            <input placeholder="Item name" value={name} onChange={e=>setName(e.target.value)} required/>
            <select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select>
            <input placeholder="Quantity" value={quantity} onChange={e=>setQuantity(e.target.value)} required/>
            <input type="number" min="0" placeholder="Price (₹)" value={price} onChange={e=>setPrice(e.target.value)} required/>
          </div>
          <button className="grocery-btn grocery-primary" style={{marginTop:14}} type="submit"><Plus size={17}/> Save Item</button>
        </form>}
        <div className="grocery-toolbar">
          <div><h2 style={{margin:"0 0 5px",fontSize:21}}>Your Shopping List</h2><small style={{color:"#849188"}}>{items.length} items in your list</small></div>
          <div className="grocery-search"><Search size={17} color="#87948b"/><input placeholder="Search groceries..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
        </div>
        {filtered.length === 0 ? <div className="grocery-empty"><Package size={35}/><p>No grocery items found. Add your first item!</p></div> :
          filtered.map(item => <div className={`grocery-item ${item.bought ? "bought" : ""}`} key={item.id}>
            <button className="grocery-icon-btn" onClick={()=>toggleItem(item.id)} aria-label="Toggle purchased">
              {item.bought ? <CheckCircle2 color="#238653" size={23}/> : <Circle size={23}/>}
            </button>
            <div className="grocery-item-info"><strong>{item.name}</strong><small>{item.category} · {item.quantity}</small></div>
            <div className="grocery-price">₹{Number(item.price).toLocaleString("en-IN")}</div>
            <button className="grocery-icon-btn" onClick={()=>setItems(prev=>prev.filter(i=>i.id!==item.id))} aria-label="Delete item"><Trash2 size={17}/></button>
          </div>)}
        <div style={{display:"flex",justifyContent:"space-between",paddingTop:18,marginTop:8,borderTop:"1px solid #edf1ed",fontWeight:700}}>
          <span>Estimated total</span><span>₹{total.toLocaleString("en-IN")}</span>
        </div>
      </section>
      <p style={{color:"#849188",fontSize:12,marginTop:14}}>Your grocery list is saved in this browser automatically.</p>
    </div>
  );
}
