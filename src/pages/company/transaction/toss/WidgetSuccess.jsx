import axios from "axios";
import { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";

export function WidgetSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);

  // axios로 변경
  useEffect(() => {
    const postPayInfo = async () => {
      try {
        const requestData = {
          orderId: searchParams.get("orderId"),
          amount: searchParams.get("amount"),
          paymentKey: searchParams.get("paymentKey"),
        };

        const response = await axios.post(
          "/api/admin/company/v3/point",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        setResponseData(response.data);
        localStorage.removeItem("@tosspayments/merchant-browser-id");
        sessionStorage.removeItem("@tosspayments/session-id");
      } catch (error) {
        const errorCode = error.response?.data?.code || "unknown_error";
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        navigate(`/fail?code=${errorCode}&message=${errorMessage}`);

        console.log(error);
      }
    };
    postPayInfo();
  }, [searchParams]);

  useEffect(() => {
    console.log(searchParams.get("orderId"));
    console.log(searchParams.get("amount"));
    console.log(searchParams.get("paymentKey"));
  }, []);

  return (
    <div className="bg-white w-[100vw] h-[100vh] pt-[300px]">
      <img
        className="flex justify-center w-[150px] m-auto mb-3"
        src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
      />
      <h2 className="text-[36px] text-center">결제를 완료했어요</h2>
      <div
        onClick={() => navigate(-1)}
        className="flex justify-center text-[24px] cursor-pointer mt-5"
      >
        <div className="flex items-center gap-2 py-2 px-4 bg-darkGray text-white rounded-[5px]">
          <IoArrowBackCircleOutline className="w-7 h-7" />
          <div>이전 페이지로</div>
        </div>
      </div>
    </div>
  );
}
