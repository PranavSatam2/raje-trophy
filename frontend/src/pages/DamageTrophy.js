import React, { useState } from "react";
import DamageTrophyService from "../services/DamageTrophyService"; // Import the correct service

function DamageTrophy() {
  const [formData, setFormData] = useState({
    trophyCode: "",
    sizes: [
      {
        size: "",
        price: "",
        quantity: "",
        colour: "",
        location: "",
        doe: "",
        image: "",
        soldDate: "",
        soldPrice: "",
        remark: "",
      },
    ],
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrophyCodeChange = (e) => {
    setFormData({ ...formData, trophyCode: e.target.value });
  };

  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSizes = [...formData.sizes];
    updatedSizes[index][name] = value;
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const addSizeField = () => {
    setFormData({
      ...formData,
      sizes: [
        ...formData.sizes,
        {
          size: "",
          price: "",
          quantity: "",
          colour: "",
          location: "",
          doe: "",
          image: "",
          soldDate: "",
          soldPrice: "",
          remark: "",
        },
      ],
    });
  };

  const removeSizeField = (index) => {
    const updatedSizes = formData.sizes.filter((_, i) => i !== index);
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use DamageTrophyService instead of TrophyService
      const response = await DamageTrophyService.createDamageTrophy(formData);
      console.log("✅ Damage trophy created successfully:", response.data);
      
      setMessage("✅ Damage trophy added successfully!");
      
      // Reset form
      setFormData({
        trophyCode: "",
        sizes: [
          {
            size: "",
            price: "",
            quantity: "",
            colour: "",
            location: "",
            doe: "",
            image: "",
            soldDate: "",
            soldPrice: "",
            remark: "",
          },
        ],
      });
    } catch (error) {
      console.error("❌ Error adding damage trophy:", error);
      console.error("Error details:", error.response?.data);
      
      // More specific error messages
      if (error.response?.status === 400) {
        setMessage("⚠️ Invalid data provided. Please check all fields.");
      } else if (error.response?.status === 500) {
        setMessage("⚠️ Server error. Please try again later.");
      } else {
        setMessage("⚠️ Failed to add damage trophy. Please check console for details.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-primary mb-3">Add Damage Trophy (with Multiple Sizes)</h3>

      {message && (
        <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-warning'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Trophy Code */}
        <div className="mb-3">
          <label className="form-label">Trophy Code</label>
          <input
            type="text"
            name="trophyCode"
            value={formData.trophyCode}
            onChange={handleTrophyCodeChange}
            className="form-control"
            required
          />
        </div>

        {/* Size Entries */}
        {formData.sizes.map((entry, index) => (
          <div key={index} className="card mb-3 p-3 shadow-sm">
            <h5 className="text-secondary">Size Entry #{index + 1}</h5>

            <div className="row">
              <div className="col-md-2 mb-2">
                <label>Size (inches)</label>
                <input
                  type="number"
                  name="size"
                  value={entry.size}
                  onChange={(e) => handleSizeChange(index, e)}
                  className="form-control"
                  step="0.01"
                  required
                />
              </div>

              <div className="col-md-2 mb-2">
                <label>Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={entry.price}
                  onChange={(e) => handleSizeChange(index, e)}
                  className="form-control"
                  step="0.01"
                  required
                />
              </div>

              <div className="col-md-2 mb-2">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={entry.quantity}
                  onChange={(e) => handleSizeChange(index, e)}
                  className="form-control"
                  min="1"
                  required
                />
              </div>

              <div className="col-md-2 mb-2">
                <label>Colour</label>
                <input
                  type="text"
                  name="colour"
                  value={entry.colour}
                  onChange={(e) => handleSizeChange(index, e)}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-2 mb-2">
                <label>Location</label>
                <select
                  name="location"
                  value={entry.location}
                  onChange={(e) => handleSizeChange(index, e)}
                  className="form-select"
                  required
                >
                  <option value="">Select</option>
                  <option value="Navi-Mumbai">Navi-Mumbai</option>
                  <option value="Alibaugh">Alibaugh</option>
                  <option value="Shri-Vardhan">Shri-Vardhan</option>
                </select>
              </div>

              <div className="col-md-2 mb-2">
                <label>Date of Entry</label>
                <input
                  type="date"
                  name="doe"
                  value={entry.doe}
                  onChange={(e) => handleSizeChange(index, e)}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-12 mb-2">
                <label>Image URL / Description</label>
                <input
                  type="text"
                  name="image"
                  value={entry.image}
                  onChange={(e) => handleSizeChange(index, e)}
                  className="form-control"
                  placeholder="Enter image URL or description"
                />
              </div>

              <div className="col-md-3 mb-2">
                <label>Sold Date</label>
                <input
                  type="date"
                  name="soldDate"
                  className="form-control"
                  value={entry.soldDate}
                  onChange={(e) => handleSizeChange(index, e)}
                />
              </div>

              <div className="col-md-3 mb-2">
                <label>Sold Price (₹)</label>
                <input
                  type="number"
                  name="soldPrice"
                  className="form-control"
                  value={entry.soldPrice}
                  onChange={(e) => handleSizeChange(index, e)}
                  step="0.01"
                  placeholder="Enter if sold"
                />
              </div>

              <div className="col-md-6 mb-2">
                <label>Damage Remark</label>
                <input
                  type="text"
                  name="remark"
                  className="form-control"
                  value={entry.remark}
                  onChange={(e) => handleSizeChange(index, e)}
                  placeholder="Describe the damage"
                />
              </div>
            </div>

            {formData.sizes.length > 1 && (
              <button
                type="button"
                onClick={() => removeSizeField(index)}
                className="btn btn-sm btn-outline-danger mt-2"
              >
                Remove Size Entry
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addSizeField}
          className="btn btn-secondary mb-3"
        >
          ➕ Add Another Size
        </button>

        <br />
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "⏳ Submitting..." : "✅ Submit Damage Trophy"}
        </button>
      </form>
    </div>
  );
}

export default DamageTrophy;