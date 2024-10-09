import React, { useState, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const MonthAndSearch = ({ selectedMonth, onSearchChange, value, onMonthChange }) => {
  const months = [
    "Select Month",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMonthSelect = (month) => {
    onMonthChange({ target: { value: month } });
    setIsDropdownOpen(false); 
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center m-5 bg-[#ecf7f7] py-10">
      <div className="flex flex-grow max-w-xs">
        <input
          className="bg-[#ebb840] border border-gray-300 rounded-full p-3 w-full text-center focus:outline-none placeholder-black"
          type="text"
          value={value}
          onChange={onSearchChange}
          placeholder="Search transaction"
        />
      </div>

      <div className="relative flex items-center ml-4" ref={dropdownRef}>
        <div
          className="bg-[#ebb840] text-black border-none rounded-l-lg w-60 h-12 pl-2 pr-8 flex items-center justify-center cursor-pointer" // Center text
          onClick={toggleDropdown}
        >
          {selectedMonth}
        </div>

        <div
          className="bg-white p-3 rounded-r-lg border border-l-0 h-12 flex items-center justify-center cursor-pointer"
          onClick={toggleDropdown}
        >
          <FaChevronDown className="text-gray-500" />
        </div>

        {isDropdownOpen && (
          <ul className="absolute top-14 left-0 bg-white border border-gray-300 rounded-lg w-full z-10">
            {months.map((month, index) => (
              <li
                key={index}
                className={`p-2 cursor-pointer hover:bg-gray-200 ${
                  month === "March" ? "font-bold" : "font-normal"
                }`}
                onClick={() => handleMonthSelect(month)}
              >
                {month}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

MonthAndSearch.defaultProps = {
  selectedMonth: "Select Month",
};

export default MonthAndSearch;
