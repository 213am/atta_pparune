import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../../components/cookie";
import dayjs from "dayjs";

interface QuestionDataType {
  inquiryId: number;
  postCode: string;
  inquiryTitle: string;
  roleCode: string;
  createdAt: string;
}

const Question = (): JSX.Element => {
  const [questionData, setQuestionData] = useState<QuestionDataType[]>([]);
  const navigate = useNavigate();
  const accessToken = getCookie();

  const getQuestion = async () => {
    const params = {
      page: 1,
      size: 15,
    };
    try {
      const res = await axios.get("/api/system/v3/post-question", { params });
      console.log(res.data.resultData);
      setQuestionData(res.data.resultData.postList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestion();
    console.log("이게 머임????", accessToken);
  }, [accessToken]);

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
        {questionData.map(item => (
          <div className="flex justify-center">
            <div className="flex border-b border-tableGray w-[1400px] text-center items-center py-2 gap-5">
              <div className="w-[10%] flex justify-center">
                <AiOutlineQuestionCircle />
              </div>
              <div
                className={"w-[60%] text-left cursor-pointer"}
                onClick={() =>
                  navigate(`/service/notice/detail?inquiryId=${item.inquiryId}`)
                }
              >
                {item.inquiryTitle}
              </div>
              <div className="w-[10%]">관리자</div>
              <div className="w-[20%]">
                {dayjs(item.createdAt).format("YYYY-MM-DD")}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center bottom-0">
        <div className="relative flex w-[1400px] justify-center text-center gap-5 items-center">
          <div className="flex items-center border border-darkGray rounded-[5px] px-4 py-1 gap-2 h-[40px]">
            <input type="text" placeholder="검색어를 입력해 주세요" />
            <IoIosSearch className="text-darkGray cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Question;
