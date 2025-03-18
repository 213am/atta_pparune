import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { LuCircleUserRound } from "react-icons/lu";
import { MdFileDownload } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import * as yup from "yup";
import { getCookie } from "../../../components/cookie";
import ServiceFooter from "../../../components/ServiceFooter";
import ServiceHeader from "../../../components/ServiceHeader";
import "./notice.css";
import Swal from "sweetalert2";

interface Size {
  width?: number;
  height?: number;
}

interface PostType {
  postCode?: string;
  inquiryTitle?: string;
  inquiryDetail?: string;
}

const IconDiv = styled.div<Size>`
  min-width: ${({ width }) => (width ? `${width}px` : "25px")};
  min-height: ${({ height }) => (height ? `${height}px` : "25px")};
  width: ${({ width }) => (width ? `${width}px` : "25px")};
  height: ${({ height }) => (height ? `${height}px` : "25px")};
`;

const boardSchema = yup.object({
  postCode: yup.string(),
  inquiryTitle: yup.string(),
  inquiryDetail: yup.string(),
});

const WritePostPage = (): JSX.Element => {
  // 구분 (질의응답, 불편사항)
  const [cate, setCate] = useState("구분");
  const [isClick, setIsClick] = useState(false);
  const navigate = useNavigate();
  const name = sessionStorage.getItem("name");
  const id = parseInt(sessionStorage.getItem("id") as string);
  const roleCode = sessionStorage.getItem("roleCode");
  const accessToken = getCookie();

  // 이미지 미리보기 state
  const [preview, setPreview] = useState<string[]>([]);
  // 이미지 파일 state
  const [imgFile, setImgFile] = useState<File[]>([]);
  // 파일 input value 값 추적
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleSubmit, setValue, register } = useForm({
    resolver: yupResolver(boardSchema),
  });

  const addImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputfile = e.target.files && e.target.files;
    console.log(inputfile);

    if (inputfile) {
      const fileArray = Array.from(inputfile);
      setImgFile(fileArray);
      const imgURL = fileArray.map(data => URL.createObjectURL(data));
      setPreview(imgURL);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const deleteImg = (url: string) => {
    // 클릭한 이미지의 인덱스를 찾음
    const indexToDelete = preview.indexOf(url);

    if (indexToDelete !== -1) {
      // preview 배열에서 해당 URL 삭제
      setPreview(prev => prev.filter((_, idx) => idx !== indexToDelete));
      // imgFile 배열에서도 같은 인덱스의 파일 삭제
      setImgFile(prev => prev.filter((_, idx) => idx !== indexToDelete));
    }
  };

  // 게시글 등록
  const postBoard = async (data: PostType) => {
    const { inquiryDetail, inquiryTitle, postCode } = data;

    const postData = {
      postCode,
      inquiryTitle,
      inquiryDetail,
      roleCode,
      id,
    };

    console.log(postData);

    const formData = new FormData();
    formData.append(
      "req",
      new Blob([JSON.stringify(postData)], { type: "application/json" }),
    );
    imgFile.forEach(file => {
      formData.append("reviewPics", file);
    });

    try {
      await axios.post("/api/system/v3/post", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      Swal.fire({
        title: "게시글 등록에 성공하였습니다.",
        icon: "success",
        confirmButtonText: "확인",
        showConfirmButton: true, // ok 버튼 노출 여부
        allowOutsideClick: false, // 외부 영역 클릭 방지
      }).then(result => {
        if (result.isConfirmed) {
          navigate("/service/notice");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitForm = (data: PostType) => {
    // console.log(data);
    postBoard(data);
  };

  useEffect(() => {
    console.log("프리뷰", preview);
    console.log("이미지 파일", imgFile);
  }, [imgFile, preview]);

  useEffect(() => {
    setValue("inquiryDetail", "");
    setValue("inquiryTitle", "");
    setValue("postCode", "");
  }, []);

  return (
    <div className="relative w-full h-dvh bg-white overflow-y-auto scrollbar-hide z-10 flex flex-col">
      <ServiceHeader />
      <div className="mt-[150px] flex-grow">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
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
                        setValue("postCode", "00202");
                        setIsClick(false);
                      }}
                    >
                      문의사항
                    </div>
                    <div
                      className="py-1 cursor-pointer"
                      onClick={() => {
                        setCate("불편사항");
                        setValue("postCode", "00203");
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
                <div className="text-[20px]">{name}</div>
              </div>
            </div>
            <div className="absolute mt-20">
              <div className="flex w-[1280px] text-[20px]">
                <div className="border border-darkGray w-full rounded-[5px] overflow-hidden">
                  <input
                    type="text"
                    placeholder="제목을 입력해주세요"
                    className="px-4 py-2 w-full"
                    {...register("inquiryTitle")}
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
                onChange={e => setValue("inquiryDetail", e)}
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
          <div className="flex justify-center mt-5">
            <div className="flex gap-5 w-[1280px] h-[85px] z-10 items-center">
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
                ref={fileInputRef}
                accept="image/png, image/jpeg"
                onChange={e => addImgHandler(e)}
                className="absolute left-[-5000px]"
              />
              <Swiper
                slidesPerView={2}
                spaceBetween={"5px"}
                className="w-[200px]"
              >
                {preview.map((url, index) => (
                  <SwiperSlide className="min-w-[85px]">
                    <IconDiv
                      key={index}
                      width={85}
                      height={85}
                      className="relative"
                    >
                      <img
                        src={url}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="w-[24px] h-[24px] cursor-pointer absolute top-0 right-0 rounded-full bg-black text-white p-[2px]">
                        <IoMdClose
                          onClick={() => deleteImg(url)}
                          className="w-full h-full"
                        />
                      </div>
                    </IconDiv>
                  </SwiperSlide>
                ))}
              </Swiper>
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
