import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = ["불편사항", "결제문의", "예약문의"];

export const data = {
  labels,
  datasets: [
    {
      label: "2024년",
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "2025년",
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

interface BarChartProps {
  children?: React.ReactNode;
}

const BarChart = (props: BarChartProps): JSX.Element => {
  return <Bar options={options} data={data} />;
};

export default BarChart;
