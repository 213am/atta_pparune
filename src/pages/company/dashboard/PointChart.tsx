/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { getCookie } from "../../../components/cookie";
import dayjs from "dayjs";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartDataI {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    },
  ];
}

interface PointTypeI {
  allowPoint: number;
  buyPoint: number;
  currentPoint: number;
}

const PointChart = (): JSX.Element => {
  const [chartPoint, setChartPoint] = useState<PointTypeI>({
    allowPoint: 0,
    buyPoint: 0,
    currentPoint: 0,
  });
  const companyId = sessionStorage.getItem("adminId");
  const accessToken = getCookie();
  const nowMonth = dayjs().format("MM");
  const prevMonth = dayjs().subtract(1, "month").format("MM");

  const dataArr: ChartDataI[] = [
    {
      labels: [`${nowMonth}월 포인트 구매`, `${prevMonth}월 이월 포인트`],
      datasets: [
        {
          label: `금액(원)`,
          data: [
            chartPoint?.buyPoint, // 이번달 구매한 포인트
            chartPoint?.currentPoint - chartPoint?.allowPoint, // 총구매 + 이월 포인트
          ],
          backgroundColor: ["rgba(0, 162, 255,1)", "rgba(204, 204, 204,1)"],
          borderColor: ["rgba(54, 162, 235, 1)", "rgb(204, 204, 204)"],
          borderWidth: 0,
        },
      ],
    },
    {
      labels: [`${nowMonth}월 포인트 지출`, "현재 잔여 포인트"],
      datasets: [
        {
          label: `금액(원)`,
          data: [
            chartPoint?.allowPoint, // 이번달 지출한 포인트
            chartPoint?.currentPoint - chartPoint?.allowPoint, // 현재 잔여 포인트
          ],
          backgroundColor: ["rgba(255, 94, 0,1)", "rgba(204, 204, 204,1)"],
          borderColor: ["#eb6f36", "rgba(204, 204, 204,1)"],
          borderWidth: 0,
        },
      ],
    },
    {
      labels: ["남은 포인트", "사용한 포인트"],
      datasets: [
        {
          label: `금액(원)`,
          data: [chartPoint?.currentPoint, chartPoint?.allowPoint],
          backgroundColor: ["rgba(0, 255, 115,1)", "rgba(204, 204, 204,1)"],
          borderColor: ["#00ff95", "rgba(204, 204, 204,1)"],
          borderWidth: 0,
        },
      ],
    },
  ];

  useEffect(() => {
    const getPointChartData = async () => {
      const thisMonth = dayjs().format("YYYY-MM");

      const params = {
        companyId: companyId,
        date: thisMonth,
      };

      try {
        const res = await axios.get(
          "/api/admin/company/dashboard/v3/Transaction",
          {
            params,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        console.log("포인트 차트 데이터 : ", res.data);
        const result = res.data.resultData;

        setChartPoint({ ...result });
      } catch (error) {
        console.log(error);
      }
    };
    getPointChartData();
  }, []);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex flex-col w-[70%] h-full justify-between py-10 gap-10 bg-white shadow-2xl rounded-md">
        <div className="flex w-full h-[10%] justify-center text-3xl">
          <span>포인트 거래내역</span>
        </div>
        <div className="flex w-full h-[90%]">
          {dataArr.map((item, index) => (
            <div className="relative flex w-1/3 justify-center" key={index}>
              <Doughnut data={item} />

              <div className="absolute top-1/2 z-0 flex flex-col text-center -mt-3">
                <span className="text-sm">{item.labels[0]}</span>
                <span className="text-2xl font-semibold tracking-wide">
                  {item.datasets[0]?.data[0]?.toLocaleString("ko-kr")}원
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PointChart;
