// DeleteTrophy.js
import React, { useEffect, useState } from "react";
import TrophyService from "../services/TrophyService";

function DeleteTrophy() {
  const [trophies, setTrophies] = useState([]);

  useEffect(() => {
    loadTrophies();
  }, []);

  const loadTrophies = async () => {
    const response = await TrophyService.getAllTrophies();
    setTrophies(response.data);
  };

  const handleDelete = async (id) => {
    await TrophyService.deleteTrophy(id);
    loadTrophies();
  };

  return (
    <div>
      <h3>Delete Trophy</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Code</th><th>Location</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trophies.map((t) => (
            <tr key={t.id}>
              <td>{t.trophyCode}</td>
              <td>{t.location}</td>
              <td>
                <button onClick={() => handleDelete(t.id)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeleteTrophy;