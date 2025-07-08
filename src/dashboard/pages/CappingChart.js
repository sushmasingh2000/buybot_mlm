import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const CappingPieChart = ({ cappingData }) => {
  // Pie chart data
  const data = {
    labels: ["Achieved", "Remaining"],
    datasets: [
      {
        label: "Capping",
        data: [cappingData.achieved, cappingData.remaining],
        backgroundColor: ["#4caf50", "#ff9800"], // Green for achieved, Orange for remaining
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <h2 className="font-bold mb-4">Capping</h2>
      <Pie data={data} />
    </div>
  );
};

export default CappingPieChart;
