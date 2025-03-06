import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { LuCircleUserRound } from "react-icons/lu";
import { MdFileDownload } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ServiceFooter from "../../../components/ServiceFooter";
import ServiceHeader from "../../../components/ServiceHeader";
import "./notice.css";
import { useNavigate } from "react-router-dom";

const WritePostPage = (): JSX.Element => {
  // 구분 (질의응답, 불편사항)
  const [cate, setCate] = useState("구분");
  const [isClick, setIsClick] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-dvh bg-white overflow-y-auto scrollbar-hide z-10 flex flex-col">
      <ServiceHeader />
      <div className="mt-[150px] flex-grow">
        <div className="flex justify-center relative">
          <div className="flex w-[1280px] justify-between z-10">
            <div className="relative border border-black w-[120px] text-[20px] bg-white">
              <div
                className="flex gap-1 justify-between py-1 cursor-pointer px-3 w-[120px] items-center"
                onClick={() => setIsClick(!isClick)}
              >
                <div>{cate}</div>
                {isClick ? <FaCaretUp /> : <FaCaretDown />}
              </div>
              {isClick && (
                <div className="absolute left-[-1px] bg-white w-[120px] px-3 border border-collapse border-black">
                  <div
                    className="py-1 cursor-pointer"
                    onClick={() => {
                      setCate("문의사항");
                      setIsClick(false);
                    }}
                  >
                    문의사항
                  </div>
                  <div
                    className="py-1 cursor-pointer"
                    onClick={() => {
                      setCate("불편사항");
                      setIsClick(false);
                    }}
                  >
                    불편사항
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 h-[34px]">
              <LuCircleUserRound className="text-[30px]" />
              <div className="text-[20px]">김길동</div>
            </div>
          </div>
          <div className="absolute mt-20">
            <div className="flex w-[1280px] text-[24px]">
              <div className="border-b border-darkGray">
                <input type="text" placeholder="제목" className="px-3 py-1" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center relative mt-28">
          <div className="flex w-[1280px] justify-between z-10">
            <ReactQuill
              className="h-[450px] w-full"
              placeholder="문의 및 불편사항을 남겨주세요."
              modules={{
                toolbar: false,
              }}
              readOnly={false}
            />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <div className="flex gap-5 w-[1280px] z-10 items-center">
            <div className="text-[20px] text-darkGray">첨부파일</div>
            <label htmlFor="fileinput" className="flex items-center gap-[2px]">
              <div>파일선택</div>
              <MdFileDownload className="text-[20px]" />
            </label>
            <input
              type="file"
              id="fileinput"
              className="absolute left-[-5000px]"
            />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <div className="flex gap-5 w-[1280px] z-10 justify-center items-center">
            <button className="py-1 px-4 bg-gray border border-black rounded-[5px]">
              작성완료
            </button>
            <button
              onClick={() => navigate(-1)}
              className="py-1 px-4 border border-black rounded-[5px]"
            >
              취소
            </button>
          </div>
        </div>
      </div>

      <ServiceFooter />
    </div>
  );
};
export default WritePostPage;
