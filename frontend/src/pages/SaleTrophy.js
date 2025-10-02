// src/pages/SellTrophy.js
import React, { useEffect, useState } from "react";
import TrophyService from "../services/TrophyService";
import SoldTrophyService from "../services/SoldTrophyService";

function SellTrophy() {
  const [trophies, setTrophies] = useState([]);
  const [trophyCode, setTrophyCode] = useState("");
  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState([]);
  const [quantitySold, setQuantitySold] = useState("");
  const [soldPrice, setSoldPrice] = useState("");
  const [soldDate, setSoldDate] = useState("");

  useEffect(() => {
    fetchTrophies();
  }, []);

  const fetchTrophies = async () => {
    try {
      const res = await TrophyService.getAllTrophies();
      setTrophies(res.data);
    } catch (err) {
      console.error("Error fetching trophies", err);
    }
  };

  // when trophyCode changes, update sizes dropdown
  useEffect(() => {
    const selectedTrophy = trophies.find((t) => t.trophyCode === trophyCode);
    if (selectedTrophy) {
      setSizes(selectedTrophy.sizes);
    } else {
      setSizes([]);
    }
    setSize("");
  }, [trophyCode, trophies]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await SoldTrophyService.sellTrophy(
        trophyCode,
        size,
        quantitySold,
        soldPrice,
        soldDate
      );
      alert("Trophy sold successfully!");
      // reset
      setTrophyCode("");
      setSize("");
      setQuantitySold("");
      setSoldPrice("");
      setSoldDate("");
    } catch (err) {
      console.error("Error selling trophy", err);
      alert("Error: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-primary mb-3">Sell Trophy</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Trophy Code</label>
          <select
            className="form-select"
            value={trophyCode}
            onChange={(e) => setTrophyCode(e.target.value)}
            required
          >
            <option value="">Select Trophy</option>
            {trophies.map((t) => (
              <option key={t.id} value={t.trophyCode}>
                {t.trophyCode}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Size</label>
          <select
            className="form-select"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          >
            <option value="">Select Size</option>
            {sizes.map((s, i) => (
              <option key={i} value={s.size}>
                {s.size} (Stock: {s.quantity})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity Sold</label>
          <input
            type="number"
            className="form-control"
            value={quantitySold}
            onChange={(e) => setQuantitySold(e.target.value)}
            required
            min="1"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Sold Price (₹)</label>
          <input
            type="number"
            className="form-control"
            value={soldPrice}
            onChange={(e) => setSoldPrice(e.target.value)}
            required
            step="0.01"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Sold Date</label>
          <input
            type="date"
            className="form-control"
            value={soldDate}
            onChange={(e) => setSoldDate(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-success" type="submit">
          Sell
        </button>
      </form>
    </div>
  );
}

export default SellTrophy;