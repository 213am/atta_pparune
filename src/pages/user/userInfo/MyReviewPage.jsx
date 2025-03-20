import { useEffect, useState } from "react";
import { IoIosArrowForward, IoMdArrowBack } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import MenuBar from "../../../components/MenuBar";
import ImgPreview from "../../../components/ImgPreview";
import axios from "axios";
import { getCookie } from "../../../components/cookie";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import { REVIEW_IMAGE_URL } from "../../../constants/url";
import Swal from "sweetalert2";
import LoadingScreen from "../../../components/LoadingScreen";

const MyReviewPage = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [myReviewList, setMyReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = getCookie();
  const navigate = useNavigate();

  const getMyReviews = async () => {
    setIsLoading(true);
    const params = { page: 1, size: 15 };
    try {
      const res = await axios.get("/api/user/v3/review", {
        params,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const updatedResult = res.data.resultData.map(item => ({
        ...item,
        createdAt: dayjs(item.createdAt).format("YYYY-MM-DD"),
      }));

      setMyReviewList([...updatedResult]);

      // 수정된 부분: 데이터 길이에 따라 즉시 로딩 종료
      if (updatedResult.length === 0) {
        setIsLoading(false); // 즉시 종료
      } else {
        setTimeout(() => setIsLoading(false), 1000); // UX 고려해 지연 종료
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyReviews();
  }, []);

  const deleteReview = async id => {
    const params = { orderId: id };
    try {
      await axios.delete(`/api/user/v3/review`, {
        params,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      Swal.fire({
        title: "삭제 성공",
        text: "리뷰가 삭제되었습니다",
        icon: "success",
        confirmButtonText: "확인",
        allowOutsideClick: false,
      }).then(() => getMyReviews());
    } catch (error) {
      Swal.fire({
        title: "삭제 실패",
        text: error.response.data.resultMsg,
        icon: "error",
        confirmButtonText: "확인",
        allowOutsideClick: false,
      });
    }
  };

  const handleImageClick = src => {
    setPreviewImage(src);
  };

  const linkToDetailPage = id => {
    navigate(`/user/restaurant/detail/${id}`);
  };

  return (
    <div className="flex flex-col w-full h-dvh">
      {/* 상단바 */}
      <div className="flex w-full px-3 py-5 justify-between items-center border-b-2 border-gray border-opacity-70 bg-white">
        <span
          onClick={() => navigate("/user/userInfo")}
          className="flex w-[10%] justify-center text-2xl cursor-pointer"
        >
          <IoMdArrowBack />
        </span>
        <span className="text-xl font-semibold tracking-wider">
          내가 쓴 리뷰
        </span>
        <span className="flex w-[10%] justify-center text-lg">&nbsp;</span>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <LoadingScreen message="리뷰 불러오는 중..." />
          </div>
        ) : myReviewList.length === 0 ? (
          <div className="flex w-full h-full justify-center text-xl pt-40">
            아직 작성한 리뷰가 없습니다
          </div>
        ) : (
          myReviewList.map((data, index) => (
            <div className="flex flex-col px-10 py-4 gap-2" key={index}>
              <div className="flex items-center text-lg">
                <div
                  onClick={() => linkToDetailPage(data.restaurantId)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <span>{data.restaurantName}</span>
                  <IoIosArrowForward className="font-semibold" />
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <span className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < data.rating ? "text-yellow" : "text-gray"}
                    />
                  ))}
                </span>
                <span className="text-sm">{data.createdAt}</span>
              </div>

              {data?.reviewPic?.map((pic, i) => (
                <div className="flex w-full" key={i}>
                  <img
                    src={`${REVIEW_IMAGE_URL}/${data.orderId}/${pic}`}
                    alt=""
                    className="flex w-1/3 h-32 object-cover cursor-pointer"
                    onClick={() =>
                      handleImageClick(
                        `${REVIEW_IMAGE_URL}/${data.orderId}/${pic}`,
                      )
                    }
                  />
                </div>
              ))}

              <div className="flex w-full">
                <span
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(String(data.reviewText)),
                  }}
                ></span>
              </div>

              <div className="flex w-full gap-4 flex-wrap items-center">
                {data.menuName?.map((name, i) => (
                  <span
                    className="flex px-2 py-1 border bg-white rounded-xl"
                    key={i}
                  >
                    {name}
                  </span>
                ))}
              </div>

              <div className="flex w-full justify-end items-center">
                <div
                  onClick={() => deleteReview(data.orderId)}
                  className="flex items-center cursor-pointer gap-1"
                >
                  <RiDeleteBin6Fill />
                  <span>삭제</span>
                </div>
              </div>

              {data.commentCreatedAt && (
                <div className="flex w-full gap-3">
                  <img
                    src="/restaurant_default.png"
                    alt=""
                    className="flex w-10 h-10 object-cover border rounded-full"
                  />
                  <div className="flex flex-col border w-full">
                    <div
                      className="relative bg-white border border-black
                  after:content-[''] after:absolute after:border-solid after:border-transparent after:h-0 after:w-0 after:right-full after:top-1/2 after:mt-[-10px] after:border-r-[#ffffff]
                  before:content-[''] before:absolute before:border-solid before:border-transparent before:h-0 before:w-0 before:right-full before:top-5 before:border-[9px] before:mt-[-11px] before:border-r-black"
                    >
                      <div className="flex items-center p-4 gap-4">
                        <span>사장님</span>
                        <span className="text-sm">{data.createdAt}</span>
                      </div>
                      <div className="flex p-4">
                        <span>{data.commentText}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* 하단 메뉴바 고정 */}
      <MenuBar />

      {/* 이미지 미리보기 */}
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
