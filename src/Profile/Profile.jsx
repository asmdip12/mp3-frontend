// ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {
  const { auth } = useAuth();
  const [profileDraft, setProfileDraft] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);

  const [treeForms, setTreeForms] = useState([]);
  const [plantForms, setPlantForms] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingFormModalOpen, setEditingFormModalOpen] = useState(false);
  const [editingFormData, setEditingFormData] = useState(null);
  const [editingFormId, setEditingFormId] = useState(null);
  const [editingPlaceId, setEditingPlaceId] = useState(null);

  // Load user forms
  useEffect(() => {
    if (!auth?.user) return;
    setLoading(true);

    // Fetch tree forms
    fetch("https://mp3-backend-f7n3.onrender.com/api/treeform/getformdata", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const my = data.filter((f) => f.submittedby?.toString() === auth.user.id?.toString());
        setTreeForms(my);
      })
      .catch((err) => console.error("Error fetching tree forms:", err));

    // Fetch plantation forms
    fetch("https://mp3-backend-f7n3.onrender.com/api/treeform/getformdatap", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Raw plantation forms from backend:", data);
        const my = data.filter(f => f.submittedby?.toString() === auth.user.id?.toString());
        console.log("Filtered for current user:", my);
        setPlantForms(my);
      })      
      .catch((err) => console.error("Error fetching plantation forms:", err))
      .finally(() => setLoading(false));
  }, [auth?.user]);

  // Handle profile input changes
  const handleProfileInput = (e) => {
    const { name, value } = e.target;
    if (!profileDraft) return;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProfileDraft((p) => ({ ...p, [parent]: { ...(p[parent] || {}), [child]: value } }));
    } else {
      setProfileDraft((p) => ({ ...p, [name]: value }));
    }
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    if (!profileDraft) return;
    try {
      const res = await fetch("https://mp3-backend-f7n3.onrender.com/api/user/profile", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileDraft),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      await res.json();
      setEditingProfile(false);
      toast.success("Profile updated ✅");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  // Open edit modal for a place
  const openEditFormModal = (formId, placeId) => {
    const form = plantForms.find((f) => f._id === formId);
    if (!form) return;
    const place = (form.places || []).find((p) => p._id === placeId);
    if (!place) return;

    setEditingFormData({ ...place });
    setEditingFormId(formId);
    setEditingPlaceId(placeId);
    setEditingFormModalOpen(true);
  };
  

  // Save edited place data
  const handleSaveEditedPlace = async () => {
    if (!editingFormData || !editingFormId || !editingPlaceId) return;
    try {
      const updatedPlace = {
        state: editingFormData.state,
        district: editingFormData.district,
        cityVillage: editingFormData.cityVillage,
        placeName: editingFormData.placeName,
        location: editingFormData.location,
        caretakerName: editingFormData.caretakerName,
        occupation: editingFormData.occupation,
        designation: editingFormData.designation,
        numPlants: Number(editingFormData.numPlants || 0),
        plantNames: editingFormData.plantNames,
      };

      setPlantForms((prev) =>
        prev.map((form) =>
          form._id === editingFormId
            ? { ...form, places: form.places.map((p) => (p._id === editingPlaceId ? { ...p, ...updatedPlace } : p)) }
            : form
        )
      );

      const updatedForm = plantForms
        .map((f) => (f._id === editingFormId ? { ...f } : f))
        .find((f) => f._id === editingFormId);
      updatedForm.places = updatedForm.places.map((p) => (p._id === editingPlaceId ? { ...p, ...updatedPlace } : p));

      const res = await fetch(`https://mp3-backend-f7n3.onrender.com/api/treeform/updateformp/${editingFormId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedForm),
      });
      if (!res.ok) throw new Error("Failed to update form on server");
      const saved = await res.json();

      setPlantForms((prev) => prev.map((f) => (f._id === saved._id ? saved : f)));
      toast.success("Form updated ✅");
      setEditingFormModalOpen(false);
      setEditingFormData(null);
      setEditingFormId(null);
      setEditingPlaceId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes");
    }
  };

  // Delete plantation form
  const handleDeletePlantForm = async (formId) => {
    if (!confirm("Are you sure you want to delete this form?")) return;
    try {
      const res = await fetch("https://mp3-backend-f7n3.onrender.com/api/treeform/deleteformp", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: formId }),
      });
      if (!res.ok) throw new Error("Failed to delete form");
      await res.json();
      setPlantForms((prev) => prev.filter((f) => f._id !== formId));
      toast.success("Form deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete form");
    }
  };

  // Inline image preview
  const ImgPreview = ({ src, label }) => {
    if (!src) return null;
    return (
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>{label}</div>
        <img src={src} alt={label} style={{ width: "100%", maxWidth: 240, borderRadius: 8, border: "1px solid #ddd" }} />
      </div>
    );
  };

  // Styles
  const styles = {
    page: { padding: 20, minHeight: "100vh", background: "#f8f9fa", color: "#212529" },
    header: { textAlign: "center", marginBottom: 20, fontSize: 28, fontWeight: 600 },
    card: { background: "#fff", borderRadius: 10, padding: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 16 },
    smallCard: { background: "#fff", borderRadius: 10, padding: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" },
    tableHeader: { background: "#6c757d", color: "#fff", borderRadius: "8px 8px 0 0", padding: "12px 16px", display: "grid", gridTemplateColumns: "1fr 2fr 1fr 160px", alignItems: "center" },
    tableRow: { display: "grid", gridTemplateColumns: "1fr 2fr 1fr 160px", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid #eee", background: "#fff" },
    placeItem: { marginBottom: 8, padding: 12, background: "#f1f3f4", borderRadius: 8, borderLeft: "4px solid #007bff" },
    btn: { padding: "8px 10px", borderRadius: 6, border: "none", cursor: "pointer" },
    editBtn: { background: "#007bff", color: "#fff" },
    deleteBtn: { background: "#e74c3c", color: "#fff" },
    modalBackdrop: { position: "fixed", left: 0, top: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" },
    modal: { width: "90%", maxWidth: 820, background: "#fff", borderRadius: 10, padding: 16 },
    input: { padding: 10, borderRadius: 6, border: "1px solid #ccc", width: "100%", boxSizing: "border-box", marginBottom: 8 },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 },
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.header}>My Profile</h2>

      {/* Profile card */}
      <div style={styles.card}>
        {loading ? (
          <div>Loading...</div>
        ) : auth.user ? (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600 }}>{auth.user.firstName} {auth.user.lastName}</div>
              <div style={{ marginTop: 8 }}>
                <div style={{ marginBottom: 6 }}><strong>Name:</strong> {auth.user.firstName} {auth.user.lastName}</div>
                <div style={{ marginBottom: 6 }}><strong>Email:</strong> {auth.user.email}</div>
                <div style={{ marginBottom: 6 }}><strong>Forms Submitted:</strong> {treeForms.length}</div>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <button
                style={{ ...styles.btn, ...styles.editBtn }}
                onClick={() => setEditingProfile(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <div>No profile loaded</div>
        )}
      </div>

      {/* Plantation forms */}
      <div style={{ margin: "12px 0", color: "#6c757d" }}>Showing {plantForms.length} forms you have submitted</div>

      <div style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={styles.tableHeader}>
          <div style={{ fontWeight: 600 }}>Department</div>
          <div style={{ fontWeight: 600, textAlign: "center" }}>Places</div>
          <div style={{ fontWeight: 600, textAlign: "center" }}>Submitted On</div>
          <div style={{ fontWeight: 600, textAlign: "center" }}>Actions</div>
        </div>

        {plantForms.map((form) => (
          <div key={form._id} style={{ background: "#fff" }}>
            <div style={styles.tableRow}>
              <div>{form.department || "-"}</div>

              <div>
                {(form.places || []).map((place) => (
                  <div key={place._id} style={styles.placeItem}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <div style={{ flex: 1 }}>
                        <div><strong>Location:</strong> {place.location || "-"}</div>
                        <div style={{ marginTop: 6 }}><strong>Plants:</strong> {place.numPlants} <strong>Owner:</strong> {place.owner} <strong>Names:</strong> {place.plantNames}</div>
                      </div>

                      <div style={{ width: 160, textAlign: "right", display: "flex", flexDirection: "column", gap: 8 }}>
                        <button style={{ ...styles.btn, ...styles.editBtn }} onClick={() => openEditFormModal(form._id, place._id)}>Edit</button>
                        <button style={{ ...styles.btn, ...styles.deleteBtn }} onClick={() => handleDeletePlantForm(form._id)}>Delete</button>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                      {place.placePhotoUrl && <img src={place.placePhotoUrl} alt="place" style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 6 }} />}
                      {place.caretakerPhotoUrl && <img src={place.caretakerPhotoUrl} alt="caretaker" style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 6 }} />}
                      {place.adharSide1Url && <img src={place.adharSide1Url} alt="adhar1" style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 6 }} />}
                      {place.adharSide2Url && <img src={place.adharSide2Url} alt="adhar2" style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 6 }} />}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: "center" }}>{new Date(form.createdAt).toLocaleString()}</div>
              <div style={{ textAlign: "center" }}><div style={{ color: "#888", fontSize: 12 }}>Manage places using buttons</div></div>
            </div>
          </div>
        ))}

        {plantForms.length === 0 && <div style={{ padding: 20, background: "#fff" }}>No plantation forms found</div>}
      </div>

      {/* Edit profile modal */}
      {editingProfile && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modal}>
            <h3 style={{ marginTop: 0 }}>Edit Profile</h3>
            <div style={styles.grid2}>
              <input style={styles.input} name="firstName" placeholder="First Name" value={profileDraft?.firstName || auth.user.firstName || ""} onChange={handleProfileInput} />
              <input style={styles.input} name="lastName" placeholder="Last Name" value={profileDraft?.lastName || auth.user.lastName || ""} onChange={handleProfileInput} />
              <input style={styles.input} name="email" placeholder="Email" value={profileDraft?.email || auth.user.email || ""} onChange={handleProfileInput} />
              <input style={styles.input} name="phone" placeholder="Phone" value={profileDraft?.phone || auth.user.phone || ""} onChange={handleProfileInput} />
            </div>
            <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button style={{ ...styles.btn, ...styles.deleteBtn }} onClick={() => setEditingProfile(false)}>Cancel</button>
              <button style={{ ...styles.btn, ...styles.editBtn }} onClick={handleSaveProfile}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
