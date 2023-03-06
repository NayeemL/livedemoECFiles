import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "primereact/button";

function TableForm({
  subheader,
  setSubheader,
  productName,
  setProductName,
  quantity,
  setQuantity,
  price,
  setPrice,
  amount,
  setAmount,
  mrp,
  setMrp,
  list,
  setList,
}) {
  const [isEditing, setIsEditing] = useState(false);

  // Submit form function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quantity || !price) {
      toast.error("Please fill in all inputs");
    } else {
      const newItems = {
        id: uuidv4(),
        subheader,
        productName,
        quantity,
        price,
        amount, 
        mrp,
      };
      setSubheader("");
      setProductName("");
      setQuantity("");
      setPrice("");
      setAmount("");
      setMrp("");
      setList([...list, newItems]);
      setIsEditing(false);
    }
  }

  
  // Edit function
  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id !== id));
    setIsEditing(true);
    setSubheader(editingRow.subheader);   
    setProductName(editingRow.productName);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);
    setMrp(editingRow.mrp);
  };

  // Delete function
  const deleteRow = (id) => setList(list.filter((row) => row.id !== id));

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />

          <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            type="submit"
            className="mt-4 addbtn bg-blue-500 text-white font-bold py-2 rounded shadow border-none hover:bg-blue-700 transition-all duration-300"
          >
            {isEditing ? "Editing Row Item" : "Add Table Item"}
          </button>
          </div>

      {/* Table items */}

      <table width="100%" className="mb-2 mt-10">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr className="p-1 text-left">
            <td className="font-bold p-2">Product Name</td>
            <td className="font-bold">Quantity</td>
            <td className="font-bold">Price</td>
            <td className="font-bold">Amount</td>
            <td className="font-bold">MRP / Unit</td>
            <td className="font-bold text-center">Action</td>
          </tr>
        </thead>
        {list.map(
          ({ id, productName, quantity, price, amount, mrp, subheader }) => (
            <React.Fragment key={id}>
              <tbody>
                <tr>
                  <td
                    colSpan="6"
                    className="p-1 col font-semibold border-solid border-b border-gray-300 text-center text-teal-800"
                  >
                    {subheader}{" "}
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr className="h-10 text-left">
                  <td className="px-2">{productName}</td>
                  <td className="px-1">{quantity}</td>
                  <td className="px-1">{price}</td>
                  <td className="amount">{amount}</td>
                  <td className="px-1">{mrp}</td>
                  <td className="px-1 text-center">
                    <Button
                      onClick={() => editRow(id)}
                      icon="pi pi-pencil"
                      className="p-button-rounded p-button-text font-bold"
                      style={{ color: "green" }}
                      aria-label="Submit"
                    />
                    <Button
                      onClick={() => deleteRow(id)}
                      icon="pi pi-trash"
                      className="p-button-rounded p-button-text font-bold"
                      style={{ color: "red" }}
                      aria-label="Submit"
                    />
                  </td>
                </tr>
              </tbody>
            </React.Fragment>
          )
        )}
      </table>
    </>
  );
}

export default TableForm;