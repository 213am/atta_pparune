import { FaBowlFood } from "react-icons/fa6";
import { MdTableBar } from "react-icons/md";
import { PiMoneyWavyFill } from "react-icons/pi";
import { IoStorefront } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { roleAtom } from "../../atoms/roleAtom";
import { STORE } from "../../constants/Role";
import { removeCookie, removeCookieRefresh } from "../../components/cookie";
import Swal from "sweetalert2";

const SubMenuDiv = styled.div`
  padding: 5px 10px;
  margin-left: 60px;
  margin-top: 10px;
  cursor: pointer;
`;

const SideBar = () => {
  const navigate = useNavigate();
  const [menuClick, setMenuClick] = useState({
    table: false,
    menu: false,
    sales: false,
    store: false,
  });
  const [activeMenu, setActiveMenu] = useState("");
  const [subMenuClick, setSubMenuClick] = useState(false);
  const [role, setRole] = useRecoilState(roleAtom);

  useEffect(() => {
    const pathToMenuMap = {
      "/store": "table",
      "/store/menu": "menu",
      "/store/sales": "sales",
      "/store/info": "store",
    };
    setActiveMenu(pathToMenuMap[location.pathname] || "");
  }, [location.pathname]);

  const handleMenuClick = (menu, path) => {
    setActiveMenu(menu);
    navigate(path);
  };

  const editHandler = () => {
    setSubMenuClick(!subMenuClick);
    navigate("/store/info");
  };

  return (
    <div className="flex flex-col w-44 h-dvh justify-between items-center bg-white border-r border-r-gray drop-shadow-md">
      <div className="w-full mt-8">
        <div className="flex mb-6 px-4 w-44 justify-center items-center">
          <img src={"/logo.png"} className="flex w-full h-full pb-6" />
        </div>

        <div className="flex flex-col justify-between">
          {/* 테이블 메뉴 */}
          <div
            className={`flex gap-3 pl-8 py-4 items-center cursor-pointer ${
              activeMenu === "table"
                ? "bg-primary text-white ml-6 rounded-l-full"
                : ""
            }`}
            onClick={() => handleMenuClick("table", "/store")}
          >
            <MdTableBar className="text-2xl" />
            <span className="text-lg font-semibold">테이블</span>
          </div>
          {/* 메뉴 */}
          <div
            className={`flex gap-3 pl-8 py-4 items-center cursor-pointer ${
              activeMenu === "menu"
                ? "bg-primary text-white ml-6 rounded-l-full"
                : ""
            }`}
            onClick={() => handleMenuClick("menu", "/store/menu")}
          >
            <FaBowlFood className="text-2xl" />
            <div className="text-lg font-semibold">메뉴</div>
          </div>

          {/* 매출확인 */}
          <div
            className={`flex gap-3 pl-8 py-4 items-center cursor-pointer ${
              activeMenu === "sales"
                ? "bg-primary text-white ml-6 rounded-l-full"
                : ""
            }`}
            onClick={() => handleMenuClick("sales", "/store/sales")}
          >
            <PiMoneyWavyFill className="text-2xl" />
            <div className="text-lg font-semibold">매출확인</div>
          </div>
        </div>

        {/* 내 매장 메뉴 */}
        <div
          // ${ menuClick.store ? "bg-primary text-white" : ""}
          className={`flex gap-3 pl-8 items-center mt-3 cursor-pointer`}
          onClick={() =>
            setMenuClick({ ...menuClick, store: !menuClick.store })
          }
        >
          <IoStorefront className="text-2xl" />
          <div className="text-lg font-semibold">내 매장</div>
          {menuClick.store ? (
            <FaSortUp className="w-6 h-6 mt-3" />
          ) : (
            <FaSortDown className="w-6 h-6 mb-3" />
          )}
        </div>
        {menuClick.store && (
          <>
            <SubMenuDiv
              onClick={() => editHandler()}
              style={{
                backgroundColor: subMenuClick ? "#6f4cd8" : "#fff",
                color: subMenuClick ? "#fff" : "#333",
              }}
            >
              정보수정
            </SubMenuDiv>
            <SubMenuDiv
              onClick={() => {
                navigate("/auth/editpw");
                setRole(STORE);
              }}
            >
              비밀번호 변경
            </SubMenuDiv>
            <SubMenuDiv>계정삭제</SubMenuDiv>
          </>
        )}
      </div>
      <div
        onClick={() => {
          window.sessionStorage.removeItem("adminId");
          window.sessionStorage.removeItem("restaurantId");
          removeCookie();
          removeCookieRefresh();
          Swal.fire({
            title: "로그아웃 되었습니다.",
            icon: "success",
            confirmButtonText: "확인",
            showConfirmButton: true, // ok 버튼 노출 여부
            allowOutsideClick: false, // 외부 영역 클릭 방지
          }).then(result => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        }}
        className="rounded-md bg-primary text-white font-bold tracking-wider px-6 py-2 mb-16 cursor-pointer hover:bg-primaryFocus"
      >
        로그아웃
      </div>
    </div>
  );
};

export default SideBar;
