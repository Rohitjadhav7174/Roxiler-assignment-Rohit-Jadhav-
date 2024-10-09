import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const BarChart = ({ selectedMonth }) => {
  const [barChartData, setBarChartData] = useState({
    labels: ["0-100", "101-200", "201-300", "301-400", "401-500", "501-600", "601-700", "701-800", "801-900", "901 above"],
    datasets: [
      {
        label: "Number of Items Sold",
        backgroundColor: "rgb(108,229,232)",
        borderWidth: 1,
        hoverBackgroundColor: "rgb(108,229,10)",
        data: [10, 20, 25, 20, 60, 30, 40, 70, 20, 50],
      },
    ],
  });

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await fetch(
          `https://roxiler-assignment-backend.vercel.app/api/barChart?month=${selectedMonth}`
        );
        const data = await response.json();

        const labels = data.map((item) => item.range);
        const counts = data.map((item) => item.count);

        setBarChartData({
          labels,
          datasets: [
            {
              ...barChartData.datasets[0],
              data: counts,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    fetchBarChartData();
  }, [selectedMonth, barChartData]);

  return (
    <div className="m-5">
      <div className="font-bold text-black text-4xl text-center m-5">
        Bar Chart Stats - {selectedMonth} <span className="text-gray-500 text-sm"></span>
      </div>
      <div className="bg-[#ecf7f7] p-5 rounded-lg shadow-lg">
        {barChartData ? (
          <Bar
            data={barChartData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Price Range",
                  },
                  ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                  },
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Number of Items",
                  },
                },
              },
            }}
          />
        ) : (
          <div>Loading chart data...</div>
        )}
      </div>
    </div>
  );
};

export default BarChart;
