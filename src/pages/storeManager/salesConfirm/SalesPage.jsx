import styled from "@emotion/styled";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getCookie } from "../../../components/cookie";

const TableDiv = styled.div`
  width: 100%;
  margin: 30px 35px;
  overflow-y: scroll;
  padding-right: 20px;
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
  align-items: center;
  justify-content: center;
  padding: 10px 10px;
  border-right: 1px solid #929292;
`;

const ContentDiv = styled(TopTitleDiv)`
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  line-height: 70px;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  text-overflow: ellipsis;
`;

const MenuListDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 10px 30px;
  border-right: 1px solid #929292;
`;

function SalesPage() {
  const today = dayjs().format("YYYY-MM-DD");
  const yesterday = dayjs(today).add(-1, "day").format("YYYY-MM-DD");
  const [salesList, setSalesList] = useState([]);
  const [startDate, setStartDate] = useState(yesterday);
  const [endDate, setEndDate] = useState(today);
  const sessionRestaurantId = sessionStorage.getItem("restaurantId");
  const accessToken = getCookie();

  useEffect(() => {
    const params = {
      restaurantId: sessionRestaurantId,
      startDate: "",
      endDate: "",
      page: 1,
      size: 15,
    };
    const getSalesList = async () => {
      try {
        const res = await axios.get(`/api/admin/restaurant/order/list`, {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
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
      {salesList.map((item, index) => (
        <TableTopDiv key={item.orderId} style={{ backgroundColor: "#fff" }}>
          <ContentDiv>{index + 1}</ContentDiv>
          <TopTitleDiv>
            <span>{dayjs(item.createdAt).format("YYYY-MM-DD")}</span>
            <span>{dayjs(item.createdAt).format("HH : mm")}</span>
          </TopTitleDiv>
          <ContentDiv>{item.userName}</ContentDiv>
          <MenuListDiv>
            {item.orderDetails.map(menu => (
              <div key={menu.menuId} className="flex justify-between w-full">
                <span className="w-[120px] text-nowrap overflow-hidden truncate">
                  {menu.menuName}
                </span>
                <span className="w-[30px] text-nowrap">{menu.menuCount}개</span>
              </div>
            ))}
          </MenuListDiv>
          <ContentDiv style={{ border: "none" }}>
            {item.reservationYnStr}
          </ContentDiv>
        </TableTopDiv>
      ))}
    </TableDiv>
  );
}
export default SalesPage;
