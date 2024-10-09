import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import MonthAndSearch from "./components/Searchbox";
import TransactionTable from "./components/transactionTable";
import Statistics from "./components/statistics";
import BarChart from "./components/Chart";

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [selectedPerPage, setSelectedPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `https://roxiler-assignment-backend.vercel.app/api/transactions`,
        {
          params: {
            month: selectedMonth,
            search: searchText,
            page: currentPage,
            perPage: selectedPerPage,
          },
        }
      );


      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handlePerPageChange = (e) => {
    setSelectedPerPage(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchText("");
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, searchText, currentPage, selectedPerPage]);

  return (
    <div className="bg-[#edf6f6]">
      <div className="flex items-center justify-center p-5">
        <div className="w-60 h-60 bg-white rounded-full flex items-center justify-center">
          <p className="text-[#464646] font-bold text-xl">
            Transaction
            <br />
            Dashboard
          </p>
        </div>
      </div>

      <MonthAndSearch
        value={searchText}
        onSearchChange={handleSearchChange}
        onClear={handleSearchClear}
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
      />
      <TransactionTable
        transactions={transactions}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        selectedPerPage={selectedPerPage}
        onChange={handlePerPageChange}
        page={currentPage}
      />
      <hr className="border border-b-green-500"></hr>
      
      <Statistics selectedMonth={selectedMonth} />
      <hr className="border border-b-green-500"></hr>
      <BarChart selectedMonth={selectedMonth} />
    </div>
  );
};

export default App;
