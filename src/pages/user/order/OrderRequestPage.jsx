import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineRefresh } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ticketIdAtom, userDataAtom } from "../../../atoms/userAtom";
import { getCookie } from "../../../components/cookie";
import { orderIdAtom } from "../../../atoms/restaurantAtom";
import Swal from "sweetalert2";

const OrderRequestPage = () => {
  const [priceList, setPriceList] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [isCompleted, setIsCompleted] = useState({});
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [newOrderId, setNewOrderId] = useRecoilState(orderIdAtom);
  const [newTicketId, setNewTicketId] = useRecoilState(ticketIdAtom);

  const sessionUserId = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const accessToken = getCookie();

  useEffect(() => {
    const params = {
      userId: sessionUserId,
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
        setNewOrderId(result);
      } catch (error) {
        console.log(error);
      }
    };
    getOrderId();
  }, []);

  useEffect(() => {
    const params = {
      orderId: newOrderId,
    };
    const getPaymentMember = async () => {
      try {
        const res = await axios.get(
          "/api/user/user-payment-member/userPaymentMember",
          {
            params,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        console.log(res.data.resultData);
        const result = res.data.resultData;
        setPriceList([...result]);
      } catch (error) {
        console.log(error);
      }
    };
    getPaymentMember();
  }, []);

  const getUserApproval = async () => {
    const params = {
      orderId: newOrderId,
    };
    try {
      const res = await axios.get(
        `/api/user/user-payment-member/userOrderApprovalAccess`,
        {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(res.data.resultData);
      const result = res.data.resultData;
      setPriceList([...result]);
    } catch (error) {
      console.log(error);
    }
  };

  // 모든 유저가 결제 승인 후 서버에 최종적으로 결제 요청
  const postPayment = async () => {
    const payload = {
      orderId: parseInt(newOrderId),
    };
    try {
      const res = await axios.post(
        `/api/user/user-payment-member/insTicket`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(res.data.resultData);
      const result = res.data.resultData;
      window.sessionStorage.setItem("ticketId", result);
      setNewTicketId(result);
      Swal.fire({
        title: "결제 완료!",
        text: "식권이 생성되었습니다.",
        timer: 2000,
      });
      navigate(`/user/placetoorder/coupon/${result}`);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(newOrderId);

  const patchApproval = async userId => {
    console.log(userId);

    const payload = {
      orderId: newOrderId,
      userId: userId,
      approvalStatus: 1,
    };
    console.log(payload);

    try {
      const res = await axios.patch(`/api/user/user-payment-member`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res.data);
      const result = res.data.resultData;
    } catch (error) {
      console.log(error);
    }
  };

  const inputChangeHandler = ({ target: { value } }, userId) => {
    console.log(value);
    console.log(userId);

    setInputValues(prev => ({
      ...prev,
      [userId]: value,
    }));
  };

  const inputApprovalHandler = userId => {
    console.log(userId);
    const inputNumber = parseInt(inputValues[userId]);
    console.log("입력값", inputNumber, userId);

    if (isCompleted) {
      patchApproval(userId);
    } else {
      setPriceList(prevPriceList => {
        const updatedList = prevPriceList.map(item =>
          item.userId === userId ? { ...item, point: inputNumber } : item,
        );

        const isUserInList = updatedList.some(item => item.userId === userId);
        return isUserInList
          ? updatedList
          : [...updatedList, { userId, point: inputNumber }];
      });

      setIsCompleted(prev => {
        const updatedStatus = {
          ...prev,
          [userId]: !prev[userId],
        };
        return updatedStatus;
      });
    }
  };

  const cancleButtonClick = sessionUserId => {
    setIsCompleted(!isCompleted);
    console.log(sessionUserId);
  };
  console.log(priceList);

  return (
    <div className="w-full h-dvh overflow-x-hidden overflow-y-scroll scrollbar-hide">
      <div className="flex w-full justify-between py-6 items-center border-b border-gray">
        <div className="flex w-[15%] justify-center">
          <IoMdArrowBack className="text-3xl" />
        </div>
        <span className="text-lg font-semibold">결제 상태</span>
        <div className="w-[15%]">
          <span className="text-center px-3 py-1 rounded-md text-white text-opacity-0">
            ㅇ
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full h-full gap-6">
        <div className="flex w-full items-center justify-center mt-6">
          <div className="flex gap-2 px-5 py-2 bg-gray rounded-md">
            <MdOutlineRefresh className="text-2xl" />
            <span
              onClick={() => getUserApproval()}
              className="text-lg font-medium cursor-pointer"
            >
              승인 상태 확인
            </span>
          </div>
        </div>
        {Array.isArray(priceList) &&
          priceList.map((item, index) => (
            <div
              key={index}
              className="flex w-full h-[6%] px-6 justify-between items-center border-b border-gray"
            >
              <span className="flex w-[30%] text-base text-nowrap">
                {item.name}
              </span>
              <div className="flex w-[40%] gap-2 items-center justify-end">
                {isCompleted[item.userId] ? (
                  <>
                    <span className="text-end px-2 text-nowrap">
                      {item.point}
                    </span>
                    <span>원</span>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <div>
                        {item.approvalStatus === 0 ? (
                          <span className="text-red font-semibold text-nowrap text-opacity-70">
                            대기중
                          </span>
                        ) : item.approvalStatus === 1 ? (
                          <span className="text-blue font-semibold text-nowrap">
                            승인
                          </span>
                        ) : (
                          <span className="text-red font-semibold text-nowrap">
                            거절
                          </span>
                        )}
                      </div>

                      <div>
                        <span className="text-end px-1 text-nowrap">
                          {item.point}
                        </span>
                        <span>원</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/* 현재 사용자와 일치하지 않는 경우에만 버튼 표시 */}
              {item.userId === parseInt(sessionUserId) ? (
                <div className="flex w-[20%] justify-center gap-2 text-nowrap items-center">
                  <span
                    onClick={() => inputApprovalHandler(item.userId)}
                    className="bg-blue px-2 text-white font-semibold rounded-md cursor-pointer"
                  >
                    승인
                  </span>
                  <span
                    onClick={() => cancleButtonClick(item.userId)}
                    className="bg-red px-2 text-white font-semibold rounded-md cursor-pointer"
                  >
                    {isCompleted[item.userId] ? "수정" : "거절"}
                  </span>
                </div>
              ) : (
                <div className="flex w-[20%] justify-center gap-2 text-nowrap items-center pointer-events-none">
                  <span className="bg-blue px-2 text-white font-semibold rounded-md"></span>
                  <span className="bg-red px-2 text-white font-semibold rounded-md"></span>
                </div>
              )}
            </div>
          ))}
        <div className="flex w-full justify-center gap-10">
          {priceList?.userId !== parseInt(sessionUserId) && (
            <>
              <span
                onClick={() => postPayment()}
                className="bg-primary text-white text-lg px-2 py-1 rounded-md cursor-pointer"
              >
                결제 요청
              </span>
              <span className="bg-red text-white text-lg px-2 py-1 rounded-md cursor-pointer">
                결제 취소
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderRequestPage;
