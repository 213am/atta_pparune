import { useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import {
  isClickIcon,
  isWhiteIcon,
  noticeState,
  orderNoticeAtom,
  priceNoticeAtom,
} from "../../atoms/noticeAtom";
import { loginAtom } from "../../atoms/userAtom";
import { getCookie } from "../cookie";
import NotificationPage from "./NotificationPage";
import { getAlert } from "./getAlert";

const Notification = () => {
  const [isWhite, setIsWhite] = useRecoilState(isWhiteIcon);
  const [isNotice, setIsNotice] = useRecoilState(noticeState);
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  const [isClick, setIsClick] = useRecoilState(isClickIcon);
  const sessionId = sessionStorage.getItem("userId");
  const accessToken = getCookie();

  useEffect(() => {
    getAlert({
      sessionId,
      accessToken,
      isLogin,
      setIsNotice,
    });
  }, []);

  return (
    <div>
      <div>
        <div
          onClick={() => setIsClick(!isClick)}
          className="absolute right-5 top-5 z-50 cursor-pointer"
        >
          {isNotice.length !== 0 && (
            <FaCircle className="absolute -right-0 -top-1 text-xs text-red animate-ping z-50" />
          )}
          <FaBell
            className={`size-6 drop-shadow-xl ${isWhite ? "text-white" : "text-black"}`}
          />
        </div>
      </div>
      {isClick && <NotificationPage />}
    </div>
  );
};
export default Notification;
