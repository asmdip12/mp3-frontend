
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast } from "react-toastify";

export default function TreeForm() {
  const { auth } = useAuth();

  const initialState = {
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    phone: '',
    email: '',
    address: {
      state: '',
      district: '',
      city: '',
      location: ''
    },
    occupation: '',
    occupationDetails: {
      schoolName: '',
      employeeCompany: '',
      selfBusinessName: '',
      entrepreneurBusiness: '',
      otherOccupation: ''
    }
  };

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    

    // if occupation changes, reset occupation-specific details
    if (name === 'occupation') {
      setFormData(prev => ({
        ...prev,
        occupation: value,
        occupationDetails: {
          schoolName: '',
          employeeCompany: '',
          selfBusinessName: '',
          entrepreneurBusiness: '',
          otherOccupation: ''
        }
      }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handleOccupationDetailChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      occupationDetails: {
        ...prev.occupationDetails,
        [field]: value
      }
    }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
        gender: formData.gender,
        dob: formData.dob,
        contactNo: Number(formData.phone),
        email: (formData.email || '').trim(),
        address: {
          state: (formData.address.state || '').trim(),
          district: (formData.address.district || '').trim(),
          city: (formData.address.city || '').trim(),
          location: (formData.address.location || '').trim(),
        },
        occupation: formData.occupation,
        occupationDetails: formData.occupationDetails,
        department: formData.department.trim(),
        submittedby: auth.user.id
      };

      const response = await fetch(
        "https://mp3-backend-f7n3.onrender.com/api/treeform/subform",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataToSend),
          credentials: "include"
        }
      );

      if (!response.ok) throw new Error('Network response was not ok');

      toast.success("✅ Form submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setFormData(initialState);
      navigate('/');
    } catch (err) {
      console.error('Error submitting form:', err);
      toast.error("Failed to submit the form. Please check your console for more info.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // small reusable style object to keep JSX compact but retain your original inline-styling
  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #555',
    borderRadius: '5px',
    backgroundColor: '#2a2a2a',
    color: 'white',
    fontSize: '1rem'
  };

  const placeInputStyle = {
    ...inputStyle,
    backgroundColor: '#1c1c1c'
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          padding: '2rem',
          border: '1px solid #444',
          borderRadius: '10px',
          maxWidth: '900px',
          width: '100%',
          backgroundColor: '#1c1c1c',
          color: 'white',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: '#4CAF50', marginBottom: '0.5rem', fontSize: '25px' }}>🌱 Tree Plantation Registration</h2>
          <p style={{ color: '#ccc', fontSize: '1.1rem' }}>Register to become a part of this mission</p>
        </div>

        {/* --- SECTION: Personal Information --- */}
        <div style={{ border: '1px solid #555', borderRadius: '8px', padding: '1rem', backgroundColor: '#2a2a2a' }}>
          <h3 style={{ color: '#4CAF50', marginBottom: '0.75rem' }}>Personal Information / व्यक्तिगत जानकारी</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>First Name <span style={{ color: 'red' }}>*</span></label>
              <input type="text" name="firstName" placeholder="पहला नाम" value={formData.firstName} onChange={handleChange} required style={inputStyle} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Last Name <span style={{ color: 'red' }}>*</span></label>
              <input type="text" name="lastName" placeholder="अंतिम नाम" value={formData.lastName} onChange={handleChange} required style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Gender <span style={{ color: 'red' }}>*</span></label>
              <select name="gender" value={formData.gender} onChange={handleChange} required style={inputStyle}>
                <option value="">Select</option>
                <option value="Male">Male / पुरुष</option>
                <option value="Female">Female / महिला</option>
                <option value="Other">Other / अन्य</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Date of Birth <span style={{ color: 'red' }}>*</span></label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required style={inputStyle} />
            </div>
          </div>
        </div>

        {/* --- SECTION: Contact & Address --- */}
        <div style={{ border: '1px solid #555', borderRadius: '8px', padding: '1rem', backgroundColor: '#2a2a2a' }}>
          <h3 style={{ color: '#4CAF50', marginBottom: '0.75rem' }}>Contact & Address / संपर्क और पता</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phone <span style={{ color: 'red' }}>*</span></label>
              <input type="tel" name="phone" placeholder="Your phone (WhatsApp)" value={formData.phone} onChange={handleChange} required style={inputStyle} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email</label>
              <input type="email" name="email" placeholder="Your email (optional)" value={formData.email} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>State <span style={{ color: 'red' }}>*</span></label>
              <input type="text" placeholder="State / राज्य" value={formData.address.state} onChange={(e) => handleAddressChange('state', e.target.value)} required style={inputStyle} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>District <span style={{ color: 'red' }}>*</span></label>
              <input type="text" placeholder="District / जिला" value={formData.address.district} onChange={(e) => handleAddressChange('district', e.target.value)} required style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>City <span style={{ color: 'red' }}>*</span></label>
              <input type="text" placeholder="City / शहर" value={formData.address.city} onChange={(e) => handleAddressChange('city', e.target.value)} required style={inputStyle} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Location (specific) <span style={{ color: 'red' }}>*</span></label>
              <input type="text" placeholder="Location / स्थान" value={formData.address.location} onChange={(e) => handleAddressChange('location', e.target.value)} required style={inputStyle} />
            </div>
          </div>
        </div>

        {/* --- SECTION: Occupation --- */}
        <div style={{ border: '1px solid #555', borderRadius: '8px', padding: '1rem', backgroundColor: '#2a2a2a' }}>
          <h3 style={{ color: '#4CAF50', marginBottom: '0.75rem' }}>Occupation / पेशा</h3>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Occupation <span style={{ color: 'red' }}>*</span></label>
            <select name="occupation" value={formData.occupation} onChange={handleChange} required style={inputStyle}>
              <option value="">Select</option>
              <option value="Student">Student</option>
              <option value="Employee">Employee</option>
              <option value="Self-Employee">Self-Employee</option>
              <option value="Entrepreneur">Entrepreneur</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* conditional occupation details */}
          {formData.occupation === 'Student' && (
            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Name of School/College/Institute <span style={{ color: 'red' }}>*</span></label>
              <input type="text" value={formData.occupationDetails.schoolName} onChange={(e) => handleOccupationDetailChange('schoolName', e.target.value)} required style={inputStyle} placeholder="School / College / Institute" />
            </div>
          )}

          {formData.occupation === 'Employee' && (
            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Name of Employer / Company</label>
              <input type="text" value={formData.occupationDetails.employeeCompany} onChange={(e) => handleOccupationDetailChange('employeeCompany', e.target.value)} style={inputStyle} placeholder="Employer / Company" />
            </div>
          )}

          {formData.occupation === 'Self-Employee' && (
            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Business Name</label>
              <input type="text" value={formData.occupationDetails.selfBusinessName} onChange={(e) => handleOccupationDetailChange('selfBusinessName', e.target.value)} style={inputStyle} placeholder="Business name" />
            </div>
          )}

          {formData.occupation === 'Entrepreneur' && (
            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Business Name</label>
              <input type="text" value={formData.occupationDetails.entrepreneurBusiness} onChange={(e) => handleOccupationDetailChange('entrepreneurBusiness', e.target.value)} style={inputStyle} placeholder="Business name" />
            </div>
          )}

          {formData.occupation === 'Other' && (
            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Please specify</label>
              <input type="text" value={formData.occupationDetails.otherOccupation} onChange={(e) => handleOccupationDetailChange('otherOccupation', e.target.value)} style={inputStyle} placeholder="Your occupation" />
            </div>
          )}
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
