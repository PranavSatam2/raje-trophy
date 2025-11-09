import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrophyService from "../services/TrophyService";

const EditTrophy = () => {
  const { trophyCode, size } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    colour: "",
    doe: "",
    location: "",
    price: "",
    quantity: "",
    size: size || "",
    soldDate: "",
    soldPrice: "",
    soldQuantity: "", // ➕ add
    soldCurrentQuantityPrice: "", // ➕ add
    salePrice: "", // ➕ add
    image: null,
    imagePreview: ""
  });


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Format backend date for input field
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  };

  useEffect(() => {
    TrophyService.getTrophyByCode(trophyCode, size)
      .then((res) => {
        console.log("API Response:", res.data);
        const trophy = res.data;

        // Find the size variant that matches the requested size
        const variant = trophy.sizes?.find((s) => s.size === size);

        if (variant) {
          setFormData({
            colour: variant.colour || "",
            doe: variant.doe,
            location: variant.location || "",
            price: variant.price || "",
            quantity: variant.quantity || "",
            size: variant.size || "",
            soldDate: formatDateForInput(variant.soldDate),
            soldPrice: variant.soldPrice || "",
            salePrice: variant.salePrice || "", // ➕ add
            image: null,
            imagePreview: variant.image
              ? `data:image/jpeg;base64,${variant.image}`
              : ""
          });
        } else {
          setError(`No variant found for size: ${size}`);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching trophy", err);
        setError("Failed to load trophy");
        setLoading(false);
      });
  }, [trophyCode, size]);

  useEffect(() => {
    if (formData.soldQuantity && formData.soldPrice) {
      const total = parseInt(formData.soldQuantity) * parseFloat(formData.soldPrice);
      setFormData((prev) => ({ ...prev, soldCurrentQuantityPrice: total }));
    }
  }, [formData.soldQuantity, formData.soldPrice]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("price", formData.price);
    form.append("quantity", formData.quantity);
    form.append("colour", formData.colour);
    form.append("location", formData.location);
    form.append("doe", formData.doe);

    // ➕ sold fields
    form.append("soldDate", formData.soldDate);
    form.append("soldPrice", formData.soldPrice);
    form.append("salePrice", formData.salePrice);
    form.append("soldQuantity", formData.soldQuantity);
    form.append("soldCurrentQuantityPrice", formData.soldCurrentQuantityPrice);

    if (formData.image) {
      form.append("imageFile", formData.image);
    }

    TrophyService.updateTrophyByCodeAndSize(trophyCode, size, form)
      .then(() => {
        console.log("Update successful");
        navigate("/admin/dashboard/view-trophy");
      })
      .catch((err) => {
        console.error("Update failed", err);
        setError("Failed to update trophy");
      });
  };

  if (loading) return <div className="container mt-4"><p>Loading...</p></div>;
  if (error) return <div className="container mt-4"><p className="text-danger">Error: {error}</p></div>;

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2 className="mb-4">Edit Trophy - {trophyCode} / {size}</h2>

      <div className="card mb-3 p-3 shadow-sm">
        <div className="row">
          <div className="col-md-2 mb-2">
            <label>Size (inches)</label>
            <input type="number" value={formData.size} disabled className="form-control" />
          </div>

          <div className="col-md-2 mb-2">
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              disabled
              className="form-control"
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
              disabled
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
            />
          </div>

          <div className="col-md-6 mb-2">
            <label>Image</label>
            <input type="file" accept="image/*" onChange={handleImageSelect} className="form-control" />
          </div>
          <div className="col-md-6 mb-2">
            <label>Preview</label>
            <div>
              {formData.imagePreview ? (
                <img src={formData.imagePreview} alt="preview" style={{ maxWidth: 120 }} />
              ) : (
                <span>No image</span>
              )}
            </div>
          </div>

          <div className="col-md-5 mb-2">
            <label>Sale Price</label>
            <input
              type="number"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
              className="form-control"
              disabled
            />
          </div>

          <div className="col-md-5 mb-2">
            <label>Sold Price</label>
            <input
              type="number"
              name="soldPrice"
              value={formData.soldPrice}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-5 mb-4">
            <label>Sold Date</label>
            <input
              type="date"
              name="soldDate"
              value={formData.soldDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-5 mb-2">
            <label>Sold Quantity</label>
            <input
              type="number"
              name="soldQuantity"
              value={formData.soldQuantity}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-5 mb-4">
            <label>Sold Total Price</label>
            <input
              type="number"
              name="soldCurrentQuantityPrice"
              value={formData.soldCurrentQuantityPrice}
              onChange={handleChange}
              disabled
              className="form-control"
            />
          </div>

        </div>

        <button type="submit" className="btn btn-primary">Update</button>
      </div>
    </form>
  );
};

export default EditTrophy;
