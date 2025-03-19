import axios from "axios";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const getAlert = async ({
  sessionId,
  accessToken,
  isLogin,
  setIsNotice,
  setIsPriceNotice,
  setIsOrderNotice,
}) => {
  const params = {
    userId: sessionId,
  };
  if (isLogin === true) {
    try {
      const res = await axios.get(`/api/user/alert`, {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("사용자 알림 데이터 : ", res.data.resultData);
      const result = res.data.resultData;

      setIsNotice([...result]);
    } catch (error) {
      console.log(error);
    }
  } else {
    setIsNotice([]);
  }
};

// if (result[0]?.orderId) {
//   setIsNotice(result);
//   console.log("결제 승인 요청이 왔습니다");
//   setIsPriceNotice(true);
//   Toast.fire({
//     title: "결제 승인 요청이 왔습니다!",
//     text: "알림 메세지를 확인해주세요",
//     icon: "info",
//     customClass: {
//       popup: "flex w-[90%]",
//       title: "text-2xl",
//     },
//   });
// } else if (result[1]?.orderId) {
//   setIsNotice(result);
//   setIsOrderNotice(true);
// } else if (result.length === 0) {
//   setIsPriceNotice(false);
//   setIsOrderNotice(false);
//   setIsNotice([]);
// }

// result.forEach(item => {
//   switch (item.message) {
//     case "인원 선택 메세지":
//       break;

//     case "주문 알림":
//       break;

//     case "기타 알림":
//       console.log("기타 알림 발생");
//       break;

//     default:
//       console.log("알 수 없는 메시지 타입:", item.message);
//       break;
//   }
// });
