import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { Watch } from "react-loader-spinner";

import Delete from "../assets/icons/delete.svg";
import Edit from "../assets/icons/edit.svg";
import Acept from "../assets/icons/accept.svg";
import Cancel from "../assets/icons/cancel.svg";

import "./crudtable.css";

const CrudTable = () => {
  const [rows, setRows] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState(["", "", ""]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    const api = axios.create({
      baseURL: "https://wish-list-bay.vercel.app",
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      const response = await api.get("/api/items");
      setRows(response.data);
      console.log("Data", response.data);
    } catch (error) {
      console.error(
        "Error fetching items:",
        error.response ? error.response.data : error.message
      );
      alert("Error fetching items.");
    }
  };

  const postData = async () => {
    console.log(rows);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const api = axios.create({
      baseURL: "https://wish-list-bay.vercel.app",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    try {
      const response = await api.post("api/save", { rows });
      console.log("Data saved successfully:", response.data);

      Swal.fire({
        title: "Data saved successfully",
        text: response.data.receivedData.rows.length + " Items Saved. ✔️",
        icon: "success",
      });
    } catch (error) {
      console.error("There was an error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const { user } = useAuth0();

  const addRow = () => {
    const newRow = ["New Item", "0", user.name];
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const saveItems = () => {
    console.log(rows);
    postData();
  };

  const editRow = (rowIndex) => {
    setEditIndex(rowIndex);
    setEditForm(rows[rowIndex]);
  };

  const saveEdit = () => {
    setRows((prevRows) =>
      prevRows.map((row, index) => (index === editIndex ? editForm : row))
    );
    setEditIndex(null);
  };

  const cancelEdit = () => {
    setEditIndex(null);
  };

  const handleInputChange = (e, fieldIndex) => {
    const updatedForm = [...editForm];
    updatedForm[fieldIndex] = e.target.value;
    setEditForm(updatedForm);
  };

  const deleteRow = (rowIndex) => {
    setRows((prevRows) => prevRows.filter((_, index) => index !== rowIndex));
  };

  let rowCount = rows.length;

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <Watch
            visible={true}
            height="80"
            width="80"
            radius="48"
            color="#4fa94d"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p>Saving...</p>
        </div>
      ) : (
        <>
          <div className="CrudTableContainer1">
            <button className="crudTableAddButton" onClick={addRow}>
              Add
            </button>

            <button className="crudTableSaveButton" onClick={saveItems}>
              Save {rowCount} items
            </button>
          </div>

          <div className="CrudTableContainer2">
            <table className="CrudTable">
              <thead className="TableHeader">
                <tr className="TableHeader">
                  <th style={{ width: "67%", textAlign: "center" }}>
                    Description
                  </th>
                  <th style={{ width: "8%", textAlign: "center" }}>Qty</th>
                  <th style={{ width: "15%", textAlign: "center" }}>User</th>
                  <th style={{ width: "10%", textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr className="TableRow" key={rowIndex}>
                    {editIndex === rowIndex ? (
                      <>
                        <td>
                          <input
                            type="text"
                            value={editForm[0]}
                            onChange={(e) => handleInputChange(e, 0)}
                            className="custom_text_input"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={editForm[1]}
                            min="0"
                            max="100"
                            onChange={(e) => handleInputChange(e, 1)}
                            className="custom_number_input"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editForm[2]}
                            disabled
                            className="custom_user_input"
                          />
                        </td>
                        <td className="AcctionsRow">
                          <button className="editButton" onClick={saveEdit}>
                            <img src={Acept} alt="Acept" />
                          </button>
                          <button className="deleteButton" onClick={cancelEdit}>
                            <img src={Cancel} alt="Cancel" />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ textAlign: "left" }}>{row[0]}</td>
                        <td style={{ textAlign: "center" }}>{row[1]}</td>
                        <td style={{ textAlign: "center" }}>{row[2]}</td>
                        <td
                          className="AcctionsRow"
                          style={{ textAlign: "center" }}
                        >
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
