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
        <form>
          <div className="flex justify-center relative">
            <div className="flex w-[1280px] justify-between z-10">
              <div
                className={`relative border border-slate-300 w-[100px] text-[16px] bg-white ${isClick ? "rounded-t-[5px]" : "rounded-[5px]"}`}
              >
                <div
                  className="flex gap-1 justify-between py-1 cursor-pointer px-3 w-[100px] items-center"
                  onClick={() => setIsClick(!isClick)}
                >
                  <div>{cate}</div>
                  {isClick ? <FaCaretUp /> : <FaCaretDown />}
                </div>
                {isClick && (
                  <div className="absolute left-[-1px] bg-white w-[100px] px-3 border border-collapse border-slate-300 rounded-b-[5px]">
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
              <div className="flex w-[1280px] text-[20px]">
                <div className="border border-darkGray w-full rounded-[5px] overflow-hidden">
                  <input
                    type="text"
                    placeholder="제목을 입력해주세요"
                    className="px-4 py-2 w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center relative mt-32">
            <div className="flex w-[1280px] h-[450px] border-collapse border border-black justify-between z-10 rounded-[5px] overflow-hidden">
              <ReactQuill
                className="h-[450px] w-full rounded-[5px]"
                placeholder="문의 및 불편사항을 남겨주세요."
                readOnly={false}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike"],
                  ],
                }}
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "bullet",
                ]}
              />
            </div>
          </div>
          <div className="flex justify-center mt-16">
            <div className="flex gap-5 w-[1280px] z-10 items-center">
              <div className="text-[20px] text-black">첨부파일</div>
              <label
                htmlFor="fileinput"
                className="flex items-center gap-[2px] cursor-pointer border-2 border-dashed px-4 py-2 border-slate-300 rounded-lg"
              >
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
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2.5 border border-gray rounded-lg"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary text-white rounded-lg"
              >
                작성완료
              </button>
            </div>
          </div>
        </form>
      </div>

      <ServiceFooter />
    </div>
  );
};
export default WritePostPage;
