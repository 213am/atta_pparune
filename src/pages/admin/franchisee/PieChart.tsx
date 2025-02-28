import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["불편사항", "결제문의", "예약문의"],
  datasets: [
    {
      label: "건수",
      data: [21, 15, 9],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

interface PieChartProps {
  children?: React.ReactNode;
}

const PieChart = (props: PieChartProps): JSX.Element => {
  return <Pie data={data}>PieChart</Pie>;
};

export default PieChart;
