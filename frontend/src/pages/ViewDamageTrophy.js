// src/pages/ViewDamageTrophy.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DamageTrophyService from "../services/DamageTrophyService";

function ViewDamageTrophy() {
    const [damageTrophies, setDamageTrophies] = useState([]);

    useEffect(() => {
        fetchDamageTrophies();
    }, []);

    const fetchDamageTrophies = async () => {
        try {
            const res = await DamageTrophyService.getAllDamageTrophies();
            setDamageTrophies(res.data);
        } catch (err) {
            console.error("Error fetching damaged trophies:", err);
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="text-danger mb-3">Damaged Trophy List</h3>
            <table className="table table-bordered table-hover">
                <thead className="table-danger">
                    <tr>
                        <th>Code</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Colour</th>
                        <th>Location</th>
                        <th>Date of Entry</th>
                        {/* <th>Sold Date</th>
                        <th>Sold Price</th> */}
                        <th>Remark</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {damageTrophies.map((trophy) => (
                        <tr key={trophy.id}>
                            <td>{trophy.trophyCode}</td>
                            <td>{trophy.size}"</td>
                            <td>₹{trophy.price}</td>
                            <td>{trophy.quantity}</td>
                            <td>{trophy.colour}</td>
                            <td>{trophy.location}</td>
                            <td>{trophy.doe?.split("T")[0]}</td>
                            {/* <td>{trophy.soldDate?.split("T")[0]}</td>
                            <td>₹{trophy.soldPrice}</td> */}
                            <td>{trophy.remark || "—"}</td>
                            <td>
                                {trophy.image ? (
                                    <img src={trophy.image} alt="damage" width="50" />
                                ) : (
                                    "N/A"
                                )}
                            </td>
                            <td>
                                <Link to={`/admin/dashboard/editdamagetrophy/${trophy.trophyCode}/${trophy.size}`}>
                                    <button className="btn btn-warning me-2 mb-1">
                                        Edit
                                    </button>
                                </Link>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewDamageTrophy;
