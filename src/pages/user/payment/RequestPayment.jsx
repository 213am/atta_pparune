import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { ticketIdAtom } from "../../../atoms/userAtom";
import PwKeyboard from "../../../components/PwKeyboard";
import LoadingScreen from "../../../components/LoadingScreen"; // 로딩 컴포넌트

const RequestPayment = () => {
  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const ticketId = searchParams.get("ticketId");
  const restaurantId = searchParams.get("restaurantId");

  console.log(ticketId);
  console.log(restaurantId);

  const usedCoupon = async password => {
    const payload = {
      ticketId: parseInt(ticketId),
      restaurantId: parseInt(restaurantId),
      paymentPassword: password,
    };
    try {
      const res = await axios.patch(`/api/order/ticket`, payload);
      console.log(res);
      Swal.fire({
        title: "식권 사용완료!",
        icon: "success",
        confirmButtonText: "확인",
        showConfirmButton: true,
        allowOutsideClick: false,
      }).then(result => {
        if (result.isConfirmed) {
          navigate("/store");
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "결제 중 오류 발생",
        text: "비밀번호 확인 후 다시 시도해주세요",
        icon: "info",
        confirmButtonText: "확인",
        showConfirmButton: true,
        allowOutsideClick: false,
      });
    }
  };

  const passwordSubmitHandler = e => {
    console.log("입력된 비밀번호 : ", e);

    usedCoupon(e);
  };

  return (
    <div className="relative flex w-full h-dvh justify-center items-center overflow-x-hidden overflow-y-scroll scrollbar-hide">
      {isConfirm ? (
        // 결제 요청 중
        <>
          <img
            src="/loadingImage.jpg"
            alt=""
            className="w-full h-dvh object-cover"
          />
          <div className="absolute flex flex-col top-1/4">
            <span className="text-2xl font-semibold text-start text-primary">
              예약부터 결제까지
            </span>
            <img src="/logo.png" className="w-96" />
          </div>
          <div className="absolute flex flex-col items-center gap-4">
            <LoadingScreen message="결제 요청중" />
          </div>
        </>
      ) : (
        // 비밀번호 입력 컴포넌트
        <div className="flex bg-white z-10">
          <PwKeyboard
            mode="input"
            onSubmit={passwordSubmitHandler}
            close={() => console.log("닫기")}
          />
        </div>
      )}
    </div>
  );
};

export default RequestPayment;
