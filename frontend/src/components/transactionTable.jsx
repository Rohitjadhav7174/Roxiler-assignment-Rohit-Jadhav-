import React from "react";
import "../../src/App.css";
import PerPage from "./perPage";

const TransactionTable = ({
  transactions,
  onNextPage,
  onPrevPage,
  page,
  selectedPerPage,
  onChange,
}) => {
  return (
    <div className="flex flex-col items-center m-5 bg-[#ecf7f7] py-10">
      <div className="overflow-x-auto container max-w-max bg-[#f8df8c] rounded-xl shadow-lg">
        <div className="py-2 inline-block min-w-full">
          <div className="overflow-hidden">
            <table className="min-w-full text-center table-auto border-collapse border-black">
              <thead className="border-b-4 border-black">
                <tr className="bg-[#f8df8c] text-black border-b-4 border-black">
                  <th className="px-4 py-2 border-r-4 border-black"><b>ID</b></th>
                  <th className="px-4 py-2 border-r-4 border-black"><b>Title</b></th>
                  <th className="px-4 py-2 border-r-4 border-black"><b>Description</b></th>
                  <th className="px-4 py-2 border-r-4 border-black"><b>Price</b></th>
                  <th className="px-4 py-2 border-r-4 border-black"><b>Category</b></th>
                  <th className="px-4 py-2 border-r-4 border-black"><b>Sold</b></th>
                  <th className="px-4 py-2 border-black"><b>Image</b></th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr className="border-b-4 border-black" key={index}>
                    <td className="text-sm text-black px-4 py-2 border-r-4 border-black">{transaction._id}</td>
                    <td className="text-sm text-black px-4 py-2 border-r-4 border-black">{transaction.title}</td>
                    <td className="text-sm text-black px-4 py-2 border-r-4 border-black">{transaction.description}</td>
                    <td className="text-sm text-black px-4 py-2 border-r-4 border-black">{transaction.price}</td>
                    <td className="text-sm text-black px-4 py-2 border-r-4 border-black">NA</td>
                    <td className="text-sm text-black px-4 py-2 border-r-4 border-black">YES</td>
                    <td className="text-sm text-black px-4 py-2 border-black">Not Available</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center w-full px-5 mt-10">
        <div className="text-left font-bold">
          Page No: {page}
        </div>

        <div className="flex flex-row justify-center space-x-3 font-bold">
          <button onClick={onPrevPage}>Previous</button>
          <span>-</span>
          <button onClick={onNextPage}>Next</button>
        </div>

        <div className="text-right">
          <PerPage selectedPerPage={selectedPerPage} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
