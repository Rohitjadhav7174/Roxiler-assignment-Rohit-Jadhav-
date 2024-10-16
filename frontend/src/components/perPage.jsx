import React from "react";

const PerPage = ({ selectedPerPage, onChange }) => {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30];

  return (
    <div>
      Per Page:
      <select value={selectedPerPage} onChange={onChange}>
        {pages.map((page) => (
          <option key={page} value={page}>
            {page}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PerPage;
