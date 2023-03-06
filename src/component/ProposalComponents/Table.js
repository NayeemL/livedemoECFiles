import React from "react";

export default function Table({ list, subTotal }) {
  return (
    <>
    <div className="bg-white">
      <table width="100%" className="mb-10">
        <thead className="bg-slate-200 border-b border-gray-300">
          <tr className="text-left">
            <td className="font-bold px-1">Product Name</td>
            <td className="font-bold">Quantity</td>
            <td className="font-bold">Price</td>
            <td className="font-bold">Amount</td>
            <td className="font-bold">MRP / Unit</td>
          </tr>
        </thead>
        {list.map(
          ({ id, subheader, productName, quantity, price, amount, mrp }) => (
            <React.Fragment key={id}>
              <tbody>
                <tr>
                  <td
                    colspan="6"
                    className="p-1 col font-bold border-solid border-b border-gray-300 text-center text-teal-800"
                  >
                    {subheader}
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr className="h-10 text-left">
                  <td className="px-2 py-1">{productName}</td>
                  <td className="px-1 py-1">{quantity}</td>
                  <td className="px-1 py-1">{price}</td>
                  <td className="px-1 py-1">{amount}</td>
                  <td className="px-1 py-1">{mrp}</td>
                </tr>
              </tbody>
            </React.Fragment>
          )
        )}
      </table>

      <div>
        <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">
          Rs. {subTotal}
        </h2>
      </div>
      </div>
    </>
  );
}
