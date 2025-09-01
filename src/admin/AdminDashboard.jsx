import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

export default function AdminDashboard() {
  const [forms, setForms] = useState([]);
  const { auth } = useAuth();
  const [page, setPage] = useState(0);

  // filter & sort state
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"

  useEffect(() => {
    let isadmin = String(import.meta.env.VITE_ADMIN) === (auth.user?.role);
    if (isadmin) {
      setPage(1);
      fetch("http://localhost:8000/api/treeform/getformdata", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      })
        .then(res => res.json())
        .then(data => {
          console.log("Received form data:", data);
          setForms(data);
        })
        .catch(err => console.error("Error fetching forms:", err));
    }
  }, [auth]);

  // helper to safely convert values to string
  const toStr = (v) => (v ?? "").toString();

  // apply filters
  let filteredForms = forms.filter((form) => {
    const name = toStr(form.fullName).toLowerCase();
    const phone = toStr(form.whatsappNo ?? form.contactNo);

    return name.includes(searchName.toLowerCase()) &&
           phone.includes(searchPhone.trim());
  });

  // apply sorting
  if (sortOrder) {
    filteredForms = [...filteredForms].sort((a, b) => {
      const totalA = (a.places ?? []).reduce((s, p) => s + (Number(p.numPlants) || 0), 0);
      const totalB = (b.places ?? []).reduce((s, p) => s + (Number(p.numPlants) || 0), 0);
      return sortOrder === "asc" ? totalA - totalB : totalB - totalA;
    });
  }

  return (
    <>
      <style jsx>{`
        .dashboard-container {
          margin-top: 84px;
          padding: 20px;
          background-color: #f8f9fa;
          min-height: calc(100vh - 84px);
          color: #212529;
        }

        .dashboard-header {
          color: #343a40;
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 2rem;
          text-align: center;
        }

        .filters-container {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
        }

        .filter-input {
          padding: 0.75rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 1rem;
          color: #495057;
          background-color: #fff;
          transition: border-color 0.3s ease;
          min-width: 200px;
        }

        .filter-input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }

        .filter-select {
          padding: 0.75rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 1rem;
          color: #495057;
          background-color: #fff;
          cursor: pointer;
          transition: border-color 0.3s ease;
          min-width: 180px;
        }

        .filter-select:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
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

        .table-row {
          transition: background-color 0.2s ease;
        }

        .table-row:nth-child(even) {
          background-color: #f8f9fa;
        }

        .table-row:hover {
          background-color: #e9ecef;
        }

        .table-cell {
          padding: 1rem 0.75rem;
          border-bottom: 1px solid #dee2e6;
          color: #495057;
          vertical-align: top;
        }

        .place-item {
          margin-bottom: 0.75rem;
          padding: 0.75rem;
          background-color: #f1f3f4;
          border-radius: 6px;
          border-left: 4px solid #007bff;
        }

        .place-item:last-child {
          margin-bottom: 0;
        }

        .place-label {
          font-weight: 600;
          color: #343a40;
          margin-right: 0.5rem;
        }

        .place-value {
          color: #495057;
          margin-right: 1rem;
        }

        .no-access {
          text-align: center;
          font-size: 2rem;
          font-weight: 600;
          color: #6c757d;
          margin-top: 3rem;
        }

        .results-count {
          margin-bottom: 1rem;
          color: #6c757d;
          font-size: 0.95rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 15px;
            margin-top: 70px;
          }

          .dashboard-header {
            font-size: 1.75rem;
            margin-bottom: 1.5rem;
          }

          .filters-container {
            flex-direction: column;
            align-items: stretch;
            padding: 1rem;
          }

          .filter-input,
          .filter-select {
            min-width: unset;
            width: 100%;
          }

          .table-container {
            margin: 0 -15px;
            border-radius: 0;
          }

          .data-table {
            font-size: 0.85rem;
          }

          .table-header th,
          .table-cell {
            padding: 0.75rem 0.5rem;
          }

          .place-item {
            font-size: 0.85rem;
            margin-bottom: 0.5rem;
            padding: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .dashboard-container {
            padding: 10px;
          }

          .dashboard-header {
            font-size: 1.5rem;
          }

          .data-table {
            font-size: 0.8rem;
          }

          .table-header th,
          .table-cell {
            padding: 0.5rem 0.25rem;
          }

          .place-item {
            font-size: 0.8rem;
          }

          .place-label,
          .place-value {
            display: block;
            margin: 0.25rem 0;
          }
        }

        /* Table scroll indicators */
        .table-container::-webkit-scrollbar {
          height: 8px;
        }

        .table-container::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .table-container::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }

        .table-container::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
      
      <div className="dashboard-container">
        {page ? (
          <>
            <h2 className="dashboard-header">Submitted Forms</h2>

            {/* Filters */}
            <div className="filters-container">
              <input
                type="text"
                placeholder="Search by Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="filter-input"
              />
              <input
                type="text"
                placeholder="Search by WhatsApp Number"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="filter-input"
              />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="filter-select"
              >
                <option value="">Sort by Plants</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="results-count">
              Showing {filteredForms.length} of {forms.length} forms
            </div>

            {/* Table */}
            <div className="table-container">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    <th>Full Name</th>
                    <th>Department</th>
                    <th>WhatsApp Number</th>
                    <th>Places</th>
                    <th>Submitted On</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredForms.map((form, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-cell">{form.fullName}</td>
                      <td className="table-cell">{form.department}</td>
                      <td className="table-cell">{form.whatsappNo ?? form.contactNo}</td>
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
                      <td className="table-cell">{new Date(form.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <h1 className="no-access">No access</h1>
        )}
      </div>
    </>
  );
}