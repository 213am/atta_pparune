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
import { storeMenuState } from "../../atoms/SideBarAtom";
import {
  getCookie,
  removeCookie,
  removeCookieRefresh,
} from "../../components/cookie";
import PwKeyboard from "../../components/PwKeyboard";
import useModal from "../../components/useModal";
import { STORE } from "../../constants/Role";
import axios from "axios";
import { isLoginStoreAtom } from "../../atoms/restaurantAtom";

const SubMenuDiv = styled.div`
  padding: 5px 10px;
  margin-left: 60px;
  margin-top: 10px;
  cursor: pointer;
  color: #fff;
`;

const SideBar = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useRecoilState(storeMenuState);
  const [subMenuClick, setSubMenuClick] = useState(false);
  const [_, setRole] = useRecoilState(roleAtom);
  const { Modal, open, close } = useModal({
    title: "결제 비밀번호 재설정",
    width: 450,
    height: 650,
  });
  const [title, setTitle] = useState("");

  const accessToken = getCookie();
  const adminId = Number(sessionStorage.getItem("adminId"));
  const coalitionState = parseInt(sessionStorage.getItem("coalitionState"));

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

  const patchCoalition = async () => {
    const data = { adminId };

    try {
      await axios.patch("/api/admin/v3/coalition-request", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (coalitionState === 0) {
        Swal.fire({
          title: "제휴 해지 요청이\n정상적으로 접수되었습니다.",
          icon: "success",
        });
      } else if (coalitionState === 1) {
        Swal.fire({
          title: "제휴 신청이\n성공적으로 완료되었습니다",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCoalition = () => {
    if (coalitionState === 0 || coalitionState === 1) {
      Swal.fire({
        title: title,
        icon: "question",

        showCancelButton: true,
        confirmButtonColor: "#79BAF2",
        cancelButtonColor: "#E44B58",
        confirmButtonText: "확인",
        cancelButtonText: "취소",

        reverseButtons: false,
      }).then(result => {
        if (result.isConfirmed) {
          patchCoalition();
        }
      });
    } else if (coalitionState === 2) {
      Swal.fire({
        title: "제휴 해지 요청 처리중입니다.\n잠시만 기다려 주세요.",
        icon: "info",
      });
    } else if (coalitionState === 3) {
      Swal.fire({
        title: "제휴 신청 요청 처리중입니다.\n잠시만 기다려 주세요.",
        icon: "info",
      });
    }
  };

  useEffect(() => {
    if (coalitionState === 0) {
      setTitle("제휴 해지 신청을 하시겠습니까?");
    } else if (coalitionState === 1) {
      setTitle("제휴 신청을 하시겠습니까?");
    }
  }, []);

  return (
    <div className="relative flex flex-col w-44 h-dvh items-center bg-primaryFocus">
      <div className="w-full mt-8 flex-grow">
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
              onClick={() => {
                if (adminId) {
                  handleMenuClick("store", "/store/info");
                } else {
                  Swal.fire({
                    title: "로그인이 필요한 서비스 입니다.",
                    icon: "error",
                    confirmButtonText: "확인",
                    showConfirmButton: true, // ok 버튼 노출 여부
                    allowOutsideClick: false, // 외부 영역 클릭 방지
                  });
                }
              }}
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
                if (adminId) {
                  open();
                } else {
                  Swal.fire({
                    title: "로그인이 필요한 서비스 입니다.",
                    icon: "error",
                    confirmButtonText: "확인",
                    showConfirmButton: true, // ok 버튼 노출 여부
                    allowOutsideClick: false, // 외부 영역 클릭 방지
                  });
                }
              }}
            >
              PIN 변경
            </SubMenuDiv>
            <SubMenuDiv
              onClick={() => {
                if (adminId) {
                  navigate("/auth/editpw");
                  setRole(STORE);
                } else {
                  Swal.fire({
                    title: "로그인이 필요한 서비스 입니다.",
                    icon: "error",
                    confirmButtonText: "확인",
                    showConfirmButton: true, // ok 버튼 노출 여부
                    allowOutsideClick: false, // 외부 영역 클릭 방지
                  });
                }
              }}
            >
              비밀번호 변경
            </SubMenuDiv>
            <SubMenuDiv
              onClick={() => {
                if (adminId) {
                  handleChangeCoalition();
                } else {
                  Swal.fire({
                    title: "로그인이 필요한 서비스 입니다.",
                    icon: "error",
                    confirmButtonText: "확인",
                    showConfirmButton: true, // ok 버튼 노출 여부
                    allowOutsideClick: false, // 외부 영역 클릭 방지
                  });
                }
              }}
            >
              제휴상태 변경
            </SubMenuDiv>
          </>
        )}
      </div>
      {adminId !== 0 ? (
        <div
          onClick={() => {
            window.sessionStorage.removeItem("adminId");
            window.sessionStorage.removeItem("restaurantId");
            window.sessionStorage.removeItem("coalitionState");
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
                navigate("/store");
                location.reload(true);
              }
            });
          }}
          className="rounded-md bg-darkGray text-white font-bold tracking-wider px-6 py-2 mb-16 cursor-pointer shadow-lg"
        >
          로그아웃
        </div>
      ) : (
        <div
          onClick={() => {
            setRole(STORE);
            navigate("/auth");
          }}
          className="rounded-md bg-secondary text-white font-bold tracking-wider px-6 py-2 mb-16 cursor-pointer shadow-lg"
        >
          로그인
        </div>
      )}
      <div className="absolute left-1/2 top-1/2">
        <Modal>
          <PwKeyboard mode="edit" close={close} />
        </Modal>
      </div>
    </div>
  );
};

export default SideBar;
