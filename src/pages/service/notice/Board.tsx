import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GoChevronRight, GoLock } from "react-icons/go";
import { IoVolumeMediumOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface BoardType {
  createdAt: string;
  inquiryTitle: string;
  postCode: string;
  roleCode: string;
}

const Board = (): JSX.Element => {
  // 게시글 목록
  const [boardList, setBoardList] = useState<BoardType[]>([]);
  // 총 페이지 수
  const [totalPage, setTotalPage] = useState(0);

  // 현재 페이지
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const getBoard = async () => {
    const params = {
      page,
      size: 10,
    };
    try {
      const res = await axios.get("/api/system/v3/post", { params });
      console.log("이거???", res.data.resultData);
      setTotalPage(res.data.resultData.totalPageCount);
      setBoardList(res.data.resultData.postList);
    } catch (error) {
      console.log(error);
    }
  };

  // 작성자
  const writePerson = (item: BoardType) => {
    switch (item.roleCode) {
      case "00101":
        return "식당";
      case "00102":
        return "회사";
      case "00103":
        return "관리자";
      case "00104":
        return "사용자";
    }
  };

  // 공지, 문의 불편사항 폼
  const boardCate = (item: BoardType) => {
    switch (item.postCode) {
      case "00201":
        return <>[공지] {item.inquiryTitle}</>;
      case "00202":
        return (
          <div className="flex items-center gap-2">
            [문의] {item.inquiryTitle}
            <GoLock />
          </div>
        );
      case "00203":
        return (
          <div className="flex items-center gap-2">
            [불편사항] {item.inquiryTitle}
            <GoLock />
          </div>
        );
    }
  };

  // 게시판 No에 나올 내용
  const boardCount = (item: BoardType, index: number) => {
    switch (item.postCode) {
      case "00201":
        return <IoVolumeMediumOutline />;
      case "00202":
        return <div>{index}</div>;
      case "00203":
        return "[불편사항]";
    }
  };
  useEffect(() => {
    getBoard();
  }, [page]);

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
        {/* 내용 */}
        {boardList.map((item, index) => (
          <div className="flex justify-center">
            <div className="flex border-b border-tableGray w-[1400px] text-center items-center py-2 gap-5">
              <div className="w-[10%] flex justify-center">
                {boardCount(item, index + 1)}
              </div>
              <div
                className={"w-[60%] text-left cursor-pointer"}
                onClick={() => navigate(`/service/notice/detail`)}
              >
                {boardCate(item)}
              </div>
              <div className="w-[10%]">{writePerson(item)}</div>
              <div className="w-[20%]">
                {dayjs(item.createdAt).format("YYYY-MM-DD")}
              </div>
            </div>
          </div>
        ))}
        {/* <div className="flex justify-center">
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
        </div> */}
      </div>

      <div className="flex justify-center bottom-0">
        <div className="relative flex w-[1400px] justify-center text-center items-center py-2 gap-5">
          {[...Array(totalPage)].map((_, index) => {
            const startIndex = index + 1;
            return (
              <div
                style={{
                  color: page === startIndex ? "#333" : "#929292",
                  cursor: "pointer",
                }}
                onClick={() => setPage(startIndex)}
              >
                {startIndex}
              </div>
            );
          })}
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
