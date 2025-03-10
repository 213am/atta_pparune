import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import MenuBar from "../../../components/MenuBar";
import ImgPreview from "../../../components/ImgPreview";
import axios from "axios";
import { getCookie } from "../../../components/cookie";
import { useNavigate } from "react-router-dom";

const MyReviewPage = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const rating = 4;
  const id = sessionStorage.getItem("userId");
  const accessToken = getCookie();
  const navigate = useNavigate();

  useEffect(() => {
    const params = {
      page: 1,
      size: 15,
      userId: id,
      startDate: "2025-01-01",
      endDate: "2025-03-10",
    };

    try {
      const getMyReviews = async () => {
        const res = await axios.get("/api/user/v3/review", {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(res.data);
      };
      getMyReviews();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleImageClick = src => {
    console.log(src);

    setPreviewImage(src);
  };

  return (
    <div className="flex flex-col w-full h-dvh">
      <div className="flex w-full px-4 py-4 justify-between items-center">
        <span
          onClick={() => navigate("/user/userInfo")}
          className="flex w-[10%] justify-center text-2xl cursor-pointer"
        >
          <IoMdArrowBack />
        </span>
        <span className="flex w-[80%] justify-center text-lg pointer-events-none">
          내가 쓴 리뷰
        </span>
        <span className="flex w-[10%] justify-center text-lg pointer-events-none">
          &nbsp;
        </span>
      </div>
      {/* 리뷰 1개 */}
      <div className="flex flex-col px-10 py-4 gap-2">
        <div className="flex items-center gap-1 text-lg cursor-pointer">
          <span>맥도날드 동성로점</span>
          <IoIosArrowForward className="font-semibold" />
        </div>
        <div className="flex gap-4 items-center">
          <span className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={index < rating ? "text-yellow" : "text-gray"}
              />
            ))}
          </span>
          <span className="text-sm pointer-events-none">지난 달</span>
        </div>
        <div className="flex w-full cursor-pointer">
          <img
            src="/swiper1.webp"
            alt=""
            className="flex w-1/3"
            onClick={() => handleImageClick("/swiper1.webp")}
          />
          <img
            src="/swiper2.webp"
            alt=""
            className="flex w-1/3"
            onClick={() => handleImageClick("/swiper2.webp")}
          />
          <img
            src="/swiper3.webp"
            alt=""
            className="flex w-1/3"
            onClick={() => handleImageClick("/swiper3.webp")}
          />
        </div>
        <div className="flex w-full pointer-events-none">
          <span>너무 맛있게 먹었어요!</span>
        </div>
        <div className="flex w-full gap-4 items-center pointer-events-none">
          <span className="flex px-2 py-1 border bg-white rounded-xl">
            삼겹살
          </span>
          <span className="flex px-2 py-1 border bg-white rounded-xl">
            국밥
          </span>
          <span className="flex px-2 py-1 border bg-white rounded-xl">
            숙성회 모둠
          </span>
        </div>
        <div className="flex w-full justify-end items-center ">
          <div className="flex items-center cursor-pointer gap-1">
            <RiDeleteBin6Fill />
            <span>삭제</span>
          </div>
        </div>
        {/* 식당 리뷰 답글 */}
        <div className="flex w-full gap-3">
          <img
            src="/restaurant_default.png"
            alt=""
            className="flex w-10 h-10 object-cover border rounded-full"
          />
          <div className="flex flex-col border w-full">
            <div
              className="relative bg-white border border-black
                after:content-[''] after:absolute after:pointer-events-none after:border-solid after:border-transparent after:h-0 after:w-0 after:right-full after:top-1/2 after:mt-[-10px] after:border-r-[#ffffff]
                before:content-[''] before:absolute before:pointer-events-none before:border-solid before:border-transparent before:h-0 before:w-0 before:right-full before:top-5 before:border-[9px] before:mt-[-11px] before:border-r-black"
            >
              <div className="flex items-center p-4 gap-4">
                <span>사장님</span>
                <span className="text-sm">1일전</span>
              </div>
              <div className="flex p-4">
                <span>
                  리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰
                  내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용리뷰 내용
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MenuBar />
      {previewImage && (
        <ImgPreview
          image={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </div>
  );
};

export default MyReviewPage;
