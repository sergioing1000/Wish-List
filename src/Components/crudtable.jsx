import React, { useState } from "react";
import "./crudtable.css";

const CrudTable = () => {
  const [rows, setRows] = useState([
    ["Apples", "5"],
    ["Lettuce", "3"],
    ["BBQ Sauce", "2"],
    ["Hair Spray", "1"],
  ]);

  const addRow = () => {
    const newRow = ["New Item", "0"];
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const editRow = (rowIndex) => {
    console.log(`Editing row ${rowIndex}`);
    // Add your edit logic here
  };

  const deleteRow = (rowIndex) => {
    setRows((prevRows) => prevRows.filter((_, index) => index !== rowIndex));
  };

  return (
    <>
      <div className="CrudTableContainer1">
        <button className="crudTableButton" onClick={addRow}>
          Add
        </button>
      </div>

      <div className="CrudTableContainer2">
        <table className="CrudTable">
          <thead className="TableHeader">
            <tr>
              <th style={{ width: "58%", textAlign: "center" }}>Description</th>
              <th style={{ width: "12%", textAlign: "center" }}>Qty</th>
              <th style={{ width: "30%", textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr className="TableRow" key={rowIndex}>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CrudTable;
