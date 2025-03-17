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
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import { REVIEW_IMAGE_URL } from "../../../constants/url";

const MyReviewPage = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [myReviewList, setMyReviewList] = useState([]);
  const accessToken = getCookie();
  const navigate = useNavigate();

  useEffect(() => {
    const params = {
      page: 1,
      size: 15,
    };

    try {
      const getMyReviews = async () => {
        const res = await axios.get("/api/user/v3/review", {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("서버에서 받아온 데이터 : ", res.data.resultData);

        const updatedResult = res.data.resultData.map(item => ({
          ...item,
          createdAt: dayjs(item.createdAt).format("YYYY-MM-DD"),
        }));

        setMyReviewList([...updatedResult]);
      };
      getMyReviews();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteReview = async id => {
    const params = {
      orderId: id,
    };
    try {
      const res = await axios.delete(`/api/user/v3/review`, {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageClick = src => {
    console.log("미리보기 : ", src);

    setPreviewImage(src);
  };

  const linkToDetailPage = id => {
    navigate(`/user/restaurant/detail/${id}`);
  };

  return (
    <div className="flex flex-col w-full h-dvh">
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
      {/* 리뷰 1개 */}
      {myReviewList.length === 0 ? (
        <div className="flex w-full h-full justify-center text-xl pt-40">
          아직 작성한 리뷰가 없습니다
        </div>
      ) : (
        myReviewList?.map((data, index) => (
          <div className="flex flex-col px-10 py-4 gap-2" key={index}>
            <div
              onClick={() => linkToDetailPage(data.restaurantId)}
              className="flex items-center gap-1 text-lg cursor-pointer"
            >
              <span>{data.restaurantName}</span>
              <IoIosArrowForward className="font-semibold" />
            </div>
            <div className="flex gap-4 items-center">
              <span className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < data.rating ? "text-yellow" : "text-gray"
                    }
                  />
                ))}
              </span>
              <span className="text-sm">{data.createdAt}</span>
            </div>
            {data?.reviewPic?.map((pic, index) => (
              <div className="flex w-full" key={index}>
                <img
                  src={`${REVIEW_IMAGE_URL}/${data.orderId}/${pic}`}
                  alt=""
                  className="flex w-1/3 h-28 cursor-pointer"
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
            <div className="flex w-full gap-4 items-center">
              {data.menuName?.map((name, index) => (
                <span
                  className="flex px-2 py-1 border bg-white rounded-xl"
                  key={index}
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
            {/* 식당 관리자의 댓글 */}
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
                after:content-[''] after:absolute after: after:border-solid after:border-transparent after:h-0 after:w-0 after:right-full after:top-1/2 after:mt-[-10px] after:border-r-[#ffffff]
                before:content-[''] before:absolute before: before:border-solid before:border-transparent before:h-0 before:w-0 before:right-full before:top-5 before:border-[9px] before:mt-[-11px] before:border-r-black"
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
