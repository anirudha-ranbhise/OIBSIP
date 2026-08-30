import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [base, setBase] = useState('Thin Crust');
  const [sauce, setSauce] = useState('Classic Tomato');
  const [cheese, setCheese] = useState('Mozzarella');
  const [vegetables, setVegetables] = useState([]);

  const prices = {
    base: { 'Thin Crust': 150, 'Cheese Burst': 220, 'Whole Wheat': 180 },
    sauce: { 'Classic Tomato': 40, 'Pesto': 60, 'Barbeque': 50 },
    cheese: { 'Mozzarella': 80, 'Cheddar': 90, 'Vegan Cheese': 100 },
    veg: { 'Mushrooms': 30, 'Olives': 40, 'Jalapenos': 30, 'Onions': 20 }
  };

  const handleVegToggle = (veg) => {
    if (vegetables.includes(veg)) {
      setVegetables(vegetables.filter(v => v !== veg));
    } else {
      setVegetables([...vegetables, veg]);
    }
  };

  const calculateTotal = () => {
    let total = prices.base[base] + prices.sauce[sauce] + prices.cheese[cheese];
    vegetables.forEach(v => { total += prices.veg[v]; });
    return total;
  };

  const handleCheckout = async () => {
    const orderData = {
      user: "64a5f2e1bcf123456789abcd", // Mock User ID
      customPizza: { base, sauce, cheese, vegetables },
      totalPrice: calculateTotal()
    };

    try {
      // Mock API call to backend order endpoint
      alert(`Razorpay Test Mode: Payment of ₹${calculateTotal()} successful! Order placed.`);
    } catch (err) {
      console.error(err);
      alert('Order placement failed.');
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>🍕 Custom Pizza Builder</h1>
        <p>Design your dream pizza and order with instant Razorpay test checkout</p>
      </header>

      <div className="builder-grid">
        <div className="selection-card">
          <h3>1. Choose Base</h3>
          {Object.keys(prices.base).map(b => (
            <label key={b} className="option-label">
              <input type="radio" name="base" value={b} checked={base === b} onChange={() => setBase(b)} />
              {b} (₹{prices.base[b]})
            </label>
          ))}

          <h3>2. Choose Sauce</h3>
          {Object.keys(prices.sauce).map(s => (
            <label key={s} className="option-label">
              <input type="radio" name="sauce" value={s} checked={sauce === s} onChange={() => setSauce(s)} />
              {s} (₹{prices.sauce[s]})
            </label>
          ))}

          <h3>3. Choose Cheese</h3>
          {Object.keys(prices.cheese).map(c => (
            <label key={c} className="option-label">
              <input type="radio" name="cheese" value={c} checked={cheese === c} onChange={() => setCheese(c)} />
              {c} (₹{prices.cheese[c]})
            </label>
          ))}

          <h3>4. Add Toppings / Vegetables</h3>
          {Object.keys(prices.veg).map(v => (
            <label key={v} className="option-label">
              <input type="checkbox" checked={vegetables.includes(v)} onChange={() => handleVegToggle(v)} />
              {v} (₹{prices.veg[v]})
            </label>
          ))}
        </div>

        <div className="summary-card">
          <h3>Order Summary</h3>
          <p><strong>Base:</strong> {base}</p>
          <p><strong>Sauce:</strong> {sauce}</p>
          <p><strong>Cheese:</strong> {cheese}</p>
          <p><strong>Toppings:</strong> {vegetables.length > 0 ? vegetables.join(', ') : 'None'}</p>
          <hr />
          <h2>Total: ₹{calculateTotal()}</h2>
          <button className="checkout-btn" onClick={handleCheckout}>Pay with Razorpay (Test)</button>
        </div>
      </div>
    </div>
  );
}

export default App;