// Refactored CrudTable Component

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { Watch } from "react-loader-spinner";

import Delete from "../assets/icons/delete.svg";
import Edit from "../assets/icons/edit.svg";
import Accept from "../assets/icons/accept.svg";
import Cancel from "../assets/icons/cancel.svg";

import "./crudtable.css";

// Create reusable Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000",
  //baseURL: "https://wish-list-bay.vercel.app",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const CrudTable = () => {
  // State declarations
  const [rows, setRows] = useState([]); // Stores the table rows
  const [editIndex, setEditIndex] = useState(null); // Tracks the index of the row being edited
  const [editForm, setEditForm] = useState(["", "", ""]); // Stores the form data for editing
  const [loading, setLoading] = useState(false); // Tracks loading state

  const { user } = useAuth0(); // Get user info from Auth0

  // Fetch items from the API
  const fetchItems = async () => {
    try {
      const response = await api.get("/api/items");
      setRows(response.data);
      console.log("Data fetched:", response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
      Swal.fire("Error", "Failed to fetch items. Please try again.", "error");
    }
  };

  // Save data to the API
  const postData = async () => {
    setLoading(true);
    try {
      const response = await api.post("/api/save", { rows });
      console.log("Data saved successfully:", response.data);

      Swal.fire({
        title: "Success!",
        text: `${response.data.receivedData.rows.length} Items Saved. ✔️`,
        icon: "success",
      });
    } catch (error) {
      console.error("Error saving data:", error);
      Swal.fire("Error", "Failed to save data. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add a new row
  const addRow = () => {
    const newRow = ["New Item", "0", user.name];
    setRows((prevRows) => [...prevRows, newRow]);
  };

  // Save all rows to the server
  const saveItems = () => {
    if (rows.length === 0) {
      Swal.fire("No Items", "There is nothing to save.", "info");
      return;
    }
    postData();
  };

  // Start editing a row
  const editRow = (rowIndex) => {
    setEditIndex(rowIndex);
    setEditForm(rows[rowIndex]);
  };

  // Save edited row
  const saveEdit = () => {
    if (!editForm[0] || editForm[1] < 0) {
      Swal.fire("Invalid Input", "Please enter valid values.", "error");
      return;
    }
    setRows((prevRows) =>
      prevRows.map((row, index) => (index === editIndex ? editForm : row))
    );
    setEditIndex(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditIndex(null);
  };

  // Handle input change during editing

    const handleInputChange = (e, fieldIndex) => {
      const updatedForm = [...editForm];
      updatedForm[fieldIndex] = e.target.value;
      setEditForm(updatedForm);
    };

  // Delete a row
  const deleteRow = (rowIndex) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setRows((prevRows) =>
          prevRows.filter((_, index) => index !== rowIndex)
        );

        const deleteIcon =
          '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="#F43A15" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"/></svg>';

        Swal.fire({
          title: "Deleted!",
          icon: "error",
          iconHtml: deleteIcon,
          timer: 1200,
          showConfirmButton: false,
          customClass: {
            icon: "rotate-y",
          },
        });

      }
    });
  };



  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <Watch
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="Loading"
          />
          <p>Saving...</p>
        </div>
      ) : (
        <>
          {/* Action Buttons */}
          <div className="CrudTableContainer1">
            <button className="crudTableAddButton" onClick={addRow}>
              Add
            </button>
            <button className="crudTableSaveButton" onClick={saveItems}>
              Save {rows.length} items
            </button>
          </div>

          {/* Table */}

          <div className="CrudTableContainer2">
            <table className="CrudTable">
              <thead className="TableHeader">
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>User</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={editIndex === rowIndex ? "editing" : ""}
                  >
                    {editIndex === rowIndex ? (
                      // Edit Mode
                      <>
                        <td>
                          <input
                            name="description"
                            value={editForm[0]}
                            onChange={(e) => handleInputChange(e, 0)}
                            className="custom_text_input"
                          />
                        </td>
                        <td>
                          <input
                            name="qty"
                            type="number"
                            min="0"
                            max="100"
                            value={editForm[1]}
                            onChange={(e) => handleInputChange(e, 1)}
                            className="custom_number_input"
                          />
                        </td>
                        <td>
                          <input
                            name="user"
                            value={editForm[2]}
                            disabled
                            className="custom_user_input"
                          />
                        </td>
                        <td>
                          <button className="editButton" onClick={saveEdit}>
                            <img src={Accept} alt="Accept" />
                          </button>
                          <button className="deleteButton" onClick={cancelEdit}>
                            <img src={Cancel} alt="Cancel" />
                          </button>
                        </td>
                      </>
                    ) : (
                      // View Mode
                      <>
                        <td>{row[0]}</td>
                        <td>{row[1]}</td>
                        <td>{row[2]}</td>
                        <td>
                          <button
                            className="editButton"
                            onClick={() => editRow(rowIndex)}
                          >
                            <img src={Edit} alt="Edit" />
                          </button>
                          <button
                            className="deleteButton"
                            onClick={() => deleteRow(rowIndex)}
                          >
                            <img src={Delete} alt="Delete" />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default CrudTable;