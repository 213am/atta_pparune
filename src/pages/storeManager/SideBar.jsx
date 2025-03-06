import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { IoStorefront } from "react-icons/io5";
import { MdTableBar } from "react-icons/md";
import { PiMoneyWavyFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { roleAtom } from "../../atoms/roleAtom";
import { removeCookie, removeCookieRefresh } from "../../components/cookie";
import { STORE } from "../../constants/Role";

const SubMenuDiv = styled.div`
  padding: 5px 10px;
  margin-left: 60px;
  margin-top: 10px;
  cursor: pointer;
  color: #fff;
`;

const SideBar = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("");
  const [subMenuClick, setSubMenuClick] = useState(false);
  const [role, setRole] = useRecoilState(roleAtom);

  useEffect(() => {
    const pathToMenuMap = {
      "/store": "table",
      "/store/menu": "menu",
      "/store/sales": "sales",
      "/store/info": "store",
      "/store/review": "review",
    };
    setActiveMenu(pathToMenuMap[location.pathname] || "");
    if (location.pathname === "/store/info") {
      setSubMenuClick(true);
    }
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
    <div className="flex flex-col w-44 h-dvh justify-between items-center bg-primaryFocus">
      <div className="w-full mt-8">
        <div className="flex mb-6 px-4 w-44 justify-center items-center">
          <img src={"/adminLogo.png"} className="flex w-full h-full pb-6" />
        </div>

        <div className="flex flex-col justify-between">
          {/* 테이블 메뉴 */}
          <div
            className={`flex gap-3 pl-8 py-4 items-center cursor-pointer ${
              activeMenu === "table"
                ? "bg-gray text-black ml-6 rounded-l-full shadow-lg"
                : "text-white"
            }`}
            onClick={() => handleMenuClick("table", "/store")}
          >
            <MdTableBar className="text-2xl" />
            <span className="text-lg">테이블</span>
          </div>
          {/* 메뉴 */}
          <div
            className={`flex gap-3 pl-8 py-4 items-center cursor-pointer ${
              activeMenu === "menu"
                ? "bg-gray text-black ml-6 rounded-l-full shadow-[-3px_5px_0_rgba(0,0,0,0.08)]"
                : "text-white"
            }`}
            onClick={() => handleMenuClick("menu", "/store/menu")}
          >
            <FaBowlFood className="text-2xl" />
            <div className="text-lg">메뉴</div>
          </div>

          {/* 리뷰관리 */}
          <div
            className={`flex gap-3 pl-8 py-4 items-center cursor-pointer ${
              activeMenu === "review"
                ? "bg-gray text-black ml-6 rounded-l-full shadow-[-3px_5px_0_rgba(0,0,0,0.08)]"
                : "text-white"
            }`}
            onClick={() => handleMenuClick("review", "/store/review")}
          >
            <BiSolidCommentDetail className="text-2xl" />
            <div className="text-lg">리뷰관리</div>
          </div>
        </div>

        {/* 매출확인 */}
        <div
          className={`flex gap-3 pl-8 py-4 items-center cursor-pointer ${
            activeMenu === "sales"
              ? "bg-gray text-black ml-6 rounded-l-full shadow-lg"
              : "text-white"
          }`}
          onClick={() => handleMenuClick("sales", "/store/sales")}
        >
          <PiMoneyWavyFill className="text-2xl" />
          <div className="text-lg">매출확인</div>
        </div>

        {/* 내 매장 메뉴 */}
        <div
          className={`flex gap-3 pl-8 items-center mt-3 cursor-pointer text-white`}
          onClick={() => {
            setActiveMenu("store");
          }}
        >
          <IoStorefront className="text-2xl" />
          <div className="text-lg">내 매장</div>
          {activeMenu === "store" ? (
            <FaSortUp className="w-6 h-6 mt-3" />
          ) : (
            <FaSortDown className="w-6 h-6 mb-3" />
          )}
        </div>
        {activeMenu === "store" && (
          <>
            <SubMenuDiv
              onClick={() => handleMenuClick("store", "/store/info")}
              style={{
                backgroundColor: subMenuClick ? "#eee" : "#4825b6",
                color: subMenuClick ? "#333" : "#fff",
                boxShadow:
                  subMenuClick &&
                  "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
                borderRadius: "2px 0 0 2px",
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
        className="rounded-md bg-secondary text-white font-bold tracking-wider px-6 py-2 mb-16 cursor-pointer shadow-lg"
      >
        로그아웃
      </div>
    </div>
  );
};

export default SideBar;
