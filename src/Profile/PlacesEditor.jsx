import React, { useState } from "react";

const PlacesEditor = ({ places, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [selectedPlaceIndex, setSelectedPlaceIndex] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSelectChange = (e) => {
    const index = e.target.value;
    setSelectedPlaceIndex(index);
    setFormData({ ...places[index] });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(selectedPlaceIndex, formData);
    setEditing(false);
    setSelectedPlaceIndex(null);
  };

  const handleCancel = () => {
    setEditing(false);
    setSelectedPlaceIndex(null);
  };

  return (
    <div style={{ padding: "10px" }}>
      {!editing ? (
        <button
          onClick={handleEditClick}
          style={{
            padding: "6px 12px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
      ) : (
        <div>
          {!selectedPlaceIndex ? (
            <select
              onChange={handleSelectChange}
              defaultValue=""
              style={{
                padding: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            >
              <option value="" disabled>
                Select place
              </option>
              {places.map((p, index) => (
                <option key={index} value={index}>
                  {p.location} ({p.numPlants} plants)
                </option>
              ))}
            </select>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                maxWidth: "300px",
              }}
            >
              <input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Location"
                style={inputStyle}
              />
              <input
                name="numPlants"
                value={formData.numPlants}
                onChange={handleInputChange}
                placeholder="Number of plants"
                type="number"
                style={inputStyle}
              />
              <input
                name="owner"
                value={formData.owner}
                onChange={handleInputChange}
                placeholder="Owner"
                style={inputStyle}
              />
              <input
                name="plantNames"
                value={formData.plantNames}
                onChange={handleInputChange}
                placeholder="Plant names"
                style={inputStyle}
              />

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={handleSave}
                  style={{
                    padding: "6px 12px",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    padding: "6px 12px",
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  padding: "6px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

export default PlacesEditor;
