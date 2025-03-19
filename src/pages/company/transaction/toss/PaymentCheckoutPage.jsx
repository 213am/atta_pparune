import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getCookie } from "../../../../components/cookie";
// ------  SDK 초기화 ------
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = "test_ck_P9BRQmyarY9Gnq5Yy99ZrJ07KzLN";
const customerKey = "rBINQlZyv9LSwkeaLhrZa";
export function PaymentCheckoutPage({ point }) {
  const [payment, setPayment] = useState(null);
  const amount = {
    currency: "KRW",
    value: parseInt(point),
  };
  const accessToken = getCookie();
  const adminId = Number(sessionStorage.getItem("adminId"));

  const [companyInfo, setCompanyInfo] = useState();

  const getCompanyInfo = async () => {
    const params = {
      adminId,
    };
    try {
      const res = await axios.get("/api/admin/company/v3/info", {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCompanyInfo(res.data.resultData);
      console.log(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(point);
    getCompanyInfo();
  }, []);

  useEffect(() => {
    console.log("야!!!!!!!!!!!!!!!!!", companyInfo);
  }, [companyInfo]);

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
        const payment = tossPayments.payment({
          customerKey,
        });
        // 비회원 결제
        // const payment = tossPayments.payment({ customerKey: ANONYMOUS });
        setPayment(payment);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }
    fetchPayment();
  }, [clientKey, customerKey]);
  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
  // @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
  async function postPayment() {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    // requestPayment 호출 전에 백으로 post
    // 성공하면 requestPayment 호출
    // 아니면 alert 창으로 막기
    try {
      const orderId = crypto.randomUUID();

      const res = await axios.post("/api/admin/company/v3/payment/temp", {
        amount: amount.value,
        orderId: orderId,
      });
      console.log(res);
      if (res.data.statusCode === "200") {
        await payment.requestPayment({
          method: "CARD", // 카드 및 간편결제
          amount: amount,
          orderId: orderId, // 고유 주문번호
          orderName: "아따빠르네 포인트 구매",
          successUrl: window.location.origin + "/success", // 결제 요청이 성공하면 리다이렉트되는 URL
          failUrl: window.location.origin + "/fail", // 결제 요청이 실패하면 리다이렉트되는 URL
          customerEmail: companyInfo.email,
          customerName: companyInfo.name,
          customerMobilePhone: companyInfo.phone,
          // 카드 결제에 필요한 정보
          card: {
            useEscrow: false,
            flowMode: "DEFAULT", // 통합결제창 여는 옵션
            useCardPoint: false,
            useAppCardOnly: false,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    // 토스 페이먼트 모달창 띄우기 버튼
    <button
      type="button"
      className="px-4 py-2 rounded-[5px] bg-primary hover:bg-primaryFocus text-white"
      onClick={() => {
        if (Number(point)) {
          postPayment();
        } else {
          Swal.fire("0보다 큰 금액을 입력해 주세요.", "", "error");
        }
      }}
    >
      결제하기
    </button>
  );
}
