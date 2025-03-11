import styled from "@emotion/styled";
import axios from "axios";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { PiSirenFill } from "react-icons/pi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import { getCookie } from "../../../components/cookie";
import SideBar from "../SideBar";

const LayoutDiv = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #eee;
  max-height: 100vh;
  height: auto;
  overflow: hidden;
`;

const ContentDiv = styled.div`
  margin-top: 32px;
  flex-wrap: wrap;
  padding: 20px 30px;
  padding-bottom: 30px;
  border-radius: 10px;
  width: 830px;
  max-height: calc(100vh - 60px);
  overflow-y: auto;
  background-color: #fff;
`;

const TitleDiv = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const SideBarRightDiv = styled.div`
  box-shadow:
    0px 20px 25px -5px rgba(0, 0, 0, 0.1),
    0px 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 350px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

interface ReviewData {
  userId: number;
  orderId: number;
  nickName: string;
  userPic: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  reviewPic: string[];
  menuName: string[];
  commentText: string;
  commentCreatedAt: string;
}

interface BlackListData {
  userId: number;
  nickName: string;
  uid: string;
}

function StoreReviewPage(): JSX.Element {
  // 별점 상태
  const rating = 5;
  // 댓글쓰기 버튼
  const [isClick, setIsClick] = useState(0);
  // 댓글 정보
  const [comment, setComment] = useState("");
  // 수정하기 버튼
  const [edit, setEdit] = useState(false);
  // 리뷰내용 State
  const [review, setReview] = useState<ReviewData[]>([]);
  // 블랙리스트 State
  const [blackList, setBlackList] = useState<BlackListData[]>([]);
  // 평균 별점
  const [avgRating, setAvgRating] = useState(0);

  const today = dayjs().format("YYYY-MM-DD");
  const yesterday = dayjs(today).add(-1, "day").format("YYYY-MM-DD");

  const accessToken = getCookie();
  const adminId = parseInt(sessionStorage.getItem("adminId") as string);

  const restaurantId = parseInt(
    sessionStorage.getItem("restaurantId") as string,
  );

  // 블랙리스트 조회
  const getBlackList = async () => {
    const params = {
      adminId,
      restaurantId,
    };

    try {
      const res = await axios.get("/api/admin/restaurant/v3/black-list", {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setBlackList(res.data.resultData);
      console.log("블랙리스트 조회 완료", res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  // 리뷰 조회
  const getReview = async () => {
    const params = {
      restaurantId,
    };
    try {
      const res = await axios.get("/api/restaurant/v3/review", { params });
      console.log("리뷰", res.data.resultData);
      setAvgRating(res.data.resultData.avgRating);
      setReview(res.data.resultData.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  // 리뷰 삭제 요청
  const patchReviewReq = async (orderId: number) => {
    const data = {
      adminId,
      orderId,
    };
    try {
      const res = await axios.patch(
        "/api/admin/restaurant/v3/review/del-request",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      Swal.fire({
        title: "신고가 성공적으로 접수되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
        showConfirmButton: true,
        allowOutsideClick: false,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // 리뷰 댓글 등록
  const postComment = async (orderId: number) => {
    const data = {
      adminId,
      orderId,
      commentText: comment,
    };
    console.log(data);
    if (comment === "<p><br></p>") {
      Swal.fire({
        title: "댓글 내용을 입력해주세요.",
        icon: "error",
        allowOutsideClick: false,
      });
    } else if (!comment) {
      Swal.fire({
        title: "댓글 내용을 입력해주세요.",
        icon: "error",
        allowOutsideClick: false,
      });
    } else {
      try {
        await axios.post("/api/admin/restaurant/v3/review", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        Swal.fire({
          title: "댓글이 등록되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
          showConfirmButton: true,
          allowOutsideClick: false,
        });
        getReview();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 블랙리스트 추가
  const postBlackList = async (userId: number) => {
    const data = {
      adminId,
      restaurantId,
      userId,
      reason: "폭언 및 기물파손",
    };
    try {
      await axios.post("/api/admin/restaurant/v3/black-list", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      getBlackList();
    } catch (error) {
      console.log(error);
    }
  };

  // 리뷰 댓글 삭제
  const deleteComment = async (orderId: number) => {
    try {
      await axios.delete(
        `/api/admin/restaurant/reviewComment?restaurantId=${restaurantId}&orderId=${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      Swal.fire("댓글이 삭제 되었습니다.", "", "success");
      getReview();
      setIsClick(0);
    } catch (error) {
      console.log(error);
    }
  };

  // 댓글 삭제 버튼
  const handleCommentDelete = (id: number) => {
    Swal.fire({
      title: "댓글을 삭제하시겠습니까?",
      text: "삭제한 댓글은 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#79BAF2",
      cancelButtonColor: "#E44B58",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      reverseButtons: false,
    }).then(result => {
      if (result.isConfirmed) {
        deleteComment(id);
      }
    });
  };

  // 블랙리스트 삭제
  const deleteBlackList = async (userId: number, nickName: string) => {
    try {
      await axios.delete(
        `/api/admin/restaurant/v3/black-list?adminId=${adminId}&restaurantId=${restaurantId}&userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      Swal.fire(
        `${nickName}님이 \n 블랙리스트에서 삭제 되었습니다.`,
        "",
        "success",
      );
      getBlackList();
    } catch (error) {
      console.log(error);
    }
  };

  // 블랙리스트 삭제 버튼
  const handleBlackDelete = (id: number, nickName: string) => {
    Swal.fire({
      title: `${nickName}님을 \n 블랙리스트에서 삭제하시겠습니까?`,
      text: "삭제한 내용은 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#79BAF2",
      cancelButtonColor: "#E44B58",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      reverseButtons: false,
    }).then(result => {
      if (result.isConfirmed) {
        deleteBlackList(id, nickName);
      }
    });
  };

  useEffect(() => {
    getBlackList();
    getReview();
    // console.log(accessToken);
    // console.log("admin", adminId);
    // console.log("rest", restaurantId);
  }, []);

  useEffect(() => {
    console.log("가져온 데이터??", review);
  }, [review]);

  useEffect(() => {
    console.log("댓글", comment);
  }, [comment]);

  return (
    <div>
      <LayoutDiv>
        <SideBar />
        <ContentDiv className="scrollbar-hide">
          <TitleDiv>리뷰관리</TitleDiv>
          <div className="border-gray border mb-5"></div>
          <div className="mb-2 text-[18px]">전체 별점</div>
          <div className="flex gap-3 items-center mb-3">
            <FaStar className="text-yellow" />
            <div className="font-bold">{avgRating.toFixed(1)}</div>
            <div className="text-darkGray">(총 리뷰 {review.length}개)</div>
          </div>
          <div className="inline-flex gap-3 items-center border border-gray px-4 py-2 rounded-[5px] mb-10">
            <div className="text-darkGray">조회기간</div>
            <input type="date" defaultValue={yesterday} />
            <div>~</div>
            <input type="date" defaultValue={today} />
          </div>

          {/* map 사용하기 */}
          {review.map((item, index) => (
            <div key={index}>
              <div className="flex gap-5">
                <div>
                  <div className="font-bold mb-2">{item.nickName}</div>
                  <div className="flex gap-3 items-center">
                    <div className="font-bold text-[20px]">
                      {item.rating.toFixed(1)}
                    </div>
                    <div className="flex gap-2">
                      {[...Array(5)].map((_, index) => {
                        const starIndex = index + 1;
                        return (
                          <FaStar
                            key={starIndex}
                            className={`w-[20px] h-[20px] ${starIndex <= item.rating ? "text-yellow" : "text-gray"}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-2 text-darkGray">
                    {dayjs(item.createdAt).format("YYYY-MM-DD")}
                  </div>
                </div>
                <div>
                  <div>{item.reviewText}</div>
                  <div className="flex w-[300px] my-3 gap-1">
                    {item.reviewPic.map(item => (
                      <img
                        src={item}
                        className="flex w-1/3 rounded-[5px]"
                        alt=""
                      />
                    ))}
                    {/* <img
                      src="/swiper1.webp"
                      className="flex w-1/3 rounded-[5px]"
                      alt=""
                    />
                    <img
                      src="/swiper2.webp"
                      className="flex w-1/3 rounded-[5px]"
                      alt=""
                    />
                    <img
                      src="/swiper3.webp"
                      className="flex w-1/3 rounded-[5px]"
                      alt=""
                    /> */}
                  </div>
                  <div className="mb-2 w-[435px] flex flex-wrap gap-2">
                    {item.menuName.map(item => (
                      <div className="border border-slate-300 px-3 py-1 rounded-full inline">
                        {item}
                      </div>
                    ))}
                  </div>
                  {item.commentText ? (
                    <div className="mt-5 w-[435px]">
                      <div className="flex gap-3 items-center mb-3">
                        <div className="font-bold text-[20px]">
                          내가 남긴 댓글
                        </div>
                        <RiDeleteBin6Fill
                          onClick={() => handleCommentDelete(item.orderId)}
                          className="cursor-pointer text-[20px]"
                        />
                      </div>
                      <p
                        className="bg-gray p-4 rounded-[5px] w-"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(String(item.commentText)),
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      {isClick !== item.orderId ? (
                        <button
                          className="px-4 py-2 bg-primary text-white rounded-sm"
                          onClick={() => setIsClick(item.orderId)}
                        >
                          댓글쓰기
                        </button>
                      ) : (
                        <div>
                          <ReactQuill
                            className="h-[150px] w-[435px]"
                            placeholder="소중한 리뷰에 답글을 남겨보세요!"
                            modules={{
                              toolbar: false,
                            }}
                            readOnly={false}
                            onChange={e => setComment(e)}
                          />
                          <div className="flex justify-end gap-3 mt-2">
                            <button
                              className="bg-gray py-1 px-3 rounded-[5px]"
                              onClick={() => setIsClick(0)}
                            >
                              취소
                            </button>
                            <button
                              className={
                                "bg-primary text-white py-1 px-3 rounded-[5px]"
                              }
                              onClick={() => postComment(item.orderId)}
                            >
                              등록
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div
                  className={
                    "flex gap-2 items-center cursor-pointer ml-5 text-red h-4"
                  }
                  onClick={() => {
                    postBlackList(item.userId);
                    patchReviewReq(item.orderId);
                  }}
                >
                  <PiSirenFill className="w-[20px] h-[20px]" />
                  <div>신고하기</div>
                </div>
              </div>
              <div className="border-gray border my-5"></div>
            </div>
          ))}
          <div>
            <div className="flex gap-5">
              <div>
                <div className="font-bold mb-2">건물주 고양이</div>
                <div className="flex gap-3 items-center">
                  <div className="font-bold text-[20px]">5.0</div>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, index) => {
                      const starIndex = index + 1;
                      return (
                        <FaStar
                          key={starIndex}
                          className={`w-[20px] h-[20px] ${starIndex <= rating ? "text-yellow" : "text-gray"}`}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="mt-2 text-darkGray">2025-02-23</div>
              </div>
              <div>
                <div>양도 많고 감자도 잘 튀겨졌어요~~~ 역시 최고 !!</div>
                <div className="flex w-[300px] my-3 gap-1">
                  <img
                    src="/swiper1.webp"
                    className="flex w-1/3 rounded-[5px]"
                    alt=""
                  />
                  <img
                    src="/swiper2.webp"
                    className="flex w-1/3 rounded-[5px]"
                    alt=""
                  />
                  <img
                    src="/swiper3.webp"
                    className="flex w-1/3 rounded-[5px]"
                    alt=""
                  />
                </div>
                <div className="mb-2">
                  모짜렐라인더 버거-베이컨 세트 1개, 양념감자(양파맛) 2개
                </div>
                {isClick !== 2 ? (
                  <button
                    className="px-4 py-2 bg-primary text-white rounded-sm"
                    onClick={() => setIsClick(2)}
                  >
                    댓글쓰기
                  </button>
                ) : (
                  <div>
                    <ReactQuill
                      className="h-[150px]"
                      placeholder="소중한 리뷰에 답글을 남겨보세요!"
                      modules={{
                        toolbar: false,
                      }}
                      readOnly={false}
                      onChange={e => setComment(e)}
                    />
                    <div className="flex justify-end gap-3 mt-2">
                      <button
                        className="bg-gray py-1 px-3 rounded-[5px]"
                        onClick={() => setIsClick(0)}
                      >
                        취소
                      </button>
                      <button className="bg-primary text-white py-1 px-3 rounded-[5px]">
                        등록
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2 items-center cursor-pointer ml-24 text-red h-4">
                <PiSirenFill className="w-[20px] h-[20px]" />
                <div>신고하기</div>
              </div>
            </div>
            <div className="border-gray border my-5"></div>
          </div>
        </ContentDiv>

        {/* 블랙리스트 관리 */}
        <SideBarRightDiv>
          <TitleDiv className="text-center my-10">블랙리스트 목록</TitleDiv>
          <div className="mx-10 overflow-y-auto scrollbar-hide mb-5">
            {/* map 사용*/}
            {blackList.map(item => (
              <div>
                <div className="flex justify-between mt-2">
                  <div>
                    {item.nickName}({item.uid})
                  </div>
                  {edit && (
                    <RiDeleteBin6Fill
                      onClick={() =>
                        handleBlackDelete(item.userId, item.nickName)
                      }
                      className="cursor-pointer w-5 h-5"
                    />
                  )}
                </div>
                <div className="border-gray border mt-2"></div>
              </div>
            ))}
            {/* <div>
              <div className="flex justify-between mt-2">
                <div>배고픈직장인(10001211)</div>
                {edit && (
                  <RiDeleteBin6Fill className="cursor-pointer w-5 h-5" />
                )}
              </div>
              <div className="border-gray border mt-2"></div>
            </div>
            <div>
              <div className="flex justify-between mt-2">
                <div>점심사냥꾼(10002213)</div>
                {edit && (
                  <button>
                    <RiDeleteBin6Fill className="cursor-pointer w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="border-gray border mt-2"></div>
            </div>
            <div>
              <div className="flex justify-between mt-2">
                <div>밥심으로버틴다(10003211)</div>
                {edit && (
                  <button>
                    <RiDeleteBin6Fill className="cursor-pointer w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="border-gray border mt-2"></div>
            </div>
            <div>
              <div className="flex justify-between mt-2">
                <div>맛집탐험가(10001201)</div>
                {edit && (
                  <button>
                    <RiDeleteBin6Fill className="cursor-pointer w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="border-gray border mt-2"></div>
            </div>
            <div>
              <div className="flex justify-between mt-2">
                <div>오늘뭐먹지(10001011)</div>
                {edit && (
                  <button>
                    <RiDeleteBin6Fill className="cursor-pointer w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="border-gray border mt-2"></div>
            </div> */}
          </div>
          <div className="mt-auto mb-5 flex justify-center">
            {edit ? (
              <button
                className="bg-primary text-white py-2 px-5 rounded-[5px]"
                onClick={() => setEdit(false)}
              >
                확인
              </button>
            ) : (
              <button
                className="bg-primary text-white py-2 px-5 rounded-[5px]"
                onClick={() => setEdit(true)}
              >
                수정하기
              </button>
            )}
          </div>
        </SideBarRightDiv>
      </LayoutDiv>
    </div>
  );
}
export default StoreReviewPage;
