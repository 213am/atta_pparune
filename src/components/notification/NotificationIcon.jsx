import axios from "axios";
import { useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import {
  isClickIcon,
  isWhiteIcon,
  noticeState,
  priceNoticeAtom,
  orderNoticeAtom,
} from "../../atoms/noticeAtom";
import { orderIdAtom } from "../../atoms/restaurantAtom";
import { getCookie } from "../cookie";
import NotificationPage from "./NotificationPage";
import { loginAtom } from "../../atoms/userAtom";
import Swal from "sweetalert2";

const Notification = () => {
  const [isWhite, setIsWhite] = useRecoilState(isWhiteIcon);
  const [isNotice, setIsNotice] = useRecoilState(noticeState);
  const [isPriceNotice, setIsPriceNotice] = useRecoilState(priceNoticeAtom);
  const [isOrderNotice, setIsOrderNotice] = useRecoilState(orderNoticeAtom);
  const [isClick, setIsClick] = useRecoilState(isClickIcon);
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  const sessionId = sessionStorage.getItem("userId");
  const accessToken = getCookie();
  const [orderId, setOrderId] = useRecoilState(orderIdAtom);

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

  useEffect(() => {
    const params = {
      userId: sessionId,
    };
    console.log(isLogin);

    const getAlert = async () => {
      if (isLogin === true) {
        try {
          const res = await axios.get(`/api/user/alert`, {
            params,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log(res.data.resultData);
          const result = res.data.resultData;
          if (result[0]?.orderId) {
            setIsNotice(result);
            console.log("결제 승인 요청이 왔습니다");
            setIsPriceNotice(true);
            Toast.fire({
              title: "결제 승인 요청이 왔습니다!",
              text: "알림 메세지를 확인해주세요",
              icon: "info",
              customClass: {
                popup: "flex w-[90%]",
                title: "text-2xl",
              },
            });
          } else if (result[1]?.orderId) {
            setIsNotice(result);
            setIsOrderNotice(true);
          } else if (result.length === 0) {
            setIsPriceNotice(false);
            setIsOrderNotice(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getAlert();
  }, []);
  console.log(isNotice);

  return (
    <div>
      <div>
        <div
          onClick={() => setIsClick(!isClick)}
          className="absolute right-5 top-5 z-50 cursor-pointer"
        >
          {isNotice.length !== 0 ? (
            <FaCircle className="absolute -right-0 -top-1 text-xs text-red animate-ping" />
          ) : (
            <></>
          )}
          <FaBell
            className={`size-6 ${isWhite ? "text-white" : "text-black"}`}
          />
        </div>
      </div>
      {isClick ? <NotificationPage /> : <></>}
    </div>
  );
};
export default Notification;
