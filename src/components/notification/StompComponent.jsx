import { Stomp } from "@stomp/stompjs";
import { useRecoilState } from "recoil";
import SockJS from "sockjs-client";
import Swal from "sweetalert2";
import { noticeState } from "../../atoms/noticeAtom";
import { loginAtom } from "../../atoms/userAtom";
import { getCookie } from "../../components/cookie";
import { DOCKER_URL } from "../../constants/url";
import { getAlert } from "./getAlert";

// SockJS로 WebSocket 연결 설정
const socket = new SockJS(`${DOCKER_URL}/ws-stomp`);
const stompClient = Stomp.over(() => socket); // SockJS 팩토리를 함수로 전달

const sessionStoreId = window.sessionStorage.getItem("restaurantId");
const sessionUser = window.sessionStorage.getItem("userId");
const accessToken = getCookie();

export const initializeSocket = () => {
  return new Promise((resolve, reject) => {
    if (stompClient.connected) {
      console.log("이미 STOMP 연결됨");
      resolve("이미 연결됨");
      return;
    }

    stompClient.reconnectDelay = 5000;

    stompClient.onConnect = frame => {
      console.log("STOMP 연결 성공:", frame);
      resolve(frame);
    };

    stompClient.onStompError = frame => {
      console.error("STOMP 오류 발생:", frame);
    };

    stompClient.onWebSocketError = event => {
      console.error("WebSocket 오류 발생:", event);
      reject(event);
    };

    stompClient.activate(); // 연결 시도
  });
};

export const SubscribeToReservationStatus = orderId => {
  const [isNotice, setIsNotice] = useRecoilState(noticeState);
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);

  const subscribeFn = () => {
    const url = `/queue/reservation/${orderId}/user/reservation`;

    stompClient.subscribe(url, message => {
      if (!message.body) {
        console.warn("빈 메시지 수신");
        return;
      }

      try {
        const messageObj = JSON.parse(message.body);
        console.log("주문 요청 완료 messageObj : ", messageObj);

        const statusMessages = {
          1: "예약이 승인되었습니다.",
          2: "예약이 거부되었습니다.",
          3: "예약이 취소되었습니다.",
        };

        const reservationStatus = messageObj.reservationStatus;
        const statusMessage =
          statusMessages[reservationStatus] || "알 수 없는 상태입니다.";
        console.log(statusMessage);

        const alertConfig = {
          1: {
            title: "예약이 승인되었습니다",
            icon: "success",
            confirmButtonColor: "#79BAF2",
          },
          2: {
            title: "예약이 거부되었습니다",
            icon: "error",
            confirmButtonColor: "#E44B58",
          },
          3: {
            title: "예약이 취소되었습니다",
            icon: "warning",
            confirmButtonColor: "#E44B58",
          },
        };

        if (alertConfig[reservationStatus]) {
          Swal.fire({
            title: alertConfig[reservationStatus].title,
            icon: alertConfig[reservationStatus].icon,
            confirmButtonColor:
              alertConfig[reservationStatus].confirmButtonColor,
            confirmButtonText: "확인",
            showCancelButton: true,
          }).then(result => {
            if (result.isConfirmed) {
              console.log("사용자에게 알림 보내줘 : ", result);
              getAlert({
                sessionId: sessionUser,
                accessToken,
                isLogin,
                setIsNotice,
              });
            }
          });
        }
      } catch (error) {
        console.error("메시지 처리 중 오류 발생:", error);
      }
    });
  };

  // 항상 연결 후 구독
  initializeSocket()
    .then(frame => {
      console.log("STOMP 연결 후 예약 상태 구독 실행:", frame);
      subscribeFn();
    })
    .catch(error => {
      console.error("STOMP 연결 실패, 예약 상태 구독 불가:", error);
    });
};

export const subscribeUserLogin = userId => {
  const subscribeFn = () => {
    const url = `/queue/user/${userId}/user/userPaymentMember`;
    stompClient.subscribe(url, message => {
      try {
        const messageObj = JSON.parse(message.body);
        console.log("유저 로그인 메시지 수신 : ", messageObj);
      } catch (error) {
        console.error("메시지 파싱 중 오류:", error);
      }
    });
  };

  // 항상 소켓 연결 후 구독
  initializeSocket()
    .then(frame => {
      console.log("STOMP 연결 후 유저 구독 실행:", frame);
      subscribeFn();
    })
    .catch(error => {
      console.error("STOMP 연결 실패, 유저 구독 불가:", error);
    });
};

export const subscribeStoreLogin = (restaurantId, setReloadOrders) => {
  const subscribeFn = () => {
    const url = `/queue/restaurant/${restaurantId}/owner/reservation`;

    stompClient.subscribe(url, message => {
      if (!message.body) {
        console.warn("빈 메시지 수신");
        return;
      }

      try {
        const messageObj = JSON.parse(message.body);
        console.log("메세지 수신 완료 : ", messageObj);

        if (messageObj.typeMessage) {
          Swal.fire({
            title: "주문 완료!",
            text: "고객님의 주문 결제가 완료됐습니다",
            icon: "success",
            confirmButtonColor: "#79BAF2",
            confirmButtonText: "확인",
            reverseButtons: false,
          }).then(result => {
            if (result.isConfirmed) {
              setReloadOrders(true);
            }
          });
        } else {
          Swal.fire({
            title: "새로운 주문 도착",
            text: "주문을 확인해주세요",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#79BAF2",
            cancelButtonColor: "#E44B58",
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            reverseButtons: false,
          }).then(result => {
            if (result.isConfirmed) {
              setReloadOrders(true);
            }
          });
        }
      } catch (error) {
        console.error("메시지 처리 중 오류 발생:", error);
      }
    });
  };

  // 항상 initializeSocket 호출 → 연결 후 구독 실행
  initializeSocket()
    .then(frame => {
      console.log("STOMP 연결 후 구독 실행:", frame);
      subscribeFn();
    })
    .catch(error => {
      console.error("STOMP 연결 실패, 구독 불가:", error);
    });
};

// 사용자 결재 승인 요청 알림(N명 예약시): "/queue/user/{사용자 PK}/user/userPaymentMember"
// 식당 관리자 예약 알림: "/queue/restaurant/{식당 PK}/owner/reservation"
// 식당 사용자 예약 여부 사용자 알림: "/queue/reservation/{주문 PK}/user/reservation"
// "사용자"가 "로그인" 할 때 "사용자 결재 승인 요청" 구독경로에 연결되어야 함.
// "사장님"이 "로그인" 할 때 "식당 관리자 예약 구독경로"에 연결되어야 함.
// "사용자"가 "예약"에 "성공"했을 시 "식당 사용자 예약  여부 사용자 구독 경로"에 연결되어야 함.
