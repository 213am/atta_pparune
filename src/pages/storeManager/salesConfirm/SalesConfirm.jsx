import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import LineChartLayout from "./LineChart";
import SalesPage from "./SalesPage";
import { getCookie } from "../../../components/cookie";

const SalesConfirm = () => {
  const [storeData, setStoreData] = useState({});
  const [salesData, setSalesData] = useState({});
  const sessionRestaurantId = sessionStorage.getItem("restaurantId");
  const accessToken = getCookie();
  const today = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    const params = {
      restaurantId: sessionRestaurantId,
    };
    const getRestaurantData = async () => {
      try {
        const res = await axios.get(`/api/restaurant`, {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(res);
        const result = res.data.resultData;
        setStoreData({
          ...storeData,
          restaurantName: result.restaurantName,
          filePath: result.restaurantPics.filePath,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getRestaurantData();
  }, []);

  useEffect(() => {
    const params = {
      restaurantId: sessionRestaurantId,
      date: today,
    };
    const getDashboard = async () => {
      try {
        const res = await axios.get(`/api/restaurant/dashboard`, {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(res.data.resultData);
        const result = res.data.resultData;
        setSalesData({ ...result });
      } catch (error) {
        console.log(error);
      }
    };
    getDashboard();
  }, []);

  return (
    <>
      <div className="w-full h-full bg-gray">
        <div className="w-100% h-[calc(100%_-_4rem)] mx-4 my-8 bg-white rounded-lg overflow-hidden overflow-y-scroll scrollbar-hide">
          <div className="px-8 pt-8 ">
            <div className="flex items-center justify-between mb-10">
              <div className="flex gap-5 items-center">
                {storeData?.filePath ? (
                  <img
                    src={`http://112.222.157.156:5222/pic/restaurant/${sessionRestaurantId}/${storeData?.filePath}`}
                    alt="식당이미지"
                    className="flex size-36 rounded-full"
                  />
                ) : (
                  <img
                    src="/restaurant_default.png"
                    alt="식당 기본이미지"
                    className="flex size-36 rounded-full bg-cover bg-gray py-4"
                  />
                )}
                <div className="font-semibold text-3xl pb-6 text-nowrap">
                  {storeData?.restaurantName}
                </div>
              </div>
              <div className="flex flex-col w-2/5 gap-5">
                <div className="w-30% h-20 rounded-md border-2 border-darkGrays">
                  <span className="flex w-full text-start px-3 pt-2 text-darkGray">
                    일일 총 매출
                  </span>
                  <span className="flex w-full h-full px-3 pb-5 justify-end text-3xl font-semibold">
                    {salesData?.dayPoint?.toLocaleString("ko-KR")} 원
                  </span>
                </div>
                <div className="w-30% h-20 rounded-md border-2 border-darkGrays">
                  <span className="flex w-full text-start px-3 pt-2 text-darkGray">
                    {dayjs().format("MM")}월 총 매출
                  </span>
                  <span className="flex w-full h-full px-3 pb-5 justify-end text-3xl font-semibold">
                    {salesData?.monthPoint?.toLocaleString("ko-KR")} 원
                  </span>
                </div>
              </div>
            </div>
            <LineChartLayout />
            <SalesPage />
          </div>
        </div>
      </div>
    </>
  );
};
export default SalesConfirm;
