import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ImgPreview from "../../../components/ImgPreview";
import MenuBar from "../../../components/MenuBar";
import { REVIEW_IMAGE_URL, USER_IMAGE_URL } from "../../../constants/url";
import DOMPurify from "dompurify";

const RestaurantReviewPage = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [reviewList, setReviewList] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const reviewCnt = location.state.reviewCnt;
  console.log("orderId 찾기 : ", reviewList);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await axios.get(
          `/api/restaurant/v3/review?restaurantId=${id}`,
        );
        console.log(res.data.resultData);

        setReviewList({ ...res.data.resultData });
      } catch (error) {
        console.log(error);
      }
    };
    getReviews();
  }, []);

  const handleImageClick = src => {
    console.log(src);

    setPreviewImage(src);
  };

  return (
    <div className="flex flex-col w-full h-dvh">
      <div className="flex w-full px-3 py-5 justify-between items-center border-b-2 border-gray border-opacity-70 bg-white">
        <span
          onClick={() => navigate(-1)}
          className="flex w-[10%] justify-center text-2xl cursor-pointer"
        >
          <IoIosArrowBack />
        </span>
        <span className="text-xl font-semibold tracking-wider">
          {reviewList.restaurantName} 리뷰
        </span>
        <span className="flex w-[10%] justify-center text-lg">&nbsp;</span>
      </div>
      <div className="flex w-[90%] bg-gray px-4 py-4 mt-4 justify-betweem mx-auto rounded-sm">
        <div className="flex flex-col w-[30%] justify-center items-center text-nowrap">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow text-xl" />
            <span className="text-2xl font-semibold">
              {reviewList.avgRating?.toFixed(1)}
            </span>
          </div>
          <span className="text-sm">리뷰 {reviewCnt}개</span>
        </div>
        <div className="flex flex-col w-[70%] items-center justify-end px-4">
          {reviewList.ratingCounts?.map((item, index) => {
            const percentage = (
              reviewCnt === 0 ? 0 : (item.count / reviewCnt) * 100
            ).toFixed(0);
            return (
              <div key={index} className="flex w-full items-center gap-2">
                <span className="flex w-[5%]">{item.rating}</span>
                <div className="relative flex w-full h-2.5 rounded-md bg-darkGray">
                  <div
                    className="absolute left-0 top-0 h-full rounded-md bg-yellow"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="flex w-[10%] text-darkGray ">{`${percentage}%`}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col w-full pb-24">
        {reviewList.reviews?.length === 0 ? (
          <div className="flex w-full justify-center pt-20 text-xl">
            아직 작성된 리뷰가 없습니다
          </div>
        ) : (
          reviewList.reviews?.map((item, index) => (
            <div className="flex flex-col px-10 pt-10 pb-5 gap-3" key={index}>
              <div className="flex gap-3 items-center">
                {item.userPic ? (
                  <img
                    src={`${USER_IMAGE_URL}/${item.userId}/${item.userPic}`}
                    alt=""
                    className="flex w-10 h-10 rounded-full"
                  />
                ) : (
                  <img
                    src={"/profile.jpeg"}
                    alt=""
                    className="flex w-10 h-10 rounded-full"
                  />
                )}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-lg ">
                    <span className="font-semibold">{item.nickName}</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="flex items-center text-sm">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={
                            index < item.rating ? "text-yellow" : "text-gray"
                          }
                        />
                      ))}
                    </span>
                    <span className="text-xs ">
                      {dayjs(item.createdAt).format("YYYY-MM-DD")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                {item?.reviewPic?.map((data, index) => (
                  <img
                    key={index}
                    src={`${REVIEW_IMAGE_URL}/${item.orderId}/${data}`}
                    alt=""
                    className="flex w-1/3 h-32 cursor-pointer"
                    onClick={() =>
                      handleImageClick(
                        `${REVIEW_IMAGE_URL}/${item.orderId}/${data}`,
                      )
                    }
                  />
                ))}
              </div>
              <div className="flex w-full">
                <span
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(String(item.reviewText)),
                  }}
                ></span>
              </div>
              <div className="flex w-full gap-4 items-center ">
                {item?.menuName.map((data, index) => (
                  <span
                    className="flex px-2 py-1 border bg-white rounded-xl"
                    key={index}
                  >
                    {data}
                  </span>
                ))}
              </div>
              <div className="flex w-full justify-end items-center ">
                {/* <div className="flex items-center cursor-pointer gap-1">
            <RiDeleteBin6Fill />
            <span>삭제</span>
          </div> */}
                {/* <div className="flex items-center cursor-pointer gap-1">
            <PiSirenFill />
            <span>신고하기</span>
          </div> */}
              </div>
              {/* 식당 리뷰 답글 */}
              {!item.commentCreatedAt ? (
                <></>
              ) : (
                <div className="flex w-full gap-3">
                  <img
                    src="/restaurant_default.png"
                    alt=""
                    className="flex w-10 h-10 object-cover border rounded-full"
                  />
                  <div className="flex flex-col border w-full">
                    <div
                      className="relative bg-white border border-black
                after:content-[''] after:absolute after: after:border-solid after:border-transparent after:h-0 after:w-0 after:right-full after:top-1/2 after:mt-[-10px] after:border-r-[#ffffff]
                before:content-[''] before:absolute before: before:border-solid before:border-transparent before:h-0 before:w-0 before:right-full before:top-5 before:border-[9px] before:mt-[-11px] before:border-r-black"
                    >
                      <div className="flex items-center px-4 pt-4 gap-4">
                        <span>사장님</span>
                        <span className="text-sm">
                          {dayjs(item.commentCreatedAt).format("YYYY-MM-DD")}
                        </span>
                      </div>
                      <div className="flex p-4">
                        <span
                          className="bg-gray p-4 rounded-[5px]"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              String(item.commentText),
                            ),
                          }}
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
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

export default RestaurantReviewPage;
