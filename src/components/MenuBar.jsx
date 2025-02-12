import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { GoMilestone } from "react-icons/go";
import { LuClipboardList } from "react-icons/lu";
import { LuCircleUserRound } from "react-icons/lu";
import { useRecoilState } from "recoil";
import { loginAtom } from "../atoms/userAtom";
import { isClickIcon } from "../atoms/noticeAtom";
import Swal from "sweetalert2";
import { getCookie } from "./cookie";

const MenuBar = () => {
  const [activeMenu, setActiveMenu] = useState("home"); // 현재 선택된 메뉴 상태
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  const [isClick, setIsClick] = useRecoilState(isClickIcon);
  const navigate = useNavigate();

  const menuItems = [
    { id: "", label: "홈", icon: FiHome },
    { id: "restaurant", label: "식당찾기", icon: GoMilestone },
    { id: "order", label: "주문내역", icon: LuClipboardList },
    { id: "userInfo", label: "내 정보", icon: LuCircleUserRound },
  ];

  useEffect(() => {
    const isLoginHandler = () => {
      const userId = sessionStorage.getItem("userId");
      const accessToken = getCookie();
      if (userId && accessToken) {
        setIsLogin(true);
      }
    };
    isLoginHandler();
  }, []);

  const isLoginNav = Id => {
    if (isLogin === false) {
      if (Id === "") {
        navigate(`/user/${Id}`);
        setIsClick(false);
      } else if (Id === "restaurant") {
        navigate(`/user/${Id}`);
        setIsClick(false);
      } else {
        Swal.fire({
          title: "로그인이 필요한 서비스입니다!",
          text: "확인을 누르시면 로그인 페이지로 이동합니다.",
          icon: "error",
          confirmButtonText: "확인",
          showConfirmButton: true, // ok 버튼 노출 여부
          allowOutsideClick: false, // 외부 영역 클릭 방지
          customClass: {
            popup: "flex w-[80%]",
            title: "text-xl text-red",
          },
        }).then(result => {
          if (result.isConfirmed) {
            navigate("/auth");
            setIsClick(false);
          }
        });
      }
    } else {
      navigate(`/user/${Id}`);
      setIsClick(false);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 w-full h-20 flex bg-white border-t-2 border-gray items-center z-10">
      {menuItems.map(menu => {
        const Icon = menu.icon;
        const isActive = activeMenu === menu.id;
        return (
          <div
            key={menu.id}
            onClick={() => {
              setActiveMenu(menu.id);
              isLoginNav(menu.id);
            }}
            className={`w-1/4 flex flex-col items-center justify-center cursor-pointer`}
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
  );
};

export default MenuBar;
