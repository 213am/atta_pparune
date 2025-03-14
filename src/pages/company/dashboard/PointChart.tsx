import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import PointHistory from "./PointHistory";
import EnquiryHistory from "./EnquiryHistory";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["사용된 포인트", "현재 포인트"],
  datasets: [
    {
      label: `금액(원)`,
      data: [3000000, 400000],
      backgroundColor: ["rgba(0, 153, 255, 0.3)", "rgba(59, 59, 59, 0.3)"],
      borderColor: ["rgba(54, 162, 235, 1)", "#929292"],
      borderWidth: 2,
    },
  ],
};

const PointChart = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full justify-center items-center bg-gray">
      <div className="flex flex-col w-[70%] h-full justify-between bg-white py-10 mt-10 shadow-2xl rounded-md">
        <div className="flex w-full h-[10%] justify-center text-3xl">
          <span>포인트 거래내역</span>
        </div>
        <div className="flex w-full h-[90%]">
          <div className="flex w-1/3 justify-center">
            <Doughnut data={data} />
          </div>
          <div className="flex w-1/3 justify-center">
            <Doughnut data={data} />
          </div>
          <div className="flex w-1/3 justify-center">
            <Doughnut data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointChart;
