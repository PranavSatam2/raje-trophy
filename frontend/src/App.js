import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddTrophy from "./pages/AddTrophy";
import ViewTrophy from "./pages/ViewTrophy";
import EditTrophy from "./pages/EditTrophy";
import DeleteTrophy from "./pages/DeleteTrophy";
import DamageTrophy from "./pages/DamageTrophy";
import ViewDamageTrophy from "./pages/ViewDamageTrophy";
import EditDamageTrophy from "./pages/EditDamageTrophy";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* Nested dashboard layout */}
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route index element={<Navigate to="add-trophy" />} />
          <Route path="add-trophy" element={<AddTrophy />} />
          <Route path="view-trophy" element={<ViewTrophy />} />
          <Route path="edit/:trophyCode/:size" element={<EditTrophy />} />
          <Route path="delete-trophy" element={<DeleteTrophy />} />
          <Route path="damage-trophy" element={<DamageTrophy />} />
          <Route path="view-damage-trophy" element={<ViewDamageTrophy />} />
          <Route path="editdamagetrophy/:trophyCode/:size" element={<EditDamageTrophy />} />
        </Route>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
