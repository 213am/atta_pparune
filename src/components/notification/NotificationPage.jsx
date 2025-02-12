import axios from "axios";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { isClickIcon, noticeState } from "../../atoms/noticeAtom";
import { orderIdAtom } from "../../atoms/restaurantAtom";
import { getCookie } from "../../components/cookie";

const NotificationPage = () => {
  const [orderId, setOrderId] = useRecoilState(orderIdAtom);
  const [isNotice, setIsNotice] = useRecoilState(noticeState);
  const [clickData, setClickData] = useState({});
  const [isClick, setIsClick] = useRecoilState(isClickIcon);
  const [myPaymentData, setMypaymentData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const accessToken = getCookie();
  const loginUserId = window.sessionStorage.getItem("userId");

  const getPaymentInfo = async e => {
    console.log(e);
    const params = {
      userId: loginUserId,
      orderId: e.orderId,
      orderUserId: e.orderUserId,
    };
    try {
      const res = await axios.get(
        `/api/user/user-payment-member/getPaymentInfo`,
        {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(res.data);
      setMypaymentData(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  const patchApproval = async userId => {
    console.log(userId);

    const payload = {
      orderId: myPaymentData.orderId,
      userId: userId,
      approvalStatus: 1,
    };
    console.log(payload);
    setIsClick(false);
    try {
      const res = await axios.patch(`/api/user/user-payment-member`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res.data);
      setIsModalOpen(false);
      Swal.fire({
        title: "결제가 승인 되었습니다!",
        icon: "success",
        confirmButtonText: "확인",
        showConfirmButton: true, // ok 버튼 노출 여부
        allowOutsideClick: false, // 외부 영역 클릭 방지
        customClass: {
          popup: "flex w-[80%]",
          title: "text-xl text-black",
        },
      }).then(result => {
        if (result.isConfirmed) {
          navigate("/user");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const rejectApproval = async () => {
    const userId = clickData.orderUserId;
    const payload = {
      orderId: myPaymentData.orderId,
      userId: userId,
      approvalStatus: 2,
    };
    try {
      const res = await axios.patch(`/api/user/user-payment-member`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setIsModalOpen(false);
      Swal.fire({
        title: "결제가 거절되었습니다.",
        icon: "error",
        confirmButtonText: "확인",
        allowOutsideClick: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const orderMemberPageNav = id => {
    navigate(`/user/placetoorder/member/${id}`, {
      state: {
        orderId: id,
      },
    });
    setOrderId(id);
    setIsClick(false);
  };

  const orderData = e => {
    console.log("데이터 불러오기", e);
    setClickData({ ...e });
  };

  console.log(isNotice);
  console.log(myPaymentData);

  return (
    <div className="absolute right-4 w-[80%] bg-white z-50 top-12 border-2 border-darkGray rounded-md pb-6 overflow-x-hidden over overflow-y-scroll scrollbar-hide">
      <div className="p-5 font-semibold text-darkGray">알림</div>
      <div className="flex flex-col px-5 gap-5 font-medium text-nowrap">
        {isNotice?.length > 0 ? (
          isNotice.map(item => (
            <div
              key={item.orderId}
              onClick={() => {
                if (item.message === "나한테 온 승인요청 메세지") {
                  getPaymentInfo(item);
                  setIsModalOpen(true);
                } else {
                  orderMemberPageNav(item.orderId);
                }
              }}
              className="flex w-full h-[10%]"
            >
              {item.message === "나한테 온 승인요청 메세지" ? (
                <>
                  <span className="font-bold" onClick={() => orderData(item)}>
                    {item.message}
                  </span>
                </>
              ) : (
                <>
                  <span>{item.message}</span> [{item.restaurantName}]
                </>
              )}
            </div>
          ))
        ) : (
          <span className="text-darkGray tracking-wide">
            새로운 알림이 없습니다
          </span>
        )}
        {isModalOpen ? (
          <div className="w-full h-dvh overflow-hidden fixed top-0 left-0 bg-darkGray bg-opacity-70 flex justify-center items-center text-center z-10">
            <div
              onClick={e => e.stopPropagation()}
              className="absolute top-40 left-1/6 w-[340px] h-[280px] z-50 bg-white border-2 border-darkGray rounded-lg border-opacity-30 overflow-x-hidden overflow-y-scroll scrollbar-hide"
            >
              <div className="relative flex w-full h-[20%]">
                <div className="absolute top-0 left-0 flex w-full h-full justify-between items-center px-5 border-b-2 border-gray">
                  <span className="font-medium text-2xl">
                    {clickData?.orderUserName}님의 승인 요청
                  </span>
                  <IoMdClose
                    onClick={() => setIsModalOpen(false)}
                    className="font-semibold size-6"
                  />
                </div>
              </div>
              <div className="flex w-full h-[85%] flex-col py-4 gap-3">
                <span className="text-xl">{clickData?.restaurantName}</span>
                <span className="text-2xl">
                  {clickData?.point?.toLocaleString("ko-KR")} 원
                </span>
                <span className="text-xl">결제를 승인하시겠습니까?</span>
                <div className="flex w-full justify-center items-center gap-10 mt-4">
                  <span
                    onClick={() => patchApproval()}
                    className="px-3 py-1 bg-blue text-white rounded-sm "
                  >
                    승인
                  </span>
                  <span
                    onClick={() => rejectApproval()}
                    className="px-3 py-1 bg-red text-white rounded-sm "
                  >
                    거절
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
export default NotificationPage;
