import { useRecoilState } from "recoil";
import ServiceFooter from "../../../components/ServiceFooter";
import ServiceHeader from "../../../components/ServiceHeader";
import Board from "./Board";
import Question from "./Question";
import { boardState } from "../../../atoms/serviceAtom";

const NoticePage = (): JSX.Element => {
  const [board, setBoard] = useRecoilState(boardState);
  return (
    <div className="relative w-full h-dvh bg-white overflow-y-auto overflow-x-hidden z-10 flex flex-col">
      <ServiceHeader />
      <div className="mt-[100px] relative flex-grow">
        <div className="flex justify-center text-[30px] font-bold">{board}</div>
        <div className="flex justify-center text-[18px] my-[20px] gap-[30px]">
          <div
            className={`cursor-pointer ${board === "자주 묻는 질문" ? "text-black" : "text-darkGray"}`}
            onClick={() => setBoard("자주 묻는 질문")}
          >
            자주 묻는 질문
          </div>
          <div
            className={`cursor-pointer ${board === "공지 및 게시판" ? "text-black" : "text-darkGray"}`}
            onClick={() => setBoard("공지 및 게시판")}
          >
            공지 및 게시판
          </div>
        </div>
        {board === "공지 및 게시판" ? <Board /> : <Question />}
      </div>

      <ServiceFooter />
    </div>
  );
};
export default NoticePage;
