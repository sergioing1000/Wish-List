import axios from "axios";
 import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { Watch } from "react-loader-spinner";


import UpArrow from "../assets/icons/uparrow.svg";
import DownArrow from "../assets/icons/downarrow.svg";
import Delete from "../assets/icons/delete.svg";
import Edit from "../assets/icons/edit.svg";
import Accept from "../assets/icons/accept.svg";
import Cancel from "../assets/icons/cancel.svg";

import "./crudtable.css";

// Create reusable Axios instance
const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://wish-list-bay.vercel.app",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const CrudTable = () => {
  // State declarations
  const [rows, setRows] = useState([]); // Stores the table rows
  const [editIndex, setEditIndex] = useState(null); // Tracks the index of the row being edited
  const [editForm, setEditForm] = useState(["", "", "", ""]); // Now 4 fields: description, quantity, user, image
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [modalImage, setModalImage] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const [movingRow, setMovingRow] = useState(null);
  const [moveDirection, setMoveDirection] = useState(null);

  const colors = ["black", "red", "blue", "green"];
  const [descriptionColors, setDescriptionColors] = useState({});

  const [showOptions, setShowOptions] = useState(false);

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
      console.log(rows);
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
    const newRow = ["", "1", user.name, ""]; // Now includes empty image field
    setRows((prevRows) => [...prevRows, newRow]);
  };

  // Save all rows to the server
  const saveItems = () => {
    //if (rows.length === 0) {
    //  Swal.fire("No Items", "There is nothing to save.", "info");
    //  return;
    //}
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

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalImage(null);
      setIsClosing(false);
    }, 300); // This matches the animation duration (0.3s)
  };

  const moveRowUp = (index) => {
    if (index === 0) return;

    setMovingRow(index);
    setMoveDirection("up");

    setRows((prevRows) => {
      const newRows = [...prevRows];
      [newRows[index - 1], newRows[index]] = [
        newRows[index],
        newRows[index - 1],
      ];
      return newRows;
    });

    setTimeout(() => {
      setMovingRow(null);
      setMoveDirection(null);
    }, 500); // Reset after animation
  };

  const moveRowDown = (index) => {
    if (index === rows.length - 1) return;

    setMovingRow(index);
    setMoveDirection("down");

    setRows((prevRows) => {
      const newRows = [...prevRows];
      [newRows[index], newRows[index + 1]] = [
        newRows[index + 1],
        newRows[index],
      ];
      return newRows;
    });

    setTimeout(() => {
      setMovingRow(null);
      setMoveDirection(null);
    }, 500); // Reset after animation
  };


  // Handle capturing the image from camera
  const handleImageCapture = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 600; // Max width for resized image
        const scaleSize = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const resizedBase64 = canvas.toDataURL("image/jpeg", 0.8); // 80% quality

        const updatedForm = [...editForm];
        updatedForm[3] = resizedBase64;
        setEditForm(updatedForm);
      };
    };
    reader.readAsDataURL(file);
  };

  const cycleDescriptionColor = (rowIndex) => {
    setDescriptionColors((prev) => {
      const currentColorIndex = prev[rowIndex] ?? 0; // Default to 0 (black) if undefined
      const nextColorIndex = (currentColorIndex + 1) % colors.length;
      return { ...prev, [rowIndex]: nextColorIndex };
    });
  };

  const handleOptionClick = (type) => {
    setShowOptions(false);
    if (type === "camera") {
      document.getElementById("cameraInput").click();
    } else {
      document.getElementById("galleryInput").click();
    }
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
                  <th>#</th>
                  <th>Descripción</th>
                  <th style={{ width: "80px" }}>Cantidad</th>
                  <th>Imagen</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`
                        ${editIndex === rowIndex ? "editing" : ""}
                        ${
                          movingRow === rowIndex
                            ? moveDirection === "up"
                              ? "moving-up"
                              : "moving-down"
                            : ""
                        }
                    `}
                  >
                    <td>{rowIndex + 1}</td>

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
                            style={{ width: "60px" }} // Reduced width
                          />
                        </td>

                        <td>
                          <div className="image-uploader">
                            <button
                              className="custom_button"
                              onClick={() => setShowOptions((prev) => !prev)}
                            >
                              🖼️ Upload Image
                            </button>

                            {showOptions && (
                              <div className="dropdown-menu">
                                <button
                                  className="dropdownbutton"
                                  onClick={() => handleOptionClick("camera")}
                                >
                                  📸
                                </button>
                                <button
                                  className="dropdownbutton"
                                  onClick={() => handleOptionClick("gallery")}
                                >
                                  📂
                                </button>
                              </div>
                            )}

                            {/* Hidden Inputs */}
                            <input
                              id="cameraInput"
                              type="file"
                              accept="image/*"
                              capture="environment"
                              onChange={handleImageCapture}
                              className="hidden"
                            />
                            <input
                              id="galleryInput"
                              type="file"
                              accept="image/*"
                              onChange={handleImageCapture}
                              className="hidden"
                            />
                          </div>

                          {/* <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={(e) => handleImageCapture(e)}
                            className="custom_file_input"
                          /> */}
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
                        <td
                          onClick={() => cycleDescriptionColor(rowIndex)}
                          style={{
                            color: colors[descriptionColors[rowIndex] ?? 0],
                            cursor: "pointer",
                            userSelect: "none",
                          }}
                          className="fade-color"
                        >
                          {row[0]}
                        </td>

                        <td style={{ width: "60px" }}>{row[1]}</td>
                        <td>
                          {row[3] ? (
                            <img
                              src={row[3]}
                              alt="Thumbnail"
                              style={{
                                width: "60px",
                                height: "auto",
                                cursor: "pointer",
                              }}
                              onClick={() => setModalImage(row[3])} // Open modal on click
                            />
                          ) : (
                            "No Image"
                          )}
                        </td>
                        <td className="action-buttons">
                          <button
                            className="moveButton"
                            onClick={() => moveRowUp(rowIndex)}
                            disabled={rowIndex === 0}
                          >
                            <img src={UpArrow} alt="UpArrow" />
                          </button>
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
                          <button
                            className="moveButton"
                            onClick={() => moveRowDown(rowIndex)}
                            disabled={rowIndex === rows.length - 1}
                          >
                            <img src={DownArrow} alt="DownArrow" />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Modal to display big image */}
          {modalImage && (
            <div
              className={`modal-overlay ${isClosing ? "fade-out" : ""}`}
              onClick={closeModal}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-button" onClick={closeModal}>
                  ✖
                </button>
                <img src={modalImage} alt="Full Size" className="modal-image" />
                <div className="modal_bottom">
                  <p>
                    Usuario:{" "}
                    {rows.find((row) => row[3] === modalImage)?.[2] ||
                      "Unknown"}
                  </p>
                  <button
                    className="delete-image-button"
                    onClick={() => {
                      const rowIndex = rows.findIndex(
                        (row) => row[3] === modalImage
                      );
                      if (rowIndex !== -1) {
                        const updatedRows = [...rows];
                        updatedRows[rowIndex][3] = ""; // Clear the image
                        setRows(updatedRows);
                        Swal.fire(
                          "Deleted",
                          "Image deleted successfully!",
                          "success"
                        );
                      }
                      closeModal();
                    }}
                  >
                    Delete Image
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CrudTable;