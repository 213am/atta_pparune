import { useRecoilValue } from "recoil";
import { boardState } from "../../../atoms/serviceAtom";
import ServiceFooter from "../../../components/ServiceFooter";
import ServiceHeader from "../../../components/ServiceHeader";
import { useNavigate } from "react-router-dom";

const DetailPage = (): JSX.Element => {
  const board = useRecoilValue(boardState);
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-dvh bg-white overflow-y-auto scrollbar-hide z-10 flex flex-col">
      <ServiceHeader />
      <div className="mt-[100px] relative flex-grow">
        <div className="flex justify-center text-[30px] font-bold mb-10">
          {board}
        </div>
        <div className="flex justify-center">
          <div className="flex w-[1000px] border border-black">
            <div className="w-[15%] border-r border-black px-5 py-2">
              글 유형
            </div>
            <div className="w-[35%] border-r border-black px-5 py-2">
              문의사항
            </div>
            <div className="w-[15%] border-r border-black px-5 py-2">
              등록일
            </div>
            <div className="w-[35%] px-5 py-2">2025-03-06</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex w-[1000px] border-b border-x border-black">
            <div className="w-[15%] px-5 py-2 border-r border-black">제목</div>
            <div className="w-[85%] px-5 py-2">문의사항입니다.</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex w-[1000px] border-b border-x border-black">
            <div className="w-[15%] px-5 py-2 border-r border-black">
              작성자
            </div>
            <div className="w-[85%] px-5 py-2">김길동</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex w-[1000px] border-b border-x border-black">
            <div className="px-5 py-3 h-[350px]">내용입니다.</div>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <div className="flex w-[1000px] justify-end gap-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray text-black px-4 py-1 rounded-[5px]"
            >
              목록으로
            </button>
            <button className="bg-black text-white px-4 py-1 rounded-[5px]">
              수정
            </button>
            <button className="bg-black text-white px-4 py-1 rounded-[5px]">
              삭제
            </button>
          </div>
        </div>
      </div>

      <ServiceFooter />
    </div>
  );
};
export default DetailPage;
