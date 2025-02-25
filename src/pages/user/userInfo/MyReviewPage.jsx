import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import MenuBar from "../../../components/MenuBar";
import ImgPreview from "../../../components/ImgPreview";

const MyReviewPage = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const rating = 4;

  const handleImageClick = src => {
    console.log(src);

    setPreviewImage(src);
  };

  return (
    <div className="flex flex-col w-full h-dvh">
      <div className="flex xw-full justify-center pointer-events-none">
        내가 쓴 리뷰
      </div>
      {/* 리뷰 1개 */}
      <div className="flex flex-col p-10 gap-2">
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
            src="/swiper1.jpg"
            alt=""
            className="flex w-1/3"
            onClick={() => handleImageClick("/swiper1.jpg")}
          />
          <img
            src="/swiper2.jpg"
            alt=""
            className="flex w-1/3"
            onClick={() => handleImageClick("/swiper2.jpg")}
          />
          <img
            src="/swiper3.jpg"
            alt=""
            className="flex w-1/3"
            onClick={() => handleImageClick("/swiper3.jpg")}
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
        <div className="flex w-full justify-end items-center gap-1 cursor-pointer">
          <RiDeleteBin6Fill />
          <span>삭제</span>
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
