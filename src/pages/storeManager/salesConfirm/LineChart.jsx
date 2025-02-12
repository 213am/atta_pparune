import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getCookie } from "../../../components/cookie";
import dayjs from "dayjs";

const LineChartLayout = () => {
  const [salesData, setSalesData] = useState({});
  const [weekSalesData, setWeekSalesData] = useState([]);
  const sessionRestaurantId = sessionStorage.getItem("restaurantId");
  const accessToken = getCookie();
  const today = dayjs().format("YYYY-MM-DD");
  console.log(today);

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
        setWeekSalesData([...result.weekOrderList]);
      } catch (error) {
        console.log(error);
      }
    };
    getDashboard();
  }, []);
  console.log(salesData);
  console.log(weekSalesData);

  const reservationOrders = weekSalesData.map(item => {
    return item.reservationOrders;
  });
  console.log(reservationOrders);
  const seatedOrders = weekSalesData.map(item => {
    return item.seatedOrders;
  });
  console.log(seatedOrders);
  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
  console.log(daysOfWeek);
  const chartData = weekSalesData.map((item, index) => ({
    name: dayjs(item.date).format("MM-DD"),
    // name: `${daysOfWeek[index]}  ${dayjs(item.date).format("MM-DD")}`,
    예약주문: reservationOrders[index],
    앉아서주문: seatedOrders[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 3" />
        <XAxis dataKey="name" className="flex text-xl tracking-wider" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="예약주문"
          stroke="#8884d8"
          // dot={<CustomizedDot />}
        />
        <Line type="monotone" dataKey="앉아서주문" stroke="#1e0f4c" />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default LineChartLayout;
