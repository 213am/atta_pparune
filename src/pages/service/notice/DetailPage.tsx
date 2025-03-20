import { useNavigate, useSearchParams } from "react-router-dom";
import ServiceFooter from "../../../components/ServiceFooter";
import ServiceHeader from "../../../components/ServiceHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../../../components/cookie";
import Swal from "sweetalert2";
import DOMPurify from "dompurify";
import dayjs from "dayjs";

interface BoardType {
  createdAt: string;
  inquiryId: number;
  inquiryTitle: string;
  postCode: string;
  roleCode: string;
  id: number;
  inquiryDetail: string;
  pic: string | null;
}

const DetailPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inquiryId = Number(searchParams.get("inquiryId"));
  const accessToken = getCookie();
  const id = sessionStorage.getItem("id");
  const roleCode = sessionStorage.getItem("roleCode");
  const [detailData, setDetailData] = useState<BoardType>({
    inquiryId: 0,
    id: 0,
    inquiryTitle: "",
    inquiryDetail: "",
    pic: null,
    postCode: "",
    roleCode: "",
    createdAt: "",
  });
  const [isError, setIsError] = useState(false);

  // 게시글 상세보기
  const getBoardDetail = async () => {
    const params = {
      inquiryId,
      id,
      roleCode,
    };
    try {
      const res = await axios.get("/api/system/v3/post/detail", {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setDetailData(res.data.resultData);
    } catch (error) {
      setIsError(true);
      Swal.fire("접근 권한이 없는 게시물입니다.", "", "error").then(result => {
        if (result.isConfirmed) {
          navigate(-1);
        }
      });
      console.log(error);
    }
  };

  // 게시글 삭제
  const deleteBoard = async () => {
    try {
      await axios.delete(`/api/system/v3/post?inquiryId=${inquiryId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      Swal.fire("게시글이 삭제 되었습니다.", "", "success").then(result => {
        if (result.isConfirmed) {
          navigate("/service/notice");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 작성자
  const writePerson = (roleCode: string) => {
    switch (roleCode) {
      case "00101":
        return "식당";
      case "00102":
        return "회사";
      case "00103":
        return "관리자";
      case "00104":
        return "사용자";
    }
  };

  // 공지, 문의 불편사항 폼
  const boardCate = (postCode: string) => {
    switch (postCode) {
      case "00201":
        return <>[공지] {detailData.inquiryTitle}</>;
      case "00202":
        return <>[문의] {detailData.inquiryTitle}</>;
      case "00203":
        return <>[불편사항] {detailData.inquiryTitle}</>;
      case "00204":
        return <>{detailData.inquiryTitle}</>;
    }
  };

  // 공지, 문의 불편사항 구분
  const boardTitle = (postCode: string) => {
    switch (postCode) {
      case "00201":
        return <>공지사항</>;
      case "00202":
        return <>문의사항</>;
      case "00203":
        return <>불편사항</>;
      case "00204":
        return <>자주 묻는 질문</>;
    }
  };

  useEffect(() => {
    getBoardDetail();
  }, []);

  if (isError) {
    return <div className="bg-white w-[100vw] h-[100vh]"></div>;
  }

  return (
    <div className="relative w-full h-dvh bg-white overflow-y-auto overflow-x-hidden z-10 flex flex-col">
      <ServiceHeader />
      <div className="mt-[100px] relative flex-grow">
        <div className="flex justify-center">
          <div className="w-[1280px] flex flex-col gap-3 mt-5">
            {/* 카테고리 */}
            <div className="text-[30px] border-b-2 border-darkGray pb-3 font-bold w-full">
              {boardTitle(detailData.postCode)}
            </div>

            {/* 제목 */}
            <div className="flex flex-col gap-2 border-b border-gray pb-2">
              <div className="text-[20px] font-bold">
                {boardCate(detailData.postCode)}
              </div>
              <div className="flex gap-3">
                <div>{writePerson(detailData.roleCode)}</div>
                <div className="text-gray">|</div>
                <div>
                  {detailData.createdAt
                    ? dayjs(detailData.createdAt).format("YYYY-MM-DD")
                    : ""}
                </div>
              </div>
            </div>

            {/* 내용 */}
            <div className="flex flex-col gap-3 min-h-[500px]">
              {detailData.pic && <img src={detailData.pic} alt="게시글 내용" />}
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(String(detailData.inquiryDetail)),
                }}
              />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray text-black px-4 py-1 rounded-[5px]"
              >
                목록으로
              </button>
              {detailData.postCode === "00202" ? (
                <>
                  <button
                    onClick={() =>
                      navigate(
                        `/service/notice/editpost?inquiryId=${inquiryId}`,
                        { state: detailData },
                      )
                    }
                    className="bg-black text-white px-4 py-1 rounded-[5px]"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "게시글을 삭제하시겠습니까?",
                        text: "삭제한 게시글은 복구할 수 없습니다.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#79BAF2",
                        cancelButtonColor: "#E44B58",
                        confirmButtonText: "확인",
                        cancelButtonText: "취소",
                        reverseButtons: false,
                      }).then(result => {
                        if (result.isConfirmed) {
                          deleteBoard();
                        }
                      });
                    }}
                    className="bg-black text-white px-4 py-1 rounded-[5px]"
                  >
                    삭제
                  </button>
                </>
              ) : (
                detailData.postCode === "00203" && (
                  <>
                    <button
                      onClick={() =>
                        navigate(
                          `/service/notice/editpost?inquiryId=${inquiryId}`,
                          { state: detailData },
                        )
                      }
                      className="bg-black text-white px-4 py-1 rounded-[5px]"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: "게시글을 삭제하시겠습니까?",
                          text: "삭제한 게시글은 복구할 수 없습니다.",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#79BAF2",
                          cancelButtonColor: "#E44B58",
                          confirmButtonText: "확인",
                          cancelButtonText: "취소",
                          reverseButtons: false,
                        }).then(result => {
                          if (result.isConfirmed) {
                            deleteBoard();
                          }
                        });
                      }}
                      className="bg-black text-white px-4 py-1 rounded-[5px]"
                    >
                      삭제
                    </button>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <ServiceFooter />
    </div>
  );
};
export default DetailPage;
