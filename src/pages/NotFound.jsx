import { TbMoodSadDizzy } from "react-icons/tb";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(true);

  const MovePrevPageHandler = () => {
    navigate(-1);
  };
  const MoveMainPageHandler = () => {
    if (isUser) {
      navigate("/user");
    } else {
      navigate("/store");
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-20 overflow-hidden scrollbar-hide mt-28">
      <div className="flex flex-col items-center">
        <TbMoodSadDizzy className="text-9xl text-darkGray" />
        <div className="flex flex-col w-full items-center">
          <span className="text-7xl text-darkGray font-semibold">404</span>
          <span className="text-3xl text-darkGray font-semibold">
            죄송합니다
          </span>
          <span className="text-xl text-darkGray font-semibold">
            현재 찾을 수 없는 페이지를 요청 하셨습니다
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full items-center gap-6">
        <div className="flex flex-col w-[100%] items-center text-nowrap">
          <span className="text-lg">존재하지 않는 주소를 입력하셨거나</span>
          <span className="text-md">
            요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다
          </span>
        </div>
        <div className="flex w-full justify-center gap-12">
          <div
            onClick={MovePrevPageHandler}
            className="flex items-center bg-white text-secondary border-2 pl-1 pr-3 py-2 text-xl font-semibold rounded-md cursor-pointer hover:text-white hover:bg-secondary"
          >
            <IoMdArrowDropleft />
            <span>이전으로</span>
          </div>
          <div
            onClick={MoveMainPageHandler}
            className="flex items-center bg-white text-secondary border-2  pl-3 pr-1 py-2 text-xl font-semibold rounded-md cursor-pointer hover:text-white hover:bg-secondary"
          >
            <span>메인으로</span>
            <IoMdArrowDropright />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
