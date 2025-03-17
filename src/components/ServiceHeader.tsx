import { useEffect, useState } from "react";
import { FaUser, FaUserShield } from "react-icons/fa6";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { roleAtom } from "../atoms/roleAtom";
import { menuState } from "../atoms/serviceAtom";
import { MANAGER, USER } from "../constants/Role";
import { getCookie, removeCookie, removeCookieRefresh } from "./cookie";

const ServiceHeader = (): JSX.Element => {
  const [menu, setMenu] = useRecoilState(menuState);
  const [_, setRole] = useRecoilState(roleAtom);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = getCookie();

  const router = (path: string) => {
    navigate(`/service/${path}`);
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/service/about":
        setMenu({ about: true, enroll: false, notice: false });
        break;
      case "/service/enroll":
        setMenu({ about: false, enroll: true, notice: false });
        break;
      case "/service/notice":
        setMenu({ about: false, enroll: false, notice: true });
        break;
      case "/service":
        setMenu({ about: true, enroll: true, notice: true });
        break;
    }
  }, [location]);
  return (
    <div className="flex w-[90%] justify-between items-center absolute z-20 left-24">
      <div
        className={"w-[12%] cursor-pointer"}
        onClick={() => navigate("/service")}
      >
        <img src="/logo.png" alt="" />
      </div>
      <ul className="flex px-10 py-4 gap-4 text-xl font-bold">
        <li
          className={`px-4 py-1 cursor-pointer ${menu.about ? "text-black" : "text-darkGray"}`}
          onClick={() => router("about")}
        >
          서비스 소개
        </li>
        <li
          className={`px-4 py-1 cursor-pointer ${menu.enroll ? "text-black" : "text-darkGray"}`}
          onClick={() => router("enroll")}
        >
          서비스 신청
        </li>
        <li
          className={`px-4 py-1 cursor-pointer ${menu.notice ? "text-black" : "text-darkGray"}`}
          onClick={() => router("notice")}
        >
          공지 / 문의
        </li>
        {accessToken ? (
          <li
            onClick={() => {
              window.sessionStorage.clear();
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
                  window.location.reload();
                }
              });
            }}
            className="flex items-center gap-1.5 px-4 py-1 cursor-pointer"
          >
            <span>로그아웃</span>
            <IoMdLogOut />
          </li>
        ) : (
          <li
            onClick={() => {
              setIsOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-1 cursor-pointer"
          >
            <span>로그인</span>
            <IoMdLogIn />
          </li>
        )}
      </ul>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold flex justify-center mb-10">
              로그인 유형을 선택하세요
            </h2>
            <div className="flex justify-center gap-8">
              {/* 사용자 */}
              <div
                onClick={() => {
                  setRole(USER);
                  navigate("/service/auth");
                }}
                className="bg-third hover:bg-primary px-10 py-5 rounded-[5px] cursor-pointer text-white transition-all duration-200"
              >
                <div className="flex justify-center w-16">
                  <FaUser className="w-full h-full" />
                </div>
                <div className="flex justify-center">
                  <p className="mt-2 text-[20px]">사용자</p>
                </div>
              </div>

              {/* 관리자 */}
              <div
                onClick={() => {
                  setRole(MANAGER);
                  navigate("/service/auth");
                }}
                className="bg-third hover:bg-primary px-10 py-5 rounded-[5px] cursor-pointer text-white transition-all duration-200"
              >
                <div className="flex justify-center w-16">
                  <FaUserShield className="w-full h-full" />
                </div>
                <div className="flex justify-center">
                  <p className="mt-2 text-[20px]">관리자</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 text-white bg-darkGray rounded-lg hover:bg-black transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceHeader;
