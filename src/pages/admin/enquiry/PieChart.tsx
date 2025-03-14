import axios from "axios";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

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

const PieChart = ({ enqCount }: number[]): JSX.Element => {
  const data = {
    labels: ["불편사항", "문의사항"],
    datasets: [
      {
        label: "건수",
        data: enqCount,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["#ffa0d7", "#4b87c0"],
        borderWidth: 4,
      },
    ],
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
