import { useState } from "react";
import OrderLoading from "./OrderLoading";
import { ClipLoader } from "react-spinners";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userDataAtom } from "../../../atoms/userAtom";
import { reserveDataAtom } from "../../../atoms/restaurantAtom";

const PlaceToOrder = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [reserveData, setReserveData] = useRecoilState(reserveDataAtom);

  return (
    <div>
      {isLoading ? (
        <OrderLoading />
      ) : (
        <div className="flex flex-col w-full h-dvh justify-start items-center gap-10">
          <div className="flex flex-col w-full h-[15%] text-center py-6 gap-10">
            <div className="text-xl">예약하기</div>
            <div className="flex w-full items-center justify-center gap-2 ">
              {userData ? (
                <>
                  <ClipLoader
                    size={40}
                    cssOverride={{ borderWidth: "5px" }}
                    color="#6F4CDB"
                    loading
                    speedMultiplier={0.8}
                  />
                  <span className="text-xl text-primary">예약 대기중</span>
                </>
              ) : (
                <>
                  <FaCheckCircle className="w-9 h-9 text-primary" />
                  <span className="text-xl text-primary">예약 완료</span>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full h-[25%] px-10 gap-4 border-b border-gray">
            <span>매장 정보</span>
            <div className="flex flex-col w-full gap-2">
              <div className="flex gap-2 items-center text-nowrap">
                <span className="w-[20%] text-darkGray">매장명</span>
                <div className="flex w-[80%] gap-3 items-center">
                  <span className=" text-2xl">미분당 동성로점</span>
                  <span className="text-darkGray text-lg">베트남 음식</span>
                </div>
              </div>
              <div className="flex gap-2 items-center text-nowrap">
                <span className="w-[20%] text-darkGray">주문일시</span>
                <span className="w-[80%] text-lg">2025-01-17 11:27</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-darkGray">메뉴 목록</span>
                <div className="flex w-full justify-between items-center">
                  <span className="text-xl">양지 쌀국수</span>
                  <div className="flex gap-10">
                    <span className="text-lg">1개</span>
                    <span className="text-xl">11,000원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full h-[30%] px-10 gap-4 border-b border-gray">
            <span>예약자 정보</span>
            <div className="flex flex-col w-full gap-2">
              <div className="flex gap-2 items-center">
                <span className="w-[25%] text-nowrap text-darkGray">이름</span>
                <span className="w-[75%] text-nowrap text-2xl">홍길동</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-[25%] text-nowrap text-darkGray">
                  연락처
                </span>
                <span className="w-[75%] text-nowrap text-xl">
                  010-1234-5678
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-[25%] text-nowrap text-darkGray">
                  인원 수
                </span>
                <span className="w-[75%] text-nowrap text-xl">1명</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-[25%] text-nowrap text-darkGray">
                  예약시간
                </span>
                <span className="w-[75%] text-nowrap text-xl">
                  2025년 01월 17일 오후 01 : 00
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PlaceToOrder;
