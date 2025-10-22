import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useAuth } from './AuthContext';

export default function PlantationForm() {
  const { auth } = useAuth(); // ✅ Use auth context
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    cityVillage: '',
    placeName: '',
    placePhoto: null,
    caretakerName: '',
    occupation: '',
    designation: '',
    caretakerPhoto: null,
    adharSide1: null,
    adharSide2: null,
    mobile: '',
    numPlants: '',
    plantNames: ''
  });

  const [loading, setLoading] = useState(false);

  const cloudName = "dz3ggka4r";
  const presets = {
    placePhoto: "photo_preset",
    caretakerPhoto: "cp_preset",
    adhar: "aadhar_preset"
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadToCloudinary = async (file, preset) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      toast.error("Failed to upload image: " + file.name);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!auth?.user?.id) {
      toast.error("User not logged in");
      setLoading(false);
      return;
    }

    try {
      const placePhotoUrl = await uploadToCloudinary(formData.placePhoto, presets.placePhoto);
      const caretakerPhotoUrl = await uploadToCloudinary(formData.caretakerPhoto, presets.caretakerPhoto);
      const adharSide1Url = await uploadToCloudinary(formData.adharSide1, presets.adhar);
      const adharSide2Url = await uploadToCloudinary(formData.adharSide2, presets.adhar);

      const dataToSend = {
        state: formData.state,
        district: formData.district,
        cityVillage: formData.cityVillage,
        placeName: formData.placeName,
        placePhotoUrl,
        caretakerName: formData.caretakerName,
        occupation: formData.occupation,
        designation: formData.designation,
        caretakerPhotoUrl,
        adharSide1Url,
        adharSide2Url,
        mobile: formData.mobile,
        numPlants: Number(formData.numPlants),
        plantNames: formData.plantNames,
        submittedby: auth.user.id, // ✅ Added submittedby
      };

      const response = await fetch("https://mp3-backend-f7n3.onrender.com/api/treeform/subformp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
        credentials: "include"
      });

      if (!response.ok) throw new Error('Network response was not ok');

      toast.success("✅ Plantation form submitted successfully!", { autoClose: 3000 });
      setFormData({
        state: '', district: '', cityVillage: '', placeName: '', placePhoto: null,
        caretakerName: '', occupation: '', designation: '', caretakerPhoto: null,
        adharSide1: null, adharSide2: null, mobile: '', numPlants: '', plantNames: ''
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit form. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem',
          border: '1px solid #444', borderRadius: '10px', maxWidth: '700px', width: '100%',
          backgroundColor: '#1c1c1c', color: 'white',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: '#4CAF50', marginBottom: '0.5rem', fontSize:'25px' }}>🌳 Plantation Form</h2>
          <p style={{ color: '#ccc', fontSize: '1.1rem' }}>Enter the details for plantation</p>
        </div>

        {/* Location Section */}
        <div>
          <h3 style={{ color: '#4CAF50', marginBottom: '1rem' }}>📍 Location Details</h3>
          {['state','district','city/Village','placeName'].map((field, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #555',
                  borderRadius: '5px',
                  backgroundColor: '#2a2a2a',
                  color: 'white',
                  fontSize: '1rem'
                }}
              />
            </div>
          ))}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Photograph of Place</label>
            <input type="file" name="placePhoto" accept="image/*" onChange={handleChange} style={{ color: 'white' }} />
          </div>
        </div>

        {/* Caretaker Section */}
        <div>
          <h3 style={{ color: '#4CAF50', marginBottom: '1rem' }}>👤 Caretaker Details</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Name of Caretaker <span style={{ color: 'red' }}>*</span></label>
            <input type="text" name="caretakerName" value={formData.caretakerName} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #555', borderRadius: '5px', backgroundColor: '#2a2a2a', color: 'white', fontSize: '1rem' }} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Occupation <span style={{ color: 'red' }}>*</span></label>
            <select name="occupation" value={formData.occupation} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #555', borderRadius: '5px', backgroundColor: '#2a2a2a', color: 'white', fontSize: '1rem' }}>
              <option value="">Select</option>
              <option value="Owner">Owner</option>
              <option value="Tenant">Tenant</option>
              <option value="Incharge">Incharge</option>
            </select>
          </div>

          {formData.occupation === 'Incharge' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Designation</label>
              <input type="text" name="designation" value={formData.designation} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #555', borderRadius: '5px', backgroundColor: '#2a2a2a', color: 'white', fontSize: '1rem' }} />
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Photograph of Caretaker</label>
            <input type="file" name="caretakerPhoto" accept="image/*" onChange={handleChange} style={{ color: 'white' }} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Aadhaar (Side 1)</label>
            <input type="file" name="adharSide1" accept="image/*" onChange={handleChange} style={{ color: 'white' }} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Aadhaar (Side 2)</label>
            <input type="file" name="adharSide2" accept="image/*" onChange={handleChange} style={{ color: 'white' }} />
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Mobile (WhatsApp No.) <span style={{ color: 'red' }}>*</span></label>
          <p style={{ fontSize: '0.9rem', color: '#ccc', margin: '0 0 0.5rem 0' }}>मोबाइल (व्हाट्सएप्प नं.)</p>
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #555', borderRadius: '5px', backgroundColor: '#2a2a2a', color: 'white', fontSize: '1rem' }} />
        </div>

        {/* Plantation Details */}
        <div>
          <h3 style={{ color: '#4CAF50', marginBottom: '1rem' }}>🌱 Plantation Details</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Number of Plants <span style={{ color: 'red' }}>*</span></label>
            <p style={{ fontSize: '0.9rem', color: '#ccc', margin: '0 0 0.5rem 0' }}>पौधों की संख्या</p>
            <input type="number" name="numPlants" value={formData.numPlants} onChange={handleChange} required min="1" style={{ width: '100%', padding: '0.75rem', border: '1px solid #555', borderRadius: '5px', backgroundColor: '#2a2a2a', color: 'white', fontSize: '1rem' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Name of Plants</label>
            <p style={{ fontSize: '0.9rem', color: '#ccc', margin: '0 0 0.5rem 0' }}>पौधों के नाम</p>
            <textarea name="plantNames" value={formData.plantNames} onChange={handleChange} rows="3" style={{ width: '100%', padding: '0.75rem', border: '1px solid #555', borderRadius: '5px', backgroundColor: '#2a2a2a', color: 'white', fontSize: '1rem', resize: 'vertical' }} />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading} style={{ padding: '1rem 2rem', fontWeight: 'bold', fontSize: '1.1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'} onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}>
          {loading ? 'Submitting...' : 'Submit 🌿'}
        </button>
      </form>
    </div>
  );
}