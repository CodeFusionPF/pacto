import React, { useState, useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip, 
  Legend 
} from "chart.js";

// DATOS MOCKUP ///////////////////////////////////////////////////
import { barChartData } from "../../../utils/dashboard/admin/data";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


function BarChart({ colSpan="col-span-1" }) {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: barChartData.map((data) => data.day),
      datasets: [
        {
          label: "Ventas Diarias $ (Millones))",
          data: barChartData.map((data) => data.sumInMillions),
          borderColor: "rgb(57, 177, 131)",
          backgroundColor: "rgba(57, 177, 131, 0.4)",
        }
      ]
    })
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Ventas Diarias",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    })
    }, [barChartData]);


  return (
    <>
      <div className={`w-full ${colSpan} relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white `}>
        {
          chartData.datasets.length === 0  ? (
            <span>Cargando datos...</span>
          ) : (
            <Bar data={chartData} options={chartOptions} />
          )
        }
      </div>
    </>
  )
};

export default BarChart;