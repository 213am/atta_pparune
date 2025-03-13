import { useEffect, useState } from "react";
import axios from "axios";
import { ImFileEmpty } from "react-icons/im";
import { IoIosArrowForward } from "react-icons/io";
import MenuBar from "../../../components/MenuBar";
import { IoArrowForward } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { HiOutlineTicket } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../../components/cookie";
import QRCode from "../order/QRCode";
import { DOCKER_URL } from "../../../constants/url";
import dayjs from "dayjs";
import { ClipLoader } from "react-spinners";

const OrderList = () => {
  const navigate = useNavigate();
  const [isTap, setIsTap] = useState(true);
  const [paymentList, setPaymentList] = useState([]);
  const [activeList, setActiveList] = useState({});

  const sessionUserId = window.sessionStorage.getItem("userId");
  const accessToken = getCookie();

  useEffect(() => {
    const getPaymentList = async () => {
      try {
        if (sessionUserId) {
          const res = await axios.get(`/api/user/pastOrderCheck`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const result = res.data.resultData;
          setPaymentList([...result]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPaymentList();
  }, []);

  useEffect(() => {
    const params = {
      userId: sessionUserId,
    };
    const getMyOrder = async () => {
      try {
        const res = await axios.get(`/api/user/activeOrderCheck`, {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(res.data);
        const result = res.data.resultData;
        const date = dayjs(result.orderDate).format("YYYY-MM-DD HH:mm");

        setActiveList({ ...result, orderDate: date });
      } catch (error) {
        console.log(error);
      }
    };
    getMyOrder();
  }, []);
  console.log("진행중인 주문내역 : ", activeList);

  const linkToTicket = e => {
    if (activeList.ticketId) {
      navigate(`/user/placetoorder/coupon/${e.ticketId}`, {
        state: {
          ...e,
        },
      });
    } else {
      return;
    }
  };

  const linkToReview = e => {
    console.log("리뷰써보자 : ", e);

    navigate(`/user/review/${e.orderId}`, {
      state: {
        ...e,
      },
    });
  };

  return (
    <div className="w-full h-dvh flex flex-col justify-between overflow-x-hidden overflow-y-scroll scrollbar-hide bg-white">
      <div className="absolute top-0 left-0 w-full flex justify-between border-b-2 border-gray border-opacity-70 bg-white">
        <div
          onClick={() => setIsTap(true)}
          className={`w-1/2 text-center text-xl font-semibold py-3 ${isTap ? "border-b-2 border-black" : "text-darkGray font-normal"}`}
        >
          진행 중인 주문
        </div>
        <div
          onClick={() => setIsTap(false)}
          className={`w-1/2 text-center text-xl font-semibold py-3 ${isTap ? "text-darkGray font-normal" : "border-b-2 border-black"}`}
        >
          지난 주문 내역
        </div>
      </div>
      {isTap ? (
        activeList.orderId ? (
          <div className="flex flex-col w-full h-dvh gap-10">
            <div className="flex w-full h-[14%] justify-center items-end text-primary text-2xl font-semibold tracking-widest">
              {activeList.ticketId ? (
                <div className="flex items-center gap-2">
                  <FaCircleCheck />
                  <span>예약완료</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ClipLoader color="#6f4cdb" />
                  <span>예약중</span>
                </div>
              )}
            </div>
            <div className="flex flex-col w-full h-[25%] px-10 gap-5">
              <span className="mb-2">매장 정보</span>
              <div className="flex flex-col w-full h-full px-4 justify-between">
                <div className="flex gap-4 items-center">
                  <span className="text-xl">{activeList.restaurantName}</span>
                  <span className="text-darkGray">
                    {activeList.categoryName}
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="text-darkGray">주문일시</span>
                  <span className="text-lg">
                    {dayjs(activeList.orderDate).format("YYYY-MM-DD")}
                  </span>
                </div>
                {activeList.orderDetails.map(item => (
                  <div
                    key={item.menuId}
                    className="flex w-full justify-between"
                  >
                    <span>{item.menuName}</span>
                    <div className="flex gap-4">
                      <span>{item.menuCount}개</span>
                      <span>{item.menuPrice.toLocaleString("ko")}원</span>
                    </div>
                  </div>
                ))}
                <div className="flex w-full items-center justify-center gap-6">
                  <span className="flex w-[20%] justify-end">총 가격</span>
                  <span className="flex w-[50%] justify-center text-2xl">
                    {activeList.totalMenuCost.toLocaleString("ko")}원
                  </span>
                  {activeList.ticketId ? (
                    <div
                      onClick={() => linkToTicket(activeList)}
                      className="flex w-[15%] text-3xl justify-start"
                    >
                      <HiOutlineTicket className="cursor-pointer" />
                    </div>
                  ) : (
                    <div className="flex w-[15%] text-3xl justify-start"></div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-[30%] px-10 gap-5">
              <span className="mb-2">예약자 정보</span>
              <div className="flex flex-col w-full h-full px-4 justify-between">
                <div className="flex w-full">
                  <span className="flex w-[25%] mr-4 text-darkGray justify-end">
                    이름
                  </span>
                  <span>{activeList.reservationUserName}</span>
                </div>
                <div className="flex w-full">
                  <span className="flex w-[25%] mr-4 text-darkGray justify-end">
                    핸드폰 번호
                  </span>
                  <span>{activeList.reservationUserPhone}</span>
                </div>
                <div className="flex w-full">
                  <span className="flex w-[25%] mr-4 text-darkGray justify-end">
                    인원
                  </span>
                  <span></span>
                </div>
                <div className="flex w-full">
                  <span className="flex w-[25%] mr-4 text-darkGray justify-end">
                    예약시간
                  </span>
                  <span>
                    {activeList.reservationTime !== null
                      ? activeList.reservationTime
                      : activeList.orderDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full h-dvh justify-center items-center gap-3">
            <ImFileEmpty className="text-8xl text-darkGray" />
            <span className="text-2xl text-darkGray">
              진행 중인 주문이 없습니다
            </span>
            <div
              onClick={() => setIsTap(false)}
              className="flex items-center gap-1 mt-3 text-xl border border-darkGray px-3 py-1 rounded-lg bg-white cursor-pointer"
            >
              지난 주문 내역 보기
              <IoArrowForward />
            </div>
          </div>
        )
      ) : (
        <div className="flex flex-col w-full h-dvh justify-start items-center gap-5 mt-20 scrollbar-hide">
          {/* 주문내역 카드 */}
          {paymentList.map((item, index) => (
            <div
              key={index}
              className="w-full h-1/4 bg-white shadow-lg border-y border-y-gray"
            >
              <div className="w-full h-1/4 flex justify-between items-center px-5 py-3">
                <span className="text-darkGray">
                  {dayjs(item.createdAt).format("YYYY-MM-DD")}
                </span>
                <span className="font-semibold">
                  {item.reservationYn > 0 ? "예약주문" : "현장결제"}
                </span>
              </div>
              <div className="w-full h-2/4 flex justify-start items-center gap-5 px-5">
                <img
                  src={
                    item.pic === null
                      ? `/restaurant_default.png`
                      : `${DOCKER_URL}/pic/restaurant/${item?.restaurantId}/${item?.pic}`
                  }
                  alt="식당이미지"
                  className="w-16 h-16 rounded-xl border border-neutral-200 object-cover shadow-sm"
                />
                <div className="flex flex-col w-[60%]">
                  <div
                    onClick={() =>
                      navigate(`/user/restaurant/detail/${item.restaurantId}`)
                    }
                    className="flex items-center gap-2 font-semibold text-2xl cursor-pointer"
                  >
                    <span>{item.restaurantName}</span>
                    <IoIosArrowForward />
                  </div>
                  <div className="flex items-center gap-5 mt-1 justify-between">
                    {item.pastDtoList.map(data => (
                      <div
                        key={data.menuId}
                        className="flex w-full gap-4 items-center"
                      >
                        <span className="text-nowrap">{data.menuName}</span>
                        <span className="text-nowrap">{data.menuCount}개</span>
                      </div>
                    ))}
                    <div className="flex text-nowrap gap-2 items-center">
                      <span className="text-darkGray">총 가격</span>
                      <span className="text-lg">
                        {item.menuTotalPrice.toLocaleString("ko-KR")}원
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 리뷰 있을때만 버튼 보이도록 처리할 예정 - 현재는 상태구분이 불가능 */}
              {/* {item.} */}
              <div className="flex justify-center h-1/4">
                <button
                  onClick={() => linkToReview(item)}
                  className="w-1/4 h-2/3 flex px-4 py-1 border border-darkGray rounded-sm text-nowrap items-center justify-center hover:bg-primary hover:text-white"
                >
                  리뷰 작성
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <MenuBar />
    </div>
  );
};
export default OrderList;
