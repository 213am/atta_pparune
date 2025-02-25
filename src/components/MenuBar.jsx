import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { GoMilestone } from "react-icons/go";
import { LuClipboardList, LuCircleUserRound } from "react-icons/lu";
import { useRecoilState } from "recoil";
import { loginAtom } from "../atoms/userAtom";
import { isClickIcon } from "../atoms/noticeAtom";
import Swal from "sweetalert2";
import { getCookie } from "./cookie";

const MenuBar = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  const [isClick, setIsClick] = useRecoilState(isClickIcon);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "", label: "홈", icon: FiHome },
    { id: "restaurant", label: "식당찾기", icon: GoMilestone },
    { id: "order", label: "주문내역", icon: LuClipboardList },
    { id: "userInfo", label: "내 정보", icon: LuCircleUserRound },
  ];

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const accessToken = getCookie();
    if (userId && accessToken) {
      setIsLogin(true);
    }
  }, []);

  // 현재 URL 경로에 따라 activeMenu 결정
  // 예를 들어 URL이 /user/restaurant라면, activeMenu는 "restaurant"가 되어야 함
  const currentMenuId = (() => {
    // location.pathname 예시: "/user/restaurant"
    const segments = location.pathname.split("/");
    // segments[0]은 빈 문자열, segments[1]이 "user"라고 가정
    return segments[2] ? segments[2] : "";
  })();

  const isLoginNav = id => {
    if (!isLogin) {
      if (id === "" || id === "restaurant") {
        navigate(`/user/${id}`);
        setIsClick(false);
      } else {
        Swal.fire({
          title: "로그인이 필요한 서비스입니다!",
          text: "확인을 누르면 로그인으로 이동합니다.",
          icon: "error",
          confirmButtonText: "확인",
          showConfirmButton: true,
          allowOutsideClick: false,
          customClass: {
            popup: "flex w-[90%]",
            title: "text-xl",
          },
        }).then(result => {
          if (result.isConfirmed) {
            navigate("/auth");
            setIsClick(false);
          }
        });
      }
    } else {
      navigate(`/user/${id}`);
      setIsClick(false);
    }
  };

  return (
    <div className="fixed flex justify-center bottom-0 left-0 w-full h-20 items-center z-10">
      <div className="w-[430px] h-20 flex bg-white border-t-2 border-gray items-center">
        {menuItems.map(menu => {
          const Icon = menu.icon;
          // currentMenuId와 menu.id가 일치하면 활성화된 것으로 판단
          const isActive = currentMenuId === menu.id;
          return (
            <div
              key={menu.id}
              onClick={() => isLoginNav(menu.id)}
              className="w-1/4 flex flex-col items-center justify-center cursor-pointer"
            >
              <Icon
                className={`text-3xl ${isActive ? "text-primary" : "text-darkGray"}`}
              />
              <p
                className={`text-sm ${isActive ? "font-bold text-primary" : "text-darkGray"}`}
              >
                {menu.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuBar;
