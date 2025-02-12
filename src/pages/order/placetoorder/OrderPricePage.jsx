import axios from "axios";
import { _ } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { IoMdAddCircleOutline, IoMdArrowBack } from "react-icons/io";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  memberDataAtom,
  orderIdAtom,
  paymentMemberAtom,
} from "../../../atoms/restaurantAtom";
import { userDataAtom } from "../../../atoms/userAtom";
import { getCookie } from "../../../components/cookie";

const PriceOrderPage = () => {
  const [priceList, setPriceList] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [isCompleted, setIsCompleted] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [newOrderId, setNewOrderId] = useRecoilState(orderIdAtom);
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [memberData, setMemberData] = useRecoilState(memberDataAtom);
  const [paymentMemberData, setPaymentMemberData] =
    useRecoilState(paymentMemberAtom);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const accessToken = getCookie();

  useEffect(() => {
    const params = {
      userId: userId,
    };
    const getOrderId = async () => {
      try {
        const res = await axios.get(`/api/user/orderId`, {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(res.data.resultData);
        const result = res.data.resultData;
        setMemberData({ ...memberData, orderId: result });
        setNewOrderId(result);
      } catch (error) {
        console.log(error);
      }
    };
    getOrderId();
  }, [newOrderId]);

  useEffect(() => {
    const params = {
      orderId: newOrderId,
    };
    const getTotalPrice = async () => {
      try {
        const res = await axios.get(`/api/order`, {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(res.data.resultData);
        const result = res.data.resultData.totalPrice;
        setTotalPrice(result);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalPrice();
  }, []);

  const postPaymentApproval = async () => {
    const payload = {
      orderId: newOrderId,
      userId: memberData.userId || userId,
      point: memberData.point,
    };
    console.log(payload);

    try {
      const res = await axios.post(`/api/user/user-payment-member`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res.data.resultData);
      const result = res.data.resultData;
      if (result >= 0) {
        console.log("결제 승인 요청을 보냈습니다");
        navigate(`/user/placetoorder/request/${newOrderId}`);
      } else {
        console.log("요청에 실패했습니다. 다시 시도해주세요");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputChangeHandler = ({ target: { value } }, userId) => {
    console.log(value);

    setInputValues(prev => ({
      ...prev,
      [userId]: value,
    }));
  };
  console.log("금액 : ", inputValues);
  console.log("사람 : ", memberData);

  const inputApprovalHandler = userId => {
    setIsCompleted(prev => {
      const updatedStatus = {
        ...prev,
        [userId]: !prev[userId],
      };

      if (prev[userId]) {
        setTotalPrice(prevPrice => prevPrice + Number(inputValues[userId]));
      } else {
        setTotalPrice(prevPrice => prevPrice - Number(inputValues[userId]));
      }
      return updatedStatus;
    });

    const inputNUmber = parseInt(inputValues[userId]);

    setMemberData(prev => ({
      ...prev,
      point: [...prev.point, inputNUmber],
    }));
  };

  const addMemberHandler = () => {
    navigate(`/user/placetoorder/member/${newOrderId}`);
  };

  const backArrow = () => {
    setMemberData(prev => ({ ...prev, point: [], userId: [parseInt(userId)] }));
    setPaymentMemberData(prev => [...prev]);
    navigate(-1);
  };

  console.log(paymentMemberData);

  return (
    <div className="w-full h-dvh overflow-x-hidden overflow-y-scroll scrollbar-hide">
      <div className="flex w-full justify-between py-6 items-center border-b border-gray">
        <div className="flex w-[15%] justify-center">
          <IoMdArrowBack className="text-3xl" onClick={() => backArrow()} />
        </div>
        <span className="text-lg font-semibold">금액 선택</span>
        <div className="w-[15%]">
          <span className="text-center px-3 py-1 rounded-md text-white text-opacity-0">
            ㅇ
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full h-full gap-6">
        <div className="flex w-full justify-center gap-2 pt-4 text-xl">
          <span>총 결제 금액 : </span>
          <span
            className={`text-end px-2 ${Math.sign(parseInt(totalPrice)) === -1 ? "text-red" : "text-black"}`}
          >
            {totalPrice?.toLocaleString("ko-KR")}
          </span>
        </div>
        {Array.isArray(paymentMemberData) &&
          paymentMemberData?.map(item => (
            <div
              key={item.userId}
              className="flex w-full h-[6%] px-6 justify-between items-center border-b border-gray"
            >
              {/* 멤버 이름 및 UID */}
              <span className="flex w-[40%] text-base text-nowrap">
                {item.name}({item.uid})
              </span>

              {/* 결제 금액 입력 또는 표시 */}
              <div className="flex w-[35%] gap-2 items-center justify-end">
                {isCompleted[item.userId] ? (
                  // 결제 완료 시 금액 표시
                  <>
                    <span className="text-end px-2">
                      {inputValues[item.userId]?.toLocaleString("ko-KR")}
                    </span>
                    <span>원</span>
                  </>
                ) : (
                  // 결제 미완료 시 입력 필드 제공
                  <>
                    <input
                      type="tel"
                      className="flex w-[70%] border border-darkGray px-2 text-end rounded-md"
                      onChange={e => inputChangeHandler(e, item.userId)}
                      value={inputValues[item.userId] || ""}
                    />
                    <span>원</span>
                  </>
                )}
              </div>

              {/* 확인 또는 수정 버튼 */}
              <div className="flex w-[15%] justify-center gap-2 text-nowrap items-center">
                <span
                  onClick={() => inputApprovalHandler(item.userId)}
                  className="bg-blue px-2 text-white font-medium rounded-md cursor-pointer"
                >
                  {isCompleted[item.userId] ? "수정" : "확인"}
                </span>
              </div>
            </div>
          ))}
        <div className="flex w-full h-[5%] justify-center items-center">
          <IoMdAddCircleOutline
            onClick={addMemberHandler}
            className="text-3xl"
          />
        </div>
        <div className="flex w-full justify-center">
          <span
            onClick={() => postPaymentApproval()}
            className="bg-primary text-white text-lg px-2 py-1 rounded-md"
          >
            승인 요청
          </span>
        </div>
      </div>
    </div>
  );
};
export default PriceOrderPage;
