import { FiEdit } from "react-icons/fi";
import { GoChevronRight, GoLock } from "react-icons/go";
import { IoVolumeMediumOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Board = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="h-[510px] flex flex-col">
      <div className="flex-grow">
        <div className="flex justify-center items-center">
          <div className="flex border-y border-black w-[1400px] text-center py-2 gap-5 text-darkGray">
            <div className="w-[10%]">No</div>
            <div className="w-[60%]">제목</div>
            <div className="w-[10%]">작성자</div>
            <div className="w-[20%]">작성일</div>
          </div>
        </div>
        {/* 아래선 추가 */}
        {/* <div className="flex justify-center">
          <div className="border-t border-tableGray w-[1400px]" />
        </div> */}
        {/* 내용 */}
        <div className="flex justify-center">
          <div className="flex border-b border-tableGray w-[1400px] text-center items-center py-2 gap-5">
            <div className="w-[10%] flex justify-center">
              <IoVolumeMediumOutline />
            </div>
            <div
              className={"w-[60%] text-left cursor-pointer"}
              onClick={() => navigate(`/service/notice/detail`)}
            >
              [공지] 공지사항입니다.
            </div>
            <div className="w-[10%]">관리자</div>
            <div className="w-[20%]">2025-02-17</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex border-b border-tableGray w-[1400px] text-center items-center py-2 gap-5">
            <div className="w-[10%] flex justify-center">
              <IoVolumeMediumOutline />
            </div>
            <div className="w-[60%] text-left">
              [공지] 제휴문의 관련 문제입니다.
            </div>
            <div className="w-[10%]">관리자</div>
            <div className="w-[20%]">2025-02-17</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex border-b border-tableGray w-[1400px] text-center items-center py-2 gap-5">
            <div className="w-[10%] flex justify-center">1</div>
            <div className="w-[60%] text-left flex items-center gap-2">
              [문의] 사용자의 문의사항입니다
              <GoLock />
            </div>
            <div className="w-[10%]">사용자</div>
            <div className="w-[20%]">2025-02-16</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex border-b border-tableGray w-[1400px] text-center items-center py-2 gap-5">
            <div className="w-[10%] flex justify-center">2</div>
            <div className="w-[60%] text-left flex items-center gap-2">
              [불편사항] 회사의 불편사항입니다
              <GoLock />
            </div>
            <div className="w-[10%]">회사</div>
            <div className="w-[20%]">2025-02-16</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex border-b border-tableGray w-[1400px] text-center items-center py-2 gap-5">
            <div className="w-[10%] flex justify-center">3</div>
            <div className="w-[60%] text-left flex items-center gap-2">
              [문의] 식당의 문의사항입니다
              <GoLock />
            </div>
            <div className="w-[10%]">식당</div>
            <div className="w-[20%]">2025-02-16</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex border-b border-tableGray w-[1400px] text-center items-center py-2 gap-5">
            <div className="w-[10%] flex justify-center">3</div>
            <div className="w-[60%] text-left flex items-center gap-2">
              [문의] 식당의 문의사항입니다
              <GoLock />
            </div>
            <div className="w-[10%]">식당</div>
            <div className="w-[20%]">2025-02-16</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex border-b border-tableGray w-[1400px] text-center items-center py-2 gap-5">
            <div className="w-[10%] flex justify-center">3</div>
            <div className="w-[60%] text-left flex items-center gap-2">
              [문의] 식당의 문의사항입니다
              <GoLock />
            </div>
            <div className="w-[10%]">식당</div>
            <div className="w-[20%]">2025-02-16</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex border-b border-tableGray w-[1400px] text-center items-center py-2 gap-5">
            <div className="w-[10%] flex justify-center">3</div>
            <div className="w-[60%] text-left flex items-center gap-2">
              [문의] 식당의 문의사항입니다
              <GoLock />
            </div>
            <div className="w-[10%]">식당</div>
            <div className="w-[20%]">2025-02-16</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex border-b border-tableGray w-[1400px] text-center items-center py-2 gap-5">
            <div className="w-[10%] flex justify-center">3</div>
            <div className="w-[60%] text-left flex items-center gap-2">
              [문의] 식당의 문의사항입니다
              <GoLock />
            </div>
            <div className="w-[10%]">식당</div>
            <div className="w-[20%]">2025-02-16</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex border-b border-tableGray w-[1400px] text-center items-center py-2 gap-5">
            <div className="w-[10%] flex justify-center">3</div>
            <div className="w-[60%] text-left flex items-center gap-2">
              [문의] 식당의 문의사항입니다
              <GoLock />
            </div>
            <div className="w-[10%]">식당</div>
            <div className="w-[20%]">2025-02-16</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center bottom-0">
        <div className="relative flex w-[1400px] justify-center text-center items-center py-2 gap-5">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <GoChevronRight />
          <div
            className={
              "flex absolute right-0 items-center gap-[5px] bg-gray px-4 py-2 rounded-[5px] cursor-pointer"
            }
            onClick={() => navigate("/service/notice/writepost")}
          >
            <FiEdit />
            <button>글쓰기</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Board;
