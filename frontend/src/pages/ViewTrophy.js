// src/pages/ViewTrophy.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrophyService from "../services/TrophyService";

function ViewTrophy() {
  const [trophies, setTrophies] = useState([]);

  useEffect(() => {
    loadTrophies();
  }, []);

  const loadTrophies = async () => {
    try {
      const res = await TrophyService.getAllTrophies();
      setTrophies(res.data);
    } catch (err) {
      console.error("Error fetching trophies", err);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-success mb-3">Trophy List</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Code</th>
            <th>Size</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Colour</th>
            <th>Location</th>
            <th>Date</th>
            <th>Sold Date</th>
            <th>Sold Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {trophies.map((trophy) =>
    trophy.sizes.map((variant, index) => (
      <tr key={`${trophy.id}-${index}`}>
        <td>{trophy.trophyCode}</td>
        <td>{variant.size}"</td>
        <td>₹{variant.price}</td>
        <td>{variant.quantity}</td>
        <td>{variant.colour}</td>
        <td>{variant.location}</td>
        <td>{variant.doe ? variant.doe.split("T")[0] : ""}</td>
        <td>{variant.soldDate ? variant.soldDate.split("T")[0] : ""}</td>
        <td>₹{variant.soldPrice}</td>
        <td>
          {variant.image ? (
            <img
              src={`data:image/jpeg;base64,${variant.image}`}
              alt="trophy"
              width="50"
            />
          ) : (
            "N/A"
          )}
        </td>
        <td>
          <button className="btn btn-warning me-2 mb-1">
            <Link to={`/admin/dashboard/edit/${trophy.trophyCode}/${variant.size}`}>
              Edit
            </Link>
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>
    </div>
  );
}

export default ViewTrophy;
