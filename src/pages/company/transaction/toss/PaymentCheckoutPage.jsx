import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import axios from "axios";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    console.log(point);
  }, []);

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
          customerEmail: "customer123@gmail.com",
          customerName: "김토스",
          customerMobilePhone: "01012341234",
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
      className="px-4 py-2 rounded-[5px] bg-primary text-white"
      onClick={() => postPayment()}
    >
      결제하기
    </button>
  );
}
