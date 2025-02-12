import { useEffect, useState } from "react";
import OrderList from "./OderList";
import axios from "axios";
import { getCookie } from "../../../components/cookie";
import dayjs from "dayjs";

const Table = () => {
  const [isClick, setIsClick] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const sessionRestaurantId = sessionStorage.getItem("restaurantId");
  const accessToken = getCookie();

  useEffect(() => {
    const params = {
      restaurantId: sessionRestaurantId,
    };
    const getOrderList = async () => {
      try {
        const res = await axios.get(`/api/order/restaurant`, {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(res.data.resultData);
        const result = res.data.resultData;
        // const orderDetails = result[1].orderDetails;
        // console.log(orderDetails);
        setOrderList([...result]);
      } catch (error) {
        console.log(error);
      }
    };
    getOrderList();
  }, []);

  const openDescriptHandler = () => {
    setIsClick(!isClick);
  };

  return (
    <>
      <div className="w-full h-full bg-gray">
        <div className="w-100% h-[calc(100%_-_4rem)] mx-4 my-8 bg-white rounded-lg overflow-hidden overflow-y-scroll scrollbar-hide">
          <div className="flex flex-wrap ml-5 mt-5 gap-4 bg-white justify-start">
            {/* 주문카드 시작 */}
            {orderList.map(item => (
              <div
                // onClick={e => openDescriptHandler(e)}
                key={item.orderId}
                // className="w-[calc(33%_-_1rem)] min-w-40 h-48 border-2 border-darkGray bg-white"
                className={`${isClick ? "w-[calc(33%_-_1rem)]" : "w-[calc(25%_-_1rem)]"} min-w-40 h-48 border-2 border-darkGray bg-white cursor-pointer`}
              >
                <div className=" px-4 py-1 bg-third">
                  <div className="flex justify-between items-center gap-3">
                    <div className="flex gap-2 items-center">
                      <span className="text-sm text-nowrap">주문번호</span>
                      <span className="text-lg">{item.orderId}</span>
                    </div>
                    <span className="font-semibold text-nowrap">
                      {item?.orderDetails
                        .reduce((prev, current) => prev + current.price, 0)
                        .toLocaleString("ko-KR")}{" "}
                      원
                    </span>
                  </div>
                  <div className="flex gap-2 tracking-wider items-center">
                    <span className="text-sm">주문시간</span>
                    <span className="text-md">
                      {dayjs(item.reservationTime).format("HH:MM")} ~
                    </span>
                  </div>
                </div>
                <div className="px-3 py-3">
                  {item.orderDetails.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item?.menuName}</span>
                      <span>x{item?.menuCount}</span>
                    </div>
                  ))}
                  <div className="pt-1 pl-6 text-darkGray">{item.menuInfo}</div>
                </div>
              </div>
            ))}
            {/* 주문카드 끝 */}
          </div>
        </div>
      </div>
      <OrderList />
    </>
  );
};
export default Table;
