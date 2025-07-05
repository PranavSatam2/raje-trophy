// src/pages/EditTrophy.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrophyService from "../services/TrophyService";

function EditTrophy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    trophyCode: "",
    size: "",
    price: "",
    quantity: "",
    colour: "",
    location: "",
    doe: "",
    image: ""
  });

  useEffect(() => {
    TrophyService.getTrophyById(id).then((res) => {
      const data = res.data;
      data.doe = data.doe?.split("T")[0]; // format date
      setFormData(data);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "size" || name === "price" || name === "quantity"
        ? parseFloat(value)
        : value;

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await TrophyService.updateTrophy(id, formData);
      alert("✅ Trophy updated successfully!");
      navigate("/admin/dashboard/view-trophy");
    } catch (err) {
      console.error("Error updating trophy:", err);
      alert("❌ Failed to update trophy.");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-primary mb-3">Edit Trophy</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Trophy Code</label>
          <input
            type="text"
            name="trophyCode"
            value={formData.trophyCode}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Size (in inches)</label>
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">-- Select Size --</option>
            {[4, 6, 8, 10, 12].map((size) => (
              <option key={size} value={size}>{size}"</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-control"
            step="0.01"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Colour</label>
          <input
            type="text"
            name="colour"
            value={formData.colour}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">-- Select Location --</option>
            <option value="Navi-Mumbai">Navi-Mumbai</option>
            <option value="Alibaugh">Alibaugh</option>
            <option value="Shri-Vardhan">Shri-Vardhan</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Entry</label>
          <input
            type="date"
            name="doe"
            value={formData.doe}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Trophy
        </button>
      </form>
    </div>
  );
}

export default EditTrophy;
