import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

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

  // 원래코드
  // useEffect(() => {
  //   async function confirm() {
  //     const requestData = {
  //       orderId: searchParams.get("orderId"),
  //       amount: searchParams.get("amount"),
  //       paymentKey: searchParams.get("paymentKey"),
  //       adminId: "",
  //     };

  //     const response = await fetch("/api/confirm/widget", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestData),
  //     });

  //     const json = await response.json();

  //     if (!response.ok) {
  //       throw { message: json.message, code: json.code };
  //     }

  //     return json;
  //   }

  //   confirm()
  //     .then(data => {
  //       setResponseData(data);
  //     })
  //     .catch(error => {
  //       navigate(`/fail?code=${error.code}&message=${error.message}`);
  //     });
  // }, [searchParams]);

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
      <h2 className="text-[36px] text-center">결제를 완료했어요</h2>{" "}
    </div>
  );
}
