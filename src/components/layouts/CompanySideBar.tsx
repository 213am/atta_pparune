import styled from "@emotion/styled";
import { useEffect } from "react";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoCalculatorOutline } from "react-icons/io5";
import { LuTriangleAlert } from "react-icons/lu";
import { RiStore2Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { companyMenuState } from "../../atoms/SideBarAtom";
import { removeCookie, removeCookieRefresh } from "../cookie";

interface Size {
  width?: number;
  height?: number;
}

const IconDiv = styled.div<Size>`
  min-width: ${({ width }) => (width ? `${width}px` : "25px")};
  min-height: ${({ height }) => (height ? `${height}px` : "25px")};
  width: ${({ width }) => (width ? `${width}px` : "25px")};
  height: ${({ height }) => (height ? `${height}px` : "25px")};
`;

const CompanySideBar = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  // 메인 메뉴 클릭 State
  const [isClick, setIsClick] = useRecoilState(companyMenuState);

  // 메인 메뉴 클릭 함수
  const handleClick = (menu: number) => {
    switch (menu) {
      case 1:
        setIsClick({
          first: true,
          second: false,
          third: false,
          forth: false,
        });
        navigate("/company");
        break;
      case 2:
        setIsClick({
          first: false,
          second: true,
          third: false,
          forth: false,
        });
        navigate("/company/transaction");
        break;
      case 3:
        setIsClick({
          first: false,
          second: false,
          third: true,
          forth: false,
        });
        navigate("/company/member");
        break;
      case 4:
        setIsClick({
          first: false,
          second: false,
          third: false,
          forth: true,
        });
        navigate("/company/account");
        break;
    }
  };

  const signoutHandler = () => {
    sessionStorage.removeItem("adminId");
    sessionStorage.removeItem("companyId");
    removeCookie();
    removeCookieRefresh();

    navigate("/");
  };

  // 새로고침 방지
  useEffect(() => {
    console.log(location.pathname);

    switch (location.pathname) {
      case "/company":
        setIsClick({
          first: true,
          second: false,
          third: false,
          forth: false,
        });
        break;
      case "/company/transaction":
        setIsClick({
          first: false,
          second: true,
          third: false,
          forth: false,
        });
        break;
      case "/company/member":
        setIsClick({
          first: false,
          second: false,
          third: true,
          forth: false,
        });
        break;
      case "/company/account":
        setIsClick({
          first: false,
          second: false,
          third: false,
          forth: true,
        });
        break;
    }
  }, [location]);

  return (
    <div className="bg-black w-[300px] h-[100vh] py-3 flex flex-col">
      <div className="w-[200px] h-[35px] mx-6 my-3">
        <img src="/adminLogo.png" className="w-full h-full" />
      </div>
      <div className="mt-[100px] flex-grow">
        {/* 대시보드 */}
        <div
          className={`flex gap-4 items-center pl-7 py-5 cursor-pointer ${isClick.first ? "bg-primary" : "bg-none"}`}
          onClick={() => handleClick(1)}
        >
          <div className="flex gap-4 items-center pl-7 py-2">
            <IconDiv
              width={40}
              height={40}
              className={isClick.first ? "text-white" : "text-darkGray"}
            >
              <IoCalculatorOutline className="w-full h-full" />
            </IconDiv>
            <div
              className={`text-[20px] tracking-wide ${isClick.first ? "text-white font-semibold" : "text-darkGray"}`}
            >
              대시보드
            </div>
          </div>
        </div>

        {/* 거래내역 */}
        <div
          className={`flex gap-4 items-center pl-7 py-5 cursor-pointer ${isClick.second ? "bg-primary" : "bg-none"}`}
          onClick={() => handleClick(2)}
        >
          <div className="flex gap-4 items-center pl-7 py-2">
            <IconDiv
              width={40}
              height={40}
              className={isClick.second ? "text-white" : "text-darkGray"}
            >
              <HiOutlineClipboardList className="w-full h-full" />
            </IconDiv>
            <div
              className={`text-[20px] tracking-wide ${isClick.second ? "text-white font-semibold" : "text-darkGray"}`}
            >
              거래내역
            </div>
          </div>
        </div>

        {/* 구성원 관리 */}
        <div
          className={`flex gap-4 items-center pl-7 py-5 cursor-pointer ${isClick.third ? "bg-primary" : "bg-none"}`}
          onClick={() => handleClick(3)}
        >
          <div className="flex gap-4 items-center pl-7 py-2">
            <IconDiv
              width={40}
              height={40}
              className={isClick.third ? "text-white" : "text-darkGray"}
            >
              <RiStore2Line className="w-full h-full" />
            </IconDiv>
            <div
              className={`text-[20px] tracking-wide ${isClick.third ? "text-white font-semibold" : "text-darkGray"}`}
            >
              구성원 관리
            </div>
          </div>
        </div>
        {/* 계정 관리 */}
        <div
          className={`flex gap-4 items-center pl-7 py-5 cursor-pointer ${isClick.forth ? "bg-primary" : "bg-none"}`}
          onClick={() => handleClick(4)}
        >
          <div className="flex gap-4 items-center pl-7 py-2">
            <IconDiv
              width={40}
              height={40}
              className={`p-1 ${isClick.forth ? "text-white" : "text-darkGray"}`}
            >
              <LuTriangleAlert className="w-full h-full" />
            </IconDiv>
            <div
              className={`text-[20px] tracking-wide ${isClick.forth ? "text-white font-semibold" : "text-darkGray"}`}
            >
              계정 관리
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center mb-6">
        <span
          onClick={signoutHandler}
          className="text-white border px-10 py-2 rounded-md cursor-pointer"
        >
          로그아웃
        </span>
      </div>
    </div>
  );
};
export default CompanySideBar;
