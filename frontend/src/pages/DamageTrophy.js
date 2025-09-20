import React, { useState } from "react";
import DamageTrophyService from "../services/DamageTrophyService";

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
        damageRemark: "", // ✅ NEW FIELD
        image: "",
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

  const handleImageSelect = (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const updatedSizes = [...formData.sizes];
    updatedSizes[index].imageFile = file;
    updatedSizes[index].imagePreview = URL.createObjectURL(file);
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
          damageRemark: "", // ✅
          image: "",
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
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("trophyCode", formData.trophyCode);

      // send all size data except imageFile & preview
      const cleanedSizes = formData.sizes.map(({ imageFile, imagePreview, ...rest }) => rest);
      formDataToSend.append("sizeVariants", JSON.stringify(cleanedSizes));

      // add images
      formData.sizes.forEach((size) => {
        if (size.imageFile) {
          formDataToSend.append("imageFiles", size.imageFile);
        }
      });

      // ⚠️ call your new DamageTrophy API endpoint here:
      console.log("Submitting Damage Trophy:", formDataToSend);
      setLoading(true);
      const response = await DamageTrophyService.createDamageTrophy(formDataToSend);

      console.log("✅ Damage Trophy created:", response.data);
      setMessage("✅ Damage Trophy created successfully!");

      // reset form
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
            damageRemark: "",
            imageFile: null,
            imagePreview: null,
          },
        ],
      });
    } catch (error) {
      console.error("❌ Error creating damage trophy:", error);
      alert("Failed to create damage trophy");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-danger mb-3">Add Damage Trophy (with Multiple Sizes)</h3>

      {message && (
        <div className={`alert ${message.includes("✅") ? "alert-success" : "alert-warning"}`}>
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
            <h5 className="text-secondary">Damage Size Entry #{index + 1}</h5>

            <div className="row">
              <div className="col-md-2 mb-2">
                <label>Size</label>
                <input
                  type="number"
                  name="size"
                  value={entry.size}
                  onChange={(e) => handleSizeChange(index, e)}
                  className="form-control"
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

              <div className="col-md-4 mb-2">
                <label>Damage Remark</label>
                <input
                  type="text"
                  name="damageRemark"
                  value={entry.damageRemark}
                  onChange={(e) => handleSizeChange(index, e)}
                  className="form-control"
                  placeholder="Describe damage"
                  required
                />
              </div>

              <div className="col-md-6 mb-2">
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageSelect(index, e)}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-2">
                <label>Preview</label>
                <div>
                  {entry.imagePreview ? (
                    <img src={entry.imagePreview} alt="preview" style={{ maxWidth: 120 }} />
                  ) : (
                    <span>No image</span>
                  )}
                </div>
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
          ➕ Add Another Damage Size
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
