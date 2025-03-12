import styled from "@emotion/styled";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getCookie } from "../../../components/cookie";

const TableDiv = styled.div`
  width: 1060px;
  margin: 30px 35px;
  overflow-y: scroll;
`;

const TableTitleDiv = styled.div`
  width: 100%;
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
  border-right: 1px solid #929292;
  border-bottom: 1px solid #929292;
  width: 100%;
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
  padding: 10px 10px;
  border-right: 1px solid #929292;
`;

const ContentDiv = styled(TopTitleDiv)`
  padding: 0 10px;
  height: 70px;
  line-height: 70px;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
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
        const res = await axios.get(`/api/admin/restaurant/order/list`, {
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
        const res = await axios.get(`/api/admin/restaurant/order/list`, {
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
        <TopTitleDiv style={{ border: "none" }}>주문 종류</TopTitleDiv>
      </TableTopDiv>
      {/* 여기부터 map 돌리기 */}
      {salesList.map(item => (
        <TableTopDiv key={item.orderId} style={{ backgroundColor: "#fff" }}>
          <ContentDiv>{item.orderId}</ContentDiv>
          <TopTitleDiv>
            <span>{dayjs(item.createdAt).format("YYYY-MM-DD")}</span>
            <span>{dayjs(item.createdAt).format("HH : mm")}</span>
          </TopTitleDiv>
          <ContentDiv>{item.userName}</ContentDiv>
          <ContentDiv>{item.orderDetails[0].menuName}</ContentDiv>
          <ContentDiv style={{ border: "none" }}>
            {item.reservationYnStr}
          </ContentDiv>
        </TableTopDiv>
      ))}
    </TableDiv>
  );
}
export default SalesPage;
