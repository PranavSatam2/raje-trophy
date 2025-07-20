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
          {trophies.map((trophy) => (
            <tr key={trophy.id}>
              <td>{trophy.trophyCode}</td>
              <td>{trophy.size}"</td>
              <td>₹{trophy.price}</td>
              <td>{trophy.quantity}</td>
              <td>{trophy.colour}</td>
              <td>{trophy.location}</td>
              <td>{trophy.doe?.split("T")[0]}</td>
              <td>{trophy.soldDate?.split("T")[0]}</td>
              <td>₹{trophy.soldPrice}</td>
              <td>
                {trophy.image ? (
                  <img src={trophy.image} alt="trophy" width="50" />
                ) : (
                  "N/A"
                )}
              </td>
              <td>
                <button className="btn btn-warning me-2 mb-1">
                  <Link to={`/admin/dashboard/edit/${trophy.trophyCode}/${trophy.size}`}>Edit</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTrophy;
