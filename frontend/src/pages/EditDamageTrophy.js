import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrophyService from "../services/TrophyService";
import DamageTrophyService from "../services/DamageTrophyService";

const EditDamageTrophy = () => {
  const { trophyCode, size } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    colour: "",
    doe: "",
    image: "",
    location: "",
    price: "",
    quantity: "",
    trophyCode: trophyCode || "",
    size: size || "",
    soldDate: "",
    soldPrice: "",
    remark: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format date for input
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
  };

  // Helper function to safely get string values
  const safeStringValue = (value) => {
    return value != null ? String(value) : "";
  };

  useEffect(() => {
    console.log("Fetching trophy data for:", trophyCode, size);

    DamageTrophyService.getDamageTrophyByCode(trophyCode, size)
      .then((res) => {
        console.log("API Response:", res.data);

        let matchingTrophy = null;

        // Handle different response structures
        if (Array.isArray(res.data)) {
          // If res.data is an array, find the matching trophy
          matchingTrophy = res.data.find(
            (trophy) => parseFloat(trophy.size) === parseFloat(size)
          );
        } else if (res.data && typeof res.data === 'object') {
          // If res.data is a single object, use it directly
          matchingTrophy = res.data;
        }

        if (matchingTrophy) {
          console.log("Matching trophy found:", matchingTrophy);

          // Populate form data with proper formatting
          setFormData({
            colour: safeStringValue(matchingTrophy.colour),
            doe: formatDateForInput(matchingTrophy.doe),
            image: safeStringValue(matchingTrophy.image),
            location: safeStringValue(matchingTrophy.location),
            price: safeStringValue(matchingTrophy.price),
            quantity: safeStringValue(matchingTrophy.quantity),
            trophyCode: safeStringValue(matchingTrophy.trophyCode || trophyCode),
            size: safeStringValue(matchingTrophy.size || size),
            soldDate: formatDateForInput(matchingTrophy.soldDate),
            soldPrice: safeStringValue(matchingTrophy.soldPrice),
            remark: safeStringValue(matchingTrophy.remark),
          });
        } else {
          console.error("No matching trophy found for size:", size);
          setError("Trophy not found for the specified size");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load trophy data");
        setLoading(false);
      });
  }, [trophyCode, size]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create payload with proper data types
    const payload = {
      sizes: [{
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        quantity: formData.quantity ? parseInt(formData.quantity) : null,
        soldPrice: formData.soldPrice ? parseFloat(formData.soldPrice) : null,
      }],
    };

    console.log("Submitting payload:", payload);

    DamageTrophyService.updateByTrophyCodeAndSize(trophyCode, size, payload)
      .then(() => {
        console.log("Update successful");
        navigate("/admin/dashboard/view-damage-trophy");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        setError("Failed to update trophy");
      });
  };

  if (loading) return <div className="container mt-4"><p>Loading...</p></div>;

  if (error) return <div className="container mt-4"><p className="text-danger">Error: {error}</p></div>;

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2 className="mb-4">Edit Trophy - {trophyCode} / {size}</h2>

      {/* Since formData is not an array, remove the .map and use the fields directly */}
      <div className="card mb-3 p-3 shadow-sm">
        <h5 className="text-secondary">Trophy Details</h5>
        <div className="row">
          <div className="col-md-2 mb-2">
            <label>Size (inches)</label>
            <input
              type="number"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-2 mb-2">
            <label>Price (₹)</label>
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

          <div className="col-md-2 mb-2">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-2 mb-2">
            <label>Colour</label>
            <input
              type="text"
              name="colour"
              value={formData.colour}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-2 mb-2">
            <label>Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
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
              value={formData.doe}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-12 mb-2">
            <label>Image URL / Description</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-5 mb-2">
            <label>Remark</label>
            <input
              type="text"
              name="remark"
              value={formData.remark || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* <div className="col-md-5 mb-2">
            <label>Sold Price</label>
            <input
              type="number"
              name="soldPrice"
              value={formData.soldPrice || ""}
              onChange={handleChange}
            />
          </div> */}
          {/* <div className="col-md-5 mb-4">
            <label>Sold Date</label>
            <input
              type="date"
              name="soldDate"
              value={formData.soldDate ? formData.soldDate.split("T")[0] : ""}
              onChange={handleChange}
            />
          </div> */}

        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </div>
    </form>
  );
};

export default EditDamageTrophy;