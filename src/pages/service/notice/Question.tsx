import { AiOutlineQuestionCircle } from "react-icons/ai";

const Question = (): JSX.Element => {
  return (
    <div>
      <div className="flex justify-center text-[30px] font-bold">
        자주 묻는 질문
      </div>
      <div className="flex justify-center text-[18px] my-[20px] gap-[30px]">
        <div>자주 묻는 질문</div>
        <div>공지 및 게시판</div>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex border-t border-black w-[1400px] text-center py-2 gap-5">
          <div className="w-[10%]">No</div>
          <div className="w-[60%]">제목</div>
          <div className="w-[10%]">작성자</div>
          <div className="w-[20%]">작성일</div>
        </div>
      </div>
      {/* 아래선 추가 */}
      <div className="flex justify-center">
        <div className="border-t border-tableGray w-[1400px]" />
      </div>
      {/* 내용 */}
      <div className="flex justify-center">
        <div className="flex border-b border-tableGray w-[1400px] text-center items-center py-2 gap-5">
          <div className="w-[10%] flex justify-center">
            <AiOutlineQuestionCircle />
          </div>
          <div className="w-[60%] text-left">개선 요구사항이 있어요!</div>
          <div className="w-[10%]">관리자</div>
          <div className="w-[20%]">2025-02-17</div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex border-b border-tableGray w-[1400px] text-center items-center py-2 gap-5">
          <div className="w-[10%] flex justify-center">
            <AiOutlineQuestionCircle />
          </div>
          <div className="w-[60%] text-left">제휴 및 입점은 어떻게 하나요?</div>
          <div className="w-[10%]">관리자</div>
          <div className="w-[20%]">2025-02-17</div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex border-b border-tableGray w-[1400px] text-center items-center py-2 gap-5">
          <div className="w-[10%] flex justify-center">
            <AiOutlineQuestionCircle />
          </div>
          <div className="w-[60%] text-left">서비스 이용 방법이 궁금해요.</div>
          <div className="w-[10%]">관리자</div>
          <div className="w-[20%]">2025-02-17</div>
        </div>
      </div>
    </div>
  );
};
export default Question;
