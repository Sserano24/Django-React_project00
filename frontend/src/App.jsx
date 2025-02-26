import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

// New Stripe Checkout Page
function Donate() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(10); // Default donation amount

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/create-checkout-session/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const session = await response.json();
      if (session.id) {
        window.location.href = `https://checkout.stripe.com/pay/${session.id}`;
      } else {
        console.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Support Our Campaign</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter donation amount"
        min="1"
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      <br />
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Processing..." : `Donate $${amount}`}
      </button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/donate" element={<Donate />} /> {/*  Added Donate Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
