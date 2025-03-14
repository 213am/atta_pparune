import { faker } from "@faker-js/faker";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart = ({ enqCount }: number[]): JSX.Element => {
  const labels = ["불편사항", "문의사항"];
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          ...({ borderDash: [2, 4] } as any), // ✅ 강제 타입 변환
        },
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "2024년",
        data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "2025년",
        data: enqCount?.map((item: number) => item),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
