import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../../../components/cookie";
import dayjs from "dayjs";

const TableDiv = styled.div`
  margin: 30px 35px;
  overflow-y: scroll;
`;

const TableTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
  background-color: #eee;
  font-weight: 700;
  align-items: center;
  border-radius: 10px 10px 0 0;
  border: 1px solid #929292;
`;

const TableTopDiv = styled.div`
  justify-content: space-between;
  display: flex;
  background-color: #eee;
  border-left: 1px solid #929292;
`;

const TopTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  text-align: center;
  padding: 10px 0;
  border-right: 1px solid #929292;
  border-bottom: 1px solid #929292;
`;

function SalesPage() {
  const today = dayjs().format("YYYY-MM-DD");
  const tomorrow = dayjs(today).add(1, "day").format("YYYY-MM-DD");
  const [salesList, setSalesList] = useState([]);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const sessionRestaurantId = sessionStorage.getItem("restaurantId");
  const accessToken = getCookie();

  console.log(startDate);
  console.log(endDate);
  console.log(today);
  console.log(tomorrow);

  useEffect(() => {
    const params = {
      restaurantId: sessionRestaurantId,
      startDate: "",
      endDate: "",
      page: 1,
      size: 15,
    };
    const getSalesList = async () => {
      console.log(params);

      try {
        const res = await axios.get(`/api/admin/restaurant/orderList`, {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log("이거 뭐야?", res.data);
        const result = res.data.resultData;
        setSalesList([...result]);
      } catch (error) {
        console.log(error);
      }
    };
    getSalesList();
  }, []);

  useEffect(() => {
    const params = {
      restaurantId: sessionRestaurantId,

      startDate: startDate ? startDate : today,
      endDate: endDate ? endDate : today,
      page: 1,
      size: 15,
    };
    const getSalesList = async () => {
      console.log(params);

      try {
        const res = await axios.get(`/api/admin/restaurant/orderList`, {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log("이거 뭐야?", res.data);
        const result = res.data.resultData;
        setSalesList([...result]);
      } catch (error) {
        console.log(error);
      }
    };
    getSalesList();
  }, [startDate, endDate]);
  console.log(salesList);

  const inputStartDate = e => {
    console.log(e.target.value);
    setStartDate(e.target.value);
  };

  const inputEndDate = e => {
    console.log(e.target.value);
    setEndDate(e.target.value);
  };

  return (
    <TableDiv className="scrollbar-hide">
      <TableTitleDiv>
        <div>매출 내역</div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* <TableBtn>기간 선택</TableBtn> */}
          <label htmlFor="">시작일</label>
          <input
            type="date"
            className="px-2"
            onChange={e => inputStartDate(e)}
            value={startDate}
          />
          <span>~</span>
          <label htmlFor="">종료일</label>
          <input
            type="date"
            className="px-2"
            onChange={e => inputEndDate(e)}
            value={endDate}
          />
        </div>
      </TableTitleDiv>
      <TableTopDiv>
        <TopTitleDiv>주문 번호</TopTitleDiv>
        <TopTitleDiv>주문 일시</TopTitleDiv>
        <TopTitleDiv>주문자 성함</TopTitleDiv>
        <TopTitleDiv>주문한 메뉴</TopTitleDiv>
        <TopTitleDiv>주문 종류</TopTitleDiv>
      </TableTopDiv>
      {/* 여기부터 map 돌리기 */}
      {salesList.map(item => (
        <TableTopDiv key={item.orderId} style={{ backgroundColor: "#fff" }}>
          <TopTitleDiv>{item.orderId}</TopTitleDiv>
          <TopTitleDiv>{item.createdAt}</TopTitleDiv>
          <TopTitleDiv>{item.userName}</TopTitleDiv>
          {item.orderDetails.length === 1 ? (
            <TopTitleDiv>{item.orderDetails[0].menuName}</TopTitleDiv>
          ) : (
            <TopTitleDiv>
              {item.orderDetails[0].menuName} 외 {item.orderDetails.length - 1}{" "}
              개
            </TopTitleDiv>
          )}
          <TopTitleDiv>{item.reservationYnStr}</TopTitleDiv>
        </TableTopDiv>
      ))}
    </TableDiv>
  );
}
export default SalesPage;
