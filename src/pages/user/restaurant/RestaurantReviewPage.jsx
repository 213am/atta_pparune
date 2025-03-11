import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ImgPreview from "../../../components/ImgPreview";
import MenuBar from "../../../components/MenuBar";

const RestaurantReviewPage = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [reviewList, setReviewList] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const reviewCnt = location.state.reviewCnt;

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
      <div className="flex w-full px-4 py-4 justify-between items-center">
        <span
          onClick={() => navigate(`/user/restaurant/detail/${id}`)}
          className="flex w-[10%] justify-center text-2xl cursor-pointer"
        >
          <IoIosArrowBack />
        </span>
        <span className="flex w-[80%] justify-center text-lg pointer-events-none">
          {reviewList.restaurantName} 리뷰
        </span>
        <span className="flex w-[10%] justify-center text-lg pointer-events-none">
          &nbsp;
        </span>
      </div>
      <div className="flex w-[90%] bg-gray px-4 py-4 justify-betweem mx-auto rounded-sm">
        <div className="flex flex-col w-[30%] justify-center items-center text-nowrap">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow text-xl" />
            <span className="text-2xl font-semibold">
              {reviewList.avgRating}
            </span>
          </div>
          <span className="text-sm">리뷰 {reviewCnt}개</span>
        </div>
        <div className="flex flex-col w-[70%] items-center justify-end px-4">
          {reviewList.ratingCounts?.map((item, index) => (
            <div key={index} className="flex w-full items-center gap-2">
              <span className="flex w-[5%]">{item.rating}</span>
              <div
                className={`flex w-[${(reviewCnt / item.count) * 100}%] h-2.5 rounded-md bg-darkGray after:w-[${(reviewCnt / item.count) * 100}%] after:rounded-md after:bg-yellow`}
              />
              <span className="flex w-[10%] text-darkGray">
                {`${(reviewCnt / item.count) * 100}%`}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full pb-24">
        {reviewList.reviews?.map((item, index) => (
          <div className="flex flex-col px-10 pt-10 pb-5 gap-3" key={index}>
            <div className="flex gap-3 items-center">
              <img
                src={item.userPic || "/profile.jpeg"}
                alt=""
                className="flex w-10 h-10 rounded-full"
              />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-lg pointer-events-none">
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
                  <span className="text-xs pointer-events-none">
                    {dayjs(item.createdAt).format("YYYY-MM-DD")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex w-full cursor-pointer">
              {item?.reviewPic.map((data, index) => (
                <img
                  key={index}
                  src="/swiper1.jpg"
                  alt=""
                  className="flex w-1/3"
                  onClick={() => handleImageClick("/swiper1.jpg")}
                />
              ))}
            </div>
            <div className="flex w-full pointer-events-none">
              <span>{item.reviewText}</span>
            </div>
            <div className="flex w-full gap-4 items-center pointer-events-none">
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
            {item.commentCreatedAt === null ? (
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
                after:content-[''] after:absolute after:pointer-events-none after:border-solid after:border-transparent after:h-0 after:w-0 after:right-full after:top-1/2 after:mt-[-10px] after:border-r-[#ffffff]
                before:content-[''] before:absolute before:pointer-events-none before:border-solid before:border-transparent before:h-0 before:w-0 before:right-full before:top-5 before:border-[9px] before:mt-[-11px] before:border-r-black"
                  >
                    <div className="flex items-center p-4 gap-4">
                      <span>사장님</span>
                      <span className="text-sm">
                        {reviewList.reviews.commentCreatedAt}
                      </span>
                    </div>
                    <div className="flex p-4">
                      <span>{reviewList.reviews.commentText}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
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
