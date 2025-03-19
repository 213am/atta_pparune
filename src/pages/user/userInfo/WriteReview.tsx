/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "@emotion/styled";
import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaCameraRetro, FaCheckCircle, FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../../../components/cookie";
// 스와이퍼
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Swal from "sweetalert2";

interface Size {
  width?: number;
  height?: number;
}

interface menuList {
  menuCount: number;
  menuId: number;
  menuName: string;
  price: number;
}

// interface OrderData {
//   createdAt: string;
//   menuTotalPrice: number;
//   orderId: number;
//   pastDtoList: menuList[];
//   pic: null;
//   reservationYn: number;
//   restaurantId: number;
//   restaurantName: string;
//   reviewStatus: number;
// }

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
  // 파일 input value 값 추적
  const fileInputRef = useRef<HTMLInputElement>(null);
  // 별점 상태
  const [rating, setRating] = useState(0);
  const accessToken = getCookie();
  const locate = useLocation();
  console.log(locate.state);

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

  const postReviewHandler = async () => {
    const postData = {
      orderId: locate.state.orderId,
      rating: rating,
      reviewText: review,
    };

    console.log(postData);

    const formData = new FormData();
    formData.append(
      "reviewRequestDto",
      new Blob([JSON.stringify(postData)], { type: "application/json" }),
    );
    imgFile.forEach(file => {
      formData.append("reviewPics", file);
    });

    try {
      const res = await axios.post("/api/user/v3/review", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("res : ", res.data);
      if (res.data.statusCode === "200") {
        Swal.fire({
          title: "리뷰가 등록되었어요",
          icon: "success",
          confirmButtonText: "확인",
          allowOutsideClick: false,
        }).then(result => {
          if (result.isConfirmed) {
            navigate("/user/order");
          }
        });
      }
    } catch (error: any) {
      console.log("리뷰 작성 중 오류 발생 : ", error);
      Swal.fire({
        title: "리뷰 작성 중 오류발생",
        text: error?.response.data.resultMsg,
        icon: "error",
        confirmButtonText: "확인",
        allowOutsideClick: false,
      }).then(result => {
        if (result.isConfirmed) {
          navigate("/user/order");
        }
      });
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

  useEffect(() => {
    console.log("프리뷰", preview);
    console.log("이미지 파일", imgFile);
  }, [imgFile, preview]);

  return (
    <div className="h-[100vh] relative">
      <HeaderDiv>
        <IconDiv>
          <IoMdClose
            className="w-full h-full cursor-pointer"
            onClick={() => navigate(-1)}
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
          <div className="mt-2 text-[18px]">{locate.state.restaurantName}</div>
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, index) => {
              const starIndex = index + 1;
              return (
                <FaStar
                  key={starIndex}
                  className={starIndex <= rating ? "text-yellow" : "text-gray"}
                  onClick={() => setRating(starIndex)} // 클릭 시 별점 변경
                  style={{ cursor: "pointer" }}
                />
              );
            })}
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
          <div className="flex mt-4 items-center gap-5 mr-5">
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
              ref={fileInputRef}
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
                      className="w-full h-full"
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
          <div className="mt-5 flex justify-between mr-5 items-center">
            <div>
              {locate.state.pastDtoList.map((item: menuList, index: number) => (
                <div key={index}>
                  <div className="text-[18px]">{item.menuName}</div>
                </div>
              ))}
            </div>
            {/* <div className="flex gap-3">
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
            </div> */}
          </div>
        </div>
      </div>
      <button
        onClick={postReviewHandler}
        className="w-full py-3 bg-primary text-white absolute bottom-0"
      >
        등록하기
      </button>
    </div>
  );
}

export default WriteReview;
