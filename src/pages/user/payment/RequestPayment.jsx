import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { ticketIdAtom } from "../../../atoms/userAtom";
import PwKeyboard from "../../../components/PwKeyboard";

const RequestPayment = () => {
  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState(false);
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
    }
  };

  const passwordSubmitHandler = e => {
    console.log("입력된 비밀번호 : ", e);

    usedCoupon(e);
  };

  return (
    <div className="relative w-full h-dvh flex justify-center items-center overflow-x-hidden overflow-y-scroll scrollbar-hide">
      {isConfirm ? (
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
            <ClipLoader
              cssOverride={{
                borderWidth: "7px",
              }}
              loading
              size={100}
              speedMultiplier={0.8}
              color="#333333"
            />
            <div className="text-2xl font-semibold drop-shadow-xl text-black">
              결제 요청중
            </div>
          </div>
        </>
      ) : (
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
