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
      borderColor: ["#ffa0d7", "#4b87c0", "rgba(255, 206, 86, 1)"],
      borderWidth: 2,
    },
  ],
};

export const options = {
  // 차트 크기 설정
  aspectRatio: 1, // maintainAspectRatio가 true일 때 사용되는 비율

  plugins: {
    // 범례(Legend) 설정
    legend: {
      display: true, // legend 표시 여부
      position: "bottom" as const, // 'top'|'left'|'bottom'|'right'
      align: "center" as const, // 'start'|'center'|'end'
      labels: {
        padding: 20,
        boxWidth: 50,
        color: "#000",
        usePointStyle: true, // 포인트 스타일 사용 여부
        pointStyle: "circle", // circle, cross, dash, line, rect, star, triangle
      },
    },
  },
};

const PieChart = (): JSX.Element => {
  return <Pie data={data} options={options} />;
};

export default PieChart;
