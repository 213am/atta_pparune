import styled from "@emotion/styled";
import { useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoCalculatorOutline } from "react-icons/io5";
import { LuTriangleAlert } from "react-icons/lu";
import { RiStore2Line } from "react-icons/ri";
import { TbCreditCardRefund } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { adminMenuState, adminSubMenuState } from "../atoms/SideBarAtom";

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

const AdminSideBar = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  // 메인 메뉴 클릭 State
  const [isClick, setIsClick] = useRecoilState(adminMenuState);

  // 서브메뉴
  const [subMenu, setSubMenu] = useRecoilState(adminSubMenuState);

  // 메인 메뉴 클릭 함수
  const handleClick = (menu: number) => {
    switch (menu) {
      case 1:
        setIsClick({
          first: true,
          second: false,
          third: false,
          forth: false,
          fifth: false,
        });
        setSubMenu(0);
        navigate("/admin");
        break;
      case 2:
        setIsClick({
          first: isClick.first,
          second: !isClick.second,
          third: isClick.third,
          forth: isClick.forth,
          fifth: isClick.fifth,
        });
        break;
      case 3:
        setIsClick({
          first: isClick.first,
          second: isClick.second,
          third: !isClick.third,
          forth: isClick.forth,
          fifth: isClick.fifth,
        });

        break;
      case 4:
        setIsClick({
          first: false,
          second: false,
          third: false,
          forth: true,
          fifth: false,
        });
        setSubMenu(0);
        navigate("/admin/enquiry");
        break;
      case 5:
        setIsClick({
          first: false,
          second: false,
          third: false,
          forth: false,
          fifth: true,
        });
        setSubMenu(0);
        navigate("/admin/refund");
        break;
    }
  };

  // 서브메뉴 클릭 함수
  const handleSubClick = (sub: number) => {
    setSubMenu(sub);
    switch (sub) {
      case 1:
        setIsClick({
          first: false,
          second: true,
          third: false,
          forth: false,
          fifth: false,
        });
        navigate("/admin/point");
        break;
      case 2:
        setIsClick({
          first: false,
          second: true,
          third: false,
          forth: false,
          fifth: false,
        });
        navigate("/admin/deposit");
        break;
      case 3:
        setIsClick({
          first: false,
          second: false,
          third: true,
          forth: false,
          fifth: false,
        });
        navigate("/admin/franchisee-store");
        break;
      case 4:
        setIsClick({
          first: false,
          second: false,
          third: true,
          forth: false,
          fifth: false,
        });
        navigate("/admin/franchisee-company");
        break;
    }
  };

  // 새로고침 방지
  useEffect(() => {
    console.log(location.pathname);

    switch (location.pathname) {
      case "/admin":
        setIsClick({
          first: true,
          second: false,
          third: false,
          forth: false,
          fifth: false,
        });
        break;
      case "/admin/enquiry":
        setIsClick({
          first: false,
          second: false,
          third: false,
          forth: true,
          fifth: false,
        });
        break;
      case "/admin/refund":
        setIsClick({
          first: false,
          second: false,
          third: false,
          forth: false,
          fifth: true,
        });
        break;
      case "/admin/point":
        setIsClick({
          first: false,
          second: true,
          third: false,
          forth: false,
          fifth: false,
        });
        setSubMenu(1);
        break;
      case "/admin/deposit":
        setIsClick({
          first: false,
          second: true,
          third: false,
          forth: false,
          fifth: false,
        });
        setSubMenu(2);
        break;
      case "/admin/franchisee-store":
        setIsClick({
          first: false,
          second: false,
          third: true,
          forth: false,
          fifth: false,
        });
        setSubMenu(3);
        break;
      case "/admin/franchisee-company":
        setIsClick({
          first: false,
          second: false,
          third: true,
          forth: false,
          fifth: false,
        });
        setSubMenu(4);
        break;
    }
  }, [location]);

  return (
    <div className="bg-black w-[300px] h-[100vh] py-3">
      <div className="w-[200px] h-[35px] mx-6 my-3">
        <img src="/adminLogo.png" className="w-full h-full" />
      </div>
      <div className="mt-[100px]">
        {/* 정기정산 */}
        <div
          className={`flex gap-4 items-center pl-7 py-5 cursor-pointer ${isClick.first ? "bg-primary" : "bg-none"}`}
          onClick={() => handleClick(1)}
        >
          <IconDiv
            width={40}
            height={40}
            className={isClick.first ? "text-white" : "text-darkGray"}
          >
            <IoCalculatorOutline className="w-full h-full" />
          </IconDiv>
          <div className="text-white text-[20px]">정기정산</div>
        </div>

        {/* 거래내역 */}
        <div
          className="flex justify-between pr-[20px] items-center cursor-pointer"
          onClick={() => handleClick(2)}
        >
          <div className="flex gap-4 items-center pl-7 py-5">
            <IconDiv width={40} height={40} className="text-darkGray">
              <HiOutlineClipboardList className="w-full h-full" />
            </IconDiv>
            <div className="text-white text-[20px]">거래내역</div>
          </div>

          <IconDiv width={30} height={30} className="text-darkGray">
            {isClick.second ? (
              <FaAngleUp className="w-full h-full" />
            ) : (
              <FaAngleDown className="w-full h-full" />
            )}
          </IconDiv>
        </div>
        {isClick.second && (
          <div>
            <div
              className="ml-7 mr-[20px] cursor-pointer"
              onClick={() => handleSubClick(1)}
            >
              <div
                className={`text-darkGray rounded-[2px] py-2 pl-14 ${subMenu === 1 && "bg-primary text-white"}`}
              >
                포인트 판매내역
              </div>
            </div>
            <div
              className="ml-7 mr-[20px] cursor-pointer"
              onClick={() => handleSubClick(2)}
            >
              <div
                className={`text-darkGray rounded-[2px] py-2 pl-14 ${subMenu === 2 && "bg-primary text-white"}`}
              >
                식당 입금내역
              </div>
            </div>
          </div>
        )}

        {/* 가맹점 관리 */}
        <div
          className="flex justify-between pr-[20px] items-center cursor-pointer"
          onClick={() => handleClick(3)}
        >
          <div className="flex gap-4 items-center pl-7 py-5">
            <IconDiv width={40} height={40} className="text-darkGray p-1">
              <RiStore2Line className="w-full h-full" />
            </IconDiv>
            <div className="text-white text-[20px]">가맹점 관리</div>
          </div>
          <IconDiv width={30} height={30} className="text-darkGray">
            {isClick.third ? (
              <FaAngleUp className="w-full h-full" />
            ) : (
              <FaAngleDown className="w-full h-full" />
            )}
          </IconDiv>
        </div>
        {isClick.third && (
          <div>
            <div
              className="ml-7 mr-[20px] cursor-pointer"
              onClick={() => {
                handleSubClick(3);
              }}
            >
              <div
                className={`text-darkGray rounded-[2px] py-2 pl-14 ${subMenu === 3 && "bg-primary text-white"}`}
              >
                식당관리
              </div>
            </div>
            <div
              className="ml-7 mr-[20px] cursor-pointer"
              onClick={() => {
                handleSubClick(4);
              }}
            >
              <div
                className={`text-darkGray rounded-[2px] py-2 pl-14 ${subMenu === 4 && "bg-primary text-white"}`}
              >
                회사관리
              </div>
            </div>
          </div>
        )}

        {/* 시스템 문의 */}
        <div
          className={`flex gap-4 items-center pl-7 py-5 cursor-pointer ${isClick.forth ? "bg-primary" : "bg-none"}`}
          onClick={() => handleClick(4)}
        >
          <IconDiv
            width={40}
            height={40}
            className={`p-1 ${isClick.forth ? "text-white" : "text-darkGray"}`}
          >
            <LuTriangleAlert className="w-full h-full" />
          </IconDiv>
          <div className="text-white text-[20px]">시스템 문의</div>
        </div>

        {/* 환불내역 */}
        <div
          className={`flex gap-4 items-center pl-7 py-5 cursor-pointer ${isClick.fifth ? "bg-primary" : "bg-none"}`}
          onClick={() => handleClick(5)}
        >
          <IconDiv
            width={40}
            height={40}
            className={`p-1 ${isClick.fifth ? "text-white" : "text-darkGray"}`}
          >
            <TbCreditCardRefund className="w-full h-full" />
          </IconDiv>
          <div className="text-white text-[20px]">환불내역</div>
        </div>
      </div>
    </div>
  );
};
export default AdminSideBar;
