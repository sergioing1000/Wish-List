import React, { useState } from "react";
import "./crudtable.css";

const CrudTable = () => {
  const [rows, setRows] = useState([
    ["Apples", "5"],
    ["Lettuce", "3"],
    ["BBQ Sauce", "2"],
    ["Hair Spray", "1"],
  ]);

  const [editIndex, setEditIndex] = useState(null); // Index of the row being edited
  const [editForm, setEditForm] = useState(["", ""]); // Form state for editing

  const addRow = () => {
    const newRow = ["New Item", "0"];
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const saveItems = () => {
      console.log(rows)
  }

  const editRow = (rowIndex) => {
    setEditIndex(rowIndex);
    setEditForm(rows[rowIndex]); // Initialize form with the current row's values
  };

  const saveEdit = () => {
    setRows((prevRows) =>
      prevRows.map((row, index) => (index === editIndex ? editForm : row))
    );
    setEditIndex(null); // Exit edit mode
  };

  const cancelEdit = () => {
    setEditIndex(null); // Exit edit mode without saving
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
              <th style={{ width: "68%", textAlign: "center" }}>Description</th>
              <th style={{ width: "12%", textAlign: "center" }}>Qty</th>
              <th style={{ width: "20%", textAlign: "center" }}>Actions</th>
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
                    <td className="AcctionsRow">
                      <button className="editButton" onClick={saveEdit}>
                        Save
                      </button>
                      <button className="deleteButton" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ textAlign: "left" }}>{row[0]}</td>
                    <td style={{ textAlign: "center" }}>{row[1]}</td>
                    <td className="AcctionsRow" style={{ textAlign: "center" }}>
                      <button
                        className="editButton"
                        onClick={() => editRow(rowIndex)}
                      >
                        Edit
                      </button>
                      <button
                        className="deleteButton"
                        onClick={() => deleteRow(rowIndex)}
                      >
                        Delete
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
  );
};

export default CrudTable;