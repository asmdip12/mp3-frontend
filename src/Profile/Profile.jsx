import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AlignCenter } from "lucide-react";
import PlacesEditor from "./PlacesEditor"; // adjust path


export default function ProfilePage() {
  const { auth } = useAuth();
  const [forms, setForms] = useState([]);
  const [editingForm, setEditingForm] = useState(null);
  const [formDraft, setFormDraft] = useState({});
const [editingPlace, setEditingPlace] = useState(null); // {formId, placeId}
const [showPlaceDropdown, setShowPlaceDropdown] = useState({});


  useEffect(() => {
  if (!auth?.user) return;

  fetch("https://mp3-backend-f7n3.onrender.com/api/treeform/getformdata", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {

      const myForms = data.filter(
        (form) => form.submittedby?.toString() === auth.user.id?.toString()
      );

      setForms(myForms);
    })
    .catch((err) => console.error("Error fetching user forms:", err));
}, [auth?.user]);

  const handleEdit = (formId, place) => {
  setEditingPlace({ formId, placeId: place._id });
  setFormDraft({
    location: place.location,
    numPlants: place.numPlants,
    owner: place.owner,
    plantNames: place.plantNames,
  });
};

const handleUpdate = (formId, placeId, updatedPlace) => {
  const updatedForms = forms.map((form) => {
    if (form._id === formId) {
      return {
        ...form,
        places: form.places.map((p) =>
          p._id === placeId ? { ...p, ...updatedPlace } : p
        ),
      };
    }
    return form;
  });

  const updatedForm = updatedForms.find((f) => f._id === formId);

  fetch(`https://mp3-backend-f7n3.onrender.com/api/treeform/updateform/${formId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedForm),
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to update form");
      return res.json();
    })
    .then((savedForm) => {
      setForms((prev) =>
        prev.map((f) => (f._id === formId ? savedForm : f))
      );
      setEditingPlace(null);
      toast.success("Place updated successfully ✅");
    })
    .catch((err) => console.error(err));
};



const handleDelete = (formId) => {
  // Send delete request to backend
  fetch("https://mp3-backend-f7n3.onrender.com/api/treeform/deleteform", {
  method: "DELETE",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ id: formId }),
  credentials: "include",
})

    .then((res) => {
      if (!res.ok) throw new Error("Failed to delete form");
      return res.json();
    })
    .then(() => {
toast.success("Form deleted!!");
      // remove from local state
      setForms((prevForms) => prevForms.filter((f) => f._id !== formId));
    })
    .catch((err) => console.error(err));
};


  return (
    <>
      <style jsx>{`
        .profile-container {
          
          padding: 20px;
          background-color: #f8f9fa;
          min-height: calc(100vh - 84px);
          color: #212529;
        }

        .profile-header {
          font-size: 2rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 2rem;
        }

        .profile-info {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }

        .profile-info p {
          margin: 0.5rem 0;
          font-size: 1rem;
          color: #495057;
        }

        .results-count {
          margin-bottom: 1rem;
          color: #6c757d;
          font-size: 0.95rem;
        }

        .table-container {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        .table-header {
          background-color: #6c757d;
          color: white;
        }

        .table-header th {
          padding: 1rem 0.75rem;
          text-align: left;
          font-weight: 600;
          border-bottom: 3px solid #495057;
        }

        .table-cell {
          padding: 1rem 0.75rem;
          border-bottom: 1px solid #dee2e6;
          color: #495057;
          vertical-align: top;
        }

        .table-row:nth-child(even) {
          background-color: #f8f9fa;
        }

        .place-item {
          margin-bottom: 0.75rem;
          padding: 0.75rem;
          background-color: #f1f3f4;
          border-radius: 6px;
          border-left: 4px solid #007bff;
        }

        .place-label {
          font-weight: 600;
          margin-right: 0.5rem;
          color: #343a40;
        }

        .place-value {
          margin-right: 1rem;
          color: #495057;
        }
      `}</style>

      <div className="profile-container">
        {auth?.user ? (
          <>
            <h2 className="profile-header">My Profile</h2>

            {/* User Info */}
            <div className="profile-info">
              <p><strong>Name:</strong> {auth.user.name}</p>
              <p><strong>Email:</strong> {auth.user.email}</p>
              <p><strong>Forms Submitted:</strong> {forms.length}</p>
            </div>

            {/* Count */}
            <div className="results-count">
              Showing {forms.length} forms you have submitted
            </div>

            {/* Table */}
            <div className="table-container">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    <th style={{ textAlign: "center" }}>Department</th>
                    <th style={{ textAlign: "center" }}>Places</th>
                    <th style={{ textAlign: "center" }}>Submitted On</th>
                    <th style={{ textAlign: "center" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {forms.map((form, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-cell">{form.department}</td>
                      <td className="table-cell">
  {form.places?.map((place, idx) => (
    <div key={idx} className="place-item">
      <span className="place-label">Location:</span>
      <span className="place-value">{place.location}</span>
      <span className="place-label">Plants:</span>
      <span className="place-value">{place.numPlants}</span>
      <span className="place-label">Owner:</span>
      <span className="place-value">{place.owner}</span>
      <span className="place-label">Names:</span>
      <span className="place-value">{place.plantNames}</span>
    </div>
  ))}
</td>

                      <td className="table-cell">
                        {new Date(form.createdAt).toLocaleString()}
                      </td>
     <td className="updatedelete">
  <PlacesEditor
  places={form.places}
  onSave={(index, updatedPlace) => {
    const placeId = form.places[index]._id;
    handleUpdate(form._id, placeId, updatedPlace);
  }}
/>

  <button style={{ backgroundColor: "red" }}
    onClick={() => {
  toast(
    ({ closeToast }) => (
      <div>
        <p>Are you sure you want to delete this form?</p>
        <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => {
              handleDelete(form._id);
              // toast.success("Form deleted!");
              closeToast();
            }}
            style={{
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              padding: "0.3rem 0.6rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Yes
          </button>
          <button
            onClick={closeToast}
            style={{
              backgroundColor: "#ccc",
              color: "black",
              border: "none",
              padding: "0.3rem 0.6rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            No
          </button>
        </div>
      </div>
    ),
    { autoClose: false } // keep toast open until user clicks Yes/No
  );
}}

  >
    Delete
  </button>
</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <h1 className="no-access">Please log in</h1>
        )}
      </div>
    </>
  );
}
