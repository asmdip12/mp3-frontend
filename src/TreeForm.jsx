
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function TreeForm() {
    const {auth} = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    department: '',
    contactNo: '',
    numPlaces: '',
    places: []
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value 
    }));

    if (name === 'numPlaces') {
      const num = parseInt(value) || 0;
      const newPlaces = Array.from({ length: num }, (_, index) => 
        formData.places[index] || {
          location: '',
          owner: '',
          numPlants: '',
          plantNames: ''
        }
      );
      setFormData(prev => ({ ...prev, places: newPlaces }));
    }
  };

  const handlePlaceChange = (index, field, value) => {
    const updatedPlaces = [...formData.places];
    updatedPlaces[index] = {
      ...updatedPlaces[index],
      [field]: value
    };
    setFormData(prev => ({ ...prev, places: updatedPlaces }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);
  
    try {
      const dataToSend = {
        fullName: formData.fullName.trim(),
        department: formData.department.trim(),
        contactNo: Number(formData.contactNo),
        numPlaces: Number(formData.numPlaces),
        places: formData.places.map(place => ({
          location: place.location.trim(),  
          owner: place.owner.trim(),
          numPlants: Number(place.numPlants),
          plantNames: (place.plantNames || '').trim()
        })),
        submittedby: auth.user.id
      };
  
      const response = await fetch('https://mp3-backend-f7n3.onrender.com/api/treeform/subform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
  
      if (!response.ok) throw new Error('Network response was not ok');
  
      alert('Form submitted successfully!');
      setFormData({
        fullName: '',
        department: '',
        contactNo: '',
        numPlaces: '',
        places: []
      });
  
      navigate('/');
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Failed to submit the form. Please check your console for more info.');
    }
  };
  

  return (
    <div style={{ marginTop: '84px', display: 'flex', justifyContent: 'center', padding: '1rem' }}>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          padding: '2rem',
          border: '1px solid #444',
          borderRadius: '10px',
          maxWidth: '700px',
          width: '100%',
          backgroundColor: '#1c1c1c',
          color: 'white',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: '#4CAF50', marginBottom: '0.5rem',fontSize:'25px' }}>🌱 Tree Plantation Registration</h2>
          <p style={{ color: '#ccc', fontSize: '1.1rem' }}>Register to become a part of this mission</p>
        </div>

        {/* Full Name */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Your Full Name <span style={{ color: 'red' }}>*</span>
          </label>
          <input 
            type="text" 
            name="fullName" 
            placeholder="आपका पूरा नाम" 
            value={formData.fullName} 
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

        {/* Department/Organization */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Name of Department/Organization (if you are student then mention the school name) 
            <span style={{ color: 'red' }}>*</span>
          </label>
          <p style={{ fontSize: '0.9rem', color: '#ccc', margin: '0 0 0.5rem 0' }}>
            विभाग/संस्था का नाम (यदि आप छात्र हैं तो स्कूल/कॉलेज/संस्थान का नाम)
          </p>
          <input 
            type="text" 
            name="department" 
            placeholder="Your answer" 
            value={formData.department} 
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

        {/* Number of Places */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Number of places where trees can be planted <span style={{ color: 'red' }}>*</span>
          </label>
          <p style={{ fontSize: '0.9rem', color: '#ccc', margin: '0 0 0.5rem 0' }}>
            उन स्थानों की संख्या जहाँ पेड़ लगाए जा सकते हैं
          </p>
          <input 
            type="number" 
            name="numPlaces" 
            placeholder="Enter number of places" 
            value={formData.numPlaces} 
            onChange={handleChange} 
            required 
            min="1"
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

        {/* Place Details */}
        {formData.places.map((place, index) => (
          <div key={index} style={{ 
            border: '1px solid #555', 
            borderRadius: '8px', 
            padding: '1.5rem', 
            backgroundColor: '#2a2a2a' 
          }}>
            <h3 style={{ color: '#4CAF50', marginBottom: '1rem' }}>
              Place Details {index + 1} / स्थान विवरण {index + 1}
            </h3>
            
            {/* Location/Address */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Location/address of place <span style={{ color: 'red' }}>*</span>
              </label>
              <p style={{ fontSize: '0.9rem', color: '#ccc', margin: '0 0 0.5rem 0' }}>
                स्थान का पता
              </p>
              <input 
                type="text" 
                placeholder="Enter location/address" 
                value={place.location} 
                onChange={(e) => handlePlaceChange(index, 'location', e.target.value)} 
                required 
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #555',
                  borderRadius: '5px',
                  backgroundColor: '#1c1c1c',
                  color: 'white',
                  fontSize: '1rem'
                }}
              />
            </div>

            {/* Owner */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Owner of place <span style={{ color: 'red' }}>*</span>
              </label>
              <p style={{ fontSize: '0.9rem', color: '#ccc', margin: '0 0 0.5rem 0' }}>
                स्थान का मालिक
              </p>
              <input 
                type="text" 
                placeholder="Enter owner name" 
                value={place.owner} 
                onChange={(e) => handlePlaceChange(index, 'owner', e.target.value)} 
                required 
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #555',
                  borderRadius: '5px',
                  backgroundColor: '#1c1c1c',
                  color: 'white',
                  fontSize: '1rem'
                }}
              />
            </div>

            {/* Number of Plants */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Number of plants that can be planted <span style={{ color: 'red' }}>*</span>
              </label>
              <p style={{ fontSize: '0.9rem', color: '#ccc', margin: '0 0 0.5rem 0' }}>
                लगाए जा सकने वाले पौधों की संख्या
              </p>
              <input 
                type="number" 
                placeholder="Enter number of plants" 
                value={place.numPlants} 
                onChange={(e) => handlePlaceChange(index, 'numPlants', e.target.value)} 
                required 
                min="1"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #555',
                  borderRadius: '5px',
                  backgroundColor: '#1c1c1c',
                  color: 'white',
                  fontSize: '1rem'
                }}
              />
            </div>

            {/* Plant Names (Optional) */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Plant names (Optional)
              </label>
              <p style={{ fontSize: '0.9rem', color: '#ccc', margin: '0 0 0.5rem 0' }}>
                पौधों के नाम (वैकल्पिक)
              </p>
              <textarea 
                placeholder="Enter plant names (comma separated)" 
                value={place.plantNames} 
                onChange={(e) => handlePlaceChange(index, 'plantNames', e.target.value)} 
                rows="3"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #555',
                  borderRadius: '5px',
                  backgroundColor: '#1c1c1c',
                  color: 'white',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>
        ))}



        {/* Contact Number */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Contact No. (Whatsapp) <span style={{ color: 'red' }}>*</span>
          </label>
          <p style={{ fontSize: '0.9rem', color: '#ccc', margin: '0 0 0.5rem 0' }}>
            संपर्क नंबर (व्हाट्सएप्प)
          </p>
          <input 
            type="tel" 
            name="contactNo" 
            placeholder="Your answer" 
            value={formData.contactNo} 
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

        {/* Submit Button */}
        <button 
          type="submit" 
          style={{ 
            padding: '1rem 2rem', 
            fontWeight: 'bold',
            fontSize: '1.1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          Submit 🌳
        </button>

        <p style={{ fontSize: '0.9rem', color: '#ccc', textAlign: 'center', marginTop: '1rem' }}>
          * indicates required question
        </p>
      </form>
    </div>
  );
}
