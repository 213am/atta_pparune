import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaCameraRetro, FaCheckCircle, FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

interface Size {
  width?: number;
  height?: number;
}

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  gap: 30px;
  span {
    font-size: 20px;
    font-weight: 700;
  }
`;

const IconDiv = styled.div<Size>`
  min-width: ${({ width }) => (width ? `${width}px` : "25px")};
  min-height: ${({ height }) => (height ? `${height}px` : "25px")};
  width: ${({ width }) => (width ? `${width}px` : "25px")};
  height: ${({ height }) => (height ? `${height}px` : "25px")};
`;

function WriteReview() {
  const navigate = useNavigate();
  // 리뷰
  const [review, setReview] = useState("");
  // 이미지 미리보기 state
  const [preview, setPreview] = useState<string[]>([]);
  // 이미지 파일 state
  const [imgFile, setImgFile] = useState<File[]>([]);

  const addImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputfile = e.target.files && e.target.files;
    console.log(inputfile);

    if (inputfile) {
      const fileArray = Array.from(inputfile);
      setImgFile(fileArray);
      const imgURL = fileArray.map(data => URL.createObjectURL(data));
      setPreview(imgURL);
    }
  };

  return (
    <div className="h-[100vh] relative">
      <HeaderDiv>
        <IconDiv>
          <IoMdClose
            className="w-full h-full cursor-pointer"
            onClick={() => navigate("/")}
          />
        </IconDiv>
        <span>만족도 평가 및 리뷰</span>
      </HeaderDiv>
      <div className="p-[10px] px-[15px] mt-2">
        <div className="flex gap-4 items-center">
          <IconDiv width={30} height={30}>
            <FaCheckCircle className="w-full h-full text-third" />
          </IconDiv>
          <div className="text-[24px] font-bold">음식 평가</div>
        </div>
        <div className="ml-[46px]">
          <div className="mt-2 text-[18px]">신라짬뽕</div>
          <div className="flex gap-1 mt-2">
            <FaStar className="text-yellow" />
            <FaStar className="text-yellow" />
            <FaStar className="text-yellow" />
            <FaStar className="text-yellow" />
            <FaStar className="text-yellow" />
          </div>
          <ReactQuill
            className="h-[150px] mt-6 mr-5"
            placeholder="다른 고객들이 참고할 수 있도록 음식 맛, 가격, 양 등 음식에 대한 경험을 적어주세요."
            modules={{
              toolbar: false,
            }}
            readOnly={false}
            onChange={e => setReview(e)}
          />
          <div className="flex mt-4 items-center gap-2 mr-5">
            <div className="px-[10px] py-[10px] border border-black rounded-[5px] w-[85px] h-[85px]">
              <label htmlFor="reviewImg" className="cursor-pointer">
                <IconDiv width={30} height={30} className="m-auto mb-2">
                  <FaCameraRetro className="w-full h-full" />
                </IconDiv>
                <div className="w-[65px]">사진 추가</div>
              </label>
            </div>
            <input
              type="file"
              id="reviewImg"
              multiple
              className="opacity-0 w-0 h-0"
              accept="image/png, image/jpeg"
              onChange={e => addImgHandler(e)}
            />
            <div className="flex overflow-x-auto gap-4">
              {preview.map((url, index) => (
                <IconDiv key={index} width={85} height={85}>
                  <img
                    src={url}
                    alt={`preview-${index}`}
                    className="w-full h-full"
                  />
                </IconDiv>
              ))}
            </div>
          </div>
          <div className="mt-5 flex justify-between mr-5 items-center">
            <div>
              <div className="text-[18px]">1인 세트</div>
              <div className="w-[200px]">차돌박이 짬뽕, 스프라이트 245ml</div>
            </div>
            <div className="flex gap-3">
              <div className="px-3 py-2 bg-secondary rounded-[20px] text-white">
                <IconDiv>
                  <AiOutlineLike className="w-full h-full" />
                </IconDiv>
              </div>
              <div className="px-3 py-2  rounded-[20px] border border-gray text-darkGray ">
                <IconDiv>
                  <AiOutlineDislike className="w-full h-full" />
                </IconDiv>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="w-full py-3 bg-primary text-white absolute bottom-0">
        등록하기
      </button>
    </div>
  );
}

export default WriteReview;
